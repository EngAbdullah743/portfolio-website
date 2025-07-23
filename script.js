// public/script.js
// JavaScript for portfolio website

// Toggle navigation menu
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close navigation menu when clicking outside
document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        navMenu.classList.remove('active');
    }
});
// Highlight active section in navigation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${id}"]`);

        if (entry.isIntersecting) {
            navLink.classList.add('active');
        } else {
            navLink.classList.remove('active');
        }
    });
}, observerOptions);

// Get all sections to observe
const sections = document.querySelectorAll('section');
// Ensure each section has an ID for navigation
sections.forEach(section => {
    if (!section.id) {
        console.warn('Section without ID found:', section);
        section.id = `section-${Math.random().toString(36).substr(2, 9)}`; // Assign a random ID
    }
});
// Observe each section
sections.forEach(section => {
    observer.observe(section);
});

// Add smooth scrolling to all links with hashes
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Highlight active section in navigation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Dynamic year for footer
const yearElement = document.querySelector('.year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Form submission handling (example using Fetch API)
const contactForm = document.querySelector('.contact-form');    

if (contactForm) {
    contactForm.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        fetch('https://example.com/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Message sent successfully!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error sending your message.');
        });
    });
}

// Apply translations to page elements
function applyTranslations(translations) {
    // Update navigation links
    document.querySelector('a[href="#hero"]').textContent = translations.home || 'Home';
    document.querySelector('a[href="#about"]').textContent = translations.about || 'About';
    document.querySelector('a[href="#projects"]').textContent = translations.projects || 'Projects';
    document.querySelector('a[href="#contact"]').textContent = translations.contact || 'Contact';
    
    // Update hero section
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        const welcomeText = heroText.querySelector('h2');
        if (welcomeText) {
            welcomeText.textContent = translations.welcome || 'welcome to my portfolio website';
        }
    }
}

// Handle form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate form inputs
        const name = contactForm.querySelector('input[name="name"]').value;
        const email = contactForm.querySelector('input[name="email"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value;

        if (!name || !email || !message) {
            alert('Please fill out all fields.');
            return;
        }

        // Prepare data for submission
        const formData = new FormData(contactForm);
        
        // Example of sending data to a server
        fetch('/api/contact', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Message sent successfully!');
            contactForm.reset(); // Reset the form after successful submission
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error sending your message.');
        });
    });
}

