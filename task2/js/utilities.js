// Currency formatter
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

// Debounce function for search and filters
function debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(this, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(this, args);
    };
}

// Local storage wrapper
const storage = {
    set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    get: (key) => {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch {
            return null;
        }
    }
};

// Form validation helper
function validateForm(formData) {
    const errors = {};
    
    if (!formData.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.email = 'Invalid email address';
    }
    
    if (formData.cardNumber?.length !== 16) {
        errors.cardNumber = 'Card number must be 16 digits';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

// Error handling wrapper
function asyncHandler(fn) {
    return async function (...args) {
        try {
            await fn.apply(this, args);
        } catch (error) {
            console.error('Error:', error);
            notifications.show(error.message, 'error');
        }
    };
}

// Enhanced notifications system
const notifications = {
    show(message, type = 'success', duration = 3000) {
        const container = document.querySelector('.notifications-container') || 
            (() => {
                const div = document.createElement('div');
                div.className = 'notifications-container';
                document.body.appendChild(div);
                return div;
            })();

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${this.getIcon(type)}"></i>
            <span>${message}</span>
        `;

        container.appendChild(notification);
        
        requestAnimationFrame(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.add('hide');
                setTimeout(() => notification.remove(), 300);
            }, duration);
        });
    },

    getIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-times-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }
};

// Global loader
const loader = {
    show(message = 'Loading...') {
        const loader = document.querySelector('.loading-spinner') || document.createElement('div');
        loader.className = 'loading-spinner';
        loader.innerHTML = `
            <div class="spinner-content">
                <div class="spinner"></div>
                <p class="loading-text">${message}</p>
            </div>
        `;
        if (!document.querySelector('.loading-spinner')) {
            document.body.appendChild(loader);
        }
        requestAnimationFrame(() => loader.classList.add('show'));
    },
    
    hide() {
        const loader = document.querySelector('.loading-spinner');
        if (loader) {
            loader.classList.remove('show');
            setTimeout(() => loader.remove(), 300);
        }
    }
};

// Smooth scroll utility
function smoothScroll(target, duration = 500) {
    const targetPosition = target.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const startTime = performance.now();

    function animation(currentTime) {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        const easeInOutQuad = t => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const position = startPosition + targetPosition * easeInOutQuad(progress);
        
        window.scrollTo(0, position);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// Update showNotification function to use the main notification system
function showNotification(message, type = 'success') {
    notifications.show(message, type);
}