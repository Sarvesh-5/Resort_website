window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hide'); // Hide preloader by adding 'hide' class
});

document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navbar = document.querySelector('.navbar');
  const overlay = document.querySelector('.menu-overlay');
  const logo = document.querySelector('.nav-logo-text');

  function closeMenu() {
    if (mobileMenu) mobileMenu.classList.remove('show');
    if (navToggle) navToggle.classList.remove('active');
    if (navbar) navbar.classList.remove('menu-open');
    if (overlay) overlay.classList.remove('show');
  }

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      mobileMenu.classList.toggle('show');
      navToggle.classList.toggle('active');
      if (navbar) navbar.classList.toggle('menu-open', mobileMenu.classList.contains('show'));
      if (overlay) overlay.classList.toggle('show', mobileMenu.classList.contains('show'));
    });
  }

  document.addEventListener('click', function (e) {
    if (
      mobileMenu?.classList.contains('show') &&
      !mobileMenu.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      closeMenu();
    }
  });

  if (logo) {
    logo.addEventListener('click', function (e) {
      e.preventDefault();
      closeMenu();
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.classList.remove('hide');
        setTimeout(() => {
          window.location.href = '/index.html';
        }, 300);
      } else {
        window.location.href = '/index.html';
      }
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    });
  }
});
