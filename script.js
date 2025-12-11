//For button toggle in About Us section
const btn = document.getElementById("aboutBtn");
  const menu = document.getElementById("aboutMenu");
  const arrow = document.getElementById("arrow");

  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    arrow.textContent = menu.classList.contains("hidden") ? "▼" : "▲";
  });

  // secondary subnav collision + stick logic
document.addEventListener("DOMContentLoaded", () => {
  const primary = document.getElementById("navbar"); // header element
  const subnav = document.getElementById("subnav");
  // placeholder to avoid layout jump when subnav becomes fixed
  let subPlaceholder = null;

  function checkSubnav() {
    if (!subnav) return;

    const primaryRect = primary.getBoundingClientRect();
    const subRect = subnav.getBoundingClientRect();

    // if top of subnav hits the bottom of primary nav (collision)
    if (subRect.top <= primaryRect.bottom) {
      if (!subnav.classList.contains("fixed-sub")) {
        // create placeholder
        subPlaceholder = document.createElement("div");
        subPlaceholder.style.height = `${subRect.height}px`;
        subnav.parentNode.insertBefore(subPlaceholder, subnav.nextSibling);

        // fix subnav under the primary nav
        subnav.classList.add("fixed-sub");
        subnav.style.position = "fixed";
        subnav.style.top = `${primaryRect.height}px`;
        subnav.style.left = "0";
        subnav.style.right = "0";
        subnav.style.zIndex = 49;
        subnav.classList.add("shadow-md");
      }
    } else {
      if (subnav.classList.contains("fixed-sub")) {
        // restore
        subnav.classList.remove("fixed-sub");
        subnav.style.position = "";
        subnav.style.top = "";
        subnav.style.left = "";
        subnav.style.right = "";
        subnav.style.zIndex = "";
        subnav.classList.remove("shadow-md");
        if (subPlaceholder) {
          subPlaceholder.remove();
          subPlaceholder = null;
        }
      }
    }
  }

  window.addEventListener("scroll", checkSubnav);
  window.addEventListener("resize", checkSubnav);
  // initial check in case page loads scrolled
  checkSubnav();
});

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("marqueeWrapper");
  const content = document.getElementById("marqueeContent");

  // Duplicate content for seamless looping
  const clone = content.cloneNode(true);
  wrapper.appendChild(clone);

  let position = 0;

  function animateMarquee() {
    position -= 1; // speed
    wrapper.style.transform = `translateX(${position}px)`;

    // Reset when half scrolled (since content is duplicated)
    if (Math.abs(position) >= content.offsetWidth) {
      position = 0;
    }

    requestAnimationFrame(animateMarquee);
  }

  animateMarquee();
});

document.getElementById("scrollArrow").addEventListener("click", () => {
  const banner = document.getElementById("bannerSection");
  const bannerHeight = banner.offsetHeight;

  window.scrollTo({
    top: bannerHeight,
    behavior: "smooth"
  });
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
document.addEventListener("DOMContentLoaded", () => {
    if (typeof updateCartCount === "function") updateCartCount();
});
