// Portfolio JavaScript - Enhanced with modern features and SEO optimizations

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.initializeNavigation();
        this.initializeContactForm();
        this.initializeLazyLoading();
        this.initializePerformanceOptimizations();
    }

    setupEventListeners() {
        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.handleDOMReady();
        });

        // Handle window load for performance metrics
        window.addEventListener('load', () => {
            this.trackPerformanceMetrics();
        });

        // Handle scroll events with throttling
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));

        // Handle resize events with debouncing
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));
    }

    handleDOMReady() {
        // Initialize components that require DOM
        this.updateCopyrightYear();
        this.initializeScrollToTop();
        this.preloadCriticalImages();
        
        // Add loading complete class
        document.body.classList.add('loaded');
    }

    // Navigation functionality
    initializeNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
                
                // Update ARIA attributes for accessibility
                const isOpen = navMenu.classList.contains('active');
                navToggle.setAttribute('aria-expanded', isOpen);
                navMenu.setAttribute('aria-hidden', !isOpen);
                
                // Prevent body scroll when menu is open
                document.body.style.overflow = isOpen ? 'hidden' : '';
            });
        }

        // Smooth scroll for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    // Update URL without triggering navigation
                    history.pushState(null, '', targetId);
                }
            });
        });

        // Active section highlighting
        this.updateActiveNavLink();
    }

    // Scroll handling with navbar transparency and active section detection
    handleScroll() {
        const navbar = document.getElementById('navbar');
        const scrolled = window.pageYOffset;

        // Update navbar background opacity based on scroll with enhanced blur effects
        if (navbar) {
            if (scrolled > 50) {
                navbar.classList.add('scrolled');
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(30px)';
                navbar.style.webkitBackdropFilter = 'blur(30px)';
                navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
            } else {
                navbar.classList.remove('scrolled');
                navbar.style.background = 'rgba(255, 255, 255, 0.8)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.webkitBackdropFilter = 'blur(20px)';
                navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
            }
        }

        // Update active navigation link
        this.updateActiveNavLink();

        // Trigger scroll animations
        this.triggerScrollAnimations();

        // Add parallax effect to hero decoration
        this.updateParallaxEffects(scrolled);
    }

    updateParallaxEffects(scrolled) {
        const heroDecoration = document.querySelector('.hero-decoration');
        if (heroDecoration) {
            const parallaxSpeed = 0.5;
            heroDecoration.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }

        // Add floating animation to signature name on scroll
        const signatureName = document.querySelector('.signature-name');
        if (signatureName && scrolled > 100) {
            signatureName.style.transform = 'scale(0.9)';
        } else if (signatureName) {
            signatureName.style.transform = 'scale(1)';
        }
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Animation system
    initializeAnimations() {
        // Create intersection observer for scroll animations
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Add staggered animation for child elements
                    const children = entry.target.querySelectorAll('[data-animate]');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            });
        }, this.observerOptions);

        // Observe elements for animations
        const animateElements = document.querySelectorAll('.project-card, .skill-category, .achievement-card, .timeline-item, .highlight-item');
        animateElements.forEach(el => {
            el.setAttribute('data-animate', '');
            this.observer.observe(el);
        });
    }

    triggerScrollAnimations() {
        // Additional scroll-based animations can be added here
        const scrollProgress = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
        
        // Update any progress indicators
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            bar.style.width = `${scrollProgress * 100}%`;
        });
    }

    // Contact form functionality
    initializeContactForm() {
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleContactFormSubmit.bind(this));
            
            // Add real-time validation
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        }
    }

    async handleContactFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Validate form
        if (!this.validateForm(form)) {
            return;
        }

        // Show loading state
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            // Here you would typically send the form data to your backend
            // For now, we'll simulate the process
            await this.simulateFormSubmission(formData);
            
            // Show success message
            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            // Restore button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }

    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required.';
        }
        // Email validation
        else if (fieldType === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        }
        // Minimum length validation
        else if (field.name === 'message' && value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long.';
        }

        this.setFieldValidation(field, isValid, errorMessage);
        return isValid;
    }

    setFieldValidation(field, isValid, errorMessage) {
        const existingError = field.parentNode.querySelector('.field-error');
        
        if (existingError) {
            existingError.remove();
        }

        if (!isValid) {
            field.classList.add('error');
            const errorElement = document.createElement('span');
            errorElement.className = 'field-error';
            errorElement.textContent = errorMessage;
            errorElement.style.color = 'var(--error-color, #ef4444)';
            errorElement.style.fontSize = 'var(--text-sm)';
            errorElement.style.marginTop = 'var(--space-xs)';
            errorElement.style.display = 'block';
            field.parentNode.appendChild(errorElement);
        } else {
            field.classList.remove('error');
        }
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    async simulateFormSubmission(formData) {
        // Simulate API call delay
        return new Promise((resolve) => {
            setTimeout(() => {
                // Log form data for development
                console.log('Form submission data:');
                for (let [key, value] of formData.entries()) {
                    console.log(`${key}: ${value}`);
                }
                resolve();
            }, 1500);
        });
    }

    // Notification system
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: 'var(--space-md) var(--space-lg)',
            backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : 'var(--primary-blue)',
            color: 'white',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-large)',
            zIndex: '10000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px',
            wordWrap: 'break-word'
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // Lazy loading for images
    initializeLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.add('loaded');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            // Observe all images with data-src attribute
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    // Performance optimizations
    initializePerformanceOptimizations() {
        // Preload critical resources
        this.preloadCriticalResources();
        
        // Initialize service worker if available
        if ('serviceWorker' in navigator) {
            this.registerServiceWorker();
        }
    }

    preloadCriticalResources() {
        // Preload important images that will be needed soon
        const criticalImages = [
            '/images/profile.jpg',
            '/images/hero-bg.jpg'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    preloadCriticalImages() {
        // This would typically preload actual images
        // For now, we'll just log that this function ran
        console.log('Critical images preloaded');
    }

    async registerServiceWorker() {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('ServiceWorker registration successful:', registration);
        } catch (error) {
            console.log('ServiceWorker registration failed:', error);
        }
    }

    trackPerformanceMetrics() {
        // Track Core Web Vitals and other performance metrics
        if ('PerformanceObserver' in window) {
            // Largest Contentful Paint
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'largest-contentful-paint') {
                        console.log('LCP:', entry.startTime);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
    }

    // Utility functions
    initializeScrollToTop() {
        // Create scroll to top button
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.innerHTML = '↑';
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
        
        Object.assign(scrollToTopBtn.style, {
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: 'none',
            background: 'var(--gradient-primary)',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-large)',
            zIndex: '1000',
            opacity: '0',
            transform: 'scale(0)',
            transition: 'all 0.3s ease'
        });

        document.body.appendChild(scrollToTopBtn);

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.transform = 'scale(1)';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.transform = 'scale(0)';
            }
        });

        // Scroll to top functionality
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    updateCopyrightYear() {
        const currentYear = new Date().getFullYear();
        const copyrightElements = document.querySelectorAll('.copyright-year');
        copyrightElements.forEach(el => {
            el.textContent = currentYear;
        });
    }

    handleResize() {
        // Handle responsive adjustments
        const mobileBreakpoint = 768;
        const isMobile = window.innerWidth < mobileBreakpoint;
        
        // Close mobile menu on resize to desktop
        if (!isMobile) {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }

    // Utility functions for performance
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, wait) {
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
}

