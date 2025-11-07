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
    const copyButton = document.getElementById('copyButton');
    const messageBox = document.getElementById('messageBox');

    let messageTimer; // Timer para esconder a mensagem

    // --- Função para mostrar mensagens (sucesso ou erro) ---
    function showMessage(message, isError = false) {
        clearTimeout(messageTimer); // Limpa timer anterior
        messageBox.textContent = message;
        messageBox.classList.remove('opacity-0', 'text-green-600', 'text-red-600');
        
        if (isError) {
            messageBox.classList.add('text-red-600');
        } else {
            messageBox.classList.add('text-green-600');
        }
        
        messageTimer = setTimeout(() => {
            messageBox.classList.add('opacity-0');
        }, 3000);
    }

    // 1. Popula a lista de checkboxes
    items.forEach(item => {
        const label = document.createElement('label');
        label.className = "flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors duration-200 border border-gray-200";

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = item;
        checkbox.className = "item-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500";
        
        const span = document.createElement('span');
        span.textContent = item;
        span.className = "text-gray-800 select-none";

        label.appendChild(checkbox);
        label.appendChild(span);
        itemListContainer.appendChild(label);
    });

    // --- Pega os itens selecionados (função auxiliar) ---
    function getSelectedItems() {
        const selectedItems = [];
        const checkedBoxes = document.querySelectorAll('.item-checkbox:checked');
        checkedBoxes.forEach(checkbox => {
            selectedItems.push(checkbox.value);
        });
        return selectedItems;
    }

    // --- (NOVA FUNÇÃO) Função Fallback (Plano B) ---
    // Esta é a sua lógica original, que agora serve como fallback
    function fallbackCopyTextToClipboard(text) {
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = text;
        tempTextArea.style.position = 'absolute';
        tempTextArea.style.left = '-9999px'; // Esconde fora da tela
        
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        tempTextArea.setSelectionRange(0, 99999); // Para compatibilidade com celulares
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showMessage('Itens copiados para a área de transferência!');
            } else {
                showMessage('Falha ao copiar. O dispositivo não suportou o comando.', true);
            }
        } catch (err) {
            console.error('Falha ao copiar (fallback): ', err);
            showMessage('Falha ao copiar. Verifique as permissões.', true);
        }
        
        document.body.removeChild(tempTextArea);
    }


    // 2. Adiciona a função de clique ao botão "Copiar"
    // --- (MODIFICAÇÃO PRINCIPAL AQUI) ---
    copyButton.addEventListener('click', function() {
        const selectedItems = getSelectedItems();

        if (selectedItems.length === 0) {
            showMessage('Por favor, selecione pelo menos um item.', true);
            return;
        }

        const textToCopy = selectedItems.join('\n');
        
        // --- Lógica de Cópia "Híbrida" (Moderna com Fallback) ---
        
        // Verifica se a API moderna (Plano A) existe
        if (navigator.clipboard && navigator.clipboard.writeText) {
            
            // Tenta usar a API Moderna
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    // Sucesso!
                    showMessage('Itens copiados para a área de transferência!');
                })
                .catch(err => {
                    // A API moderna falhou (como no S24FE)
                    console.warn('API Moderna falhou. Tentando fallback:', err);
                    // Executa o Plano B
                    fallbackCopyTextToClipboard(textToCopy);
                });
        } else {
            // O navegador nem sequer suporta a API moderna (Plano B direto)
            console.warn('navigator.clipboard não disponível. Usando fallback.');
            fallbackCopyTextToClipboard(textToCopy);
        }
    });

});
