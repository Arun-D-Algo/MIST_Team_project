//For button toggle in About Us section
const btn = document.getElementById("aboutBtn");
  const menu = document.getElementById("aboutMenu");
  const arrow = document.getElementById("arrow");

  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    arrow.textContent = menu.classList.contains("hidden") ? "▼" : "▲";
  });

//For product description page
const descriptionDropdown = document.getElementById("description-dropdown");
const descriptionContent = document.getElementById("description-content");
const descriptionArrow = document.getElementById("description-arrow");

descriptionDropdown.addEventListener("click", () => {
  descriptionContent.classList.toggle("hidden");
  descriptionArrow.textContent = descriptionContent.classList.contains("hidden") ? "▼" : "▲";
});

//product specifications 
const specsDropdown = document.getElementById("specification-dropdown");
const specsContent = document.getElementById("specification-content");
const specsArrow = document.getElementById("specification-arrow"); 
specsDropdown.addEventListener("click", () => {
  specsContent.classList.toggle("hidden");
  specsArrow.textContent = specsContent.classList.contains("hidden") ? "▼" : "▲";
});