# Sistema de Check-in de Veículo - Grupo Aldebaran

Sistema client-side (sem backend) para registro e checklist de saída/retorno de veículos da frota, com geração de PDF e captura de fotos.

## Como abrir o projeto

O sistema não possui dependências complexas. Para rodar:
Basta abrir o arquivo `index.html` em qualquer navegador web moderno (Chrome, Edge, Safari, Firefox). 

*(Nota: Para garantir que a captura da câmera funcione corretamente em dispositivos móveis, recomendamos rodar via servidor local ou HTTPS, pois alguns navegadores bloqueiam o uso da câmera por segurança via protocolo `file://`).*

## Estrutura de Pastas

```text
/checkin-aldebaran/
├── index.html         → Arquivo principal (entrada direta no checklist).
├── css/
│   └── style.css      → Estilos globais responsivos (mobile-first).
├── js/
│   ├── app.js         → Estado global (`AppState`), navegação do wizard e resumo.
│   ├── checklist.js   → Módulo com a lista e lógica dos itens S/N.
│   ├── fotos.js       → Módulo de captura de imagens de avarias e veículo.
│   └── pdf.js         → Geração e download do PDF com jsPDF.
└── assets/
    └── logo.png       → Placeholder da logo.
```

## Como Customizar

### Adicionar ou Remover Itens do Checklist
Abra o arquivo `js/checklist.js`. No topo do código existe o array `ITENS_CHECKLIST`. Para modificar a lista, basta adicionar ou remover os textos dali. A tabela do HTML e o PDF serão desenhados de forma dinâmica.
```javascript
const ITENS_CHECKLIST = [
    "Etiqueta de Óleo",
    "Água do Radiador",
    "Seu Novo Item Aqui"
];
```

### Adicionar Novos Veículos
Abra o arquivo `js/app.js`. No topo do código existe o array `VEICULOS`. Basta acrescentar novos itens à lista.
```javascript
const VEICULOS = [
    "Fiat Strada – TDT-5J07 (Localiza)", 
    "Novo Carro – XYZ-0000 (Própria)"
];
```

## Próximos Passos e Mapa de Melhorias

O código fonte já possui comentários (como `FASE X:` e `TODO:`) apontando onde expandir.

* **FASE 2 — Autenticação:** Criação de tela de Login, exibição de nome do usuário logado e injeção do JWT no app.js.
* **FASE 3 — Banco de Dados:** Substituir os arrays estáticos por requests para listar veículos, buscar o histórico por veículo e realizar um POST para a API na etapa de "Finalizar".
* **FASE 4 — UX e Features:** Upar fotos para um Bucket S3 em vez de colocar base64 no PDF, criar componente Canvas para assinar na tela e disparar um email automático pro gestor direto da API do backend.
