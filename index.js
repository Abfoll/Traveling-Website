document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        menuToggle.innerHTML = menu.classList.contains('active') ? 
            '<i class="ri-close-line"></i>' : '<i class="ri-menu-line"></i>';
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.menu-item a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            menuToggle.innerHTML = '<i class="ri-menu-line"></i>';
        });
    });
    
    // Destination slider functionality
    const destinationGrid = document.querySelector('.destination-grid');
    const navArrows = document.querySelectorAll('.nav-arrows span');
    const cards = document.querySelectorAll('.destination-grid .card');
    
    let currentSlide = 0;
    const totalSlides = cards.length;
    
    navArrows.forEach(arrow => {
        arrow.addEventListener('click', () => {
            if (arrow.classList.contains('ri-arrow-left-s-line')) {
                currentSlide = (currentSlide > 0) ? currentSlide - 1 : totalSlides - 1;
            } else {
                currentSlide = (currentSlide < totalSlides - 1) ? currentSlide + 1 : 0;
            }
            
            const slideWidth = cards[0].offsetWidth;
            destinationGrid.style.transform = `translateX(-${currentSlide * (slideWidth + 32)}px)`;
        });
    });
    
    // Auto-scroll for mobile
    if (window.innerWidth < 768) {
        let startX, moveX;
        let isDragging = false;
        
        destinationGrid.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        destinationGrid.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            moveX = e.touches[0].clientX;
            const diff = startX - moveX;
            destinationGrid.style.transform = `translateX(calc(-${currentSlide * 100}% - ${diff}px)`;
        });
        
        destinationGrid.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const diff = startX - moveX;
            if (Math.abs(diff) > 50) {
                if (diff > 0 && currentSlide < totalSlides - 1) {
                    currentSlide++;
                } else if (diff < 0 && currentSlide > 0) {
                    currentSlide--;
                }
            }
            
            destinationGrid.style.transform = `translateX(-${currentSlide * 100}%)`;
        });
    }
    
    // Form submission
    const subscribeForm = document.querySelector('.subscribe-form form');
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = subscribeForm.querySelector('input');
        const email = emailInput.value;
        
        if (email && validateEmail(email)) {
            alert(`Thank you for subscribing with ${email}! We'll keep you updated.`);
            subscribeForm.reset();
        } else {
            alert('Please enter a valid email address.');
            emailInput.focus();
        }
    });
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Responsive adjustments
    function handleResponsiveChanges() {
        const tripsGrid = document.querySelector('.trips-grid');
        const galleryContainer = document.querySelector('.gallery-container');
        const footerContainer = document.querySelector('.footer-container');
        
        if (window.innerWidth < 768) {
            // Adjust trips grid for mobile
            tripsGrid.style.gridTemplateColumns = '1fr';
            
            // Adjust gallery layout
            galleryContainer.style.gridTemplateColumns = '1fr';
            
            // Adjust footer layout
            footerContainer.style.gridTemplateColumns = '1fr';
        } else if (window.innerWidth < 900) {
            // Adjust trips grid for tablet
            tripsGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
            
            // Adjust gallery layout
            galleryContainer.style.gridTemplateColumns = '1fr';
            
            // Adjust footer layout
            footerContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else {
            // Reset to original layout for desktop
            tripsGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            galleryContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
            footerContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
        }
    }
    
    // Initial call and event listener for resize
    handleResponsiveChanges();
    window.addEventListener('resize', handleResponsiveChanges);
    
    // Add hover effects for cards
    document.querySelectorAll('.card, .trip-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Book now button functionality
    document.querySelectorAll('.book-btn').forEach(button => {
        button.addEventListener('click', function() {
            const tripCard = this.closest('.trip-card');
            const destination = tripCard.querySelector('p').textContent;
            const price = tripCard.querySelector('.price').textContent;
            
            alert(`You're booking a trip to ${destination} ${price}. Our team will contact you shortly!`);
        });
    });
    
    // Contact us button functionality
    document.querySelector('nav .btn').addEventListener('click', () => {
        alert('Please email us at info@pathway.com or call +91 9876543210');
    });
    
    // Plan a trip button functionality
    document.querySelector('.hero-content .btn').addEventListener('click', () => {
        window.scrollTo({
            top: document.querySelector('#destinations').offsetTop - 80,
            behavior: 'smooth'
        });
    });
    
    // View all buttons functionality
    document.querySelectorAll('.btn:not(.book-btn):not(nav .btn):not(.hero-content .btn)').forEach(button => {
        if (button.textContent.trim() === 'View All') {
            button.addEventListener('click', () => {
                window.scrollTo({
                    top: document.querySelector('#destinations').offsetTop - 80,
                    behavior: 'smooth'
                });
            });
        }
    });
});