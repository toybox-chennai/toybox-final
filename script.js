const products = [
  { id: 1, name: "Street Racer", category: "sports", price: 299 },
  { id: 2, name: "Turbo GT", category: "sports", price: 399 },
  { id: 3, name: "Classic Mini", category: "classic", price: 249 },
  { id: 4, name: "Desert Runner", category: "offroad", price: 449 },
  { id: 5, name: "City Cruiser", category: "classic", price: 279 },
  { id: 6, name: "Track Beast", category: "sports", price: 499 },
  { id: 7, name: "Mud Monster", category: "offroad", price: 549 },
  { id: 8, name: "Retro Coupe", category: "classic", price: 329 }
];

let cart = JSON.parse(localStorage.getItem("toysho-cart") || "[]");

const productsEl = document.getElementById("products");
const searchEl = document.getElementById("search");
const categoryEl = document.getElementById("category");
const cartEl = document.getElementById("cart");
const overlayEl = document.getElementById("overlay");
const cartItemsEl = document.getElementById("cartItems");
const cartCountEl = document.getElementById("cartCount");
const cartTotalEl = document.getElementById("cartTotal");

const money = n => `₹${n.toLocaleString("en-IN")}`;

function renderProducts() {
  const q = searchEl.value.trim().toLowerCase();
  const category = categoryEl.value;
  const filtered = products.filter(p =>
    (category === "all" || p.category === category) &&
    p.name.toLowerCase().includes(q)
  );

  productsEl.innerHTML = filtered.length ? filtered.map(p => `
    <article class="product">
      <div class="product-image"></div>
      <div class="product-info">
        <div class="tag">${p.category}</div>
        <h3>${p.name}</h3>
        <div class="price-row">
          <span class="price">${money(p.price)}</span>
          <button class="add" onclick="addToCart(${p.id})">Add +</button>
        </div>
      </div>
    </article>
  `).join("") : `<p>No cars found.</p>`;
}

function saveCart() {
  localStorage.setItem("toysho-cart", JSON.stringify(cart));
}

function addToCart(id) {
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty++;
  else cart.push({ id, qty: 1 });
  saveCart();
  renderCart();
  openCart();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
}

function renderCart() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  const total = cart.reduce((sum, i) => {
    const p = products.find(p => p.id === i.id);
    return sum + p.price * i.qty;
  }, 0);

  cartCountEl.textContent = count;
  cartTotalEl.textContent = money(total);

  if (!cart.length) {
    cartItemsEl.innerHTML = `<div class="empty">Your cart is empty.<br><br>Go pick a ride.</div>`;
    return;
  }

  cartItemsEl.innerHTML = cart.map(i => {
    const p = products.find(p => p.id === i.id);
    return `
      <div class="cart-item">
        <div class="cart-thumb"></div>
        <div>
          <h4>${p.name}</h4>
          <p>${money(p.price)} each</p>
          <div class="qty">
            <button onclick="changeQty(${p.id}, -1)">−</button>
            <strong>${i.qty}</strong>
            <button onclick="changeQty(${p.id}, 1)">+</button>
          </div>
        </div>
        <button class="remove" onclick="changeQty(${p.id}, -${i.qty})">Remove</button>
      </div>
    `;
  }).join("");
}

function openCart() {
  cartEl.classList.add("open");
  overlayEl.classList.add("open");
}
function closeCart() {
  cartEl.classList.remove("open");
  overlayEl.classList.remove("open");
}

document.getElementById("openCart").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
overlayEl.addEventListener("click", closeCart);
searchEl.addEventListener("input", renderProducts);
categoryEl.addEventListener("change", renderProducts);

document.getElementById("checkout").addEventListener("click", () => {
  if (!cart.length) return alert("Your cart is empty.");
  // CHANGE THIS NUMBER BEFORE LAUNCHING. Include country code, no + or spaces.
  const WHATSAPP_NUMBER = "8610566050";

  const lines = cart.map(i => {
    const p = products.find(p => p.id === i.id);
    return `• ${p.name} x${i.qty} — ${money(p.price * i.qty)}`;
  });
  const total = cart.reduce((sum, i) => {
    const p = products.find(p => p.id === i.id);
    return sum + p.price * i.qty;
  }, 0);

  const message = `Hi Toysho! I want to order:%0A%0A${encodeURIComponent(lines.join("\n"))}%0A%0A*Total: ${money(total)}*%0A%0AName:%0AAddress:%0APhone:`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
});

renderProducts();
renderCart();
