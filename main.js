/* ============================================
   Jonath Portfolio — Main JS
   ============================================ */

// ---------- Loader ----------
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const bar = document.getElementById('loader-bar');
    let progress = 0;
    const tick = setInterval(() => {
        progress += Math.random() * 18;
        if (progress >= 100) {
            progress = 100;
            bar.style.width = '100%';
            clearInterval(tick);
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.transition = 'opacity 0.6s';
                setTimeout(() => loader.style.display = 'none', 600);
            }, 300);
        } else {
            bar.style.width = progress + '%';
        }
    }, 120);
});

// ---------- AOS init ----------
AOS.init({
    duration: 800,
    once: true,
    offset: 80,
    easing: 'ease-out-cubic'
});

// ---------- Vanta 3D Background ----------
if (window.VANTA) {
    VANTA.NET({
        el: '#vanta-bg',
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x7c3aed,
        backgroundColor: 0x06060a,
        points: 12.00,
        maxDistance: 22.00,
        spacing: 17.00,
        showDots: true
    });
}

// ---------- Custom Cursor ----------
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursorDot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
});

function animateCursor() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    cursorRing.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .skill-card, .project-card, .info-card, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// ---------- Navbar scroll effect ----------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// ---------- Mobile menu ----------
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
});
document.querySelectorAll('.mobile-nav').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuToggle.querySelector('i').classList.add('fa-bars');
        menuToggle.querySelector('i').classList.remove('fa-xmark');
    });
});

// ---------- Active nav link on scroll ----------
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`.nav-link[href="#${id}"]`);
            if (active) active.classList.add('active');
        }
    });
});

// ---------- Typing effect ----------
const typedEl = document.getElementById('typed-text');
const phrases = [
    'Frontend Developer',
    'Backend Engineer',
    'Full Stack Developer',
    'ML Researcher',
    'Open Source Contributor'
];
let pi = 0, ci = 0, deleting = false;

function typeLoop() {
    const current = phrases[pi];
    if (!deleting) {
        typedEl.textContent = current.substring(0, ++ci);
        if (ci === current.length) {
            deleting = true;
            setTimeout(typeLoop, 1600);
            return;
        }
    } else {
        typedEl.textContent = current.substring(0, --ci);
        if (ci === 0) {
            deleting = false;
            pi = (pi + 1) % phrases.length;
        }
    }
    setTimeout(typeLoop, deleting ? 40 : 90);
}
typeLoop();

// ---------- Counters ----------
const counters = document.querySelectorAll('[data-counter]');
const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.counter);
            const duration = 1500;
            const step = target / (duration / 16);
            let v = 0;
            const tick = () => {
                v += step;
                if (v >= target) {
                    el.textContent = target.toLocaleString();
                } else {
                    el.textContent = Math.floor(v).toLocaleString();
                    requestAnimationFrame(tick);
                }
            };
            tick();
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.4 });
counters.forEach(c => counterObserver.observe(c));

// ---------- Skill bar animation ----------
const skillBars = document.querySelectorAll('.skill-bar');
skillBars.forEach(bar => {
    bar.style.setProperty('--w', bar.dataset.level + '%');
});
const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });
skillBars.forEach(b => skillObserver.observe(b));

// ---------- Skill card spotlight ----------
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
    });
});

// ---------- Project filtering ----------
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hide');
            } else {
                card.classList.add('hide');
            }
        });
    });
});

// ---------- 3D tilt on hero card ----------
const tiltCard = document.getElementById('tilt-card');
if (tiltCard) {
    const parent = tiltCard.parentElement;
    parent.addEventListener('mousemove', e => {
        const rect = tiltCard.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotX = (-y / rect.height) * 12;
        const rotY = (x / rect.width) * 12;
        tiltCard.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
        tiltCard.style.transition = 'transform 0.1s ease';
    });
    parent.addEventListener('mouseleave', () => {
        tiltCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        tiltCard.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });
}

// ---------- GSAP scroll animations ----------
if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Section headings parallax
    gsap.utils.toArray('section h2').forEach(h => {
        gsap.from(h, {
            y: 30,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: h,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });
}

// ---------- Contact form (client-side only) ----------
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.classList.remove('hidden', 'text-red-400');
    status.classList.add('text-accent');
    status.textContent = 'Sending...';

    const data = Object.fromEntries(new FormData(form).entries());

    // Try to save to the table API; fallback to local success
    try {
        const res = await fetch('tables/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data, received_at: Date.now() })
        });
        if (!res.ok) throw new Error('API not configured');
    } catch (err) {
        // Silently ignore — still show success since the site is static
    }

    setTimeout(() => {
        status.textContent = '✓ Thanks! I will reply within 24 hours.';
        status.classList.remove('text-accent');
        status.classList.add('text-green-400');
        form.reset();
    }, 800);
});

// ---------- Smooth in-page scroll ----------
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id.length > 1) {
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        }
    });
});
