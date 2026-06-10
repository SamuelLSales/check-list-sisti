/* 
  Controle de etapas (wizard), estado global da aplicação
*/

// FASE 3: Onde buscar lista de veículos dinamicamente (hoje é array fixo)
const VEICULOS = [
    "Fiat Strada – TDT-5J13", 
    "Fiat Strada – TDT-5J07", 
    "Toyota Hilux",
    "Renault Duster"
];

/* TODO: futuramente substituir por API/banco */
window.AppState = {
    stepAtual: 1,
    dadosIdentificacao: {
        combustivelSaida: ''
    },
    itensChecklist: {},
    avariasTexto: '',
    fotos: { avarias: [], geral: [null, null, null, null] }
};

// FASE 3: Onde buscar histórico de check-ins por veículo/motorista (nova função aqui no AppModule)
window.AppModule = {
    init: function() {
        // FASE 2: Onde passar token JWT para as requisições futuras
        /* TODO: LOGIN */
        this.irParaEtapa(1);
    },

    irParaEtapa: function(n) {
        if (n < 1 || n > 4) return;
        
        window.AppState.stepAtual = n;
        this.atualizarInterface();
        this.renderizarConteudoEtapa(n);
    },

    etapaAnterior: function() {
        if (window.AppState.stepAtual > 1) {
            this.irParaEtapa(window.AppState.stepAtual - 1);
        }
    },

    proximaEtapa: function() {
        if (window.AppState.stepAtual === 1) {
            if (!this.validarSalvarEtapa1()) return;
        } else if (window.AppState.stepAtual === 2) {
            if (!this.validarSalvarEtapa2()) return;
            if (window.ChecklistModule && window.ChecklistModule.salvarChecklist) {
                window.ChecklistModule.salvarChecklist();
            }
        } else if (window.AppState.stepAtual === 3) {
            if (!this.validarSalvarEtapa3()) return;
        }

        if (window.AppState.stepAtual < 4) {
            this.irParaEtapa(window.AppState.stepAtual + 1);
        } else {
            this.finalizar();
        }
    },

    validarSalvarEtapa1: function() {
        const campos = [
            { id: 'id-veiculo', nome: 'Veículo' },
            { id: 'id-motorista', nome: 'Motorista' },
            { id: 'id-setor', nome: 'Setor / Obra' },
            { id: 'id-destino', nome: 'Destino' },
            { id: 'id-data-saida', nome: 'Data de Saída' },
            { id: 'id-hora-saida', nome: 'Hora de Saída' },
            { id: 'id-km-saida', nome: 'KM na Saída' }
        ];

        let valido = true;

        campos.forEach(campo => {
            const el = document.getElementById(campo.id);
            if (el) {
                if (!el.value.trim()) {
                    el.style.borderColor = 'red';
                    valido = false;
                } else {
                    el.style.borderColor = '';
                }
            }
        });

        // Valida Combustível
        const fuelContainer = document.getElementById('fuel-saida');
        const combustivelSaida = window.AppState.dadosIdentificacao.combustivelSaida;
        if (!combustivelSaida) {
            if (fuelContainer) fuelContainer.style.borderColor = 'red';
            valido = false;
        } else {
            if (fuelContainer) fuelContainer.style.borderColor = '';
        }

        if (!valido) {
            // Rola pro topo suavemente pra pessoa ver o que faltou
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return false;
        }

        window.AppState.dadosIdentificacao = {
            veiculo: document.getElementById('id-veiculo').value,
            motorista: document.getElementById('id-motorista').value.trim(),
            setor: document.getElementById('id-setor').value.trim(),
            destino: document.getElementById('id-destino').value.trim(),
            dataSaida: document.getElementById('id-data-saida').value,
            horaSaida: document.getElementById('id-hora-saida').value,
            kmSaida: document.getElementById('id-km-saida').value,
            combustivelSaida: combustivelSaida
        };

        return true;
    },

    validarSalvarEtapa2: function() {
        if (!window.ITENS_CHECKLIST) return true;
        const items = window.AppState.itensChecklist || {};
        let valido = true;
        
        window.ITENS_CHECKLIST.forEach((item, index) => {
            const tr = document.getElementById(`chk-row-${index}`);
            if (!items[item] || !items[item].saida) {
                if (tr) tr.style.backgroundColor = '#fee2e2';
                valido = false;
            } else {
                if (tr) tr.style.backgroundColor = '';
            }
        });
        
        const banner = document.getElementById('chk-error');
        if (!valido) {
            if (banner) banner.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return false;
        } else {
            if (banner) banner.style.display = 'none';
        }
        return true;
    },

    validarSalvarEtapa3: function() {
        const fotosGerais = window.AppState.fotos.geral;
        let valido = true;

        for (let i = 0; i < 4; i++) {
            const slot = document.getElementById(`slot-geral-${i}`);
            if (!fotosGerais[i]) {
                if (slot) slot.style.borderColor = '#ef4444';
                valido = false;
            } else {
                if (slot) slot.style.borderColor = '';
            }
        }
        
        const banner = document.getElementById('fotos-error');
        if (!valido) {
            if (banner) banner.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return false;
        } else {
            if (banner) banner.style.display = 'none';
        }
        return true;
    },

    selectFuel: function(tipo, valor, event) {
        if (tipo === 'saida') {
            window.AppState.dadosIdentificacao.combustivelSaida = valor;
            const container = document.getElementById('fuel-saida');
            Array.from(container.children).forEach(el => el.classList.remove('selected'));
            event.target.classList.add('selected');
        }
    },

    atualizarInterface: function() {
        const step = window.AppState.stepAtual;
        
        for (let i = 1; i <= 4; i++) {
            const indicator = document.getElementById(`indicator-${i}`);
            if (indicator) {
                indicator.className = 'step';
                if (i < step) indicator.classList.add('completed');
                else if (i === step) indicator.classList.add('active');
            }
        }

        const btnVoltar = document.getElementById('btn-voltar');
        const btnProximo = document.getElementById('btn-proximo');
        
        if (btnVoltar) {
            btnVoltar.style.visibility = step === 1 ? 'hidden' : 'visible';
        }
        
        if (btnProximo) {
            btnProximo.textContent = step === 4 ? 'Gerar PDF' : 'Próximo';
        }
    },

    renderizarConteudoEtapa: function(n) {
        const contentDiv = document.getElementById('step-content');
        if (!contentDiv) return;

        if (n === 1) {
            const d = window.AppState.dadosIdentificacao;
            const hoje = new Date();
            const ano = hoje.getFullYear();
            const mes = String(hoje.getMonth() + 1).padStart(2, '0');
            const dia = String(hoje.getDate()).padStart(2, '0');
            const horas = String(hoje.getHours()).padStart(2, '0');
            const mins = String(hoje.getMinutes()).padStart(2, '0');
            
            const dataHoje = `${ano}-${mes}-${dia}`;
            const horaAgora = `${horas}:${mins}`;

            contentDiv.innerHTML = `
                <div class="card">
                    <h3 class="card-title">Dados do Veículo</h3>
                    <div class="form-group">
                        <label>Veículo *</label>
                        <select id="id-veiculo" class="form-control">
                            <option value="">Selecione um veículo...</option>
                            ${VEICULOS.map(v => `<option value="${v}" ${d.veiculo === v ? 'selected' : ''}>${v}</option>`).join('')}
                        </select>
                        <span class="error-msg" id="err-veiculo">Selecione um veículo</span>
                    </div>
                    <div class="form-group">
                        <label>Motorista *</label>
                        <input type="text" id="id-motorista" class="form-control" placeholder="Nome completo" value="${d.motorista || ''}">
                        <span class="error-msg" id="err-motorista">Preencha o nome do motorista</span>
                    </div>
                    <div class="form-group">
                        <label>Setor / Obra *</label>
                        <input type="text" id="id-setor" class="form-control" placeholder="Ex: Obras Civis" value="${d.setor || ''}">
                    </div>
                    <div class="form-group">
                        <label>Destino *</label>
                        <input type="text" id="id-destino" class="form-control" placeholder="Ex: Canteiro 1" value="${d.destino || ''}">
                    </div>
                </div>

                <div class="card">
                    <h3 class="card-title">Saída</h3>
                    <div class="form-group row">
                        <div class="col">
                            <label>Data de Saída *</label>
                            <input type="date" id="id-data-saida" class="form-control" value="${d.dataSaida || dataHoje}">
                        </div>
                        <div class="col">
                            <label>Hora de Saída *</label>
                            <input type="time" id="id-hora-saida" class="form-control" value="${d.horaSaida || horaAgora}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>KM na Saída *</label>
                        <input type="number" id="id-km-saida" class="form-control" placeholder="Ex: 125000" value="${d.kmSaida || ''}">
                    </div>
                    <div class="form-group">
                        <label>Combustível na Saída *</label>
                        <div class="fuel-selector" id="fuel-saida">
                            ${['V', '1/4', '1/2', '3/4', 'C'].map(opt => `
                                <div class="fuel-opt ${d.combustivelSaida === opt ? 'selected' : ''}" onclick="window.AppModule.selectFuel('saida', '${opt}', event)">${opt}</div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
            return;
        } else if (n === 2) {
            if (window.ChecklistModule && window.ChecklistModule.renderChecklist) {
                contentDiv.innerHTML = window.ChecklistModule.renderChecklist();
            } else {
                contentDiv.innerHTML = `<div class="card"><h3>Módulo de Checklist não carregado</h3></div>`;
            }
            return;
        } else if (n === 3) {
            if (window.FotosModule && window.FotosModule.renderFotos) {
                contentDiv.innerHTML = window.FotosModule.renderFotos();
            } else {
                contentDiv.innerHTML = `<div class="card"><h3>Módulo de Fotos não carregado</h3></div>`;
            }
            return;
        } else if (n === 4) {
            const d = window.AppState.dadosIdentificacao;
            const items = window.AppState.itensChecklist;
            const fotosGerais = window.AppState.fotos.geral.filter(f => f !== null).length;
            const avarias = window.AppState.fotos.avarias.length;
            const descAvarias = window.AppState.avariasTexto || 'Nenhuma descrição fornecida.';
            
            let ok = 0, nok = 0, n_verif = 0;
            if (window.ITENS_CHECKLIST) {
                window.ITENS_CHECKLIST.forEach(item => {
                    const s = items[item] ? items[item].saida : null;
                    if (s === 'S') ok++;
                    if (s === 'N') nok++;
                    if (!s) n_verif++;
                });
            }

            contentDiv.innerHTML = `
                <div class="card">
                    <h3 class="card-title">Resumo da Identificação</h3>
                    <div class="resumo-grid">
                        <div class="resumo-item"><small>Veículo</small><br><b>${d.veiculo || '---'}</b></div>
                        <div class="resumo-item"><small>Motorista</small><br><b>${d.motorista || '---'}</b></div>
                        <div class="resumo-item"><small>Data Saída</small><br><b>${d.dataSaida ? d.dataSaida.split('-').reverse().join('/') : '---'}</b></div>
                        <div class="resumo-item"><small>KM Saída</small><br><b>${d.kmSaida || '---'}</b></div>
                    </div>
                </div>

                <div class="card">
                    <h3 class="card-title">Resumo do Checklist</h3>
                    <div style="display: flex; justify-content: space-between; text-align: center;">
                        <div style="color: #16a34a;"><h2>${ok}</h2><small>OK</small></div>
                        <div style="color: #ef4444;"><h2>${nok}</h2><small>NOK</small></div>
                        <div style="color: #6b7280;"><h2>${n_verif}</h2><small>Não Verif.</small></div>
                    </div>
                </div>

                <div class="card">
                    <h3 class="card-title">Avarias Registradas</h3>
                    <p style="font-size: 13px; color: #4b5563; margin-bottom: 8px;">${descAvarias}</p>
                    <p style="font-size: 12px; font-weight: bold;">Fotos de avarias: ${avarias}</p>
                </div>

                <div class="card">
                    <h3 class="card-title">Fotos do Veículo</h3>
                    <div class="fotos-grid" style="grid-template-columns: repeat(4, 1fr);">
                        ${window.AppState.fotos.geral.map((f) => {
                            if (f) return `<div class="thumb-container" style="width:100%; height: 50px;"><img src="${f.data}" class="thumb-img"></div>`;
                            return `<div class="thumb-container" style="width:100%; height: 50px; background:#f3f4f6; display:flex; align-items:center; justify-content:center; font-size:10px; color:#9ca3af;">Vazio</div>`;
                        }).join('')}
                    </div>
                </div>

                <div class="form-group" style="margin-top: 24px;">
                    <button class="btn btn-primary btn-block" style="font-size: 1.2rem; padding: 16px;" onclick="window.AppModule.finalizar()">📄 Gerar e Baixar PDF</button>
                </div>

                <div id="botoes-pos-pdf" style="display: none; flex-direction: column; gap: 8px; margin-top: 16px;">
                    <button class="btn btn-secondary btn-block" style="color: #16a34a; border-color: #16a34a;" onclick="window.PdfModule.compartilharWhatsApp()">📤 Compartilhar PDF</button>
                    <button class="btn btn-secondary btn-block" onclick="window.PdfModule.enviarEmail()">✉️ Enviar por E-mail</button>
                </div>
            `;
            return;
        }
    },

    finalizar: function() {
        // FASE 3: Onde chamar API para salvar o check-in (função já marcada com TODO)
        // FASE 4: Notificação por e-mail automática ao gestor ao finalizar (no backend)
        /* TODO: SALVAR NO BD */
        console.log("Finalizando check-in...", window.AppState);
        if (window.PdfModule && window.PdfModule.gerarPDF) {
            window.PdfModule.gerarPDF();
        } else {
            alert("Erro: Módulo de PDF não carregado!");
        }
    }
};

// Inicializa o app quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.AppModule.init();
});
