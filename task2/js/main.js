// Recently viewed products
class RecentlyViewed {
    constructor() {
        this.items = storage.get('recentlyViewed') || [];
        this.maxItems = 4;
    }

    add(productId) {
        this.items = [productId, ...this.items.filter(id => id !== productId)]
            .slice(0, this.maxItems);
        storage.set('recentlyViewed', this.items);
        this.render();
    }

    render() {
        const container = document.querySelector('.products-section');
        const existing = document.querySelector('.recently-viewed');
        if (existing) existing.remove();

        if (this.items.length === 0) return;

        const recentProducts = products.filter(p => this.items.includes(p.id));
        const section = document.createElement('div');
        section.className = 'recently-viewed';
        section.innerHTML = `
            <h3>Recently Viewed</h3>
            <div class="recent-products">
                ${recentProducts.map(product => `
                    <div class="recent-product" onclick="showProductDetails(${product.id})">
                        <img src="${product.image}" alt="${product.name}">
                        <h4>${product.name}</h4>
                        <p>${formatter.format(product.price)}</p>
                    </div>
                `).join('')}
            </div>
        `;
        container.insertBefore(section, container.firstChild);
    }
}

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
    const recentlyViewed = new RecentlyViewed();

    // Initialize search
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', debounce((e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    }, 300));

    // Initialize sorting controls
    const sortingControls = document.querySelector('.sorting-controls');
    sortingControls.innerHTML = `
        <select id="sortSelect">
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
        </select>
        <div class="view-options">
            <button class="grid-view active"><i class="fas fa-th"></i></button>
            <button class="list-view"><i class="fas fa-list"></i></button>
        </div>
    `;

    // Initialize filters
    const filterOptions = document.querySelector('.filter-options');
    const categories = [...new Set(products.map(p => p.category))];
    filterOptions.innerHTML = categories.map(category => `
        <label>
            <input type="checkbox" value="${category}">
            ${category.charAt(0).toUpperCase() + category.slice(1)}
        </label>
    `).join('');

    // Initialize price slider
    const priceSlider = document.querySelector('.price-slider');
    const prices = products.map(p => p.price);
    const minPrice = Math.floor(Math.min(...prices));
    const maxPrice = Math.ceil(Math.max(...prices));
    priceSlider.innerHTML = `
        <input type="range" id="priceRange" min="${minPrice}" max="${maxPrice}" step="50">
        <div class="price-inputs">
            <input type="number" id="minPrice" placeholder="Min" value="${minPrice}">
            <input type="number" id="maxPrice" placeholder="Max" value="${maxPrice}">
        </div>
    `;

    // Initialize products
    renderProducts();
    recentlyViewed.render();

    // Handle product view
    document.addEventListener('click', (e) => {
        if (e.target.closest('.product-card')) {
            const productId = e.target.closest('.product-card').dataset.productId;
            if (productId) {
                recentlyViewed.add(Number(productId));
            }
        }
    });

    // Initialize product display
    renderProducts();

    // Initialize search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', debounce((e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    }, 300));
});

// Utility function for debouncing search input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle responsive navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartIcon = document.querySelector('.cart-icon');
    
    if (!cartSidebar.contains(e.target) && 
        !cartIcon.contains(e.target) && 
        cartSidebar.classList.contains('open')) {
        cartSidebar.classList.remove('open');
    }
});