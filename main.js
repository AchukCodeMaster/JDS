// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href").slice(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Navbar scroll effect with fade
const navbar = document.querySelector(".navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    navbar.style.opacity = "1";
    return;
  }

  if (currentScroll > lastScroll) {
    // Scrolling down
    navbar.style.opacity = "0";
    navbar.style.transform = "translate(-50%, -100%)";
  } else {
    // Scrolling up
    navbar.style.opacity = "1";
    navbar.style.transform = "translate(-50%, 0)";
  }

  lastScroll = currentScroll;
});

// Contact button click handler
//document.querySelector('.contact-btn').addEventListener('click', () => {
//  alert('Contact form coming soon!');
//});

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

const menuOpen = document.getElementById("menu-open");
const menuClose = document.getElementById("menu-close");
const navLinks = document.querySelector(".nav-links");

menuOpen.addEventListener("click", () => {
  navLinks.classList.add("active");
  menuClose.classList.add("active");
  menuOpen.classList.add("active");
});

menuClose.addEventListener("click", () => {
  navLinks.classList.remove("active");
  menuClose.classList.remove("active");
  menuOpen.classList.remove("active");
});
