class ProductFilter {
    constructor() {
        this.filters = {
            categories: new Set(),
            priceRange: { min: 0, max: 2000 },
            rating: 0,
            searchTerm: ''
        };
        this.initializeFilters();
        this.lastRender = 0;
    }

    initializeFilters() {
        // Initialize price slider
        const priceRange = document.getElementById('priceRange');
        const minPrice = document.getElementById('minPrice');
        const maxPrice = document.getElementById('maxPrice');

        const prices = products.map(p => p.price);
        const minProductPrice = Math.floor(Math.min(...prices));
        const maxProductPrice = Math.ceil(Math.max(...prices));

        // Set initial values
        minPrice.value = minProductPrice;
        maxPrice.value = maxProductPrice;
        priceRange.min = minProductPrice;
        priceRange.max = maxProductPrice;
        priceRange.value = maxProductPrice;

        // Price range events
        [minPrice, maxPrice, priceRange].forEach(element => {
            element.addEventListener('input', (e) => {
                if (e.target === priceRange) {
                    maxPrice.value = e.target.value;
                }
                
                this.filters.priceRange = {
                    min: Number(minPrice.value),
                    max: Number(maxPrice.value)
                };
                
                this.debouncedApplyFilters();
            });
        });

        // Category filters with animation
        document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const label = checkbox.parentElement;
                label.style.transition = 'transform 0.2s ease';
                label.style.transform = 'scale(1.05)';
                
                setTimeout(() => {
                    label.style.transform = 'scale(1)';
                }, 200);

                if (checkbox.checked) {
                    this.filters.categories.add(checkbox.value);
                } else {
                    this.filters.categories.delete(checkbox.value);
                }
                
                this.applyFilters();
            });
        });

        // Rating filter
        document.querySelectorAll('.filter-options input[name="rating"]').forEach(radio => {
            radio.addEventListener('change', () => {
                this.filters.rating = Number(radio.value);
                this.applyFilters();
            });
        });

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.filters.searchTerm = e.target.value.toLowerCase();
            this.debouncedApplyFilters();
        });

        // Sort functionality with animation
        const sortSelect = document.getElementById('sortSelect');
        sortSelect.addEventListener('change', (e) => {
            const container = document.getElementById('productsContainer');
            container.style.opacity = '0.5';
            
            setTimeout(() => {
                this.sortProducts(e.target.value);
                container.style.opacity = '1';
            }, 300);
        });

        // View toggle with smooth transition
        this.initializeViewToggle();
    }

    debouncedApplyFilters = debounce(() => {
        this.applyFilters();
    }, 300);

    applyFilters() {
        if (Date.now() - this.lastRender < 16) return; // Skip if less than 16ms (60fps)
        this.lastRender = Date.now();

        loader.show('Updating results...');
        
        setTimeout(() => {
            let filteredProducts = [...products];

            // Apply search filter
            if (this.filters.searchTerm) {
                filteredProducts = filteredProducts.filter(product => 
                    product.name.toLowerCase().includes(this.filters.searchTerm) ||
                    product.description.toLowerCase().includes(this.filters.searchTerm)
                );
            }

            // Apply category filter
            if (this.filters.categories.size > 0) {
                filteredProducts = filteredProducts.filter(product => 
                    this.filters.categories.has(product.category)
                );
            }

            // Apply price range filter
            filteredProducts = filteredProducts.filter(product => 
                product.price >= this.filters.priceRange.min &&
                product.price <= this.filters.priceRange.max
            );

            // Apply rating filter
            if (this.filters.rating > 0) {
                filteredProducts = filteredProducts.filter(product => 
                    product.rating >= this.filters.rating
                );
            }

            this.renderProducts(filteredProducts);
            loader.hide();

            // Show no results message if needed
            const container = document.getElementById('productsContainer');
            if (filteredProducts.length === 0) {
                container.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-search"></i>
                        <p>No products found matching your criteria</p>
                        <button onclick="productFilter.resetFilters()" class="reset-filters">
                            Reset Filters
                        </button>
                    </div>
                `;
            }
        }, 300);
    }

    renderProducts(products) {
        const container = document.getElementById('productsContainer');
        const fragment = document.createDocumentFragment();
        
        products.forEach((product, index) => {
            const card = createProductCard(product);
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            fragment.appendChild(card);
            
            // Stagger animation
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        });
        
        container.innerHTML = '';
        container.appendChild(fragment);
    }

    sortProducts(criteria) {
        const productsToSort = [...products];
        
        switch(criteria) {
            case 'price-low':
                productsToSort.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                productsToSort.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                productsToSort.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                productsToSort.sort((a, b) => b.id - a.id);
                break;
        }
        
        this.renderProducts(productsToSort);
    }

    resetFilters() {
        // Reset all filter inputs
        document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        document.querySelectorAll('.filter-options input[name="rating"]').forEach(radio => {
            radio.checked = false;
        });
        
        document.getElementById('searchInput').value = '';
        
        // Reset filter state
        this.filters = {
            categories: new Set(),
            priceRange: { 
                min: Math.min(...products.map(p => p.price)),
                max: Math.max(...products.map(p => p.price))
            },
            rating: 0,
            searchTerm: ''
        };
        
        // Update UI
        this.applyFilters();
        notifications.show('Filters have been reset', 'info');
    }

    initializeViewToggle() {
        const gridView = document.querySelector('.grid-view');
        const listView = document.querySelector('.list-view');
        const container = document.getElementById('productsContainer');

        [gridView, listView].forEach(button => {
            button.addEventListener('click', () => {
                const isGrid = button === gridView;
                
                // Animate transition
                container.style.opacity = '0';
                container.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    container.className = isGrid ? 'products-grid' : 'products-list';
                    gridView.classList.toggle('active', isGrid);
                    listView.classList.toggle('active', !isGrid);
                    
                    container.style.opacity = '1';
                    container.style.transform = 'scale(1)';
                }, 300);
            });
        });
    }
}

// Initialize filters
const productFilter = new ProductFilter();