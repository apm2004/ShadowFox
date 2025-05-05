class MobileUIController {
    constructor() {
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.initializeEventListeners();
        this.setupFilterDrawer();
    }

    initializeEventListeners() {
        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-nav-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                AnimationController.slideIn(navLinks, 'left');
            });
        }

        // Touch gesture handling
        document.addEventListener('touchstart', (e) => this.handleTouchStart(e), false);
        document.addEventListener('touchmove', (e) => this.handleTouchMove(e), false);

        // Close overlays when clicking outside
        document.addEventListener('click', (e) => {
            const cart = document.querySelector('.cart-sidebar');
            const filters = document.querySelector('.filters');
            
            if (!e.target.closest('.cart-sidebar') && 
                !e.target.closest('.cart-icon') && 
                cart.classList.contains('open')) {
                AnimationController.slideOut(cart).then(() => {
                    cart.classList.remove('open');
                });
            }

            if (!e.target.closest('.filters') && 
                !e.target.closest('.filter-toggle') && 
                filters.classList.contains('show')) {
                this.hideFilters();
            }
        });
    }

    setupFilterDrawer() {
        const filterToggle = document.createElement('button');
        filterToggle.className = 'filter-toggle button-ripple';
        filterToggle.innerHTML = '<i class="fas fa-filter"></i>';
        
        document.body.appendChild(filterToggle);

        filterToggle.addEventListener('click', () => {
            const filters = document.querySelector('.filters');
            if (filters.classList.contains('show')) {
                this.hideFilters();
            } else {
                this.showFilters();
            }
        });

        // Add touch gesture for filter drawer
        const filters = document.querySelector('.filters');
        let startY = 0;
        let currentY = 0;

        filters.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            filters.style.transition = 'none';
        });

        filters.addEventListener('touchmove', (e) => {
            currentY = e.touches[0].clientY;
            const diff = currentY - startY;
            
            if (diff > 0) { // Only allow dragging down
                filters.style.transform = `translateY(${diff}px)`;
            }
        });

        filters.addEventListener('touchend', () => {
            filters.style.transition = 'transform 0.3s ease';
            if (currentY - startY > 100) {
                this.hideFilters();
            } else {
                filters.style.transform = 'translateY(0)';
            }
        });
    }

    showFilters() {
        const filters = document.querySelector('.filters');
        filters.classList.add('show');
        AnimationController.slideIn(filters, 'bottom');
    }

    hideFilters() {
        const filters = document.querySelector('.filters');
        AnimationController.slideOut(filters, 'bottom').then(() => {
            filters.classList.remove('show');
        });
    }

    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
    }

    handleTouchMove(e) {
        if (!this.touchStartX || !this.touchStartY) return;

        const xDiff = this.touchStartX - e.touches[0].clientX;
        const yDiff = this.touchStartY - e.touches[0].clientY;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            const cart = document.querySelector('.cart-sidebar');
            const wishlist = document.querySelector('.wishlist-sidebar');

            if (xDiff > 50) { // Swipe left
                if (cart.classList.contains('open')) {
                    AnimationController.slideOut(cart).then(() => {
                        cart.classList.remove('open');
                    });
                }
                if (wishlist.classList.contains('open')) {
                    AnimationController.slideOut(wishlist).then(() => {
                        wishlist.classList.remove('open');
                    });
                }
            }
        }

        this.touchStartX = null;
        this.touchStartY = null;
    }
}

// Initialize mobile UI controller
const mobileUI = new MobileUIController();