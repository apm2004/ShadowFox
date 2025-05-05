// Checkout-specific initialization
document.addEventListener('DOMContentLoaded', () => {
    if (!window.products) {
        console.error('Products array not loaded. Please ensure products.js is loaded before checkout-init.js');
        return;
    }

    // Initialize cart if not already initialized
    if (!window.cart) {
        window.cart = new ShoppingCart();
    }

    // Add event listener for cart updates
    document.addEventListener('cartUpdated', () => {
        loadOrderSummary();
    });

    // Load initial order summary
    loadOrderSummary();
    
    // Initialize form validation
    initializeFormValidation();
    
    // Initialize navigation
    initializeNavigation();
    
    // Add event listener for shipping method changes
    const shippingMethods = document.querySelectorAll('input[name="shipping"]');
    shippingMethods.forEach(method => {
        method.addEventListener('change', () => {
            updateTotals();
        });
    });
}); 