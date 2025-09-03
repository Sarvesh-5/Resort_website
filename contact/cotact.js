
document.addEventListener('DOMContentLoaded', function () {

  // ================== HAMBURGER / MOBILE MENU ==================
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const navbar = document.querySelector('.navbar');
  const overlay = document.querySelector('.menu-overlay');
  const logo = document.querySelector('.nav-logo-text');

  // Function to close the mobile menu and reset toggles
  function closeMenu() {
    if (mobileMenu) mobileMenu.classList.remove('show');
    if (navToggle) navToggle.classList.remove('active');
    if (navbar) navbar.classList.remove('menu-open');
    if (overlay) overlay.classList.remove('show');
  }

  // Toggle mobile menu visibility on hamburger icon click
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      mobileMenu.classList.toggle('show');
      navToggle.classList.toggle('active');
      if (navbar) navbar.classList.toggle('menu-open', mobileMenu.classList.contains('show'));
      if (overlay) overlay.classList.toggle('show', mobileMenu.classList.contains('show'));
    });
  }

  // Close mobile menu when clicking outside the menu or toggle
  document.addEventListener('click', function (e) {
    if (
      mobileMenu?.classList.contains('show') &&
      !mobileMenu.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Clicking the logo closes menu, shows preloader, then reloads page (goes home)
  if (logo) {
    logo.addEventListener('click', function (e) {
      e.preventDefault();
      closeMenu();
      const preloader = document.getElementById('preloader');

      if (preloader) {
        preloader.classList.remove('hide');
        setTimeout(() => {
          window.location.href = '/index.html'; // explicit navigation to homepage
        }, 300);
      } else {
        window.location.href = '/index.html';
      }
    });
  }

  // Clicking the overlay closes the mobile menu
  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Navbar background changes on scroll to indicate page scroll
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

});
