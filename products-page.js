const grid = document.getElementById("productGrid");
const priceSlider = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const categoryButtons = document.querySelectorAll(".filter-category");

//page type
const pageType = document.body.dataset.page;

//stars thingy
function generateStars() {
  const count = Math.floor(Math.random() * 2) + 4; // 4–5 stars
  return "★".repeat(count) + "☆".repeat(5 - count);
}

//product rendering
function renderProducts(list) {
  grid.innerHTML = "";

  list.forEach(p => {
    const finalPrice = p.discount
      ? Math.round(p.price * (1 - p.discount / 100))
      : p.price;

    grid.innerHTML += `
      <a href="product-page.html?id=${p.id}"
         class="relative bg-[#242424] p-6 rounded-2xl shadow-lg
                hover:scale-[1.03] transition-transform duration-300 block">

        ${p.isNew ? `
          <span class="absolute top-4 right-4 bg-emerald-500 text-black
                       text-xs px-3 py-1 rounded-full font-semibold">
            NEW
          </span>` : ""}

        ${p.discount ? `
          <span class="absolute top-4 left-4 bg-rose-500 text-black
                       text-xs px-3 py-1 rounded-full font-semibold">
            ${p.discount}% OFF
          </span>` : ""}

        <img src="${p.image}"
             alt="${p.name}"
             class="w-full h-64 object-cover rounded-xl mb-5">

        <h3 class="text-xl font-semibold tracking-wide">${p.name}</h3>
        <p class="text-gray-400 text-sm mt-1">${p.subtitle}</p>

        <p class="mt-3 text-lg font-medium">
          ₹${finalPrice}
          ${p.discount ? `
            <span class="line-through text-gray-500 text-sm ml-2">
              ₹${p.price}
            </span>` : ""}
        </p>

        <div class="mt-3 text-yellow-400 text-sm tracking-wide">
          ${generateStars()}
        </div>

        <!-- Buttons (visual only here) -->
        <div class="mt-5 flex gap-3 pointer-events-none">
          <button
            class="flex-1 py-2 rounded-full text-sm font-semibold
                   bg-white text-black">
            Buy Now
          </button>

          <button
            class="flex-1 py-2 rounded-full text-sm font-semibold
                   border border-white/30 text-white">
            Add to Cart
          </button>
        </div>

      </a>
    `;
  });
}

//initial page filter
let pageProducts = products;

if (pageType === "new") {
  pageProducts = products.filter(p => p.isNew);
}

if (pageType === "deals") {
  pageProducts = products.filter(p => p.discount > 0);
}

//url of category filter
const params = new URLSearchParams(window.location.search);
const urlCategory = params.get("category");

if (urlCategory) {
  pageProducts = pageProducts.filter(
    p => p.category === urlCategory
  );
}

//initial render
renderProducts(pageProducts);

// category list
categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;

    if (category === "all") {
      renderProducts(pageProducts);
    } else {
      renderProducts(
        pageProducts.filter(p => p.category === category)
      );
    }
  });
});

//price filter slider
priceSlider.addEventListener("input", () => {
  const maxPrice = priceSlider.value;
  priceValue.textContent = `₹${maxPrice}`;

  renderProducts(
    pageProducts.filter(p => {
      const effectivePrice = p.discount
        ? Math.round(p.price * (1 - p.discount / 100))
        : p.price;

      return effectivePrice <= maxPrice;
    })
  );
});

const searchInput = document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();

    renderProducts(
      pageProducts.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.subtitle.toLowerCase().includes(query)
      )
    );
  });
}