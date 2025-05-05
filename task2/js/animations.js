class AnimationController {
    static slideIn(element, direction = 'right', duration = 300) {
        element.style.transition = `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        element.style.transform = `translate${direction === 'right' ? 'X' : 'Y'}(100%)`;
        
        requestAnimationFrame(() => {
            element.style.transform = 'translate(0)';
        });
    }

    static slideOut(element, direction = 'right', duration = 300) {
        element.style.transition = `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        element.style.transform = 'translate(0)';
        
        requestAnimationFrame(() => {
            element.style.transform = `translate${direction === 'right' ? 'X' : 'Y'}(100%)`;
        });

        return new Promise(resolve => setTimeout(resolve, duration));
    }

    static fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease`;
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
        });
    }

    static fadeOut(element, duration = 300) {
        element.style.transition = `opacity ${duration}ms ease`;
        element.style.opacity = '0';
        
        return new Promise(resolve => setTimeout(resolve, duration));
    }

    static staggerChildren(parent, childSelector, staggerDelay = 50) {
        const children = parent.querySelectorAll(childSelector);
        
        children.forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                child.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
            }, index * staggerDelay);
        });
    }

    static ripple(event, element) {
        const rect = element.getBoundingClientRect();
        const ripple = document.createElement('div');
        
        ripple.className = 'ripple';
        ripple.style.position = 'absolute';
        ripple.style.width = '5px';
        ripple.style.height = '5px';
        ripple.style.background = 'rgba(255, 255, 255, 0.4)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(1)';
        ripple.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
        
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        element.appendChild(ripple);
        
        requestAnimationFrame(() => {
            const maxDimension = Math.max(element.offsetWidth, element.offsetHeight);
            ripple.style.transform = `scale(${maxDimension * 2})`;
            ripple.style.opacity = '0';
        });
        
        setTimeout(() => ripple.remove(), 600);
    }

    static shake(element, intensity = 5, duration = 500) {
        const original = element.style.transform || '';
        const steps = 5;
        const interval = duration / steps;

        const shakeSequence = [...Array(steps)].map((_, i) => {
            const direction = i % 2 === 0 ? 1 : -1;
            const magnitude = intensity * (1 - i / steps);
            return `translateX(${magnitude * direction}px)`;
        });

        shakeSequence.forEach((transform, i) => {
            setTimeout(() => {
                element.style.transform = transform;
            }, interval * i);
        });

        setTimeout(() => {
            element.style.transform = original;
        }, duration);
    }

    static pulse(element, scale = 1.05, duration = 200) {
        element.style.transition = `transform ${duration}ms ease`;
        element.style.transform = `scale(${scale})`;
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, duration);
    }
}

// Add ripple effect to all buttons with 'button-ripple' class
document.addEventListener('click', (e) => {
    const target = e.target.closest('.button-ripple');
    if (target) {
        AnimationController.ripple(e, target);
    }
});