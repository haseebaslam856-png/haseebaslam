// ===== Navbar Scroll & Parallax =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
const heroGrid = document.querySelector('.hero-bg-grid');

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const scrollY = window.scrollY;

            // Navbar background blur/solid on scroll
            if (navbar) {
                navbar.classList.toggle('scrolled', scrollY > 50);
            }

            // Back to top button
            if (backToTop) {
                backToTop.classList.toggle('visible', scrollY > 600);
            }

            // Active nav highlight (for anchor links)
            updateActiveNav(scrollY);

            // Hero Grid Parallax
            if (heroGrid) {
                heroGrid.style.transform = `translateY(${scrollY * 0.3}px)`;
            }

            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

// ===== Back to Top =====
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== Cursor Glow =====
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow && window.matchMedia('(min-width: 769px)').matches) {
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!cursorGlow.classList.contains('active')) {
            cursorGlow.classList.add('active');
        }
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    document.addEventListener('mouseleave', () => {
        cursorGlow.classList.remove('active');
    });
}

// ===== Mobile Menu Toggle =====
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

navToggle.setAttribute('aria-expanded', 'false');

navToggle.addEventListener('click', () => {
    const isActive = navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-links a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
});

// ===== Scroll Animations =====
const animateElements = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('animated');
            }, parseInt(delay));
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

animateElements.forEach(el => observer.observe(el));

// ===== Counter Animation =====
function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===== Active Nav Link Highlight =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav(scrollY) {
    const offset = scrollY + 120;
    let currentSection = '';

    sections.forEach(section => {
        if (offset >= section.offsetTop && offset < section.offsetTop + section.offsetHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const sectionId = href.substring(1);
            if (sectionId === currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

// ===== FAQ Accordion =====
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const isActive = item.classList.contains('active');

        // Close all
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

        // Open clicked (if wasn't active)
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== Contact Form Handling (Reliable & Zero Downtime) =====
const contactForm = document.getElementById('contactForm');
const formSuccessBox = document.getElementById('formSuccessBox');
const successWhatsappBtn = document.getElementById('successWhatsappBtn');
const successEmailBtn = document.getElementById('successEmailBtn');
const resetFormBtn = document.getElementById('resetFormBtn');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const business = document.getElementById('business').value.trim();
        const message = document.getElementById('message').value.trim();

        const emailSubject = `Local SEO Audit Request - ${business || name}`;
        const emailBody = `Hi Haseeb,

I would like to request a Local SEO Audit for my business.

• Client Name: ${name}
• Client Email: ${email}
• Business Name: ${business || 'N/A'}

• Business Details / Goals:
${message}

Looking forward to your audit and recommendations.`;

        const waText = `Hi Haseeb! I would like to get a Local SEO Audit for my business:
• Name: ${name}
• Email: ${email}
• Business: ${business || 'N/A'}
• Details: ${message}`;

        const mailtoUrl = `mailto:haseebaslam856@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        const whatsappUrl = `https://wa.me/923230903745?text=${encodeURIComponent(waText)}`;

        // Set action URLs
        if (successEmailBtn) successEmailBtn.href = mailtoUrl;
        if (successWhatsappBtn) successWhatsappBtn.href = whatsappUrl;

        // Hide form and show in-card confirmation cleanly without any popup
        contactForm.style.display = 'none';
        if (formSuccessBox) {
            formSuccessBox.style.display = 'block';
        }
    });

    if (resetFormBtn) {
        resetFormBtn.addEventListener('click', () => {
            contactForm.reset();
            contactForm.style.display = 'block';
            if (formSuccessBox) {
                formSuccessBox.style.display = 'none';
            }
        });
    }
}


// ===== Dynamic Copyright Year =====
const yearEl = document.querySelector('.footer-bottom p');
if (yearEl) {
    yearEl.textContent = `© ${new Date().getFullYear()} Haseeb Aslam. All rights reserved.`;
}


// ===== Geogrid Interactive Map =====
const geogridMap = document.getElementById('geogridMap');
const geoBtnBefore = document.getElementById('geoBtnBefore');
const geoBtnAfter = document.getElementById('geoBtnAfter');

const geoStatRank = document.getElementById('geoStatRank');
const geoStatRankDiff = document.getElementById('geoStatRankDiff');
const geoStatSolv = document.getElementById('geoStatSolv');
const geoStatSolvDiff = document.getElementById('geoStatSolvDiff');
const geoStatPins = document.getElementById('geoStatPins');
const geoStatPinsDiff = document.getElementById('geoStatPinsDiff');

// Data for 5x5 matrix
const beforeRanks = [
    18, 14, 12, 16, 20,
    15,  9,  8, 11, 19,
    14,  6,  4,  9, 15,
    16,  8,  9, 12, 17,
    20, 15, 14, 18, 20
];

const afterRanks = [
    2, 1, 1, 2, 3,
    1, 1, 1, 1, 2,
    1, 1, 1, 1, 1,
    2, 1, 1, 1, 2,
    3, 2, 1, 2, 3
];

function renderGeogrid(ranks) {
    if (!geogridMap) return;
    geogridMap.innerHTML = '';
    ranks.forEach(rank => {
        const pin = document.createElement('div');
        pin.classList.add('geo-pin');
        if (rank <= 3) {
            pin.classList.add('rank-green');
        } else if (rank <= 10) {
            pin.classList.add('rank-yellow');
        } else {
            pin.classList.add('rank-red');
        }
        pin.textContent = rank;
        geogridMap.appendChild(pin);
    });
}

if (geogridMap) {
    // Initial render: after optimization
    renderGeogrid(afterRanks);

    geoBtnBefore.addEventListener('click', () => {
        geoBtnBefore.classList.add('active');
        geoBtnAfter.classList.remove('active');
        renderGeogrid(beforeRanks);

        geoStatRank.textContent = '14.0';
        geoStatRankDiff.textContent = '↓ Buried on Page 2 & 3';
        geoStatRankDiff.className = 'geo-stat-diff negative';

        geoStatSolv.textContent = '14.2%';
        geoStatSolvDiff.textContent = '↓ Low Visibility & Zero Calls';
        geoStatSolvDiff.className = 'geo-stat-diff negative';

        geoStatPins.textContent = '0 / 25';
        geoStatPinsDiff.textContent = '0% in 3-Pack';
        geoStatPinsDiff.className = 'geo-stat-diff negative';
    });

    geoBtnAfter.addEventListener('click', () => {
        geoBtnAfter.classList.add('active');
        geoBtnBefore.classList.remove('active');
        renderGeogrid(afterRanks);

        geoStatRank.textContent = '1.2';
        geoStatRankDiff.textContent = '↑ Improved by 12.8 spots';
        geoStatRankDiff.className = 'geo-stat-diff positive';

        geoStatSolv.textContent = '94.8%';
        geoStatSolvDiff.textContent = '↑ From 14.2%';
        geoStatSolvDiff.className = 'geo-stat-diff positive';

        geoStatPins.textContent = '24 / 25';
        geoStatPinsDiff.textContent = '96% Total Domination';
        geoStatPinsDiff.className = 'geo-stat-diff positive';
    });
}
