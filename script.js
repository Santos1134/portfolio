// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger
    const bars = hamburger.querySelectorAll('.bar');
    bars[0].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(-5px, 6px)' : 'none';
    bars[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    bars[2].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(-5px, -6px)' : 'none';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const bars = hamburger.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Portfolio Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');

            if (filterValue === 'all' || category === filterValue) {
                item.classList.remove('hide');
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.classList.add('hide');
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections and cards
document.querySelectorAll('.portfolio-item, .service-card, .skill-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            formMessage.textContent = 'Thank you! Your message has been sent successfully.';
            formMessage.style.color = '#10b981';
            formMessage.style.display = 'block';
            contactForm.reset();
        } else {
            formMessage.textContent = 'Oops! Something went wrong. Please try again.';
            formMessage.style.color = '#ef4444';
            formMessage.style.display = 'block';
        }
    } catch (error) {
        formMessage.textContent = 'Error sending message. Please try again later.';
        formMessage.style.color = '#ef4444';
        formMessage.style.display = 'block';
    }

    // Reset button state
    submitButton.textContent = originalButtonText;
    submitButton.disabled = false;

    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
});

// Add hover effect to portfolio items
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Initialize: Show all portfolio items by default
document.addEventListener('DOMContentLoaded', () => {
    portfolioItems.forEach(item => {
        item.style.display = 'block';
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
    });
});

// Portfolio Modal Functionality
const modal = document.getElementById('portfolioModal');
const modalClose = document.querySelector('.modal-close');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalGallery = document.getElementById('modalGallery');
const modalDescription = document.getElementById('modalDescription');

// Project data
const projects = {
    treon: {
        title: 'TREON Brand Identity',
        category: 'Branding & Identity Design',
        images: Array.from({length: 10}, (_, i) => `Images/kk/${i + 1}.jpg`),
        description: `
            <h3>Project Overview</h3>
            <p>TREON is a comprehensive brand identity project that showcases a complete visual system.
            This project includes logo design, color palette, typography guidelines, and brand applications
            across various mediums. The identity system was created to establish a strong, cohesive brand
            presence that resonates with the target audience and maintains consistency across all touchpoints.</p>
            <h3>Design Process</h3>
            <p>The design process involved extensive research, conceptualization, and refinement to create
            a unique and memorable brand identity. Each element was carefully crafted to work harmoniously
            together, creating a unified brand experience.</p>
        `
    }
};

// Open modal when portfolio item is clicked
portfolioItems.forEach(item => {
    item.addEventListener('click', function() {
        const projectKey = this.getAttribute('data-project');
        if (projectKey && projects[projectKey]) {
            openModal(projects[projectKey]);
        }
    });
});

// Function to open modal
function openModal(project) {
    modalTitle.textContent = project.title;
    modalCategory.textContent = project.category;

    // Clear and populate gallery
    modalGallery.innerHTML = '';
    project.images.forEach(imageSrc => {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = project.title;
        modalGallery.appendChild(img);
    });

    // Set description
    modalDescription.innerHTML = project.description;

    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
modalClose.addEventListener('click', closeModal);

window.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal on ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});