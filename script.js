// Данные товаров
const products = [
    { id: 1, name: "Смартфон X", price: 29990, image: "https://via.placeholder.com/250x150?text=Smartphone" },
    { id: 2, name: "Ноутбук Pro", price: 89990, image: "https://via.placeholder.com/250x150?text=Laptop" },
    { id: 3, name: "Наушники Wireless", price: 4990, image: "https://via.placeholder.com/250x150?text=Headphones" },
    { id: 4, name: "Планшет Mini", price: 19990, image: "https://via.placeholder.com/250x150?text=Tablet" },
    { id: 5, name: "Умные часы", price: 12990, image: "https://via.placeholder.com/250x150?text=Watch" },
    { id: 6, name: "Камера 4K", price: 45990, image: "https://via.placeholder.com/250x150?text=Camera" }
];

// Состояние корзины
let cart = [];

// Инициализация магазина
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupCartModal();
});

// Отрисовка товаров
function renderProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">${product.price.toLocaleString()} ₽</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">В корзину</button>
        `;
        grid.appendChild(card);
    });
}

// Добавление в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartInfo();
    alert(`${product.name} добавлен в корзину!`);
}

// Обновление информации о корзине
function updateCartInfo() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    document.getElementById('cart-count').textContent = totalCount;
    document.getElementById('cart-total').textContent = totalPrice.toLocaleString();
}

// Настройка модального окна корзины
function setupCartModal() {
    const modal = document.getElementById('cart-modal');
    const btn = document.getElementById('cart-btn');
    const close = document.querySelector('.close');
    
    btn.onclick = () => {
        modal.style.display = 'block';
        renderCartItems();
    };
    
    close.onclick = () => {
        modal.style.display = 'none';
    };
    
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// Отрисовка элементов корзины
function renderCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalElement = document.getElementById('cart-modal-total');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Корзина пуста</p>';
        totalElement.textContent = '0';
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <span class="cart-item-title">${item.name} x${item.quantity}</span>
            <span class="cart-item-price">${itemTotal.toLocaleString()} ₽</span>
            <button class="remove-item" onclick="removeFromCart(${index})">✕</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
    
    totalElement.textContent = total.toLocaleString();
}

// Удаление из корзины
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartInfo();
    renderCartItems();
}

// Оформление заказа
function checkout() {
    if (cart.length === 0) {
        alert('Корзина пуста!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Заказ оформлен!\nСумма: ${total.toLocaleString()} ₽\nМенеджер свяжется с вами.`);
    
    cart = [];
    updateCartInfo();
    document.getElementById('cart-modal').style.display = 'none';
}
