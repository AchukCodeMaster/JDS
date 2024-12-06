import { testimonials } from './data.js';
import { fadeIn, fadeOut } from './animations.js';
import { setupKeyboardNavigation } from './navigation.js';

const AUTO_SLIDE_INTERVAL = 5000;

export function setupTestimonials(container) {
    let currentIndex = 0;
    let autoSlideInterval;

    function renderTestimonial(index) {
        const testimonial = testimonials[index];
        const card = container.querySelector('.testimonial-card');
        
        card.innerHTML = `
            <div class="testimonial-content">
                <div class="testimonial-profile">
                    <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar">
                    <div class="testimonial-author">
                        <h3>${testimonial.name}</h3>
                        <p>${testimonial.role}</p>
                    </div>
                </div>
                <p class="testimonial-text">"${testimonial.content}"</p>
            </div>
            <div class="testimonial-controls" role="navigation">
                <button class="prev-btn" aria-label="Previous testimonial">←</button>
                <div class="testimonial-dots">
                    ${testimonials.map((_, i) => `
                        <button class="dot ${i === index ? 'active' : ''}" 
                                aria-label="Go to testimonial ${i + 1}"
                                aria-current="${i === index ? 'true' : 'false'}"></button>
                    `).join('')}
                </div>
                <button class="next-btn" aria-label="Next testimonial">→</button>
            </div>
        `;

        setupEventListeners();
        resetAutoSlide();
    }

    async function showTestimonial(index) {
        const card = container.querySelector('.testimonial-card');
        await fadeOut(card);
        currentIndex = index;
        renderTestimonial(currentIndex);
        await fadeIn(card);
    }

    function showNext() {
        showTestimonial((currentIndex + 1) % testimonials.length);
    }

    function showPrevious() {
        showTestimonial((currentIndex - 1 + testimonials.length) % testimonials.length);
    }

    function setupEventListeners() {
        container.querySelector('.prev-btn').addEventListener('click', showPrevious);
        container.querySelector('.next-btn').addEventListener('click', showNext);
        
        container.querySelectorAll('.dot').forEach((dot, i) => {
            dot.addEventListener('click', () => showTestimonial(i));
        });

        setupKeyboardNavigation(container, {
            showNext,
            showPrevious,
            showTestimonial,
            totalCount: testimonials.length
        });
    }

    function resetAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
        autoSlideInterval = setInterval(showNext, AUTO_SLIDE_INTERVAL);
    }

    // Initialize with first testimonial
    renderTestimonial(currentIndex);

    // Pause auto-slide on hover
    container.addEventListener('mouseenter', () => {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    });

    container.addEventListener('mouseleave', resetAutoSlide);

    // Clean up function
    return () => {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    };
}