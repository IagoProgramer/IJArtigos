    // Advanced interaction and animation helpers
class InteractiveEnhancements {
    static setupTextReveal() {
        const revealElements = document.querySelectorAll('.text-reveal');
        
        const checkReveal = () => {
            revealElements.forEach(element => {
                const elementPosition = element.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                if (elementPosition.top < windowHeight * 0.75) {
                    element.classList.add('revealed');
                }
            });
        };
        
        window.addEventListener('scroll', checkReveal);
        document.addEventListener('DOMContentLoaded', checkReveal);
    }
    
    static setupHoverAnimations() {
        const animatableElements = document.querySelectorAll('.animate-hover');
        
        animatableElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.classList.add('hover-active');
            });
            
            element.addEventListener('mouseleave', () => {
                element.classList.remove('hover-active');
            });
        });
    }
    
    static init() {
        this.setupTextReveal();
        this.setupHoverAnimations();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    InteractiveEnhancements.init();
});