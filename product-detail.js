// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"));

// Find product
const product = products.find(p => p.id === productId);

// Fallback
if (!product) {
  document.body.innerHTML = "<p class='text-center mt-40'>Product not found</p>";
  throw new Error("Invalid product ID");
}

// Helpers
function generateStars() {
  const count = Math.floor(Math.random() * 2) + 4;
  return "★".repeat(count) + "☆".repeat(5 - count);
}

const finalPrice = product.discount
  ? Math.round(product.price * (1 - product.discount / 100))
  : product.price;

// Populate UI
document.getElementById("productImage").src = product.image;
document.getElementById("productName").textContent = product.name;
document.getElementById("breadcrumbName").textContent = product.name;
document.getElementById("productSubtitle").textContent = product.subtitle;
document.getElementById("productRating").textContent = generateStars();
document.getElementById("productPrice").textContent = finalPrice;
document.getElementById("productDescription").textContent =
  product.subtitle + ". Crafted with attention to detail for everyday elegance.";

// Original price
if (product.discount) {
  const op = document.getElementById("originalPrice");
  op.textContent = product.price;
  op.classList.remove("hidden");
}

// Badges
const badges = document.getElementById("badges");

if (product.isNew) {
  badges.innerHTML += `
    <span class="bg-emerald-500 text-black px-3 py-1 text-xs rounded-full font-semibold">
      NEW
    </span>`;
}

if (product.discount) {
  badges.innerHTML += `
    <span class="bg-rose-500 text-black px-3 py-1 text-xs rounded-full font-semibold">
      ${product.discount}% OFF
    </span>`;
}

// ---------------- REVIEWS ----------------
let selectedStars = 0;

const stars = document.querySelectorAll("#reviewStars span");
const reviewText = document.getElementById("reviewText");
const submitReview = document.getElementById("submitReview");
const reviewsList = document.getElementById("reviewsList");

function updateStars(rating) {
  stars.forEach(star => {
    const starValue = parseInt(star.dataset.star);
    if (starValue <= rating) {
      star.classList.remove("text-gray-600");
      star.classList.add("text-yellow-400");
    } else {
      star.classList.remove("text-yellow-400");
      star.classList.add("text-gray-600");
    }
  });
}

// Click to select
stars.forEach(star => {
  star.addEventListener("click", () => {
    selectedStars = parseInt(star.dataset.star);
    updateStars(selectedStars);
  });

  // Optional hover preview (feels premium)
  star.addEventListener("mouseenter", () => {
    updateStars(parseInt(star.dataset.star));
  });

  star.addEventListener("mouseleave", () => {
    updateStars(selectedStars);
  });
});

// Submit review
submitReview.addEventListener("click", () => {
  if (!selectedStars || !reviewText.value.trim()) return;

  const review = document.createElement("div");
  review.className =
    "border border-white/10 rounded-xl p-5 bg-[#111111]";

  review.innerHTML = `
    <div class="text-yellow-400 mb-2">
      ${"★".repeat(selectedStars)}${"☆".repeat(5 - selectedStars)}
    </div>
    <p class="text-gray-300">${reviewText.value}</p>
  `;

  reviewsList.prepend(review);

  // Reset
  reviewText.value = "";
  selectedStars = 0;
  updateStars(0);
});

// ---------------- ADD TO CART ----------------
const addToCartBtn = document.getElementById("addToCart");

if (addToCartBtn) {
  addToCartBtn.addEventListener("click", () => {
    const cart = getCart();

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: finalPrice,
        image: product.image,
        quantity: 1
      });
    }

    saveCart(cart);
    updateCartBadge();
  });
}

// ---------------- BUY NOW ----------------
const buyNowBtn = document.getElementById("buyNow");

if (buyNowBtn) {
  buyNowBtn.addEventListener("click", () => {
    const cart = getCart();

    // Clear cart and add only this product
    cart.length = 0;
    cart.push({
      id: product.id,
      name: product.name,
      price: finalPrice,
      image: product.image,
      quantity: 1
    });

    saveCart(cart);
    updateCartBadge();

    window.location.href = "checkout.html";
  });
}