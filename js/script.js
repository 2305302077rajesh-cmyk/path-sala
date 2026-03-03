// ===========================
// PATH SALA — JavaScript
// ===========================

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const navUl = document.querySelector('nav ul');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('show');
            menuToggle.textContent = navUl.classList.contains('show') ? '✕' : '☰';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav') && !e.target.closest('.menu-toggle')) {
                navUl.classList.remove('show');
                menuToggle.textContent = '☰';
            }
        });
    }

    // --- Active Nav Link ---
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });

    // --- Testimonial Slider ---
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    let currentIndex = 0;

    function showTestimonial(idx) {
        testimonials.forEach(t => t.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        if (testimonials[idx]) testimonials[idx].classList.add('active');
        if (dots[idx]) dots[idx].classList.add('active');
        currentIndex = idx;
    }

    if (testimonials.length > 0) {
        setInterval(() => {
            showTestimonial((currentIndex + 1) % testimonials.length);
        }, 4000);
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => showTestimonial(i));
    });

    // --- Scroll Fade-In Animation ---
    const fadeEls = document.querySelectorAll('.fade-in');

    if (fadeEls.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        fadeEls.forEach(el => observer.observe(el));
    }

    // --- Admission Form ---
    const form = document.getElementById('admissionForm');
    const formContent = document.getElementById('formContent');
    const formSuccess = document.getElementById('formSuccess');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const course = document.getElementById('course').value;

            if (!name || !email || !phone || course === 'Select Course') {
                // Shake effect
                form.style.animation = 'shake 0.4s ease';
                setTimeout(() => form.style.removeProperty('animation'), 400);
                return;
            }

            // Show success
            if (formContent) formContent.style.display = 'none';
            if (formSuccess) formSuccess.classList.add('show');

            form.reset();
        });
    }

    // --- Stats Counter Animation ---
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        function tick() {
            current += step;
            if (current >= target) {
                el.textContent = target + suffix;
                return;
            }
            el.textContent = Math.floor(current) + suffix;
            requestAnimationFrame(tick);
        }
        tick();
    }

    if (statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => statsObserver.observe(el));
    }
});

// Shake keyframe (injected programmatically)
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-8px); }
    50% { transform: translateX(8px); }
    75% { transform: translateX(-4px); }
}`;
document.head.appendChild(shakeStyle);
