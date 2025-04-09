// Sample product data
const fruitProducts = [
    {
        id: 'fruit1',
        name: 'Fresh Strawberries',
        price: 89,
        image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=500',
        weight: '250g'
    },
    {
        id: 'fruit2',
        name: 'Fresh Oranges',
        price: 79,
        image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=500',
        weight: '1kg'
    },
    {
        id: 'fruit3',
        name: 'Fresh Apples',
        price: 149,
        image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500',
        weight: '4 pcs'
    },
    {
        id: 'fruit4',
        name: 'Fresh Bananas',
        price: 49,
        image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=500',
        weight: '6 pcs'
    },
    {
        id: 'fruit5',
        name: 'Fresh Mangoes',
        price: 199,
        image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=500',
        weight: '1kg'
    }
];

const vegetableProducts = [
    {
        id: 'veg1',
        name: 'Fresh Broccoli',
        price: 49,
        image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=500',
        weight: '500g'
    },
    {
        id: 'veg2',
        name: 'Fresh Carrots',
        price: 39,
        image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500',
        weight: '500g'
    },
    {
        id: 'veg3',
        name: 'Fresh Tomatoes',
        price: 29,
        image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=500',
        weight: '500g'
    },
    {
        id: 'veg4',
        name: 'Fresh Potatoes',
        price: 59,
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500',
        weight: '1kg'
    },
    {
        id: 'veg5',
        name: 'Fresh Spinach',
        price: 35,
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500',
        weight: '250g'
    },
    {
        id: 'veg6',
        name: 'Fresh Cauliflower',
        price: 45,
        image: 'https://images.unsplash.com/photo-1613743983303-b3e89f8a2b80?w=500',
        weight: '1 pc'
    }
];

const snackProducts = [
    {
        id: 'snack1',
        name: 'Potato Chips',
        price: 30,
        image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500',
        weight: '100g'
    },
    {
        id: 'snack2',
        name: 'Mixed Nuts',
        price: 199,
        image: 'https://images.unsplash.com/photo-1536591375672-d2f5c6e30e6a?w=500',
        weight: '250g'
    },
    {
        id: 'snack3',
        name: 'Chocolate Cookies',
        price: 49,
        image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500',
        weight: '200g'
    },
    {
        id: 'snack4',
        name: 'Popcorn',
        price: 39,
        image: 'https://images.unsplash.com/photo-1578849278002-014ad8100da5?w=500',
        weight: '150g'
    },
    {
        id: 'snack5',
        name: 'Trail Mix',
        price: 159,
        image: 'https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?w=500',
        weight: '200g'
    }
];

const dairyProducts = [
    {
        id: 'dairy1',
        name: 'Fresh Milk',
        price: 60,
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500',
        weight: '1L'
    },
    {
        id: 'dairy2',
        name: 'Greek Yogurt',
        price: 45,
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500',
        weight: '400g'
    },
    {
        id: 'dairy3',
        name: 'Cheese Block',
        price: 129,
        image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=500',
        weight: '200g'
    },
    {
        id: 'dairy4',
        name: 'Butter',
        price: 89,
        image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500',
        weight: '500g'
    },
    {
        id: 'dairy5',
        name: 'Fresh Cream',
        price: 75,
        image: 'https://images.unsplash.com/photo-1563599175592-c58dc214deff?w=500',
        weight: '200ml'
    }
];

// Initialize product sections
document.addEventListener('DOMContentLoaded', () => {
    // Populate Fruits Section
    const fruitsScroll = document.querySelector('#fruits-scroll');
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

// Add to cart functionality for product cards
document.addEventListener('click', (e) => {
    if (e.target.closest('.add-btn')) {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        
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
});