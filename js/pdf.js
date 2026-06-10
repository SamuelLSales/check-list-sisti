/* TODO: LOGIN — incluir nome/matrícula do usuário logado no rodapé do PDF */
// FASE 2: Onde exibir nome do usuário logado no PDF (usar dados do AppState se existirem)
/* TODO: SALVAR NO BD — chamar API aqui para registrar o check-in após gerar PDF */

/* 
  Geração e download do PDF com jsPDF
*/

window.PdfModule = {
    logoBase64: 'data:image/png;base64,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',
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
                doc.setFillColor(255, 255, 255);
                doc.roundedRect(138, 3, 60, 14, 2, 2, 'F');
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
