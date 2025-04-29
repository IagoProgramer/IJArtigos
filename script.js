document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        once: true
    });

    // Counter Animation
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const updateCounter = () => {
                const current = +counter.innerText;
                const increment = target / 100;
                
                if (current < target) {
                    counter.innerText = Math.ceil(current + increment);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    }

    // Scroll-triggered counter animation
    window.addEventListener('scroll', function() {
        const heroSection = document.getElementById('home');
        const heroPosition = heroSection.getBoundingClientRect();
        
        if (heroPosition.bottom > 0 && heroPosition.top < window.innerHeight) {
            animateCounters();
        }
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form Submission Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const inputs = contactForm.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });
            
            if (isValid) {
                // Here you would typically send the form data to a server
                alert('Mensagem enviada com sucesso!');
                contactForm.reset();
            }
        });
    }

    // Dark Mode and Theme Customization (integrated with theme-manager.js logic)
    const darkModeToggle = document.getElementById('darkModeToggle');
    const primaryColorInput = document.getElementById('primaryColor');
    const secondaryColorInput = document.getElementById('secondaryColor');

    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });

        // Set initial state from localStorage
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }
    }

    // Color Customization
    function updateCustomColors() {
        const primaryColor = primaryColorInput.value;
        const secondaryColor = secondaryColorInput.value;

        document.documentElement.style.setProperty('--primary-color', primaryColor);
        document.documentElement.style.setProperty('--secondary-color', secondaryColor);

        localStorage.setItem('customPrimaryColor', primaryColor);
        localStorage.setItem('customSecondaryColor', secondaryColor);
    }

    if (primaryColorInput && secondaryColorInput) {
        primaryColorInput.addEventListener('input', updateCustomColors);
        secondaryColorInput.addEventListener('input', updateCustomColors);

        // Restore saved colors
        const savedPrimaryColor = localStorage.getItem('customPrimaryColor');
        const savedSecondaryColor = localStorage.getItem('customSecondaryColor');

        if (savedPrimaryColor) primaryColorInput.value = savedPrimaryColor;
        if (savedSecondaryColor) secondaryColorInput.value = savedSecondaryColor;

        updateCustomColors();
    }
});

// Error Handling
window.addEventListener('error', function(event) {
    console.error('Unhandled error:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
    });
});