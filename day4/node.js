const products = [
  { id: 1, name: "Product A", price: 10, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Product B", price: 20, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Product C", price: 30, image: "https://via.placeholder.com/150" },
];

let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

const productList = document.getElementById("productList");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const clearCartBtn = document.getElementById("clearCartBtn");

function renderProducts() {
  productList.innerHTML = "";
  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "card card-bordered p-2 flex flex-col";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="w-full rounded mb-2" />
      <h4 class="font-semibold">${p.name}</h4>
      <p>$${p.price.toFixed(2)}</p>
      <button class="btn btn-primary btn-sm mt-auto" data-id="${p.id}">Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}

function saveCart() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return;
    total += product.price * item.qty;
    const li = document.createElement("li");
    li.className = "flex justify-between items-center";
    li.innerHTML = `
      <div>
        ${product.name} x${item.qty}
      </div>
      <div class="space-x-2">
        <button class="btn btn-xs btn-outline" data-action="dec" data-id="${item.id}">-</button>
        <button class="btn btn-xs btn-outline" data-action="inc" data-id="${item.id}">+</button>
        <button class="btn btn-xs btn-error" data-action="remove" data-id="${item.id}">x</button>
      </div>
    `;
    cartItems.appendChild(li);
  });
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

productList.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON" && e.target.dataset.id) {
    const id = parseInt(e.target.dataset.id);
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ id, qty: 1 });
    }
    saveCart();
    renderCart();
  }
});

cartItems.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    const id = parseInt(e.target.dataset.id);
    const action = e.target.dataset.action;
    const itemIndex = cart.findIndex(i => i.id === id);
    if (itemIndex < 0) return;

    if (action === "inc") {
      cart[itemIndex].qty++;
    } else if (action === "dec") {
      cart[itemIndex].qty--;
      if (cart[itemIndex].qty <= 0) {
        cart.splice(itemIndex, 1);
      }
    } else if (action === "remove") {
      cart.splice(itemIndex, 1);
    }
    saveCart();
    renderCart();
  }
});

clearCartBtn.addEventListener("click", () => {
  cart = [];
  saveCart();
  renderCart();
});

renderProducts();
renderCart();
