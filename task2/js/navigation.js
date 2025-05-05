// Navigation and Link Handler
document.addEventListener('DOMContentLoaded', () => {
    // Handle navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            if (target === '#') return;
            
            if (target.startsWith('#')) {
                // Smooth scroll to section
                const section = document.querySelector(target);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // Handle external links
                window.location.href = target;
            }
        });
    });

    // Handle category explore buttons
    const categoryButtons = document.querySelectorAll('.category-card .btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const category = button.closest('.category-card').querySelector('h3').textContent;
            // Filter products by category
            filterProductsByCategory(category);
            // Scroll to products section
            document.querySelector('#products').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Handle deal buttons
    const dealButtons = document.querySelectorAll('.deal-card .btn');
    dealButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const dealType = button.closest('.deal-card').querySelector('h3').textContent;
            // Filter products by deal type
            filterProductsByDeal(dealType);
            // Scroll to products section
            document.querySelector('#products').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Handle newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            if (isValidEmail(email)) {
                subscribeToNewsletter(email);
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }

    // Handle social media links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = link.querySelector('i').className.split(' ')[1].split('-')[1];
            openSocialMedia(platform);
        });
    });

    // Handle cart icon
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            toggleCartSidebar();
        });
    }

    // Handle wishlist icon
    const wishlistIcon = document.querySelector('.wishlist-icon');
    if (wishlistIcon) {
        wishlistIcon.addEventListener('click', (e) => {
            e.preventDefault();
            toggleWishlistSidebar();
        });
    }

    // Handle hero section buttons
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const target = button.getAttribute('href');
            if (target.startsWith('#')) {
                const section = document.querySelector(target);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Add scroll animation to elements
    const animatedElements = document.querySelectorAll('.fade-in-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// Helper Functions
function filterProductsByCategory(category) {
    const products = document.querySelectorAll('.product-card');
    let foundProducts = false;
    
    // Map UI category names to data category names
    const categoryMapping = {
        'Smartphones': 'phones',
        'Laptops': 'laptops',
        'Tablets': 'tablets',
        'Accessories': 'accessories'
    };
    
    const dataCategory = categoryMapping[category] || category.toLowerCase();
    
    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        if (productCategory === dataCategory) {
            product.style.display = 'block';
            foundProducts = true;
        } else {
            product.style.display = 'none';
        }
    });

    // Show notification based on results
    if (!foundProducts) {
        showNotification(`No products found in ${category} category`, 'error');
    } else {
        showNotification(`Showing ${category} products`, 'success');
    }
}

function filterProductsByDeal(dealType) {
    const products = document.querySelectorAll('.product-card');
    let foundProducts = false;
    
    products.forEach(product => {
        const productDeal = product.getAttribute('data-deal');
        if (productDeal === dealType.toLowerCase()) {
            product.style.display = 'block';
            foundProducts = true;
        } else {
            product.style.display = 'none';
        }
    });

    // Show notification based on results
    if (!foundProducts) {
        showNotification(`No products found for ${dealType}`, 'error');
    } else {
        showNotification(`Showing ${dealType} products`, 'success');
    }
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function subscribeToNewsletter(email) {
    // Here you would typically send the email to your backend
    // For now, we'll just show a success message
    showNotification('Thank you for subscribing!', 'success');
    document.querySelector('.newsletter-form').reset();
}

function openSocialMedia(platform) {
    const urls = {
        facebook: 'https://facebook.com/techvibe',
        twitter: 'https://twitter.com/techvibe',
        instagram: 'https://instagram.com/techvibe',
        linkedin: 'https://linkedin.com/company/techvibe'
    };
    
    if (urls[platform]) {
        window.open(urls[platform], '_blank');
    }
}

function toggleCartSidebar() {
    const cartSidebar = document.querySelector('.cart-sidebar');
    const overlay = document.querySelector('.overlay') || createOverlay();
    
    if (cartSidebar) {
        cartSidebar.classList.toggle('open');
        overlay.classList.toggle('show');
        
        // Close cart when clicking outside
        overlay.onclick = () => {
            cartSidebar.classList.remove('open');
            overlay.classList.remove('show');
        };
    }
}

function createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    return overlay;
}

function toggleWishlistSidebar() {
    const wishlistSidebar = document.querySelector('.wishlist-sidebar');
    if (wishlistSidebar) {
        wishlistSidebar.classList.toggle('open');
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
} 