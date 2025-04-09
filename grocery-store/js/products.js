// Initialize product sections
document.addEventListener('DOMContentLoaded', () => {
    // Populate Fruits Section
    const fruitsScroll = document.querySelector('#fruits-scroll');
    console.log(fruitsScroll);
    if (fruitsScroll) {
        fruitsScroll.innerHTML = fruitProducts.map(product => createProductCard(product)).join('');
    }

    // Populate Vegetables Section
    const vegetablesScroll = document.querySelector('#vegetables-scroll');
    if (vegetablesScroll) {
        vegetablesScroll.innerHTML = vegetableProducts.map(product => createProductCard(product)).join('');
    }

    // Populate Snacks Section
    const snacksScroll = document.querySelector('#snacks-scroll');
    if (snacksScroll) {
        snacksScroll.innerHTML = snackProducts.map(product => createProductCard(product)).join('');
    }

    // Populate Dairy Section
    const dairyScroll = document.querySelector('#dairy-scroll');
    if (dairyScroll) {
        dairyScroll.innerHTML = dairyProducts.map(product => createProductCard(product)).join('');
    }

    // Initialize scrolling for all sections
    initializeScrolling();
});

function createProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="delivery-time">
                <i class="bi bi-clock"></i> 10 mins
            </div>
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="weight">${product.weight}</p>
            <div class="price-row">
                <span class="price">₹${product.price}</span>
                <button class="add-btn"><i class="bi bi-plus"></i></button>
                    </div>
                </div>
            `;
}

function initializeScrolling() {
    const productSections = document.querySelectorAll('.products-section');
    
    productSections.forEach(section => {
        const scrollContainer = section.querySelector('.products-scroll');
        const scrollLeftBtn = section.querySelector('.scroll-left');
        const scrollRightBtn = section.querySelector('.scroll-right');
        
        if (scrollContainer && scrollLeftBtn && scrollRightBtn) {
            const scrollAmount = 420; // Width of two cards plus gap
            
            // Initially hide left button and show right button if there's content to scroll
            scrollLeftBtn.style.display = 'none';
            scrollRightBtn.style.display = scrollContainer.scrollWidth > scrollContainer.clientWidth ? 'flex' : 'none';
            
            scrollLeftBtn.addEventListener('click', () => {
                const currentTranslate = getTranslateX(scrollContainer);
                scrollContainer.style.transform = `translateX(${Math.min(0, currentTranslate + scrollAmount)}px)`;
                updateScrollButtons(scrollContainer, scrollLeftBtn, scrollRightBtn);
            });
            
            scrollRightBtn.addEventListener('click', () => {
                const currentTranslate = getTranslateX(scrollContainer);
                const maxScroll = -(scrollContainer.scrollWidth - scrollContainer.clientWidth);
                scrollContainer.style.transform = `translateX(${Math.max(maxScroll, currentTranslate - scrollAmount)}px)`;
                updateScrollButtons(scrollContainer, scrollLeftBtn, scrollRightBtn);
            });
        }
    });
}

function getTranslateX(element) {
    const style = window.getComputedStyle(element);
    const matrix = new WebKitCSSMatrix(style.transform);
    return matrix.m41;
}

function updateScrollButtons(container, leftBtn, rightBtn) {
    const currentTranslate = getTranslateX(container);
    const maxScroll = -(container.scrollWidth - container.clientWidth);
    
    leftBtn.style.display = currentTranslate < 0 ? 'flex' : 'none';
    rightBtn.style.display = currentTranslate > maxScroll ? 'flex' : 'none';
}

//Add to cart functionality for product cards
document.addEventListener('click', (e) => {
    if (e.target.closest('.add-btn')) {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        // const productDiv = document.getElementById("product_card");
        const productId = productCard.getAttribute("data-id");
        console.log(productId);
        addToCart(productId);
        // Show notification
                const notification = document.createElement('div');
                notification.className = 'position-fixed bottom-0 end-0 p-3';
                notification.style.zIndex = '11';
                notification.innerHTML = `
                    <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                        <div class="toast-header">
                            <strong class="me-auto">Added to Cart</strong>
                            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div class="toast-body">
                    ${productName} has been added to your cart.
                        </div>
                    </div>
                `;
                document.body.appendChild(notification);
                
                // Remove notification after 3 seconds
                setTimeout(() => {
                    notification.remove();
                }, 3000);
    }
})