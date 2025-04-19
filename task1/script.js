// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Scroll to top button
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '↑';
scrollButton.className = 'scroll-top';
document.body.appendChild(scrollButton);

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show/hide scroll button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollButton.style.display = 'block';
    } else {
        scrollButton.style.display = 'none';
    }
});

// Enhanced animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-aos]');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight * 0.8; // Trigger animation when element is 80% in view
        
        if (elementPosition < screenPosition) {
            element.classList.add('aos-animate');
        }
    });
};

// Add smooth reveal animation for sections
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('revealed');
        }
    });
};

// Initialize animations
window.addEventListener('scroll', () => {
    animateOnScroll();
    revealSections();
});
window.addEventListener('load', () => {
    animateOnScroll();
    revealSections();
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .scroll-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(to right, #282e72, #3c568b);
        color: #6196c5;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        display: none;
        font-size: 20px;
        z-index: 999;
        transition: background 0.3s ease, transform 0.3s ease;
    }
    
    .scroll-top:hover {
        background: linear-gradient(to right, #3c568b, #6196c5);
        transform: translateY(-3px);
    }
    
    /* Enhanced animations */
    [data-aos] {
        opacity: 0;
        transition-property: opacity, transform;
        transition-duration: 0.8s;
        transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    [data-aos="fade-up"] {
        transform: translateY(50px);
    }
    
    [data-aos="fade-down"] {
        transform: translateY(-50px);
    }
    
    [data-aos="fade-left"] {
        transform: translateX(50px);
    }
    
    [data-aos="fade-right"] {
        transform: translateX(-50px);
    }
    
    [data-aos="zoom-in"] {
        transform: scale(0.9);
    }
    
    [data-aos].aos-animate {
        opacity: 1;
        transform: translate(0) scale(1);
    }
    
    /* Section reveal animations */
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Staggered animations for project and skill cards */
    .project-card, .skill-card {
        transition-delay: calc(var(--animation-order, 0) * 0.1s);
    }
    
    @media (max-width: 768px) {
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #14152a, #1b204d);
            padding: 20px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        }
        
        .nav-links.active li {
            margin: 10px 0;
        }
        
        .hamburger.active {
            transform: rotate(90deg);
        }
    }
`;
document.head.appendChild(style);

// Add animation order to cards for staggered effect
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    const skillCards = document.querySelectorAll('.skill-card');
    
    projectCards.forEach((card, index) => {
        card.style.setProperty('--animation-order', index);
    });
    
    skillCards.forEach((card, index) => {
        card.style.setProperty('--animation-order', index);
    });
}); 