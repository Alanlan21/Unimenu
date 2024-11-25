function updateTotal() {
    const items = document.querySelectorAll('.cart-item');
    let subtotal = 0;

    items.forEach(item => {
        const quantity = parseInt(item.querySelector('.quantity-input').value);
        const price = parseFloat(item.getAttribute('data-price'));
        const totalItemPrice = quantity * price;
        subtotal += totalItemPrice;

        // Atualiza o preço total do item
        item.querySelector('.item-total').textContent = 'R$ ' + totalItemPrice.toFixed(2);
    });

    // Atualiza o subtotal e o total
    document.getElementById('subtotal').textContent = 'R$ ' + subtotal.toFixed(2);
    document.getElementById('total').textContent = 'R$ ' + subtotal.toFixed(2); // Inclui impostos ou taxas se necessário
}

document.addEventListener('DOMContentLoaded', () => {
    // Obtém os parâmetros da URL
    const urlParams = new URLSearchParams(window.location.search);
    const total = urlParams.get('total');

    // Converte o total para um número, removendo 'R$ ' e substituindo ',' por '.' para a conversão
    const totalValue = parseFloat(total.replace('R$', '').replace('.', '').replace(',', '.'));

    if (!isNaN(totalValue)) {
        // Atualiza o campo do total na página
        document.getElementById('total-display').textContent = 'R$ ' + totalValue.toFixed(2);
    } else {
        // Se totalValue não for um número, exibe uma mensagem de erro ou define um valor padrão
        document.getElementById('total-display').textContent = 'Erro ao carregar total';
    }
});
    // Adiciona evento de clique ao botão de pagamento
    const checkoutButton = document.querySelector('.custom-button');
    checkoutButton.addEventListener('click', function() {
        const total = document.getElementById('total').textContent;
        window.location.href = `index.html?total=${total}`;
    });
