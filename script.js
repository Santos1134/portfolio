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

// Create notification function
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

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
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
        } else {
            showNotification('Oops! Something went wrong. Please try again.', 'error');
        }
    } catch (error) {
        showNotification('Error sending message. Please try again later.', 'error');
    }

    // Reset button state
    submitButton.textContent = originalButtonText;
    submitButton.disabled = false;
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
            <p>𝟎𝟏. 𝐁𝐫𝐚𝐧𝐝 𝐎𝐯𝐞𝐫𝐯𝐢𝐞𝐰
Brand Name: Treon
Industry: Technology / Innovation / Digital Solutions
Concept Summary:
Treon represents growth through precision  a technology brand that combines intelligence, structure, and upward progress.
The identity is built on the Letter T, symbolizing technology and trust, and a triangle, symbolizing growth, direction, and advancement.
Together, they form a powerful emblem of progressive innovation.
 𝟎𝟐. 𝐋𝐨𝐠𝐨 𝐂𝐨𝐧𝐜𝐞𝐩𝐭 & 𝐌𝐞𝐚𝐧𝐢𝐧𝐠
Logo Ideation Breakdown (from your image)
Letter T → Represents the foundation and trustworthiness of the brand.
Triangle → Symbolizes growth, stability, and forward direction.
Combined Shape → Creates a bold geometric symbol representing rising progress, innovation, and structured technology.
The stacked upward triangles suggest layers of growth — every line and angle leading upward, reinforcing Treon's brand idea:
"Technology that moves forward."

0𝟑. Visual Identity for Treon
Color Psychology:
Blue represents trust, logic, and calm confidence, while the gradient injects a sense of modern energy and digital evolution.
𝟎𝟒. 𝐓𝐲𝐩𝐨𝐠𝐫𝐚𝐩𝐡𝐲 𝐒𝐲𝐬𝐭𝐞𝐦
Primary Typeface: Inter / Poppins
→ excellent for readability in UI and digital applications
Typography Use:
Bold for main headers (strength, structure)
Regular weight for supporting text (balance and clarity)
Ample spacing for an open, futuristic feel


 𝟎𝟓. 𝐒𝐲𝐦𝐛𝐨𝐥𝐢𝐬𝐦 & 𝐆𝐞𝐨𝐦𝐞𝐭𝐫𝐲
The Treon logo design is rooted in geometry, structure, and movement:
Each segment aligns to a grid, reflecting precision and logic.
𝐓𝐫𝐞𝐨𝐧 𝐢𝐬 𝐧𝐨𝐭 𝐣𝐮𝐬𝐭 𝐚 𝐛𝐫𝐚𝐧𝐝.
𝐈𝐭'𝐬 𝐚 𝐬𝐲𝐦𝐛𝐨𝐥 𝐨𝐟 𝐜𝐨𝐧𝐭𝐢𝐧𝐮𝐨𝐮𝐬 𝐦𝐨𝐭𝐢𝐨𝐧  𝐚 𝐫𝐞𝐦𝐢𝐧𝐝𝐞𝐫 𝐭𝐡𝐚𝐭 𝐭𝐫𝐮𝐞 𝐢𝐧𝐧𝐨𝐯𝐚𝐭𝐢𝐨𝐧 𝐢𝐬 𝐛𝐮𝐢𝐥𝐭, 𝐨𝐧𝐞 𝐥𝐚𝐲𝐞𝐫 𝐚𝐭 𝐚 𝐭𝐢𝐦𝐞.</p>
        `
    },
    doraluxe: {
        title: 'Dora Luxe Brand Identity',
        category: 'Branding & Identity Design',
        images: [
            'Images/Dora/1.jpg',
            'Images/Dora/2.jpg',
            'Images/Dora/3.png',
            'Images/Dora/4.jpg',
            'Images/Dora/5.jpg',
            'Images/Dora/6.jpg',
            'Images/Dora/7.jpg',
            'Images/Dora/8.jpg',
            'Images/Dora/9.jpg',
            'Images/Dora/10.jpg',
            'Images/Dora/11.jpg'
        ],
        description: `
            <h3>Project Overview</h3>
            <p>Mini Brand Identity for 𝗗𝗼𝗿𝗮 𝗟𝘂𝘅𝗲.🎨
