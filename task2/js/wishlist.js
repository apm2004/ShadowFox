class WishList {
    constructor() {
        this.wishlist = storage.get('wishlist') || [];
        this.initializeWishlist();
    }

    initializeWishlist() {
        // Add wishlist icon to navbar
        const navLinks = document.querySelector('.nav-links');
        const wishlistIcon = document.createElement('a');
        wishlistIcon.href = '#';
        wishlistIcon.className = 'wishlist-icon';
        wishlistIcon.innerHTML = `
            <i class="fas fa-heart"></i>
            <span class="wishlist-count">0</span>
        `;
        navLinks.insertBefore(wishlistIcon, navLinks.firstChild);

        // Create wishlist sidebar
        const wishlistSidebar = document.createElement('div');
        wishlistSidebar.className = 'wishlist-sidebar';
        wishlistSidebar.innerHTML = `
            <div class="wishlist-header">
                <h2>My Wishlist</h2>
                <button class="close-wishlist"><i class="fas fa-times"></i></button>
            </div>
            <div class="wishlist-items"></div>
        `;
        document.body.appendChild(wishlistSidebar);

        // Add event listeners
        wishlistIcon.addEventListener('click', () => {
            wishlistSidebar.classList.add('open');
        });

        wishlistSidebar.querySelector('.close-wishlist').addEventListener('click', () => {
            wishlistSidebar.classList.remove('open');
        });

        // Update initial count
        this.updateWishlistCount();
        this.renderWishlist();
    }

    toggleWishlist(productId) {
        const index = this.wishlist.indexOf(productId);
        if (index === -1) {
            this.wishlist.push(productId);
            showNotification('Added to wishlist');
        } else {
            this.wishlist.splice(index, 1);
            showNotification('Removed from wishlist');
        }
        storage.set('wishlist', this.wishlist);
        this.updateWishlistCount();
        this.renderWishlist();
    }

    isInWishlist(productId) {
        return this.wishlist.includes(productId);
    }

    updateWishlistCount() {
        const count = document.querySelector('.wishlist-count');
        if (count) {
            count.textContent = this.wishlist.length;
        }
    }

    renderWishlist() {
        const container = document.querySelector('.wishlist-items');
        if (!container) return;

        const wishlistProducts = products.filter(p => this.wishlist.includes(p.id));
        container.innerHTML = wishlistProducts.map(product => `
            <div class="wishlist-item">
                <img src="${product.image}" alt="${product.name}">
                <div class="wishlist-item-info">
                    <h4>${product.name}</h4>
                    <p>${formatter.format(product.price)}</p>
                </div>
                <div class="wishlist-item-actions">
                    <button onclick="cart.addToCart(${product.id})" class="add-to-cart">
                        Add to Cart
                    </button>
                    <button onclick="wishlist.toggleWishlist(${product.id})" class="remove-wishlist">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('') || '<p class="empty-wishlist">Your wishlist is empty</p>';
    }
}

// Initialize wishlist
const wishlist = new WishList();