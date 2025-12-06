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


let cartCounter = 1;

function addToCart(product){
    document.getElementById("add-to-cart").onclick = function(){
        document.getElementById("add-to-cart").style.backgroundColor = "green";
        updateCartButton(product);
        document.getElementById("cart-count").innerText = `View Cart (${cartCounter} items)`;
    };
}

function updateCartButton(product){
    document.getElementById("add-to-cart").innerHTML = `
        <button id="minus" button class = "px-4 ">-</button>
        <span>${cartCounter}</span>
        <button id="plus" button class = "px-4">+</button>
    `;

        document.getElementById("plus").onclick = function(){
        cartCounter++;
        alert(product.name + " has been added to your cart!");

        document.getElementById("cart-count").innerText = `View Cart (${cartCounter} items)`;
        updateCartButton(product);
    };

    document.getElementById("minus").onclick = function(){
        if (cartCounter >= 1){
            cartCounter--;
            alert(product.name + " has been removed from your cart!");
            //console.log(cartCounter);
            document.getElementById("cart-count").innerText = `View Cart (${cartCounter} items)`;
            updateCartButton(product);
        }
        if (cartCounter === 0){
            // Reset
            document.getElementById("add-to-cart").innerText = "Add to Cart";
            document.getElementById("add-to-cart").style.backgroundColor = "#007bff";
            document.getElementById("cart-count").innerText = "View Cart";
            return;
        }

        
    };

}


// Example usage
var cardigan = new Product(1, "Cozy Cardigan","Sweater", "Wool Blend", "Female", "Blue with daisy patterns", "S, M, L, XL", 59.99, "A warm and stylish wool blend cardigan perfect for chilly days.", "Products/cardigan.jpg");

displayProduct(cardigan);
addToCart(cardigan);