export function fadeOut(element) {
    element.style.opacity = '1';
    element.style.transition = 'opacity 300ms ease-out';
    
    // Trigger reflow
    element.offsetHeight;
    
    element.style.opacity = '0';
    
    return new Promise(resolve => {
        setTimeout(resolve, 300);
    });
}

export function fadeIn(element) {
    element.style.opacity = '0';
    element.style.transition = 'opacity 300ms ease-in';
    
    // Trigger reflow
    element.offsetHeight;
    
    element.style.opacity = '1';
    
    return new Promise(resolve => {
        setTimeout(resolve, 300);
    });
}