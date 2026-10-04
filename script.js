const navbar = document.getElementById('navbar');
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

// Navbar background on scroll
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile menu
function setMenu(open) {
  navLinks.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', open);
  menuBtn.innerHTML = open
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
}

menuBtn.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

// Scroll reveal animation
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Highlight the active nav link
const sections = document.querySelectorAll('main section[id]');
const links = document.querySelectorAll('.nav-links a:not(.btn)');

const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      links.forEach((l) =>
        l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id)
      );
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach((s) => spy.observe(s));

// Project filter
const filterBtns = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    projects.forEach((p) => {
      p.hidden = !(f === 'all' || p.dataset.category === f);
    });
  });
});

// Contact form (opens Gmail in the browser with the message pre-filled)
const CONTACT_EMAIL = 'danishabbas4198@gmail.com';

const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const serviceInput = document.getElementById('service');
const messageInput = document.getElementById('message');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const service = serviceInput.value;
  const message = messageInput.value.trim();

  [nameInput, emailInput, messageInput].forEach((f) => f.classList.remove('invalid'));
  statusEl.className = 'form-status';

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !emailOk || !message) {
    if (!name) nameInput.classList.add('invalid');
    if (!emailOk) emailInput.classList.add('invalid');
    if (!message) messageInput.classList.add('invalid');
    statusEl.textContent = 'Please fill in all fields with a valid email.';
    statusEl.classList.add('error');
    return;
  }

  const subject = encodeURIComponent(`${service} inquiry from ${name}`);
  const body = encodeURIComponent(
    `Hi Sheen team,\n\n${message}\n\nName: ${name}\nEmail: ${email}\nService: ${service}`
  );

  const gmailUrl =
    `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}&su=${subject}&body=${body}`;

  window.open(gmailUrl, '_blank', 'noopener');

  statusEl.textContent = 'Gmail opened in a new tab. Press Send there to deliver your message.';
  statusEl.classList.add('success');
  form.reset();
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();