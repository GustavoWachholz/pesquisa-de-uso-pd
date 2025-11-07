document.addEventListener('DOMContentLoaded', function() {
            
    // Lista de itens fornecida
    const items = [
        "Agenda", "Agenda-Recepção", "Agenda Pro365", "Anamnese", 
        "Confirmação de consultas via WhatsApp", "Imagens", "Documentos", 
        "Auditoria", "Oportunidades", "Odontograma", "Orçamentos", "Receber", 
        "Controle Bancário", "Inadimplentes", "Contas a Pagar", 
        "Indicadores Gerenciais", "Receitas", "Atestados", "Impressão de Textos", 
        "Indicação", "Anotações de clientes", "Tarefas", "Campanhas", "Estoque", 
        "Custos", "Filtro", "Fichas configuráveis", "Controle protético", 
        "Fichas Configuráveis", "Fila de Espera", "D.C.M. (Disfunção Crânio-Mandibular)", 
        "APP (Visualização da Agenda)", "Assinatura eletrônica", "Central de ajuda", 
        "Repasse", "Pro365 IA", "Observações Clínicas", 
        "Lembrete de consultas via WhatsApp", "Fast-in (Anamnese digital)", 
        "Editor de textos"
    ];

    const itemListContainer = document.getElementById('itemList');

    // 1. Popula a lista de checkboxes
    // Verifica se o container existe antes de tentar populá-lo
    if (itemListContainer) {
        items.forEach(item => {
            const label = document.createElement('label');
            label.className = "flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200 border border-gray-200";

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = item;
            
            /*
              MUDANÇA #3: Adicionado o atributo 'name'
              Isso é crucial. É como o formulário agrupa todos os itens 
              marcados para enviá-los.
            */
            checkbox.name = "itens_selecionados[]";
            
            checkbox.className = "item-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500";
            
            const span = document.createElement('span');
            span.textContent = item;
            span.className = "text-gray-800 select-none";

            label.appendChild(checkbox);
            label.appendChild(span);
            itemListContainer.appendChild(label);
        });
    } else {
        console.error("O elemento 'itemList' não foi encontrado na página.");
    }

    // MUDANÇA #4: Remoção do JavaScript do botão "Copiar"
    // Não precisamos mais da função showMessage, getSelectedItems, 
    // ou do event listener do botão, pois o formulário HTML 
    // padrão cuidará do envio.

});