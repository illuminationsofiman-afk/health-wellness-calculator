// Main application controller
class HealthCalculatorApp {
    constructor() {
        this.currentCategory = 'nutrition';
        this.modal = document.getElementById('calculatorModal');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showCategory('nutrition');
    }

    setupEventListeners() {
        // Category tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.showCategory(category);
            });
        });

        // Calculator cards
        document.querySelectorAll('.calculator-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const calculator = e.currentTarget.dataset.calculator;
                this.openCalculator(calculator);
            });
        });

        // Modal close
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        // Click outside modal to close
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    showCategory(category) {
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        // Show/hide calculator cards
        document.querySelectorAll('.calculator-card').forEach(card => {
            if (card.dataset.category === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.6s ease-out';
            } else {
                card.style.display = 'none';
            }
        });

        this.currentCategory = category;
    }

    openCalculator(calculatorType) {
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        // Set title
        const titles = {
            'keto': 'Keto Macro Calculator',
            'diabetes': 'Diabetes Management Calculator',
            'intermittent-fasting': 'Intermittent Fasting Calculator',
            'thyroid': 'Thyroid Support Calculator',
            'pcos': 'PCOS Diet Calculator',
            'marathon': 'Marathon Fueling Calculator',
            'pregnancy': 'Pregnancy Fitness Calculator'
        };

        modalTitle.textContent = titles[calculatorType] || 'Calculator';

        // Load calculator content
        switch(calculatorType) {
            case 'keto':
                modalBody.innerHTML = KetoCalculator.getHTML();
                KetoCalculator.init();
                break;
            case 'diabetes':
                modalBody.innerHTML = DiabetesCalculator.getHTML();
                DiabetesCalculator.init();
                break;
            case 'intermittent-fasting':
                modalBody.innerHTML = IFCalculator.getHTML();
                IFCalculator.init();
                break;
            case 'thyroid':
                modalBody.innerHTML = ThyroidCalculator.getHTML();
                ThyroidCalculator.init();
                break;
            case 'pcos':
                modalBody.innerHTML = PCOSCalculator.getHTML();
                PCOSCalculator.init();
                break;
            case 'marathon':
                modalBody.innerHTML = MarathonCalculator.getHTML();
                MarathonCalculator.init();
                break;
            case 'pregnancy':
                modalBody.innerHTML = PregnancyCalculator.getHTML();
                PregnancyCalculator.init();
                break;
        }

        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Utility functions
function scrollToCalculators() {
    document.getElementById('calculators').scrollIntoView({
        behavior: 'smooth'
    });
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HealthCalculatorApp();
});

// Analytics tracking (placeholder)
function trackCalculatorUsage(calculatorType, action) {
    // Google Analytics or other tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': 'Calculator',
            'event_label': calculatorType
        });
    }
}

// Premium feature prompts
function showPremiumPrompt(feature) {
    alert(`${feature} is a premium feature. Upgrade to unlock advanced tracking and personalized recommendations!`);
}
