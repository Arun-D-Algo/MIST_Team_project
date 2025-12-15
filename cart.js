// cart.js
function renderCart() {
  const cart = getCart();
  const wrap = document.getElementById("cart-items");
  const empty = document.getElementById("empty-cart");
  const summary = document.getElementById("cart-summary");
  const totalEl = document.getElementById("total-amount");

  wrap.innerHTML = "";

  if (!cart.length) {
    empty.classList.remove("hidden");
    summary.classList.add("hidden");
    return;
  }

  empty.classList.add("hidden");
  summary.classList.remove("hidden");

  let total = 0;

  cart.forEach((item, i) => {
    const sub = item.price * item.quantity;
    total += sub;

    const div = document.createElement("div");
    div.className =
      "flex items-center justify-between bg-[#242424] p-6 rounded-xl";

    div.innerHTML = `
      <div class="flex items-center gap-6">
        <img src="${item.image}" class="w-24 h-24 rounded-lg object-cover" />
        <div>
          <h3 class="text-lg font-semibold">${item.name}</h3>
          <p class="text-gray-400">₹${item.price}</p>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <button onclick="changeQty(${i}, -1)" class="px-3 py-1 bg-[#333] rounded">−</button>
        <span>${item.quantity}</span>
        <button onclick="changeQty(${i}, 1)" class="px-3 py-1 bg-[#333] rounded">+</button>
      </div>

      <p class="font-semibold">₹${sub}</p>
    `;

    wrap.appendChild(div);
  });

  totalEl.textContent = `₹${total}`;
  updateCartBadge();
}

function changeQty(i, delta) {
  const cart = getCart();
  cart[i].quantity += delta;

  if (cart[i].quantity <= 0) cart.splice(i, 1);

  saveCart(cart);
  renderCart();
}

document.addEventListener("DOMContentLoaded", renderCart);