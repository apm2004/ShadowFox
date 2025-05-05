// Make products array globally accessible
window.products = [
    {
        id: 1,
        name: "MacBook Pro M2",
        price: 1299.99,
        category: "laptops",
        deal: "summer sale",
        rating: 4.8,
        image: "fas fa-laptop",
        description: "Supercharged by M2 Pro or M2 Max, MacBook Pro takes its power and efficiency further than ever.",
        features: ["M2 Pro chip", "16GB unified memory", "512GB SSD storage", "14-inch Liquid Retina XDR display"],
        stock: 15
    },
    {
        id: 2,
        name: "iPhone 14 Pro",
        price: 999.99,
        category: "phones",
        deal: "new arrivals",
        rating: 4.9,
        image: "fas fa-mobile-alt",
        description: "The most advanced iPhone ever. Featuring the Dynamic Island, A16 Bionic chip, and 48MP camera.",
        features: ["A16 Bionic chip", "48MP camera", "Dynamic Island", "Always-On display"],
        stock: 20
    },
    {
        id: 3,
        name: "Samsung Galaxy S23 Ultra",
        price: 1199.99,
        category: "phones",
        deal: "summer sale",
        rating: 4.7,
        image: "fas fa-mobile-alt",
        description: "Meet the new Galaxy S23 Ultra with 200MP camera and S Pen included.",
        features: ["200MP camera", "S Pen included", "5000mAh battery", "Snapdragon 8 Gen 2"],
        stock: 12
    },
    {
        id: 4,
        name: "iPad Pro M2",
        price: 799.99,
        category: "tablets",
        deal: "new arrivals",
        rating: 4.8,
        image: "fas fa-tablet-alt",
        description: "The ultimate iPad experience with the M2 chip, 12.9-inch Liquid Retina XDR display.",
        features: ["M2 chip", "12.9-inch display", "Face ID", "Thunderbolt port"],
        stock: 8
    },
    {
        id: 5,
        name: "Sony WH-1000XM5",
        price: 399.99,
        category: "accessories",
        deal: "summer sale",
        rating: 4.9,
        image: "fas fa-headphones",
        description: "Industry-leading noise cancellation headphones with exceptional sound quality.",
        features: ["Industry-leading ANC", "30-hour battery", "Multi-point connection", "HD Voice"],
        stock: 25
    },
    {
        id: 6,
        name: "Dell XPS 15",
        price: 1499.99,
        category: "laptops",
        deal: "new arrivals",
        rating: 4.6,
        image: "fas fa-laptop",
        description: "Powerful 15-inch laptop with stunning 4K display and premium design.",
        features: ["12th Gen Intel Core", "4K OLED display", "32GB RAM", "1TB SSD"],
        stock: 10
    },
    {
        id: 7,
        name: "Apple Watch Ultra",
        price: 799.99,
        category: "accessories",
        deal: "new arrivals",
        rating: 4.7,
        image: "fas fa-watch",
        description: "The most rugged and capable Apple Watch ever.",
        features: ["49mm titanium case", "Dual-frequency GPS", "86dB siren", "36-hour battery"],
        stock: 18
    },
    {
        id: 8,
        name: "Samsung Galaxy Tab S8 Ultra",
        price: 1099.99,
        category: "tablets",
        deal: "summer sale",
        rating: 4.6,
        image: "fas fa-tablet-alt",
        description: "Massive 14.6-inch tablet with S Pen included and powerful performance.",
        features: ["14.6-inch display", "S Pen included", "Snapdragon 8 Gen 1", "11200mAh battery"],
        stock: 6
    }
];

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category);
    card.setAttribute('data-deal', product.deal);
    
    card.innerHTML = `
        <div class="product-image">
            <i class="${product.image}"></i>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="product-rating">
                ${Array(5).fill().map((_, i) => 
                    `<i class="fas fa-star${i < Math.floor(product.rating) ? '' : '-half-alt'}"></i>`
                ).join('')}
                <span>(${product.rating})</span>
            </div>
            <div class="product-actions">
                <button class="add-to-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="add-to-wishlist" data-id="${product.id}">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        </div>
    `;

    // Add click event to show product details
    card.addEventListener('click', (e) => {
        // Don't trigger if clicking on action buttons
        if (!e.target.closest('.product-actions')) {
            showProductDetails(product);
        }
    });

    return card;
}

