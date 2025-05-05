class ScrollAnimationHandler {
    constructor() {
        this.observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        this.animationObserver = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            this.observerOptions
        );

        this.initializeAnimations();
    }

    initializeAnimations() {
        // Add animation classes to elements
        document.querySelectorAll('.product-card').forEach(card => {
            card.classList.add('fade-in-up');
            this.animationObserver.observe(card);
        });

        // Initialize lazy loading for images
        this.setupLazyLoading();

        // Add scroll-based parallax to hero section if exists
        const hero = document.querySelector('.hero-section');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scroll = window.pageYOffset;
                hero.style.transform = `translateY(${scroll * 0.5}px)`;
            }, { passive: true });
        }

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupLazyLoading() {
        const imageObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            },
            {
                rootMargin: '50px 0px',
                threshold: 0.1
            }
        );

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                this.animationObserver.unobserve(entry.target);
            }
        });
    }

    // Add scroll-triggered animations to elements
    addScrollAnimation(element, animation) {
        element.classList.add(animation);
        this.animationObserver.observe(element);
    }

    // Handle infinite scroll for products
    setupInfiniteScroll(loadMoreCallback, options = {}) {
        const { threshold = 100 } = options;
        let isLoading = false;

        window.addEventListener('scroll', () => {
            if (isLoading) return;

            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const clientHeight = document.documentElement.clientHeight;

            if (scrollHeight - scrollTop - clientHeight < threshold) {
                isLoading = true;
                loadMoreCallback().finally(() => {
                    isLoading = false;
                });
            }
        }, { passive: true });
    }
}

// Initialize scroll animations
const scrollAnimations = new ScrollAnimationHandler();

// Add smooth scroll-to-top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.className = 'scroll-to-top button-ripple';
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollToTopBtn);

// Show/hide scroll-to-top button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}, { passive: true });

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});