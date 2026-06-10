/* TODO: futuramente enviar fotos para storage (S3, Firebase, etc.)
   em vez de base64 no PDF — base64 aumenta muito o tamanho do arquivo */
// FASE 4: Upload de fotos para storage em vez de base64 no PDF
// FASE 4: Assinatura digital do motorista (canvas touchscreen) adicionada aqui ou como módulo novo

/* 
  Captura e preview de fotos via input[type=file]
*/

window.FotosModule = {
    tipoAvariaSelecionado: 'Outro',
    
    renderFotos: function() {
        const estadoFotos = window.AppState.fotos || { avarias: [], geral: [null, null, null, null] };
        const descAvarias = window.AppState.avariasTexto || '';
        
        const tiposAvaria = ['Quebrado', 'Amassado', 'Riscado', 'Trincado', 'Pneu', 'Outro'];
        
        let html = `
            <div class="card">
                <h3 class="card-title">1. Avarias</h3>
                <div class="form-group">
                    <label>Descrição das Avarias</label>
                    <textarea id="id-desc-avarias" class="form-control" rows="3" placeholder="Descreva as avarias encontradas..." oninput="window.AppState.avariasTexto = this.value">${descAvarias}</textarea>
                </div>
                
                <div class="form-group">
                    <label>Tipo de Avaria</label>
                    <div class="pills-container" id="avaria-pills">
                        ${tiposAvaria.map(tipo => `
                            <div class="pill ${this.tipoAvariaSelecionado === tipo ? 'active' : ''}" onclick="window.FotosModule.selecionarTipoAvaria('${tipo}', this)">${tipo}</div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="form-group" style="margin-top: 16px;">
                    <label for="input-foto-avaria" class="btn btn-secondary btn-block text-center" style="display:block;">+ Registrar Avaria</label>
                    <input type="file" id="input-foto-avaria" accept="image/*" capture="environment" style="display:none;" onchange="window.FotosModule.adicionarFotoAvaria(this)">
                </div>
                
                <div class="avarias-gallery" id="gallery-avarias">
                    ${estadoFotos.avarias.map((foto, index) => this.gerarHtmlMiniaturaAvaria(foto, index)).join('')}
                </div>
            </div>

            <div class="card">
                <div class="error-msg" id="fotos-error" style="display:none; padding: 8px 12px; margin-bottom: 16px; background: #fee2e2; color: #ef4444; border-radius: 4px; border: 1px solid #fca5a5; font-weight: bold; text-align: center;">
                    Por favor, registre todas as fotos obrigatórias destacadas em vermelho.
                </div>
                <h3 class="card-title">2. Fotos do Veículo</h3>
                <div class="fotos-grid">
                    ${this.gerarHtmlSlotGeral('Frente', 0)}
                    ${this.gerarHtmlSlotGeral('Traseira', 1)}
                    ${this.gerarHtmlSlotGeral('Lateral Esq.', 2)}
                    ${this.gerarHtmlSlotGeral('Lateral Dir.', 3)}
                </div>
            </div>
        `;
        return html;
    },

    selecionarTipoAvaria: function(tipo, element) {
        this.tipoAvariaSelecionado = tipo;
        const container = document.getElementById('avaria-pills');
        Array.from(container.children).forEach(el => el.classList.remove('active'));
        element.classList.add('active');
    },

    adicionarFotoAvaria: function(input) {
        if (!input.files || !input.files[0]) return;
        const maxFotos = 10;
        
        if (!window.AppState.fotos) window.AppState.fotos = { avarias: [], geral: [null, null, null, null] };
        if (window.AppState.fotos.avarias.length >= maxFotos) {
            alert(`Máximo de ${maxFotos} fotos de avaria atingido.`);
            return;
        }

        const file = input.files[0];
        const tipo = this.tipoAvariaSelecionado;
        
        this.lerArquivoBase64(file, (base64) => {
            const novaFoto = { tipo: tipo, data: base64 };
            window.AppState.fotos.avarias.push(novaFoto);
            this.atualizarGaleriaAvarias();
        });
        
        // Reseta o input para permitir enviar a mesma foto em seguida (útil em testes)
        input.value = '';
    },

    removerFotoAvaria: function(index) {
        window.AppState.fotos.avarias.splice(index, 1);
        this.atualizarGaleriaAvarias();
    },

    atualizarGaleriaAvarias: function() {
        const gallery = document.getElementById('gallery-avarias');
        if (gallery) {
            gallery.innerHTML = window.AppState.fotos.avarias.map((foto, index) => this.gerarHtmlMiniaturaAvaria(foto, index)).join('');
        }
    },

    gerarHtmlMiniaturaAvaria: function(foto, index) {
        return `
            <div class="thumb-container">
                <img src="${foto.data}" class="thumb-img">
                <div class="thumb-badge">${foto.tipo}</div>
                <button class="thumb-remove" onclick="window.FotosModule.removerFotoAvaria(${index})">✕</button>
            </div>
        `;
    },

    // --- Fotos Gerais ---

    adicionarFotoGeral: function(input, indexStr, label) {
        if (!input.files || !input.files[0]) return;
        const file = input.files[0];
        const index = parseInt(indexStr);
        
        if (!window.AppState.fotos) window.AppState.fotos = { avarias: [], geral: [null, null, null, null] };
        
        this.lerArquivoBase64(file, (base64) => {
            // Garante o tamanho do array
            while (window.AppState.fotos.geral.length <= 3) {
                window.AppState.fotos.geral.push(null);
            }
            
            window.AppState.fotos.geral[index] = { label: label, data: base64 };
            this.atualizarSlotGeral(index, label);
            
            // Limpa borda vermelha se existir
            const slot = document.getElementById(`slot-geral-${index}`);
            if (slot) slot.style.borderColor = '';
        });
    },

    removerFotoGeral: function(indexStr, label, event) {
        const index = parseInt(indexStr);
        if (window.AppState.fotos && window.AppState.fotos.geral) {
            window.AppState.fotos.geral[index] = null;
        }
        // previne que o click propague pro input e abra a camera se estiver contido num label
        if (event) event.stopPropagation();
        if (event) event.preventDefault();
        
        this.atualizarSlotGeral(index, label);
    },

    atualizarSlotGeral: function(index, label) {
        const slotContainer = document.getElementById(`slot-geral-${index}`);
        if (slotContainer) {
            slotContainer.outerHTML = this.gerarHtmlSlotGeral(label, index);
        }
    },

    gerarHtmlSlotGeral: function(label, index) {
        const foto = (window.AppState.fotos && window.AppState.fotos.geral && window.AppState.fotos.geral[index]) 
            ? window.AppState.fotos.geral[index] : null;
            
        if (foto && foto.data) {
            return `
                <div class="slot-container has-photo" id="slot-geral-${index}">
                    <img src="${foto.data}" class="slot-img">
                    <div class="slot-label-overlay">${label}</div>
                    <button class="slot-remove" onclick="window.FotosModule.removerFotoGeral('${index}', '${label}', event)">✕</button>
                </div>
            `;
        } else {
            return `
                <div class="slot-container empty" id="slot-geral-${index}">
                    <label class="slot-label-area" style="cursor: pointer; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                        <span style="font-size: 24px; color: #9ca3af;">📷</span>
                        <span class="slot-text">${label}</span>
                        <input type="file" accept="image/*" capture="environment" style="display:none;" onchange="window.FotosModule.adicionarFotoGeral(this, '${index}', '${label}')">
                    </label>
                </div>
            `;
        }
    },

    lerArquivoBase64: function(file, callback) {
        const reader = new FileReader();
        reader.onload = function(e) {
            callback(e.target.result);
        };
        reader.readAsDataURL(file);
    }
};
