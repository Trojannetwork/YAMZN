// ── HAMBURGER MENU ──
// Called by layout.js after nav HTML is injected into the DOM
function initNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  function closeMenu() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }

  function openMenu() {
    navLinks.classList.add('open');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
  }

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close menu when any nav link is clicked
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      closeMenu();
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => revealObserver.observe(el));

// ── MENU TABS ──
document.querySelectorAll('.menu-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    document.querySelectorAll('.menu-tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const panel = document.getElementById(target);
    if (panel) panel.classList.add('active');
  });
});

// ── TOAST NOTIFICATION ──
function showToast(msg, type = 'success') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = `toast ${type} show`;
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// ── FORM VALIDATION & SUBMISSION ──
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validatePhone(phone) {
  return /^[\d\s\+\-]{7,15}$/.test(phone.trim());
}

function handleForm(formId, successMsg) {
  const form = document.getElementById(formId);
  if (!form) return;
  const msgEl = form.querySelector('.form-msg');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Basic validation
    let valid = true;
    const emailEl = form.querySelector('[type="email"]');
    const phoneEl = form.querySelector('[name="phone"]');

    if (emailEl && !validateEmail(emailEl.value)) {
      valid = false;
      emailEl.style.borderColor = 'var(--primary)';
      emailEl.focus();
    } else if (emailEl) { emailEl.style.borderColor = ''; }

    if (phoneEl && phoneEl.value && !validatePhone(phoneEl.value)) {
      valid = false;
      phoneEl.style.borderColor = 'var(--primary)';
    } else if (phoneEl) { phoneEl.style.borderColor = ''; }

    if (!valid) {
      btn.textContent = originalText;
      btn.disabled = false;
      if (msgEl) { msgEl.textContent = 'Please check the highlighted fields.'; msgEl.className = 'form-msg error'; msgEl.style.display = 'block'; }
      return;
    }

    // Simulate submission (replace with real endpoint)
    await new Promise(r => setTimeout(r, 1200));

    form.reset();
    btn.textContent = originalText;
    btn.disabled = false;
    if (msgEl) { msgEl.textContent = successMsg; msgEl.className = 'form-msg success'; msgEl.style.display = 'block'; setTimeout(() => msgEl.style.display = 'none', 5000); }
    showToast(successMsg, 'success');
  });
}

handleForm('reservationForm', '✓ Reservation request sent. We will confirm shortly.');
handleForm('contactForm', '✓ Message sent. We will get back to you within 24 hours.');
handleForm('deliveryForm', '✓ Order received! Estimated delivery: 45–60 minutes.');

// ── QUANTITY CONTROLS (ORDER PAGE) ──
let orderItems = {};

document.querySelectorAll('.qty-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.order-item-card');
    const key = item.dataset.key;
    const price = parseInt(item.dataset.price, 10);
    const valEl = item.querySelector('.qty-val');
    let qty = parseInt(valEl.textContent, 10);

    if (btn.dataset.dir === 'up') qty++;
    else if (btn.dataset.dir === 'down' && qty > 0) qty--;

    valEl.textContent = qty;
    orderItems[key] = { qty, price };
    updateOrderTotal();
  });
});

function updateOrderTotal() {
  let total = 0;
  Object.values(orderItems).forEach(({ qty, price }) => { total += qty * price; });
  const totalEl = document.getElementById('orderTotal');
  if (totalEl) totalEl.textContent = total === 0 ? '—' : `UGX ${total.toLocaleString()}`;
  // Trigger delivery summary panel if present
  if (typeof updateSummary === 'function') updateSummary();
}

// ── ACTIVE NAV LINK ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const hrefPage = (a.getAttribute('href') || '').split('/').pop();
  if (hrefPage && hrefPage === currentPage) {
    a.style.color = 'var(--primary)';
  }
});
