export class Slider {
  constructor(container, slides, options = {}) {
    this.container = container;
    this.slides = slides;
    this.currentSlide = 0;
    this.options = {
      autoplay: options.autoplay || true,
      interval: options.interval || 10000,
      ...options,
    };

    this.init();
  }

  init() {
    this.createDots();
    this.addEventListeners();
    if (this.options.autoplay) {
      this.startAutoplay();
    }
  }

  createDots() {
    const dotsContainer = document.getElementById("sliderDots");
    dotsContainer.innerHTML = this.slides
      .map(
        (_, index) =>
          `<span class="dot ${
            index === 0 ? "active" : ""
          }" data-index="${index}"></span>`
      )
      .join("");
  }

  updateSlider() {
    this.container.style.transform = `translateX(-${this.currentSlide * 100}%)`;
    this.updateDots();
  }

  updateDots() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentSlide);
    });
  }

  next() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.updateSlider();
  }

  prev() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.updateSlider();
  }

  goTo(index) {
    this.currentSlide = index;
    this.updateSlider();
  }

  addEventListeners() {
    document
      .getElementById("prevBtn")
      .addEventListener("click", () => this.prev());
    document
      .getElementById("nextBtn")
      .addEventListener("click", () => this.next());
    document.getElementById("sliderDots").addEventListener("click", (e) => {
      if (e.target.classList.contains("dot")) {
        this.goTo(parseInt(e.target.dataset.index));
      }
    });
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(
      () => this.next(),
      this.options.interval
    );
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }
}
