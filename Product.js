// the below functions helps me keep a global variable to maintain cart logic, thankyou
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

let cartCounter = 1;

function Product(id, name,category,fabricType,gender,colour,size, price, description, imageUrl) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.fabricType = fabricType;
    this.gender = gender;
    this.colour = colour;
    this.size = size;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
}

//for init load of existing qty
function initCartQuantity(product) {
    let cart = getCart();
    let existing = cart.find(item => item.id === product.id);
    if (existing) {
        cartCounter = existing.quantity;
        document.getElementById("add-to-cart").style.backgroundColor = "green";
        updateCartButton(product);  // Render buttons if already in cart
    }
    updateCartCount();  // Show/hide badge
}

//when you make a change the number changes
function updateCartCount() {
    let cart = getCart();
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    let countEl = document.getElementById("cart-count");
    if (countEl) {
        if (totalItems > 0) {
            // show plain number on the navbar badge (no "(x items)")
            countEl.textContent = `${totalItems}`;
            countEl.classList.remove('hidden');
        } else {
            countEl.textContent = '';
            countEl.classList.add('hidden');
        }
    }
}

// Function to display product details on the product page
function displayProduct(product) {
    document.getElementById("product-name").innerText = product.name;
    document.getElementById("product-price").innerText = "$" + product.price;
    document.getElementById("product-image").src = product.imageUrl;

    document.getElementById("description-content").innerText = product.description;

    document.getElementById("specs-category").innerText = "Type of clothing : "+product.category;
    document.getElementById("specs-gender").innerText = "Gender : "+product.gender;
    document.getElementById("specs-colour").innerText = "Colour and Pattern : "+product.colour;
    document.getElementById("specs-fabric-type").innerText = "Fabric Type : "+product.fabricType;
    document.getElementById("specs-size").innerText = "Sizes available : "+product.size;
}





function addToCart(product){
    const addBtn = document.getElementById("add-to-cart");
    // replace addEventListener with onclick so we don't stack handlers
    addBtn.onclick = function(e) {
        e.preventDefault();
        document.getElementById("add-to-cart").style.backgroundColor = "green";
        let cart = getCart();
        let existing = cart.find(item => item.id === product.id);
        cartCounter = existing ? existing.quantity + 1 : 1;
        if (existing) {
            existing.quantity = cartCounter;
        } else {
            cart.push({...product, quantity: cartCounter});
        }
        saveCart(cart);
        updateCartButton(product);
        updateCartCount();
    };
}

function updateCartButton(product){
    const addBtn = document.getElementById("add-to-cart");
    addBtn.innerHTML = `
        <button id="minus" class = "px-4 ">-</button>
        <span>${cartCounter}</span>
        <button id="plus" class = "px-4">+</button>
    `;
    addBtn.onclick = function(e) {
        if (e.target.id === 'plus') {
            cartCounter++;
            let cart = getCart();
            let existing = cart.find(item => item.id === product.id);
            if (existing) {
                existing.quantity = cartCounter;
            } else {
                cart.push({...product, quantity: cartCounter});
            }
            saveCart(cart);
            updateCartCount();
            updateCartButton(product);  // firse render karo
        } else if (e.target.id === 'minus') {
            if (cartCounter >= 1){
                cartCounter--;
                let cart = getCart();
                let existing = cart.find(item => item.id === product.id);
                if (existing) {
                    existing.quantity = cartCounter;
                    if (cartCounter === 0) {
                        cart = cart.filter(item => item.id !== product.id);
                        saveCart(cart);
                        updateCartCount();

                        // hmmmmmm
                        addBtn.innerHTML = "Add to Cart";
                        addBtn.className =
                            "bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded cursor-pointer inline-flex items-center justify-center";

                        // restore click
                        addToCart(product);

                        return;
                    }
                }
                saveCart(cart);
                updateCartCount();
                updateCartButton(product);  // render again
            }
        }
    };
}

// Example usage
var cardigan = new Product(1, "Cozy Cardigan","Sweater", "Wool Blend", "Female", "Blue with daisy patterns", "S, M, L, XL", 5999, "A warm and stylish wool blend cardigan perfect for chilly days.", "Products/cardigan.png");

displayProduct(cardigan);
addToCart(cardigan);
