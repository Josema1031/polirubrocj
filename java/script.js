document.addEventListener('DOMContentLoaded', function() {
    const cart = {};

    function updateCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');
        cartItemsContainer.innerHTML = '';
        let total = 0;

        // Recorre los elementos del carrito y actualiza el DOM
        for (const productId in cart) {
            if (cart.hasOwnProperty(productId)) {
                const item = cart[productId];
                const listItem = document.createElement('li');
                listItem.textContent = `${item.name} - Cantidad: ${item.quantity} - Precio: $${item.price * item.quantity}`;
                cartItemsContainer.appendChild(listItem);
                total += item.price * item.quantity;
            }
        }

        cartTotalElement.textContent = `Total: $${total}`;
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.card');
            const productId = button.getAttribute('data-product-id');
            const productName = card.querySelector('h3').textContent;
            const productPriceText = card.querySelector('p:nth-of-type(3)').textContent;
            const productPrice = parseFloat(productPriceText.replace('Precio: $', ''));
            const quantity = parseInt(card.querySelector('input[type="number"]').value, 10);

            // Si el producto no está en el carrito, se agrega
            if (!cart[productId]) {
                cart[productId] = { name: productName, price: productPrice, quantity: 0 };
            }

            // Actualiza la cantidad del producto en el carrito
            cart[productId].quantity += quantity;

            console.log(`Producto ${productName} añadido al carrito. Cantidad total: ${cart[productId].quantity}`);
            alert(`Producto añadido al carrito. Cantidad total: ${cart[productId].quantity}`);
            updateCart();
        });
    });

    document.getElementById('checkout').addEventListener('click', () => {
        let message = 'Hola, me gustaría hacer el siguiente pedido:\n\n';
        let total = 0;

        // Recorre los productos en el carrito y genera el mensaje de WhatsApp
        for (const productId in cart) {
            if (cart.hasOwnProperty(productId)) {
                const item = cart[productId];
                message += `${item.name} 
                Cantidad: ${item.quantity}
                 Precio: $${item.price * item.quantity}\n`;
                total += item.price * item.quantity;
            }
        }

        message += `\nTotal: $${total}`;
        
        const phoneNumber = '5493855341878'; // Reemplaza con tu número de WhatsApp en formato internacional
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
    });
});
