// About JS

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".about-card");

  // Add hover effect for cards
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      cards.forEach((c) => {
        if (c !== card) {
          c.style.opacity = "0.7";
        }
      });
    });

    card.addEventListener("mouseleave", () => {
      cards.forEach((c) => {
        c.style.opacity = "1";
      });
    });
  });

  // Smooth scroll to sections
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const section = document.querySelector(this.getAttribute("href"));
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add scroll padding for fixed header
  document.documentElement.style.scrollPaddingTop =
    document.querySelector(".navbar").offsetHeight + "px";
});
