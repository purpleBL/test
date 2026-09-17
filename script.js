const products = [
  {
    id: 1,
    name: "Neon Headphones",
    price: 299,
    emoji: "🎧",
    desc: "Беспроводные наушники с шумоподавлением и 40ч работы.",
    specs: ["Bluetooth 5.2", "ANC Active", "USB-C"],
  },
  {
    id: 2,
    name: "Cyber Watch",
    price: 199,
    emoji: "⌚",
    desc: "Умные часы с мониторингом здоровья и AMOLED экраном.",
    specs: ["Waterproof 5ATM", "GPS", "Heart Rate"],
  },
  {
    id: 3,
    name: "Pro Lens",
    price: 899,
    emoji: "📷",
    desc: "Профессиональный объектив для зеркальных камер.",
    specs: ["50mm f/1.8", "Auto Focus", "Glass Element"],
  },
  {
    id: 4,
    name: "Mech Keyboard",
    price: 149,
    emoji: "⌨️",
    desc: "Механическая клавиатура с RGB подсветкой.",
    specs: ["Cherry MX Blue", "RGB", "Aluminum Body"],
  },
  {
    id: 5,
    name: "VR Glass",
    price: 499,
    emoji: "🥽",
    desc: "Очки виртуальной реальности нового поколения.",
    specs: ["4K per eye", "120Hz", "Wireless"],
  },
  {
    id: 6,
    name: "Smart Home",
    price: 129,
    emoji: "🏠",
    desc: "Центр управления умным домом с голосовым помощником.",
    specs: ["Wi-Fi 6", "Zigbee", "Voice Control"],
  },
];

const grid = document.getElementById("productsGrid");
const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.querySelector(".close-cart");
const overlay = document.getElementById("overlay");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const cartCountEl = document.getElementById("cartCount");

// Modal Elements
const modal = document.getElementById("productModal");
const closeModal = document.querySelector(".close-modal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalDesc = document.getElementById("modalDesc");
const modalSpecs = document.getElementById("modalSpecs");
const modalAddBtn = document.getElementById("modalAddBtn");

let cart = [];
let currentProduct = null;

// Render Products
products.forEach((product) => {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
        <div class="card-img">${product.emoji}</div>
        <div class="card-info">
            <div class="card-title">${product.name}</div>
            <div class="card-price">$${product.price}</div>
        </div>
    `;
  card.addEventListener("click", () => openModal(product));
  grid.appendChild(card);
});

// Modal Logic
function openModal(product) {
  currentProduct = product;
  modalTitle.textContent = product.name;
  modalPrice.textContent = `$${product.price}`;
  modalDesc.textContent = product.desc;
  modalImg.textContent = product.emoji; // Using emoji as image for demo
  modalImg.style.fontSize = "8rem";

  modalSpecs.innerHTML = product.specs
    .map((spec) => `<li>${spec}</li>`)
    .join("");

  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModalFunc() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

closeModal.addEventListener("click", closeModalFunc);
overlay.addEventListener("click", () => {
  closeModalFunc();
  cartSidebar.classList.remove("active");
  overlay.classList.remove("active");
});

// Cart Logic
modalAddBtn.addEventListener("click", () => {
  if (currentProduct) {
    addToCart(currentProduct);
    closeModalFunc();
    openCart();
  }
});

function addToCart(product) {
  cart.push(product);
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";
    itemEl.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price}</p>
            </div>
            <div class="remove-item" onclick="removeFromCart(${index})">&times;</div>
        `;
    cartItemsContainer.appendChild(itemEl);
  });

  cartTotalEl.textContent = `$${total}`;
  cartCountEl.textContent = cart.length;
}

// Sidebar Logic
function openCart() {
  cartSidebar.classList.add("active");
  overlay.classList.add("active");
}

cartBtn.addEventListener("click", openCart);
closeCart.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
  overlay.classList.remove("active");
});

document.querySelector(".checkout-btn").addEventListener("click", () => {
  alert("Спасибо за заказ! (Это демо)");
  cart = [];
  updateCart();
  cartSidebar.classList.remove("active");
  overlay.classList.remove("active");
});
