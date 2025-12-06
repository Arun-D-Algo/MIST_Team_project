//For button toggle in About Us section
const btn = document.getElementById("aboutBtn");
  const menu = document.getElementById("aboutMenu");
  const arrow = document.getElementById("arrow");

  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    arrow.textContent = menu.classList.contains("hidden") ? "▼" : "▲";
  });
