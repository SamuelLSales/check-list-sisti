/* 
  Lógica dos itens de verificação S/N
*/

window.ITENS_CHECKLIST = [
    "Etiqueta de Óleo","Água do Radiador","Calibragem Pneus","Calibragem Estepe",
    "Chave de Roda","Triângulo","Macaco","Vidros","Portas Fechando","Limpeza Geral",
    "Farol","Luz de Freio","Seta Direita","Seta Esquerda","Limpador Parabrisa",
    "Extintor de Incêndio","Rádio","Ar Condicionado","Cinto de Segurança",
    "DUT Original","Manual do Veículo","Estepe"
];

window.ChecklistModule = {
    renderChecklist: function() {
        const estado = window.AppState.itensChecklist || {};
        
        let html = `
            <div class="card checklist-card">
                <div class="error-msg" id="chk-error" style="display:none; padding: 8px 12px; background: #fee2e2; color: #ef4444; border-bottom: 1px solid #fca5a5; font-weight: bold; text-align: center;">
                    Por favor, responda todos os itens marcados em vermelho.
                </div>
                <div class="table-container">
                    <table class="checklist-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Verificação</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

        window.ITENS_CHECKLIST.forEach((item, index) => {
            const valSaida = estado[item] ? estado[item].saida : null;

            html += `
                <tr id="chk-row-${index}">
                    <td>${item}</td>
                    <td>
                        <div class="btn-group">
                            <button class="btn-sn btn-s ${valSaida === 'S' ? 'active' : ''}" onclick="window.ChecklistModule.toggleItem('${item}', 'saida', 'S', this, ${index})">S</button>
                            <button class="btn-sn btn-n ${valSaida === 'N' ? 'active' : ''}" onclick="window.ChecklistModule.toggleItem('${item}', 'saida', 'N', this, ${index})">N</button>
                        </div>
                    </td>
                </tr>
            `;
        });

        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        return html;
    },

    toggleItem: function(item, tipo, valor, btn, index) {
        // Inicializa o item no estado se não existir
        if (!window.AppState.itensChecklist[item]) {
            window.AppState.itensChecklist[item] = { saida: null, retorno: null };
        }

        const currentState = window.AppState.itensChecklist[item][tipo];
        const container = btn.parentElement;

        // Limpa o fundo vermelho se existir
        const row = document.getElementById(`chk-row-${index}`);
        if (row) row.style.backgroundColor = '';

        // Se clicou no mesmo botão, desmarca
        if (currentState === valor) {
            window.AppState.itensChecklist[item][tipo] = null;
            btn.classList.remove('active');
        } else {
            // Marca o novo e desmarca o irmão
            window.AppState.itensChecklist[item][tipo] = valor;
            Array.from(container.children).forEach(el => el.classList.remove('active'));
            btn.classList.add('active');
        }
    },

    salvarChecklist: function() {
        // Os valores já são salvos em AppState diretamente no onclick (toggleItem)
        return true;
    }
};
