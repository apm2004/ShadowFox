class ReviewManager {
    constructor() {
        this.reviews = storage.get('reviews') || {};
    }

    addReview(productId, review) {
        if (!this.reviews[productId]) {
            this.reviews[productId] = [];
        }

        const newReview = {
            id: Date.now(),
            ...review,
            date: new Date().toISOString(),
            helpful: 0,
            notHelpful: 0
        };

        this.reviews[productId].unshift(newReview);
        storage.set('reviews', this.reviews);
        this.renderReviews(productId);
        return newReview;
    }

    markHelpful(productId, reviewId, isHelpful) {
        const review = this.reviews[productId]?.find(r => r.id === reviewId);
        if (review) {
            if (isHelpful) {
                review.helpful++;
            } else {
                review.notHelpful++;
            }
            storage.set('reviews', this.reviews);
            this.renderReviews(productId);
        }
    }

    getAverageRating(productId) {
        const productReviews = this.reviews[productId] || [];
        if (productReviews.length === 0) return 0;
        
        const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
        return sum / productReviews.length;
    }

    renderReviews(productId) {
        const container = document.querySelector('.product-reviews');
        if (!container) return;

        const productReviews = this.reviews[productId] || [];
        const averageRating = this.getAverageRating(productId);

        container.innerHTML = `
            <div class="reviews-summary">
                <div class="average-rating">
                    <span class="rating-number">${averageRating.toFixed(1)}</span>
                    <div class="stars">${createStarRating(averageRating)}</div>
                    <span class="review-count">${productReviews.length} reviews</span>
                </div>
                <button class="write-review">Write a Review</button>
            </div>
            <div class="reviews-list">
                ${productReviews.map(review => this.createReviewElement(review)).join('')}
            </div>
            <div class="review-form" style="display: none;">
                <h3>Write a Review</h3>
                <form id="reviewForm">
                    <div class="rating-input">
                        ${[5,4,3,2,1].map(num => `
                            <input type="radio" name="rating" value="${num}" id="star${num}">
                            <label for="star${num}"><i class="fas fa-star"></i></label>
                        `).join('')}
                    </div>
                    <div class="form-group">
                        <input type="text" name="title" placeholder="Review Title" required>
                    </div>
                    <div class="form-group">
                        <textarea name="comment" placeholder="Your Review" required></textarea>
                    </div>
                    <button type="submit">Submit Review</button>
                </form>
            </div>
        `;

        this.attachReviewEventListeners(productId);
    }

    createReviewElement(review) {
        return `
            <div class="review-item">
                <div class="review-header">
                    <div class="stars">${createStarRating(review.rating)}</div>
                    <span class="review-date">${new Date(review.date).toLocaleDateString()}</span>
                </div>
                <h4>${review.title}</h4>
                <p>${review.comment}</p>
                <div class="review-footer">
                    <div class="helpful-buttons">
                        <span>Was this helpful?</span>
                        <button onclick="reviewManager.markHelpful(${review.productId}, ${review.id}, true)">
                            <i class="fas fa-thumbs-up"></i> ${review.helpful}
                        </button>
                        <button onclick="reviewManager.markHelpful(${review.productId}, ${review.id}, false)">
                            <i class="fas fa-thumbs-down"></i> ${review.notHelpful}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    attachReviewEventListeners(productId) {
        const writeReviewBtn = document.querySelector('.write-review');
        const reviewForm = document.querySelector('.review-form');
        const form = document.getElementById('reviewForm');

        if (writeReviewBtn) {
            writeReviewBtn.addEventListener('click', () => {
                reviewForm.style.display = 'block';
                writeReviewBtn.style.display = 'none';
            });
        }

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                const review = {
                    productId,
                    rating: Number(formData.get('rating')),
                    title: formData.get('title'),
                    comment: formData.get('comment')
                };
                this.addReview(productId, review);
                form.reset();
                reviewForm.style.display = 'none';
                writeReviewBtn.style.display = 'block';
            });
        }
    }
}

// Initialize review manager
const reviewManager = new ReviewManager();