// Additional SEO and Performance enhancements
class SEOEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.addStructuredData();
        this.optimizeImages();
        this.addOpenGraphTags();
        this.improveAccessibility();
    }

    addStructuredData() {
        // Additional structured data for projects and skills
        const projectsData = {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Mubashir Ahmed's Projects",
            "itemListElement": []
        };

        // This would be populated with actual project data
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(projectsData);
        document.head.appendChild(script);
    }

    optimizeImages() {
        // Add loading="lazy" to images below the fold
        const images = document.querySelectorAll('img');
        images.forEach((img, index) => {
            if (index > 2) { // Skip first few images which are likely above fold
                img.loading = 'lazy';
            }
        });
    }

    addOpenGraphTags() {
        // Dynamically update Open Graph tags based on current section
        const updateOGTags = (title, description) => {
            let ogTitle = document.querySelector('meta[property="og:title"]');
            let ogDesc = document.querySelector('meta[property="og:description"]');
            
            if (ogTitle) ogTitle.content = title;
            if (ogDesc) ogDesc.content = description;
        };

        // This could be called when navigating between sections
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash;
            switch(hash) {
                case '#projects':
                    updateOGTags(
                        'Projects - Mubashir Ahmed',
                        'Explore my latest AI and web development projects including chatbots, SaaS applications, and more.'
                    );
                    break;
                case '#about':
                    updateOGTags(
                        'About - Mubashir Ahmed',
                        'Learn about my journey as an AI Engineer and Full Stack Developer from Karachi, Pakistan.'
                    );
                    break;
            }
        });
    }

    improveAccessibility() {
        // Add skip links for keyboard navigation
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        
        Object.assign(skipLink.style, {
            position: 'absolute',
            top: '-40px',
            left: '6px',
            background: 'var(--primary-blue)',
            color: 'white',
            padding: '8px',
            textDecoration: 'none',
            borderRadius: '4px',
            zIndex: '10000'
        });

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add main content landmark
        const mainContent = document.querySelector('main') || document.querySelector('.hero');
        if (mainContent) {
            mainContent.id = 'main-content';
        }
    }
}

// // Initialize the application
// const portfolioApp = new PortfolioApp();
// const seoEnhancements = new SEOEnhancements();

// // Export for potential module usage
// if (typeof module !== 'undefined' && module.exports) {
//     module.exports = { PortfolioApp, SEOEnhancements };
// }
