// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || {};

// Add to cart
function addToCart(productId) {
    if (!currentUser) return;
    
    const userId = currentUser.id;
    
    // Initialize user's cart if not exists
    if (!cart[userId]) {
        cart[userId] = [];
    }
    
    // Check if product already in cart
    const existingItem = cart[userId].find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart[userId].push({
            productId,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Update cart count display
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount && currentUser) {
        const userCart = cart[currentUser.id] || [];
        const totalItems = userCart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Update cart display in modal
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTax = document.getElementById('cartTax');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (!currentUser) return;
    
    const userCart = cart[currentUser.id] || [];
    
    if (userCart.length === 0) {
        emptyCartMessage.classList.remove('d-none');
        emptyCartMessage.textContent = 'No product added';
        cartItemsContainer.innerHTML = 'No product added';
        checkoutBtn.disabled = true;
    } else {
        emptyCartMessage.classList.add('d-none');
        
        let itemsHTML = '';
        let subtotal = 0;
        
        userCart.forEach(item => {
            const product = products.find(p => p.id === item.productId);
            if (product) {
                const itemTotal = product.price * item.quantity;
                subtotal += itemTotal;
                
                itemsHTML += `
                    <div class="cart-item">
                        <div class="d-flex justify-content-between">
                            <div class="d-flex">
                                <img src="${product.image}" alt="${product.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px;">
                                <div class="ms-3">
                                    <h6 class="mb-1">${product.name}</h6>
                                    <small class="text-muted">₹${product.price.toFixed(2)} each</small>
                                </div>
                            </div>
                            <div class="d-flex align-items-center">
                                <div class="input-group input-group-sm" style="width: 100px;">
                                    <button class="btn btn-outline-secondary decrease-quantity" type="button" data-id="${product.id}">-</button>
                                    <input type="text" class="form-control text-center quantity-input" value="${item.quantity}" data-id="${product.id}" readonly>
                                    <button class="btn btn-outline-secondary increase-quantity" type="button" data-id="${product.id}">+</button>
                                </div>
                                <div class="ms-3" style="width: 80px; text-align: right;">
                                    <strong>₹${itemTotal.toFixed(2)}</strong>
                                </div>
                                <button class="btn btn-sm btn-outline-danger ms-2 remove-item" data-id="${product.id}">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }
        });
        
        cartItemsContainer.innerHTML = itemsHTML;
        
        // Calculate totals
        const tax = subtotal * 0.10; // 10% tax
        const total = subtotal + tax;
        
        cartSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
        cartTax.textContent = `₹${tax.toFixed(2)}`;
        cartTotal.textContent = `₹${total.toFixed(2)}`;
        checkoutBtn.disabled = false;
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.getAttribute('data-id');
                const item = cart[currentUser.id].find(item => item.productId === productId);
                if (item) {
                    item.quantity += 1;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartDisplay();
                    updateCartCount();
                }
            });
        });
        
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.getAttribute('data-id');
                const itemIndex = cart[currentUser.id].findIndex(item => item.productId === productId);
                if (itemIndex !== -1) {
                    if (cart[currentUser.id][itemIndex].quantity > 1) {
                        cart[currentUser.id][itemIndex].quantity -= 1; // Decrease quantity
                        localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
                        updateCartDisplay(); // Re-render cart display
                        updateCartCount(); // Update cart count
                    } else {
                        alert('Quantity cannot be less than 1'); // Notify the user
                    }
                }
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.getAttribute('data-id');
                const itemIndex = cart[currentUser.id].findIndex(item => item.productId === productId);
                if (itemIndex !== -1) {
                    cart[currentUser.id].splice(itemIndex, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartDisplay();
                    updateCartCount();
                }
            });
        });
    }
}

// Checkout
document.getElementById('checkoutBtn')?.addEventListener('click', () => {
    if (!currentUser) return;
    
    // Create order
    const orderId = 'order_' + Math.random().toString(36).substr(2, 9);
    const userCart = cart[currentUser.id] || [];
    const orderDate = new Date().toISOString();
    
    let subtotal = 0;
    const orderItems = [];
    
    userCart.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (product) {
            const itemTotal = product.price * item.quantity;
            subtotal += itemTotal;
            
            orderItems.push({
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity: item.quantity,
                total: itemTotal
            });
        }
    });
    
    const tax = subtotal * 0.10;
    const total = subtotal + tax;
    
    const order = {
        orderId,
        userId: currentUser.id,
        items: orderItems,
        subtotal,
        tax,
        total,
        date: orderDate,
        status: 'completed'
    };
    
    // Save order (in a real app, this would go to a database)
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart
    delete cart[currentUser.id];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show order success
    const orderDetails = document.getElementById('orderDetails');
    orderDetails.innerHTML = `
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Date:</strong> ${new Date(orderDate).toLocaleString()}</p>
        <p><strong>Total:</strong> ₹${total.toFixed(2)}</p>
        <h6 class="mt-3">Order Items:</h6>
        <ul class="list-group">
            ${orderItems.map(item => `
                <li class="list-group-item d-flex justify-content-between">
                    <span>${item.name} x ${item.quantity}</span>
                    <span>₹${item.total.toFixed(2)}</span>
                </li>
            `).join('')}
        </ul>
    `;
    
    const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    cartModal.hide();
    
    const orderSuccessModal = new bootstrap.Modal(document.getElementById('orderSuccessModal'));
    orderSuccessModal.show();
});

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});