// checkout.js
document.getElementById("checkout-form").addEventListener("submit", e => {
  e.preventDefault();

  alert("Order placed successfully. (This is a demo)");
  localStorage.removeItem("cart");
  updateCartBadge();
  window.location.href = "index.html";
});