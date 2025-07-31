    window.addEventListener('load', function() {
            if (typeof emailjs !== 'undefined') {
                emailjs.init('ofYOPvOOuT93kiJqE'); // Replace with your EmailJS public key
                console.log('EmailJS initialized successfully');
            } else {
                console.error('EmailJS library failed to load');
            }
        });

        // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.about-text, .about-image, .projects h2, .projects-content, .contact h2, .contact-form');
        animateElements.forEach(el => observer.observe(el));

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        });

        // Contact form handling
        const contactForm = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        const messageContainer = document.getElementById('messageContainer');

        function showMessage(text, type) {
            const message = document.createElement('div');
            message.className = `message ${type}`;
            message.textContent = text;
            messageContainer.innerHTML = '';
            messageContainer.appendChild(message);
            
            setTimeout(() => {
                message.classList.add('show');
            }, 100);

            setTimeout(() => {
                message.classList.remove('show');
                setTimeout(() => {
                    if (messageContainer.contains(message)) {
                        messageContainer.removeChild(message);
                    }
                }, 300);
            }, 5000);
        }

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Check if EmailJS is available
            if (typeof emailjs === 'undefined') {
                showMessage('Email service is not available. Please try again later.', 'error');
                return;
            }
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            const formData = new FormData(contactForm);
            const templateParams = {
                from_name: formData.get('name'),
                from_email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            try {
                // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your EmailJS credentials
                await emailjs.send('service_w3vt436', 'template_6sqw0ly', templateParams);
                showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            } catch (error) {
                console.error('EmailJS error:', error);
                showMessage('Failed to send message. Please try again later.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
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

        // Add loading animation
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });