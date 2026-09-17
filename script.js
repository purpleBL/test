// Data
const products = [
    { id: 1, name: "Smartphone X", price: 999, icon: "📱", desc: "Флагманский смартфон с AI-камерой" },
    { id: 2, name: "Laptop Pro", price: 2499, icon: "💻", desc: "Мощный ноутбук для профессионалов" },
    { id: 3, name: "Headphones Z", price: 299, icon: "🎧", desc: "Шумоподавление и Hi-Fi звук" },
    { id: 4, name: "Smart Watch", price: 399, icon: "⌚", desc: "Фитнес-трекер и уведомления" },
    { id: 5, name: "Camera 4K", price: 1299, icon: "📷", desc: "Профессиональная съемка видео" },
    { id: 6, name: "Tablet Air", price: 799, icon: "📟", desc: "Легкий планшет для работы и игр" }
];

let cart = [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const checkoutBtn = document.getElementById('checkoutBtn');
const toast = document.getElementById('toast');

// Render Products
function renderProducts() {
    productsGrid.innerHTML = '';
    products.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <div class="product-image">${product.icon}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.desc}</p>
                <div class="price-row">
                    <span class="price">$${product.price}</span>
                    <button class="add-btn" onclick="addToCart(${product.id})">В корзину</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// Add to Cart
window.addToCart = (id) => {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
    showToast();
};

// Remove from Cart
window.removeFromCart = (index) => {
    cart.splice(index, 1);
    updateCart();
};

// Update Cart UI
function updateCart() {
    // Update count badge
    if (cart.length > 0) {
        cartCount.textContent = cart.length;
        cartCount.classList.add('active');
    } else {
        cartCount.classList.remove('active');
    }

    // Update items list
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Ваша корзина пуста</div>';
    } else {
        cartItems.innerHTML = '';
        cart.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <div class="item-details">
                    <h4>${item.icon} ${item.name}</h4>
                    <span>$${item.price}</span>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            `;
            cartItems.appendChild(itemEl);
        });
    }

    // Update total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = `$${total}`;
}

// Show Toast Notification
function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// Modal Controls
cartBtn.addEventListener('click', () => {
    cartModal.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
    }
});

// Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    alert(`Спасибо за заказ на сумму $${cart.reduce((sum, item) => sum + item.price, 0)}!`);
    cart = [];
    updateCart();
    cartModal.classList.remove('active');
});

// Initialize
renderProducts();
updateCart();