function showProductDetails(product) {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'product-modal-overlay';
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <button class="close-modal"><i class="fas fa-times"></i></button>
        <div class="product-details">
            <div class="product-details-image">
                <i class="${product.image}"></i>
                <div class="product-stock">
                    <span class="stock-label">Stock:</span>
                    <span class="stock-value ${product.stock > 5 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock'}">
                        ${product.stock > 5 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                    </span>
                </div>
            </div>
            <div class="product-details-info">
                <div class="product-header">
                    <h2>${product.name}</h2>
                    <div class="product-category">
                        <i class="fas fa-tag"></i>
                        <span>${product.category}</span>
                    </div>
                </div>
                <div class="product-details-price">$${product.price.toFixed(2)}</div>
                <div class="product-details-rating">
                    ${Array(5).fill().map((_, i) => 
                        `<i class="fas fa-star${i < Math.floor(product.rating) ? '' : '-half-alt'}"></i>`
                    ).join('')}
                    <span>(${product.rating})</span>
                </div>
                <p class="product-details-description">${product.description}</p>
                <div class="product-details-features">
                    <h3>Features:</h3>
                    <ul>
                        ${product.features.map(feature => `
                            <li>
                                <i class="fas fa-check"></i>
                                <span>${feature}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <div class="product-details-actions">
                    <div class="quantity-selector">
                        <button class="quantity-btn minus" ${product.stock <= 0 ? 'disabled' : ''}>-</button>
                        <input type="number" class="quantity-input" value="1" min="1" max="${product.stock}" ${product.stock <= 0 ? 'disabled' : ''}>
                        <button class="quantity-btn plus" ${product.stock <= 0 ? 'disabled' : ''}>+</button>
                    </div>
                    <div class="action-buttons">
                        <button class="add-to-cart" data-id="${product.id}" ${product.stock <= 0 ? 'disabled' : ''}>
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                        <button class="add-to-wishlist" data-id="${product.id}">
                            <i class="fas fa-heart"></i> Add to Wishlist
                        </button>
                    </div>
                </div>
                <div class="product-meta">
                    <div class="product-deal">
                        <i class="fas fa-tag"></i>
                        <span>${product.deal}</span>
                    </div>
                    <div class="product-shipping">
                        <i class="fas fa-truck"></i>
                        <span>Free Shipping</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal to overlay
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Add event listeners
    const closeBtn = modal.querySelector('.close-modal');
    const overlayEl = document.querySelector('.product-modal-overlay');
    const quantityInput = modal.querySelector('.quantity-input');
    const minusBtn = modal.querySelector('.quantity-btn.minus');
    const plusBtn = modal.querySelector('.quantity-btn.plus');

    // Close modal when clicking close button or overlay
    closeBtn.addEventListener('click', () => {
        overlay.remove();
    });

    overlayEl.addEventListener('click', (e) => {
        if (e.target === overlayEl) {
            overlay.remove();
        }
    });

    // Handle quantity changes
    minusBtn.addEventListener('click', () => {
        if (quantityInput.value > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });

    plusBtn.addEventListener('click', () => {
        if (quantityInput.value < product.stock) {
            quantityInput.value = parseInt(quantityInput.value) + 1;
        }
    });

    // Handle direct quantity input
    quantityInput.addEventListener('change', () => {
        let value = parseInt(quantityInput.value);
        if (isNaN(value) || value < 1) value = 1;
        if (value > product.stock) value = product.stock;
        quantityInput.value = value;
    });

    // Add to cart button in modal
    const addToCartBtn = modal.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        cart.addToCart(product.id, quantity);
        overlay.remove();
    });

    // Add to wishlist button in modal
    const addToWishlistBtn = modal.querySelector('.add-to-wishlist');
    addToWishlistBtn.addEventListener('click', () => {
        wishlist.addToWishlist(product.id);
        addToWishlistBtn.classList.add('added');
        addToWishlistBtn.innerHTML = '<i class="fas fa-heart"></i> Added to Wishlist';
        setTimeout(() => {
            overlay.remove();
        }, 1000);
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            overlay.remove();
        }
    });
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    return stars;
}

// Initialize products when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.querySelector('.products-grid');
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    // Initial product load
    if (productsGrid) {
        products.forEach(product => {
            productsGrid.appendChild(createProductCard(product));
        });
    }

    // Search functionality
    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            const title = card.querySelector('.product-title').textContent.toLowerCase();
            const description = card.querySelector('.product-info').textContent.toLowerCase();
            const isMatch = title.includes(searchTerm) || description.includes(searchTerm);
            card.style.display = isMatch ? 'block' : 'none';
        });

        // Show "no results" message if no products are visible
        let visibleProducts = document.querySelectorAll('.product-card[style="display: block"]');
        const noResultsEl = document.querySelector('.no-results') || createNoResultsElement();
        
        if (visibleProducts.length === 0 && searchTerm !== '') {
            noResultsEl.style.display = 'block';
        } else {
            noResultsEl.style.display = 'none';
        }
    }

    function createNoResultsElement() {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = `
            <i class="fas fa-search"></i>
            <p>No products found matching your search.</p>
            <button class="reset-search">Clear Search</button>
        `;
        productsGrid.parentNode.insertBefore(noResults, productsGrid.nextSibling);

        // Add clear search functionality
        noResults.querySelector('.reset-search').addEventListener('click', () => {
            searchInput.value = '';
            handleSearch();
        });

        return noResults;
    }

    // Add search event listeners
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }

    if (searchButton) {
        searchButton.addEventListener('click', handleSearch);
    }

    // Add event listeners for wishlist buttons
    document.querySelectorAll('.add-to-wishlist').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.closest('.add-to-wishlist').dataset.id);
            const product = products.find(p => p.id === productId);
            if (product) {
                wishlist.addToWishlist(productId);
            }
        });
    });
});