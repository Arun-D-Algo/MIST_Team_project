document.addEventListener("DOMContentLoaded", () => {
  const primary = document.getElementById("navbar");
  const subnav = document.getElementById("subnav");
  let subPlaceholder = null;

  function checkSubnav() {
    if (!subnav) return;

    const primaryRect = primary.getBoundingClientRect();
    const subRect = subnav.getBoundingClientRect();

    if (subRect.top <= primaryRect.bottom) {
      if (!subnav.classList.contains("fixed-sub")) {
        subPlaceholder = document.createElement("div");
        subPlaceholder.style.height = `${subRect.height}px`;
        subnav.parentNode.insertBefore(subPlaceholder, subnav.nextSibling);

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
  checkSubnav();
});

// marquee animation
document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("marqueeWrapper");
  const content = document.getElementById("marqueeContent");
  if (!wrapper || !content) return;

  const clone = content.cloneNode(true);
  wrapper.appendChild(clone);

  let position = 0;

  function animateMarquee() {
    position -= 1;
    wrapper.style.transform = `translateX(${position}px)`;

    if (Math.abs(position) >= content.offsetWidth) {
      position = 0;
    }

    requestAnimationFrame(animateMarquee);
  }

  animateMarquee();
});

// banner scroll button
document.addEventListener("DOMContentLoaded", () => {
  const scrollArrow = document.getElementById("scrollArrow");
  const banner = document.getElementById("bannerSection");

  if (!scrollArrow || !banner) return;

  scrollArrow.addEventListener("click", () => {
    window.scrollTo({
      top: banner.offsetHeight,
      behavior: "smooth"
    });
  });
});