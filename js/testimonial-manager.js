class TestimonialsManager {
  constructor() {
    this.container = document.querySelector(".testimonials-container");
    this.currentPage = 0;
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.isDragging = false;
    this.startTransform = 0;
    this.isMobile = window.innerWidth < 1024;
    this.visibleCount = this.isMobile ? 1 : 3;

    this.init();
    this.handleResize();
  }

  init() {
    this.render();
    this.setupNavigation();
    this.setupTouchEvents();
    this.setupClickEvents();
    window.addEventListener("resize", () => this.handleResize());
  }

  handleResize() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth < 1024;
    this.visibleCount = this.isMobile ? 1 : 3;

    if (wasMobile !== this.isMobile) {
      this.currentPage = 0;
      this.updatePosition();
      this.updateNavigation();
      this.setupNavigation();
    }
  }

  getMaxPages() {
    return Math.ceil(testimonials.length / this.visibleCount) - 1;
  }

  getVisibleTestimonials() {
    const start = this.currentPage * this.visibleCount;
    return testimonials.slice(start, start + this.visibleCount);
  }

  render() {
    const visibleTestimonials = this.getVisibleTestimonials();
    this.container.innerHTML = visibleTestimonials
      .map(
        (testimonial) => `
      <div class="testimonial-card">
        <div class="quote-icon">❝</div>
        <p class="testimonial-content">${testimonial.content}</p>
        <div class="testimonial-author">
          <img src="${testimonial.image}" alt="${testimonial.name}" class="author-image">
          <div class="author-info">
            <h4>${testimonial.name}</h4>
            <p>${testimonial.role}</p>
          </div>
        </div>
      </div>
    `
      )
      .join("");

    this.updatePosition();
  }

  setupNavigation() {
    const navContainer = document.querySelector(".testimonial-nav");
    const totalPages = this.getMaxPages() + 1;

    navContainer.innerHTML = Array.from(
      { length: totalPages },
      (_, i) => `
      <div class="nav-dot ${i === 0 ? "active" : ""}" data-index="${i}"></div>
    `
    ).join("");

    navContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("nav-dot")) {
        this.currentPage = parseInt(e.target.dataset.index);
        this.render();
        this.updateNavigation();
      }
    });
  }

  setupTouchEvents() {
    this.container.addEventListener("touchstart", (e) => {
      if (!this.isMobile) return;
      this.touchStartX = e.touches[0].clientX;
      this.isDragging = true;
      this.startTransform = this.getCurrentTransform();
      this.container.style.transition = "none";
    });

    this.container.addEventListener("touchmove", (e) => {
      if (!this.isDragging || !this.isMobile) return;

      const currentX = e.touches[0].clientX;
      const diff = currentX - this.touchStartX;
      const newTransform = this.startTransform + diff;

      this.container.style.transform = `translateX(${newTransform}px)`;
    });

    this.container.addEventListener("touchend", (e) => {
      if (!this.isMobile) return;
      this.isDragging = false;
      this.container.style.transition = "transform 0.3s ease-out";

      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchEndX - this.touchStartX;

      if (Math.abs(diff) > 50) {
        if (diff > 0 && this.currentPage > 0) {
          this.currentPage--;
        } else if (diff < 0 && this.currentPage < this.getMaxPages()) {
          this.currentPage++;
        }
      }

      this.render();
      this.updateNavigation();
    });
  }

  setupClickEvents() {
    this.container.addEventListener("click", (e) => {
      if (!this.isMobile) return;
      const card = e.target.closest(".testimonial-card");
      if (!card) return;

      const cards = Array.from(this.container.children);
      const index = cards.indexOf(card);
      const actualIndex = this.currentPage * this.visibleCount + index;

      if (actualIndex !== this.currentPage) {
        this.currentPage = Math.floor(actualIndex / this.visibleCount);
        this.render();
        this.updateNavigation();
      }
    });
  }

  getCurrentTransform() {
    const style = window.getComputedStyle(this.container);
    const matrix = new WebKitCSSMatrix(style.transform);
    return matrix.m41;
  }

  updatePosition() {
    this.container.style.transform = "translateX(0)";
  }

  updateNavigation() {
    const dots = document.querySelectorAll(".nav-dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentPage);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new TestimonialsManager();
});
