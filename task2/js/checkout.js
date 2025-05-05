// Initialize checkout process
document.addEventListener('DOMContentLoaded', () => {
    if (!window.products) {
        console.error('Products array not loaded. Please ensure products.js is loaded before checkout.js');
        return;
    }
    if (!window.cart) {
        console.error('Cart not initialized. Please ensure cart.js is loaded before checkout.js');
        return;
    }
    
    // Load order summary
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

// Load order summary from cart
function loadOrderSummary() {
    const orderItems = document.getElementById('orderItems');
    const sidebarOrderItems = document.getElementById('sidebarOrderItems');
    
    if (!window.cart || !window.products) {
        console.error('Cart or products not initialized');
        return;
    }

    const items = window.cart.items;

    // Clear existing items
    orderItems.innerHTML = '';
    sidebarOrderItems.innerHTML = '';

    if (!items || items.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-cart-message';
        emptyMessage.innerHTML = '<p>Your cart is empty</p>';
        orderItems.appendChild(emptyMessage);
        sidebarOrderItems.appendChild(emptyMessage.cloneNode(true));
        updateTotals();
        return;
    }

    // Add each item to both summaries
    items.forEach(item => {
        const product = window.products.find(p => p.id === item.id);
        if (product) {
            const itemElement = createOrderItemElement(product, item.quantity);
            orderItems.appendChild(itemElement.cloneNode(true));
            sidebarOrderItems.appendChild(itemElement);
        } else {
            console.error('Product not found:', item.id);
        }
    });

    // Update totals
    updateTotals();
}

// Create order item element
function createOrderItemElement(product, quantity) {
    const itemElement = document.createElement('div');
    itemElement.className = 'order-item';
    itemElement.innerHTML = `
        <div class="item-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="item-details">
            <h4>${product.name}</h4>
            <p>Quantity: ${quantity}</p>
            <p>Price: $${product.price.toFixed(2)}</p>
        </div>
        <div class="item-price">
            $${(product.price * quantity).toFixed(2)}
        </div>
    `;
    return itemElement;
}

// Update all totals in the checkout page
function updateTotals() {
    if (!window.cart) {
        console.error('Cart not initialized');
        return;
    }

    const subtotal = window.cart.calculateTotal();
    const shipping = getSelectedShippingCost();
    const tax = calculateTax(subtotal);
    const total = subtotal + shipping + tax;

    // Update main totals
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;

    // Update sidebar totals
    document.getElementById('sidebarSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('sidebarShipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('sidebarTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('sidebarTotal').textContent = `$${total.toFixed(2)}`;
}

// Get selected shipping cost
function getSelectedShippingCost() {
    const selectedShipping = document.querySelector('input[name="shipping"]:checked');
    return selectedShipping.value === 'express' ? 9.99 : 0;
}

// Calculate tax (8% for this example)
function calculateTax(subtotal) {
    return subtotal * 0.08;
}

// Setup form validation
function setupFormValidation() {
    const checkoutForm = document.getElementById('checkoutForm');
    const paymentForm = document.getElementById('paymentForm');

    // Shipping form validation
    checkoutForm.addEventListener('input', (e) => {
        const input = e.target;
        if (input.required && !input.value) {
            input.classList.add('invalid');
        } else {
            input.classList.remove('invalid');
        }
    });

    // Payment form validation
    paymentForm.addEventListener('input', (e) => {
        const input = e.target;
        if (input.required && !input.value) {
            input.classList.add('invalid');
        } else {
            input.classList.remove('invalid');
        }
    });

    // Card number formatting
    const cardNumber = document.getElementById('cardNumber');
    cardNumber.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})/g, '$1 ').trim();
        e.target.value = value;
    });

    // Expiry date formatting
    const expiry = document.getElementById('expiry');
    expiry.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });
}

// Navigation between checkout steps
function proceedToPayment() {
    const checkoutForm = document.getElementById('checkoutForm');
    const paymentForm = document.getElementById('paymentForm');
    
    // Validate shipping form
    const requiredInputs = checkoutForm.querySelectorAll('input[required]');
    let isValid = true;
    
    requiredInputs.forEach(input => {
        if (!input.value) {
            input.classList.add('invalid');
            isValid = false;
        }
    });

    if (!isValid) {
        showNotification('Please fill in all required shipping information', 'error');
        return;
    }

    // Update shipping details in review section
    updateShippingDetails();

    // Switch to payment form
    checkoutForm.classList.remove('active');
    paymentForm.classList.add('active');
    updateStepProgress(2);
}

function backToShipping() {
    const checkoutForm = document.getElementById('checkoutForm');
    const paymentForm = document.getElementById('paymentForm');
    
    checkoutForm.classList.add('active');
    paymentForm.classList.remove('active');
    updateStepProgress(1);
}

function proceedToReview() {
    const paymentForm = document.getElementById('paymentForm');
    const reviewForm = document.getElementById('reviewForm');
    
    // Validate payment form
    const requiredInputs = paymentForm.querySelectorAll('input[required]');
    let isValid = true;
    
    requiredInputs.forEach(input => {
        if (!input.value) {
            input.classList.add('invalid');
            isValid = false;
        }
    });

    if (!isValid) {
        showNotification('Please fill in all required payment information', 'error');
        return;
    }

    // Switch to review form
    paymentForm.classList.remove('active');
    reviewForm.classList.add('active');
    updateStepProgress(3);
}

function backToPayment() {
    const paymentForm = document.getElementById('paymentForm');
    const reviewForm = document.getElementById('reviewForm');
    
    paymentForm.classList.add('active');
    reviewForm.classList.remove('active');
    updateStepProgress(2);
}

// Update step progress indicator
function updateStepProgress(step) {
    const steps = document.querySelectorAll('.step');
    steps.forEach((s, index) => {
        if (index < step) {
            s.classList.add('completed');
            s.classList.add('active');
        } else if (index === step) {
            s.classList.add('active');
            s.classList.remove('completed');
        } else {
            s.classList.remove('active');
            s.classList.remove('completed');
        }
    });
}

// Update shipping details in review section
function updateShippingDetails() {
    const shippingDetails = document.getElementById('shippingDetails');
    const formData = new FormData(document.getElementById('checkoutForm'));
    
    const details = `
        <div class="shipping-address">
            <p><strong>${formData.get('fullName')}</strong></p>
            <p>${formData.get('address')}</p>
            <p>${formData.get('city')}, ${formData.get('state')} ${formData.get('zip')}</p>
            <p>${formData.get('email')}</p>
            <p>${formData.get('phone')}</p>
        </div>
        <div class="shipping-method">
            <p><strong>Shipping Method:</strong> ${document.querySelector('input[name="shipping"]:checked').value === 'express' ? 'Express Shipping' : 'Standard Shipping'}</p>
        </div>
    `;
    
    shippingDetails.innerHTML = details;
}

// Complete purchase
function completePurchase() {
    if (window.cart.items.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }

    // Store order total for confirmation page
    const total = parseFloat(document.getElementById('total').textContent.replace('$', ''));
    localStorage.setItem('lastOrderTotal', total);

    // Clear cart
    window.cart.clearCart();

    // Redirect to confirmation page
    window.location.href = 'order-confirmation.html';
}

// Listen for shipping method changes
document.querySelectorAll('input[name="shipping"]').forEach(input => {
    input.addEventListener('change', updateTotals);
}); 