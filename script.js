// Banner scroll button
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
