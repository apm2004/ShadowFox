class ShoppingCart {
    constructor() {
        this.items = [];
        this.loadCart();
        // Only initialize UI if we're not on the checkout page
        if (!window.location.pathname.includes('checkout.html')) {
            this.initializeCart();
        }
    }

    loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                this.items = JSON.parse(savedCart);
            } catch (e) {
                console.error('Error loading cart from storage:', e);
                this.items = [];
            }
        }
    }

    initializeCart() {
        // Get cart elements
        const cartIcon = document.querySelector('.cart-icon');
        const cartSidebar = document.querySelector('.cart-sidebar');
        const closeCart = document.querySelector('.close-cart');
        const overlay = document.querySelector('.overlay') || this.createOverlay();

        // Add click event to cart icon
        if (cartIcon) {
            cartIcon.addEventListener('click', (e) => {
                e.preventDefault();
                cartSidebar.classList.add('open');
                overlay.classList.add('show');
            });
        }

        // Add click event to close button
        if (closeCart) {
            closeCart.addEventListener('click', () => {
                cartSidebar.classList.remove('open');
                overlay.classList.remove('show');
            });
        }

        // Add click event for add to cart buttons
        document.addEventListener('click', (e) => {
            const addToCartBtn = e.target.closest('.add-to-cart');
            if (addToCartBtn) {
                const productId = parseInt(addToCartBtn.dataset.id);
                const quantityInput = e.target.closest('.product-details-actions')?.querySelector('.quantity-input');
                const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
                
                if (!isNaN(productId)) {
                    this.addToCart(productId, quantity);
                } else {
                    console.error('Invalid product ID:', addToCartBtn.dataset.id);
                }
            }
        });

        // Initial cart display update
        this.updateCartDisplay();
    }

    createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
        return overlay;
    }

    addToCart(productId, quantity = 1) {
        productId = parseInt(productId);
        const product = window.products.find(p => p.id === productId);
        
        if (!product) {
            console.error('Product not found:', productId);
            window.notifications.show('Product not found', 'error');
            return false;
        }

        if (product.stock < quantity) {
            window.notifications.show('Not enough stock available', 'error');
            return false;
        }

        const existingItem = this.items.find(item => item.id === productId);
        if (existingItem) {
            if (existingItem.quantity + quantity > product.stock) {
                window.notifications.show('Not enough stock available', 'error');
                return false;
            }
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: quantity,
                image: product.image
            });
        }

        this.saveCart();
        this.updateCartDisplay();
        window.notifications.show('Added to cart successfully', 'success');
        return true;
    }

    createCartItemElement(item) {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.dataset.id = item.id;
        div.innerHTML = `
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.name}</h3>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-product-id="${item.id}">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="${window.products.find(p => p.id === item.id).stock}">
                    <button class="quantity-btn plus" data-product-id="${item.id}">+</button>
                </div>
            </div>
            <button class="remove-item" data-product-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        return div;
    }

    removeFromCart(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
        window.notifications.show('Item removed from cart', 'success');
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            const product = window.products.find(p => p.id === productId);
            if (newQuantity > product.stock) {
                window.notifications.show('Not enough stock available', 'error');
                return;
            }
            if (newQuantity > 0) {
                item.quantity = newQuantity;
            } else {
                this.removeFromCart(productId);
            }
            this.saveCart();
            this.updateCartDisplay();
        }
    }

    updateCartDisplay() {
        const cartItems = document.querySelector('.cart-items');
        const cartTotal = document.getElementById('cartTotal');
        const cartCount = document.querySelector('.cart-count');
        
        // Clear existing items
        cartItems.innerHTML = '';
        
        if (this.items.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <button class="continue-shopping">Continue Shopping</button>
                </div>
            `;
            
            // Add event listener to continue shopping button
            const continueBtn = cartItems.querySelector('.continue-shopping');
            continueBtn.addEventListener('click', () => {
                document.querySelector('.cart-sidebar').classList.remove('open');
            });
        } else {
            // Add each item to the cart display
            this.items.forEach(item => {
                const cartItem = this.createCartItemElement(item);
                cartItems.appendChild(cartItem);
            });
        }
        
        // Update total and count
        const total = this.calculateTotal();
        cartTotal.textContent = `$${total.toFixed(2)}`;
        cartCount.textContent = this.items.length;
        
        // Save cart to localStorage
        this.saveCart();
    }

    calculateTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    proceedToCheckout() {
        if (this.items.length === 0) {
            notifications.show('Your cart is empty!', 'error');
            return;
        }
        window.location.href = 'checkout.html';
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.dispatchCartUpdated();
    }

    dispatchCartUpdated() {
        const event = new CustomEvent('cartUpdated');
        document.dispatchEvent(event);
    }

    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartDisplay();
    }
}

// Initialize cart and make it globally available
document.addEventListener('DOMContentLoaded', () => {
    if (!window.products) {
        console.error('Products array not loaded. Please ensure products.js is loaded before cart.js');
        return;
    }
    window.cart = new ShoppingCart();
});

// Add event listeners for cart item buttons
document.addEventListener('click', (e) => {
    const target = e.target;
    
    // Handle quantity buttons
    if (target.classList.contains('quantity-btn')) {
        const productId = parseInt(target.closest('.cart-item').dataset.id);
        const isIncrease = !target.textContent.includes('-');
        const currentQty = parseInt(target.parentElement.querySelector('.quantity-input').value);
        window.cart.updateQuantity(productId, isIncrease ? currentQty + 1 : currentQty - 1);
    }
    
    // Handle remove buttons
    if (target.classList.contains('remove-item') || target.closest('.remove-item')) {
        const productId = parseInt(target.closest('.cart-item').dataset.id);
        window.cart.removeFromCart(productId);
    }
});

// Initialize close cart button
const closeCartBtn = document.querySelector('.close-cart');
if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => {
        const cartSidebar = document.querySelector('.cart-sidebar');
        const overlay = document.querySelector('.overlay');
        if (cartSidebar) cartSidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('show');
    });
}