// Данные товаров
const products = [
    {
        id: 1,
        name: "NeonPhone X",
        price: 79990,
        description: "Флагманский смартфон с AI-камерой",
        emoji: "📱"
    },
    {
        id: 2,
        name: "ProBook Air",
        price: 129990,
        description: "Ультратонкий ноутбук для профессионалов",
        emoji: "💻"
    },
    {
        id: 3,
        name: "SoundBuds Pro",
        price: 24990,
        description: "Наушники с активным шумоподавлением",
        emoji: "🎧"
    },
    {
        id: 4,
        name: "SmartWatch Ultra",
        price: 54990,
        description: "Часы с мониторингом здоровья 24/7",
        emoji: "⌚"
    },
    {
        id: 5,
        name: "Vision VR Headset",
        price: 89990,
        description: "Погружение в виртуальную реальность",
        emoji: "🥽"
    },
    {
        id: 6,
        name: "GamePad Elite",
        price: 12990,
        description: "Контроллер для киберспорта",
        emoji: "🎮"
    }
];

let cart = [];

// DOM элементы
const productGrid = document.getElementById('productGrid');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const cartItemsContainer = document.getElementById('cartItems');
const openCartBtn = document.getElementById('openCart');
const closeCartBtn = document.getElementById('closeCart');
const cartModal = document.getElementById('cartModal');
const checkoutBtn = document.getElementById('checkoutBtn');
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');

// Инициализация
function init() {
    renderProducts();
    updateCart();
    setupEventListeners();
}

// Рендеринг товаров
function renderProducts() {
    productGrid.innerHTML = '';
    products.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-footer">
                    <span class="price">${formatPrice(product.price)}</span>
                    <button class="btn-add" onclick="addToCart(${product.id})">В корзину</button>
                </div>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// Форматирование цены
function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
}

// Добавление в корзину
window.addToCart = function(id) {
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCart();
    showToast(`"${product.name}" добавлен`);
};

// Удаление из корзины
window.removeFromCart = function(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
};

// Обновление корзины
function updateCart() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalCount;
    cartTotal.textContent = formatPrice(totalPrice);
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-state">Корзина пуста 😔</div>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div style="font-size: 2rem; margin-right: 15px;">${item.emoji}</div>
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <span>${item.quantity} × ${formatPrice(item.price)}</span>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">&times;</button>
            </div>
        `).join('');
    }
}

// Показ уведомления
function showToast(message) {
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// Обработчики событий
function setupEventListeners() {
    openCartBtn.addEventListener('click', () => {
        cartModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeCartBtn.addEventListener('click', closeModal);
    
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            closeModal();
        }
    });
    
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showToast('Корзина пуста!');
            return;
        }
        alert('Спасибо за заказ! Менеджер свяжется с вами.');
        cart = [];
        updateCart();
        closeModal();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cartModal.classList.contains('active')) {
            closeModal();
        }
    });
}

function closeModal() {
    cartModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Запуск
init();
