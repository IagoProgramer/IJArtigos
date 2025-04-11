// Theme and color management
class ThemeManager {
    constructor() {
        this.darkModeColors = {
            background: '#000000',      // Deep black
            surface: '#282A3A',         // Dark blue-gray
            accent: '#C69749',          // Golden accent
            text: '#E0E0E0',            // Light gray text
            secondarySurface: '#735F32' // Dark golden brown
        };
        this.initializeTheme();
        this.setupColorInputListeners();
    }

    initializeTheme() {
        // Check and apply saved dark mode preference
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        }

        // Check and apply saved custom colors
        this.applySavedColors();
    }

    applySavedColors() {
        const savedPrimaryColor = localStorage.getItem('customPrimaryColor');
        const savedSecondaryColor = localStorage.getItem('customSecondaryColor');

        if (savedPrimaryColor) {
            document.getElementById('primaryColor').value = savedPrimaryColor;
        }

        if (savedSecondaryColor) {
            document.getElementById('secondaryColor').value = savedSecondaryColor;
        }

        this.updateColors();
    }

    setupColorInputListeners() {
        document.getElementById('primaryColor').addEventListener('input', () => this.updateColors());
        document.getElementById('secondaryColor').addEventListener('input', () => this.updateColors());
    }

    updateColors() {
        const primaryColor = document.getElementById('primaryColor').value;
        const secondaryColor = document.getElementById('secondaryColor').value;

        // Update CSS variables
        document.documentElement.style.setProperty('--primary-color', primaryColor);
        document.documentElement.style.setProperty('--secondary-color', secondaryColor);
        
        // Persistent color storage
        localStorage.setItem('customPrimaryColor', primaryColor);
        localStorage.setItem('customSecondaryColor', secondaryColor);
        
        this.applyColorToElements(primaryColor, secondaryColor);
    }

    applyColorToElements(primaryColor, secondaryColor) {
        const elements = {
            buttons: document.querySelectorAll('.btn-gold'),
            icons: document.querySelectorAll('.area-card i, .social-links a'),
            navbar: document.querySelector('.navbar'),
        };

        elements.buttons.forEach(btn => {
            btn.style.backgroundColor = primaryColor;
            btn.style.borderColor = primaryColor;
        });

        elements.icons.forEach(icon => {
            icon.style.color = primaryColor;
        });

        this.updateUIForMode();
    }

    toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        
        // Save preference
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        
        // Trigger additional UI updates
        this.updateUIForMode();
    }

    updateUIForMode() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        if (isDarkMode) {
            // Apply dark mode specific golden color scheme
            document.documentElement.style.setProperty('--gold', '#C69749');
            document.documentElement.style.setProperty('--gold-light', '#D4B880');
            document.documentElement.style.setProperty('--gold-dark', '#8B6D3B');
        } else {
            // Reset to default golden colors
            document.documentElement.style.setProperty('--gold', '#C5A572');
            document.documentElement.style.setProperty('--gold-light', '#D4B880');
            document.documentElement.style.setProperty('--gold-dark', '#8B6D3B');
        }

        // Update specific UI elements
        const elements = document.querySelectorAll('.article-card, .plan-card, .area-card');
        elements.forEach(el => {
            el.style.transition = 'all 0.3s ease';
            el.style.backgroundColor = isDarkMode ? this.darkModeColors.surface : '#FFFFFF';
            el.style.color = isDarkMode ? this.darkModeColors.text : '#000000';
        });
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});