// Shared layout components
const NAV_HTML = `
<nav role="navigation" aria-label="Main navigation">
  <a href="../index.html" class="nav-logo" aria-label="Yamasen home">
    <span class="jp">山仙</span>
    <span class="en">Yamasen</span>
  </a>
  <ul class="nav-links" id="navLinks" role="list">
    <li><a href="../pages/food-menu.html">Food Menu</a></li>
    <li><a href="../pages/drink-menu.html">Drink Menu</a></li>
    <li><a href="../pages/reservation.html">Reservation</a></li>
    <li><a href="../pages/delivery.html">Delivery Order</a></li>
    <li><a href="../pages/loyalty.html">Loyalty Card</a></li>
    <li><a href="../pages/about.html">About Us</a></li>
    <li><a href="../pages/contact.html" class="nav-cta btn">Contact</a></li>
  </ul>
  <div class="nav-lang" aria-label="Language selector">
    <a href="#" class="active" lang="ja">JP</a>
    <span aria-hidden="true">／</span>
    <a href="#">ENG</a>
  </div>
  <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</nav>`;

const FOOTER_HTML = `
<footer role="contentinfo">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-logo">山仙</div>
        <div class="footer-tagline" style="margin-bottom:8px;">YAMASEN Japanese Restaurant</div>
        <div style="font-size:12px;color:rgba(245,240,232,0.4);line-height:1.8;margin-top:16px;">
          Tank Hill Park, Tank Hill Road<br>Muyenga, Kampala<br>
          Mon–Sun 9:00–23:00<br>
          +256 0707 808 010
        </div>
      </div>
      <div>
        <div class="footer-heading">Navigate</div>
        <ul class="footer-links">
          <li><a href="../pages/food-menu.html">Food Menu</a></li>
          <li><a href="../pages/drink-menu.html">Drink Menu</a></li>
          <li><a href="../pages/reservation.html">Reservation</a></li>
          <li><a href="../pages/delivery.html">Delivery Order</a></li>
          <li><a href="../pages/loyalty.html">Loyalty Card</a></li>
          <li><a href="../pages/about.html">About Us</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-heading">Our Ecosystem</div>
        <ul class="footer-links">
          <li><a href="#">YAMASEN Japanese Restaurant</a></li>
          <li><a href="#">FARM TO TABLE</a></li>
          <li><a href="#">KLAFTS</a></li>
          <li><a href="#">Pan-Ya Bread</a></li>
        </ul>
        <div style="margin-top:24px;">
          <div class="footer-heading">Technology Partner</div>
          <div style="font-size:12px;color:rgba(245,240,232,0.4);">Yamasen × GAPPON Technology</div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span id="copy-year"></span> Yamasen Japanese Restaurant. All rights reserved.</span>
      <span>Muyenga, Kampala, Uganda</span>
    </div>
  </div>
</footer>`;

// For index.html (paths differ)
const NAV_HTML_ROOT = NAV_HTML
  .replace(/href="\.\.\/pages\//g, 'href="pages/')
  .replace(/href="\.\.\/index\.html"/g, 'href="index.html"');

const FOOTER_HTML_ROOT = FOOTER_HTML
  .replace(/href="\.\.\/pages\//g, 'href="pages/');

function injectLayout(isRoot = false) {
  const navPlaceholder = document.getElementById('nav-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (navPlaceholder) navPlaceholder.outerHTML = isRoot ? NAV_HTML_ROOT : NAV_HTML;
  if (footerPlaceholder) footerPlaceholder.outerHTML = isRoot ? FOOTER_HTML_ROOT : FOOTER_HTML;
  // Set dynamic copyright year
  const yearEl = document.getElementById('copy-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  // Initialise nav behaviour after DOM injection
  if (typeof initNav === 'function') initNav();
}