It all began with a simple idea: I believe true luxury is just feeling good in what you wear. We shouldn't need a huge budget to feel confident, comfortable, andelegant. That philosophy is the foundation of everything you see. Dora Luxe is a fashion and lifestyle brand offering stylish handbags, accessories, and clothing for both men and women.
𝗧𝗵𝗲 𝗗𝗲𝘀𝗶𝗴𝗻 𝗖𝗵𝗼𝗶𝗰𝗲𝘀
When creating the identity, every detail mattered: 
I chose Poppins because it’s clean, modern, and has a friendly feeling.
The Red (Hex #D31818)  is the pulse of the brand, symbolizing the energy and passion the brand wants you to feel.
The Cream (Hex #FFF9DD) is a soft neutral color that balances the red, bringing in that feeling of natural elegance.
The Black (Hex #000000) represents timelessness and high quality products.
𝗗𝗼𝗿𝗮 𝗟𝘂𝘅𝗲 is more than just a brand; it’s a 
commitment to feeling great every single day. I hope you'll love wearing these pieces as much as I loved designing them!</p>
        `
    },
    logos: {
        title: 'Logo Collection',
        category: 'Logo Design & Branding',
        images: [
            'Images/Logos/1.jpg',
            'Images/Logos/2.jpg',
            'Images/Logos/3.jpg',
            'Images/Logos/4.jpg'
        ],
        description: `
            <h3>Logo Design Portfolio</h3>
            <p>This collection showcases a diverse range of logo designs created for various clients across different
            industries. Each logo has been carefully crafted to capture the unique essence and personality of the brand
            it represents, combining creative vision with strategic thinking to deliver memorable and effective brand marks.</p>
        `
    },
    trustgod: {
        title: 'Trust God T-Shirt Branding',
        category: 'Apparel Branding & Design',
        images: [
            'Images/Trust/1.jpg',
            'Images/Trust/3.jpg',
            'Images/Trust/4.jpg',
            'Images/Trust/5.jpg'
        ],
        description: `
            <h3>Project Overview</h3>
            <p>T-Shirt Branding 🚨🚨
            Our latest design for Trust God is inspired by Jeremiah 29:11 - "For I know the plans I have for you,"
            declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."
            Whether you're repping your faith or spreading positivity, this tee is a reminder that you're rooted in
            something bigger.</p>
        `
    },
    quickbites: {
        title: 'Quick Bites Brand Identity',
        category: 'Branding & Identity Design',
        images: [
            'Images/QuickBite/1.jpg',
            'Images/QuickBite/2.jpg',
            'Images/QuickBite/3.jpg',
            'Images/QuickBite/4.jpg',
            'Images/QuickBite/5.jpg',
            'Images/QuickBite/6.jpg',
            'Images/QuickBite/7.jpg',
            'Images/QuickBite/8.jpg'
        ],
        description: `
            <h3>Project Overview</h3>
            <p>𝗜𝗻𝘁𝗿𝗼𝗱𝘂𝗰𝗶𝗻𝗴 𝘆𝗼𝘂 𝘁𝗼 𝗤𝘂𝗶𝗰𝗸𝗯𝗶𝘁𝗲𝘀, a fast food delivery service Company dedicated to delivering
            delicious meals right at your doorsteps quick, fresh, and convenient. Wherever you are at home, School,
            or at Work, 𝗤𝘂𝗶𝗰𝗸𝗯𝗶𝘁𝗲𝘀 brings timely deliveries with a taste that satisfies every craving.</p>
        `
    },
    panelist: {
        title: 'Panelist Graphics',
        category: 'Social Media Design',
        images: [
            'Images/panelist/1.jpg',
            'Images/panelist/2.jpg',
            'Images/panelist/3.jpg',
            'Images/panelist/4.jpg'
        ],
        description: `
            <h3>Project Overview</h3>
            <p>This collection features professionally designed social media graphics created for panelist profiles and
            promotional content. Each design was crafted to maintain visual consistency while highlighting individual
            personalities and expertise of the panelists, making them perfect for social media platforms, event promotions,
            and professional networking.</p>
        `
    },
    congratulations: {
        title: 'Congratulations Graphics',
        category: 'Social Media Design',
        images: [
            'Images/Congratulations/1.jpg',
            'Images/Congratulations/2.jpg'
        ],
        description: `
            <h3>Project Overview</h3>
            <p>This collection showcases celebratory social media graphics designed to mark special achievements,
            milestones, and congratulatory moments. Each design combines vibrant colors, elegant typography, and
            thoughtful composition to create memorable and shareable content that resonates with audiences and
            celebrates success in a meaningful way.</p>
        `
    },
    wedding: {
        title: 'Wedding Graphics',
        category: 'Social Media Design',
        images: [
            'Images/Wedding/1.jpg',
            'Images/Wedding/2.jpg',
            'Images/Wedding/3.jpg'
        ],
        description: `
            <h3>Project Overview</h3>
            <p>This collection features elegant and romantic wedding graphics designed for invitations, save-the-dates,
            and event announcements. Each design captures the beauty and significance of special wedding moments,
            combining sophisticated typography with delicate design elements to create memorable keepsakes that
            couples and their guests will cherish.</p>
        `
    },
    birthday: {
        title: 'Birthday Graphics',
        category: 'Social Media Design',
        images: [
            'Images/birthday/1.jpg',
            'Images/birthday/2.jpg',
            'Images/birthday/3.jpg',
            'Images/birthday/4.jpg'
        ],
        description: `
            <h3>Project Overview</h3>
            <p>This collection showcases vibrant and joyful birthday graphics designed to celebrate special moments
            and milestones. Each design brings energy, fun, and personalization to birthday celebrations, creating
            memorable social media content that captures the excitement and happiness of the special day.</p>
        `
    },
    motivational: {
        title: 'Motivational Graphics',
        category: 'Social Media Design',
        images: [
            'Images/Motivational/1.jpg',
            'Images/Motivational/2.jpg'
        ],
        description: `
            <h3>Project Overview</h3>
            <p>This collection features inspiring and uplifting motivational graphics designed to encourage, inspire,
            and empower audiences. Each design combines powerful messages with visually compelling layouts to create
            content that resonates deeply and motivates action across social media platforms.</p>
        `
    },
    trip: {
        title: 'Trip Graphics',
        category: 'Social Media Design',
        images: [
            'Images/trip/1.jpg',
            'Images/trip/2.jpg'
        ],
        description: `
            <h3>Project Overview</h3>
            <p>This collection showcases travel and adventure-themed graphics designed to capture the excitement and
            beauty of exploration. Each design evokes wanderlust and adventure, creating engaging social media content
            perfect for sharing travel experiences, destinations, and journey moments.</p>
        `
    },
    wise: {
        title: 'WISE Liberia Graphics',
        category: 'Social Media Design',
        images: [
            'Images/WISE/1.jpg',
            'Images/WISE/2.jpg'
        ],
        description: `
            <h3>Project Overview</h3>
            <p>This collection showcases designs created for WISE Liberia, a non-profit organization. Each design
            combines strategic messaging with polished visual presentation to create compelling promotional materials
            that effectively communicate the organization's mission and initiatives.</p>
        `
    },
    event: {
        title: 'Event Graphics',
        category: 'Social Media Design',
        images: [
            'Images/Event/1.jpg'
        ],
        description: `
            <h3>Project Overview</h3>
            <p>This collection showcases professional event promotional graphics designed to announce and promote
            various events. Each design effectively communicates key event information while creating visual excitement
            that encourages attendance and social sharing.</p>
        `
    },
    football: {
        title: 'Football Graphics',
        category: 'Social Media Design',
        images: [
            'Images/Football/2.jpg'
        ],
        description: `
            <h3>Project Overview</h3>
            <p>This collection features dynamic sports graphics with a focus on football themes. Each design captures
            the energy, passion, and excitement of the sport, creating engaging content perfect for sports teams,
            fan communities, and athletic event promotion on social media.</p>
        `
    },
    socialcontent: {
        title: 'Social Media Content',
        category: 'Social Media Design',
        images: [
            'Images/social/1.jpg',
            'Images/social/2.jpg',
            'Images/social/3.jpg',
            'Images/social/4.jpg',
            'Images/social/5.jpg'
        ],
        description: `
            <h3>Project Overview</h3>
            <p>This diverse collection showcases various social media graphics created for different purposes and
            platforms. Each design demonstrates versatility in style and approach, covering a wide range of content
            needs from promotional posts to engaging visual stories.</p>
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