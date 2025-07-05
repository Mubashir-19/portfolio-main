// Portfolio JavaScript - Enhanced with modern features and SEO optimizations
document.querySelector('a[href="#home"]').addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  

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
                    let offsetTop;

                    // Special handling for Home button - scroll to very top
                    if (targetId === '#home') {
                        offsetTop = 0;
                    } else {
                        offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    }

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    if (navMenu) {
                        navMenu.classList.remove('active');
                        navToggle.classList.remove('active');
                        document.body.style.overflow = '';
                    }

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
            // contactForm.addEventListener('submit', this.handleContactFormSubmit.bind(this));

            // Add real-time validation
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        }
    }

    // async handleContactFormSubmit(e) {
    //     e.preventDefault();

    //     const form = e.target;
    //     const formData = new FormData(form);
    //     const submitButton = form.querySelector('button[type="submit"]');

    //     // Validate form
    //     if (!this.validateForm(form)) {
    //         return;
    //     }

    //     // Show loading state
    //     const originalText = submitButton.textContent;
    //     submitButton.textContent = 'Sending...';
    //     submitButton.disabled = true;

    //     try {
    //         // Here you would typically send the form data to your backend
    //         // For now, we'll simulate the process
    //         await this.simulateFormSubmission(formData);

    //         // Show success message
    //         this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    //         form.reset();

    //     } catch (error) {
    //         console.error('Form submission error:', error);
    //         this.showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
    //     } finally {
    //         // Restore button state
    //         submitButton.textContent = originalText;
    //         submitButton.disabled = false;
    //     }
    // }

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
        return function () {
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

// Enhanced Horizontal Slider System with Auto-scrolling
class HorizontalSlider {
    constructor() {
        this.sliders = {};
        this.autoScrollIntervals = {};
        console.log('HorizontalSlider constructor called');
        this.init();
    }

    init() {
        console.log('HorizontalSlider init called');
        this.initializeSliders();
        this.setupEventListeners();
        this.startAutoScroll();
    }

    initializeSliders() {
        console.log('Initializing sliders...');
        // Initialize testimonials slider
        this.initializeSlider('testimonials', '.testimonials-slider', '.testimonial-card');

        // Initialize projects slider
        this.initializeSlider('projects', '.projects-slider', '.project-card');

        // Initialize achievements slider
        this.initializeSlider('achievements', '.achievements-slider', '.achievement-card');

        console.log('All sliders initialized:', Object.keys(this.sliders));
    }

    initializeSlider(name, sliderSelector, cardSelector) {
        console.log(`Initializing ${name} slider...`);

        const slider = document.querySelector(sliderSelector);
        const cards = document.querySelectorAll(`${sliderSelector} ${cardSelector}`);
        const container = slider ? slider.closest('.slider-container') : null;
        const dotsContainer = document.querySelector(`.slider-controls .slider-dots[data-slider="${name}"]`);
        const prevBtn = document.querySelector(`.slider-controls .prev-btn[data-slider="${name}"]`);
        const nextBtn = document.querySelector(`.slider-controls .next-btn[data-slider="${name}"]`);

        console.log(`${name} slider elements:`, {
            slider: !!slider,
            cards: cards.length,
            container: !!container,
            dotsContainer: !!dotsContainer,
            prevBtn: !!prevBtn,
            nextBtn: !!nextBtn
        });

        if (!slider || !cards.length) {
            console.warn(`${name} slider: Missing required elements`);
            return;
        }

        // Responsive breakpoints
        const windowWidth = window.innerWidth;
        const mobileBreakpoint = 768;
        const tabletBreakpoint = 1024;

        let cardsPerView;

        // Force 1 card per view on mobile devices
        if (windowWidth < mobileBreakpoint) {
            cardsPerView = 1;
        } else {
            // Calculate how many cards to show at once based on container width for larger screens
            const containerWidth = container ? container.offsetWidth - 64 : slider.parentElement.offsetWidth - 64;
            const cardWidth = cards[0].offsetWidth;
            const gap = 32;
            
            if (windowWidth < tabletBreakpoint) {
                // On tablets, limit to max 2 cards
                cardsPerView = Math.min(2, Math.max(1, Math.floor((containerWidth + gap) / (cardWidth + gap))));
            } else {
                // On desktop, allow more cards
                cardsPerView = Math.max(1, Math.floor((containerWidth + gap) / (cardWidth + gap)));
            }
        }

        console.log(`${name} slider calculations:`, {
            windowWidth,
            cardsPerView,
            totalCards: cards.length,
            isMobile: windowWidth < mobileBreakpoint
        });

        this.sliders[name] = {
            slider,
            cards,
            container,
            dotsContainer,
            prevBtn,
            nextBtn,
            currentIndex: 0,
            cardsPerView,
            totalCards: cards.length,
            maxIndex: Math.max(0, cards.length - cardsPerView),
            isUserInteracting: false,
            autoScrollDirection: 1
        };

        // Create dots
        this.createDots(name);

        // Update initial state
        this.updateSlider(name);
        this.updateControls(name);

        // Add hover pause functionality
        this.setupHoverPause(name);

        console.log(`${name} slider initialized successfully`);
    }

    createDots(name) {
        const sliderData = this.sliders[name];
        if (!sliderData.dotsContainer) {
            console.warn(`${name}: No dots container found`);
            return;
        }

        sliderData.dotsContainer.innerHTML = '';

        const totalDots = Math.max(1, sliderData.maxIndex + 1);
        console.log(`Creating ${totalDots} dots for ${name}`);

        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.className = 'slider-dot';
            dot.setAttribute('data-index', i);
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            if (i === 0) dot.classList.add('active');

            dot.addEventListener('click', () => {
                console.log(`${name}: Dot ${i} clicked`);
                this.pauseAutoScroll(name);
                sliderData.currentIndex = i;
                this.updateSlider(name);
                this.updateControls(name);
                this.resumeAutoScrollAfterDelay(name);
            });

            sliderData.dotsContainer.appendChild(dot);
        }
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');

        // Set up button event listeners
        Object.keys(this.sliders).forEach(name => {
            const sliderData = this.sliders[name];

            if (sliderData.prevBtn) {
                console.log(`Adding click listener to ${name} prev button`);
                sliderData.prevBtn.addEventListener('click', (e) => {
                    console.log(`${name}: Previous button clicked`);
                    e.preventDefault();
                    this.pauseAutoScroll(name);
                    this.previousSlide(name);
                    this.resumeAutoScrollAfterDelay(name);
                });
            } else {
                console.warn(`${name}: No prev button found`);
            }

            if (sliderData.nextBtn) {
                console.log(`Adding click listener to ${name} next button`);
                sliderData.nextBtn.addEventListener('click', (e) => {
                    console.log(`${name}: Next button clicked`);
                    e.preventDefault();
                    this.pauseAutoScroll(name);
                    this.nextSlide(name);
                    this.resumeAutoScrollAfterDelay(name);
                });
            } else {
                console.warn(`${name}: No next button found`);
            }
        });

        // Handle window resize
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // Add touch/swipe support
        this.addTouchSupport();

        // Add intersection observer for auto-scroll optimization
        this.setupIntersectionObserver();

        console.log('Event listeners setup complete');
    }

    setupHoverPause(name) {
        const sliderData = this.sliders[name];

        // Pause auto-scroll on hover
        sliderData.container.addEventListener('mouseenter', () => {
            this.pauseAutoScroll(name);
            sliderData.container.classList.remove('auto-scrolling');
        });

        sliderData.container.addEventListener('mouseleave', () => {
            this.resumeAutoScroll(name);
            sliderData.container.classList.add('auto-scrolling');
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const sliderName = this.getSliderNameFromElement(entry.target);
                if (sliderName) {
                    if (entry.isIntersecting) {
                        this.resumeAutoScroll(sliderName);
                        entry.target.classList.add('auto-scrolling');
                    } else {
                        this.pauseAutoScroll(sliderName);
                        entry.target.classList.remove('auto-scrolling');
                    }
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -10% 0px'
        });

        Object.keys(this.sliders).forEach(name => {
            const container = this.sliders[name].container;
            if (container) {
                observer.observe(container);
            }
        });
    }

    getSliderNameFromElement(element) {
        if (element.querySelector('.testimonials-slider')) return 'testimonials';
        if (element.querySelector('.projects-slider')) return 'projects';
        if (element.querySelector('.achievements-slider')) return 'achievements';
        return null;
    }

    startAutoScroll() {
        Object.keys(this.sliders).forEach(name => {
            this.resumeAutoScroll(name);
        });
    }

    pauseAutoScroll(name) {
        if (this.autoScrollIntervals[name]) {
            clearInterval(this.autoScrollIntervals[name]);
            this.autoScrollIntervals[name] = null;
        }
    }

    resumeAutoScroll(name) {
        this.pauseAutoScroll(name); // Clear any existing interval

        const sliderData = this.sliders[name];
        if (!sliderData || sliderData.maxIndex <= 0) return;

        this.autoScrollIntervals[name] = setInterval(() => {
            if (!sliderData.isUserInteracting) {
                this.autoSlide(name);
            }
        }, 4000); // 4 seconds interval
    }

    resumeAutoScrollAfterDelay(name, delay = 3000) {
        setTimeout(() => {
            this.resumeAutoScroll(name);
        }, delay);
    }

    autoSlide(name) {
        const sliderData = this.sliders[name];

        if (sliderData.autoScrollDirection === 1) {
            // Moving forward
            if (sliderData.currentIndex >= sliderData.maxIndex) {
                // Reached end, reverse direction
                sliderData.autoScrollDirection = -1;
                this.previousSlide(name);
            } else {
                this.nextSlide(name);
            }
        } else {
            // Moving backward
            if (sliderData.currentIndex <= 0) {
                // Reached beginning, reverse direction
                sliderData.autoScrollDirection = 1;
                this.nextSlide(name);
            } else {
                this.previousSlide(name);
            }
        }
    }

    previousSlide(name) {
        const sliderData = this.sliders[name];
        if (sliderData.currentIndex > 0) {
            sliderData.currentIndex--;
            this.updateSlider(name);
            this.updateControls(name);
            console.log(`${name}: Moved to slide ${sliderData.currentIndex}`);
        }
    }

    nextSlide(name) {
        const sliderData = this.sliders[name];
        if (sliderData.currentIndex < sliderData.maxIndex) {
            sliderData.currentIndex++;
            this.updateSlider(name);
            this.updateControls(name);
            console.log(`${name}: Moved to slide ${sliderData.currentIndex}`);
        }
    }
    updateSlider(name) {
        const sliderData = this.sliders[name];
        const isMobile = window.innerWidth < 768;
        
        let translateX;
        if (isMobile) {
            // On mobile, calculate based on actual card width to prevent half-card display
            const cardWidth = sliderData.cards[0].offsetWidth;
            const cardStyle = window.getComputedStyle(sliderData.cards[0]);
            const marginRight = parseFloat(cardStyle.marginRight) || 0;
            const totalCardWidth = cardWidth + marginRight;
            
            translateX = -(sliderData.currentIndex * totalCardWidth);
        } else {
            // On desktop, use card width + gap
            const cardWidth = sliderData.cards[0].offsetWidth;
            const gap = 32; // var(--space-xl)
            translateX = -(sliderData.currentIndex * (cardWidth + gap));
        }
    
        sliderData.slider.style.transform = `translateX(${translateX}px)`;
    
        // Update dots
        if (sliderData.dotsContainer) {
            const dots = sliderData.dotsContainer.querySelectorAll('.slider-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === sliderData.currentIndex);
            });
        }
    
        // Add smooth animation
        sliderData.slider.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }

    updateControls(name) {
        const sliderData = this.sliders[name];

        if (sliderData.prevBtn) {
            sliderData.prevBtn.disabled = sliderData.currentIndex === 0;
            sliderData.prevBtn.style.opacity = sliderData.currentIndex === 0 ? '0.4' : '1';
        }

        if (sliderData.nextBtn) {
            sliderData.nextBtn.disabled = sliderData.currentIndex >= sliderData.maxIndex;
            sliderData.nextBtn.style.opacity = sliderData.currentIndex >= sliderData.maxIndex ? '0.4' : '1';
        }
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

    addTouchSupport() {
        Object.keys(this.sliders).forEach(name => {
            const sliderData = this.sliders[name];
            let startX = 0;
            let currentX = 0;
            let isDragging = false;
    
            sliderData.slider.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                isDragging = true;
                sliderData.isUserInteracting = true;
                this.pauseAutoScroll(name);
            }, { passive: true });
    
            sliderData.slider.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                currentX = e.touches[0].clientX;
    
                // Optional: Add visual feedback during drag
                const diffX = startX - currentX;
                const currentTransform = sliderData.slider.style.transform.match(/translateX\(([^)]+)\)/);
                const currentTranslateX = currentTransform ? parseFloat(currentTransform[1]) : 0;
    
                // Apply drag effect with resistance
                const dragResistance = 0.3;
                sliderData.slider.style.transform = `translateX(${currentTranslateX - (diffX * dragResistance)}px)`;
                sliderData.slider.style.transition = 'none';
            }, { passive: true });
    
            sliderData.slider.addEventListener('touchend', () => {
                if (!isDragging) return;
    
                const diffX = startX - currentX;
                // Dynamic threshold based on device size
                const isMobile = window.innerWidth < 768;
                const threshold = isMobile ? window.innerWidth * 0.15 : 50; // 15% of viewport width on mobile, 50px on desktop
    
                if (Math.abs(diffX) > threshold) {
                    if (diffX > 0 && sliderData.currentIndex < sliderData.maxIndex) {
                        // Swipe left - next slide
                        this.nextSlide(name);
                    } else if (diffX < 0 && sliderData.currentIndex > 0) {
                        // Swipe right - previous slide
                        this.previousSlide(name);
                    } else {
                        // Restore original position
                        this.updateSlider(name);
                    }
                } else {
                    // Restore original position
                    this.updateSlider(name);
                }
    
                isDragging = false;
                sliderData.isUserInteracting = false;
                this.resumeAutoScrollAfterDelay(name, 2000);
            }, { passive: true });
    
            // Set initial cursor
            sliderData.slider.style.cursor = 'grab';
        });
    }
    // Utility function
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

    // Public method to pause all sliders
    pauseAllSliders() {
        Object.keys(this.sliders).forEach(name => {
            this.pauseAutoScroll(name);
        });
    }

    // Public method to resume all sliders
    resumeAllSliders() {
        Object.keys(this.sliders).forEach(name => {
            this.resumeAutoScroll(name);
        });
    }

    // Cleanup method
    destroy() {
        Object.keys(this.autoScrollIntervals).forEach(name => {
            this.pauseAutoScroll(name);
        });
        this.sliders = {};
        this.autoScrollIntervals = {};
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
            switch (hash) {
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

// Years Experience Calculator
class YearsExperienceCalculator {
    constructor() {
        this.startDate = new Date('2022-03-01'); // March 2022
        this.init();
    }

    init() {
        this.calculateAndUpdateYears();
    }

    calculateAndUpdateYears() {
        const currentDate = new Date();
        const yearsExperience = this.calculateYearsDifference(this.startDate, currentDate);

        const yearsElement = document.getElementById('years-experience');
        if (yearsElement) {
            yearsElement.textContent = `${yearsExperience}+`;
        }
    }

    calculateYearsDifference(startDate, endDate) {
        const years = endDate.getFullYear() - startDate.getFullYear();
        const monthDiff = endDate.getMonth() - startDate.getMonth();
        const dayDiff = endDate.getDate() - startDate.getDate();

        // If we haven't reached the anniversary month/day, subtract a year
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            return Math.max(1, years - 1); // Ensure minimum 1 year
        }

        return Math.max(1, years); // Ensure minimum 1 year
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Starting initialization');

    // Initialize all systems
    const portfolioApp = new PortfolioApp();
    const seoEnhancements = new SEOEnhancements();
    const yearsCalculator = new YearsExperienceCalculator();

    // Initialize slider after a short delay to ensure DOM is fully rendered
    setTimeout(() => {
        const horizontalSlider = new HorizontalSlider();
        // Add global reference for debugging/external control
        window.portfolioSliders = horizontalSlider;
        console.log('Portfolio initialized with enhanced auto-scrolling sliders');
    }, 100);
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioApp, SEOEnhancements, YearsExperienceCalculator, HorizontalSlider };
}
