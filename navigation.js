export class Navigation {
  constructor() {
    this.navbar = document.querySelector(".navbar");
    this.navLinks = document.querySelector(".nav-links");
    this.hamburger = document.createElement("button");
    this.setupHamburger();
    this.setupEventListeners();
  }

  setupHamburger() {
    this.hamburger.className = "hamburger";
    this.hamburger.innerHTML = `
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
        `;
    this.navbar.insertBefore(this.hamburger, this.navLinks);
  }

  setupEventListeners() {
    this.hamburger.addEventListener("click", () => {
      this.navLinks.classList.toggle("active");
      this.hamburger.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !this.navbar.contains(e.target) &&
        this.navLinks.classList.contains("active")
      ) {
        this.navLinks.classList.remove("active");
        this.hamburger.classList.remove("active");
      }
    });

    // Close menu when clicking a link
    this.navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        this.navLinks.classList.remove("active");
        this.hamburger.classList.remove("active");
      });
    });
  }
}
