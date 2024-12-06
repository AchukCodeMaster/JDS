import { setupTestimonials } from './testimonials/testimonials.js';

document.addEventListener('DOMContentLoaded', () => {
    const testimonialsSection = document.querySelector('.testimonials-section');
    const cleanup = setupTestimonials(testimonialsSection);

    // Clean up on page unload
    window.addEventListener('unload', cleanup);
});