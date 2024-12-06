import { KEYBOARD_KEYS } from './constants.js';

export function setupKeyboardNavigation(container, { showNext, showPrevious, showTestimonial, totalCount }) {
  container.setAttribute('tabindex', '0');
  
  container.addEventListener('keydown', (event) => {
    switch (event.key) {
      case KEYBOARD_KEYS.LEFT:
        showPrevious();
        break;
      case KEYBOARD_KEYS.RIGHT:
        showNext();
        break;
      case KEYBOARD_KEYS.HOME:
        showTestimonial(0);
        break;
      case KEYBOARD_KEYS.END:
        showTestimonial(totalCount - 1);
        break;
    }
  });
}