/* TODO: LOGIN — incluir nome/matrícula do usuário logado no rodapé do PDF */
// FASE 2: Onde exibir nome do usuário logado no PDF (usar dados do AppState se existirem)
/* TODO: SALVAR NO BD — chamar API aqui para registrar o check-in após gerar PDF */

/* 
  Geração e download do PDF com jsPDF
*/

window.PdfModule = {
    logoBase64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAjCAMAAADmBbXtAAAC31BMVEVHcEz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+Bl4H0AAAA9HRSTlMA/gEoAiksBHT8IgMe/UDfJwchfAYOJiUgJCo+wRQjETnDrA0FKzs6Lgo1Mx8WMTjscB0vDDccvLgtaBcyGUHQFQka+wu/NDA9DzY8Qgj3RxgTEvD58kP0EHMbwvr2y5RFSefc0Uzm7/jzT3tOS00/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',
    gerarPDF: function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('portrait', 'mm', 'a4');
        const d = window.AppState.dadosIdentificacao;
        
        let totalPages = 1;
        const temFotosGerais = window.AppState.fotos.geral.some(f => f !== null);
        const temAvarias = window.AppState.fotos.avarias.length > 0;
        if (temFotosGerais || temAvarias) {
            totalPages = 2;
        }

        const hoje = new Date();
        const dataStr = hoje.toLocaleString('pt-BR');

        const drawFooter = (pageNumber) => {
            doc.setFontSize(8);
            doc.setTextColor(150);
            doc.text(`Gerado em ${dataStr}`, 14, 285);
            doc.text(`${pageNumber} / ${totalPages}`, 190, 285, { align: 'right' });
        };

        const drawHeader = (title) => {
            doc.setFillColor(0, 0, 0);
            doc.rect(0, 0, 210, 25, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.text("CHECK-IN DE VEÍCULO", 14, 15);
            
            if (window.PdfModule.logoBase64) {
                doc.addImage(window.PdfModule.logoBase64, 140, 5, 56, 10);
            }
            
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.setFont("helvetica", "bold");
            doc.text(title, 14, 35);
        };

        // --- PÁGINA 1: Identificação ---
        drawHeader("Dados de Identificação");
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        
        let y = 45;
        doc.text(`Veículo: ${d.veiculo || '---'}`, 14, y);
        doc.text(`Motorista: ${d.motorista || '---'}`, 110, y); 
        y += 8;
        
        doc.text(`Setor / Obra: ${d.setor || '---'}`, 14, y);
        doc.text(`Destino: ${d.destino || '---'}`, 110, y); 
        y += 12;

        // Saída
        doc.setFont("helvetica", "bold");
        doc.text("DADOS DE RETIRADA", 14, y);
        y += 6;
        doc.setFont("helvetica", "normal");
        
        const dataFmt = d.dataSaida ? d.dataSaida.split('-').reverse().join('/') : '---';
        doc.text(`Data: ${dataFmt}`, 14, y);
        doc.text(`Hora: ${d.horaSaida || '---'}`, 60, y);
        doc.text(`KM: ${d.kmSaida || '---'}`, 100, y);
        doc.text(`Combustível: ${d.combustivelSaida || '---'}`, 150, y);
        y += 12;

        // --- CHECKLIST ---
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("CHECKLIST DE ITENS", 14, y);
        y += 6;

        doc.setFillColor(0, 0, 0);
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.rect(14, y - 5, 180, 8, 'F');
        doc.setFont("helvetica", "bold");
        doc.text("Item", 16, y);
        doc.text("Verificação", 120, y);
        
        y += 8;
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "normal");
        
        if (window.ITENS_CHECKLIST) {
            const estado = window.AppState.itensChecklist || {};
            window.ITENS_CHECKLIST.forEach((item, index) => {
                if (y > 270) {
                    drawFooter(1);
                    doc.addPage();
                    drawHeader("Checklist de Itens (Cont.)");
                    y = 45;
                }
                
                // Zebra
                if (index % 2 === 0) {
                    doc.setFillColor(245, 245, 245);
                    doc.rect(14, y - 5, 180, 8, 'F');
                }

                const s = estado[item] ? estado[item].saida : '—';

                doc.setTextColor(0, 0, 0);
                doc.text(item, 16, y);
                
                if (s === 'N') doc.setTextColor(239, 68, 68); // Vermelho
                doc.text(s || '—', 125, y);

                y += 8;
            });
        }
        
        drawFooter(1);

        // --- PÁGINA 2: Fotos (Opcional) ---
        if (totalPages === 2) {
            doc.addPage();
            drawHeader("Avarias e Fotos");
            
            y = 45;
            // Avarias texto
            if (window.AppState.avariasTexto) {
                doc.setFontSize(10);
                doc.setFont("helvetica", "bold");
                doc.text("Descrição das Avarias:", 14, y);
                y += 6;
                const lines = doc.splitTextToSize(window.AppState.avariasTexto, 180);
                doc.setFont("helvetica", "normal");
                doc.text(lines, 14, y);
                y += (lines.length * 5) + 10;
            }

            try {
                // Fotos Gerais (Grid 2x2)
                if (temFotosGerais) {
                    doc.setFont("helvetica", "bold");
                    doc.text("Fotos do Veículo:", 14, y);
                    y += 6;
                    
                    let colX = 14;
                    let rowY = y;
                    window.AppState.fotos.geral.forEach((foto, i) => {
                        if (foto && foto.data) {
                            doc.addImage(foto.data, colX, rowY, 80, 60);
                            doc.setFontSize(8);
                            doc.setFont("helvetica", "normal");
                            doc.text(foto.label, colX + 40, rowY + 65, { align: 'center' });
                        } else {
                            doc.setDrawColor(200);
                            doc.setFillColor(245, 245, 245);
                            doc.rect(colX, rowY, 80, 60, 'FD');
                            doc.setFontSize(8);
                            doc.setFont("helvetica", "normal");
                            doc.text(`(Sem foto: ${foto ? foto.label : 'Foto '+(i+1)})`, colX + 40, rowY + 30, { align: 'center' });
                        }
                        
                        colX += 90;
                        if (colX > 150) {
                            colX = 14;
                            rowY += 75;
                        }
                    });
                    y = rowY + (colX > 14 ? 75 : 0);
                }

                // Avarias
                if (temAvarias) {
                    if (y > 220) {
                        drawFooter(2);
                        doc.addPage();
                        drawHeader("Avarias Registradas");
                        y = 45;
                    }

                    doc.setFont("helvetica", "bold");
                    doc.text("Fotos de Avarias:", 14, y);
                    y += 6;

                    let colX = 14;
                    let rowY = y;
                    window.AppState.fotos.avarias.forEach((foto, i) => {
                        if (rowY > 240) {
                            drawFooter(3);
                            doc.addPage();
                            drawHeader("Avarias Registradas (Cont.)");
                            rowY = 45;
                            colX = 14;
                        }

                        doc.addImage(foto.data, colX, rowY, 40, 30);
                        doc.setFontSize(8);
                        doc.setFont("helvetica", "normal");
                        doc.text(foto.tipo, colX + 20, rowY + 34, { align: 'center' });
                        
                        colX += 45;
                        if (colX > 180) {
                            colX = 14;
                            rowY += 40;
                        }
                    });
                }
            } catch (e) {
                console.error("Erro ao inserir imagens no PDF:", e);
                doc.setTextColor(255, 0, 0);
                doc.text("Erro ao renderizar algumas imagens no PDF.", 14, y + 10);
            }

            drawFooter(2);
        }

        // Nome do arquivo
        let placa = 'Veiculo';
        if (d.veiculo) {
            const regex = /– ([A-Z0-9-]{7,8})/;
            const match = d.veiculo.match(regex);
            if (match) placa = match[1];
        }
        
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');
        const dia = String(hoje.getDate()).padStart(2, '0');
        const dataHoje = `${ano}${mes}${dia}`;
        
        const fileName = `checkin_${placa}_${dataHoje}.pdf`;
        doc.save(fileName);
        
        // Salva na memória para o compartilhamento nativo
        const pdfBlob = doc.output('blob');
        window.PdfModule.lastGeneratedFile = new File([pdfBlob], fileName, { type: 'application/pdf' });
        
        // Exibir botões extras
        window.PdfModule.exibirBotoesCompartilhamento(fileName);
    },

    exibirBotoesCompartilhamento: function(fileName) {
        const container = document.getElementById('botoes-pos-pdf');
        if (container) {
            container.style.display = 'flex';
        }
    },

    compartilharWhatsApp: async function() {
        const d = window.AppState.dadosIdentificacao;
        const msg = `Olá! O check-in do veículo ${d.veiculo || ''} (Motorista: ${d.motorista || ''}) foi finalizado. O PDF segue em anexo.`;
        const file = window.PdfModule.lastGeneratedFile;

        // Tenta usar o compartilhamento nativo do celular (que anexa o arquivo)
        if (navigator.share && file && navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
                await navigator.share({
                    title: `Check-in ${d.veiculo}`,
                    text: msg,
                    files: [file]
                });
                return;
            } catch (err) {
                console.log("Compartilhamento nativo cancelado ou falhou:", err);
            }
        } else {
            // Fallback para PC ou navegadores antigos
            alert("Seu navegador não suporta enviar o arquivo automaticamente. O PDF foi baixado na sua pasta de Downloads. Por favor, anexe-o manualmente na conversa.");
            window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
        }
    },

    enviarEmail: function() {
        const d = window.AppState.dadosIdentificacao;
        const subject = `Check-in de Veículo - ${d.veiculo || ''}`;
        const body = `Em anexo o PDF do check-in do veículo ${d.veiculo || ''} realizado por ${d.motorista || ''}.`;
        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    }
};
