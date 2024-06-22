document.addEventListener('DOMContentLoaded', function() {
    const cart = {};

    function updateCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');
        cartItemsContainer.innerHTML = '';
        let total = 0;

        for (const productId in cart) {
            if (cart.hasOwnProperty(productId)) {
                const item = cart[productId];
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    ${item.name} - Cantidad: 
                    <input type="number" class="quantity-input" data-product-id="${productId}" value="${item.quantity}" min="1">
                    - Precio: $${item.price * item.quantity}
                    <button class="remove-from-cart" data-product-id="${productId}">Eliminar</button>
                `;
                cartItemsContainer.appendChild(listItem);
                total += item.price * item.quantity;
            }
        }

        cartTotalElement.textContent = `Total: $${total}`;

        // Añadir evento a los botones de eliminar
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-product-id');
                delete cart[productId];
                updateCart();
                alert('Producto eliminado del carrito.');
            });
        });
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.card');
            const productId = button.getAttribute('data-product-id');
            const productName = card.querySelector('h3').textContent;
            const productPriceText = card.querySelector('p:nth-of-type(3)').textContent;
            const productPrice = parseFloat(productPriceText.replace('Precio: $', ''));
            const quantity = parseInt(card.querySelector('input[type="number"]').value, 10);

            if (!cart[productId]) {
                cart[productId] = { name: productName, price: productPrice, quantity: 0 };
            }

            cart[productId].quantity += quantity;

            console.log(`Producto ${productName} añadido al carrito. Cantidad total: ${cart[productId].quantity}`);
            alert(`Producto añadido al carrito. Cantidad total: ${cart[productId].quantity}`);
            updateCart();
        });
    });

    document.getElementById('checkout').addEventListener('click', () => {
        let message = 'Hola Carla, me gustaría hacer el siguiente pedido:\n\n';
        let total = 0;

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

    document.getElementById('cancel').addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres cancelar la compra?')) {
            for (const productId in cart) {
                if (cart.hasOwnProperty(productId)) {
                    delete cart[productId];
                }
            }
            updateCart();
            alert('Compra cancelada.');
        }
    });

    document.getElementById('modify').addEventListener('click', () => {
        document.querySelectorAll('.quantity-input').forEach(input => {
            const productId = input.getAttribute('data-product-id');
            const newQuantity = parseInt(input.value, 10);

            if (cart[productId]) {
                cart[productId].quantity = newQuantity;
            }
        });
        updateCart();
        alert('Carrito actualizado.');
    });

    document.getElementById('complaint').addEventListener('click', () => {
        const complaintMessage = 'Hola, me gustaría hacer un reclamo:\n\n';
        const phoneNumber = '5493855341878'; // Reemplaza con tu número de WhatsApp en formato internacional
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(complaintMessage)}`;
        
        window.open(whatsappUrl, '_blank');
    });
});
