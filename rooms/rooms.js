// ===== Preloader hides after page load =====
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hide'); // Hide preloader by adding 'hide' class
});


document.addEventListener('DOMContentLoaded', function () {


    // ================== HAMBURGER / MOBILE MENU ==================
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navbar = document.querySelector('.navbar');
    const overlay = document.querySelector('.menu-overlay');
    const logo = document.querySelector('.nav-logo-text');


    // Function to close the mobile menu and reset toggles
    function closeMenu() {
        mobileMenu?.classList.remove('show');
        navToggle?.classList.remove('active');
        navbar?.classList.remove('menu-open');
        overlay?.classList.remove('show');
    }


    // Toggle mobile menu visibility on hamburger icon click
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('show');
            navToggle.classList.toggle('active');
            navbar?.classList.toggle('menu-open', mobileMenu.classList.contains('show'));
            overlay?.classList.toggle('show', mobileMenu.classList.contains('show'));
        });
    }


    // Close mobile menu when clicking outside the menu or toggle
    document.addEventListener('click', function (e) {
        if (mobileMenu?.classList.contains('show') &&
            !mobileMenu.contains(e.target) &&
            !navToggle.contains(e.target)) {
            closeMenu();
        }
    });


    // Clicking the logo closes menu, shows preloader, then reloads page (goes home)
    // Clicking the logo closes menu, shows preloader, then navigates to index.html
if (logo) {
    logo.addEventListener('click', function (e) {
        e.preventDefault();
        closeMenu();
        const preloader = document.getElementById('preloader');

        if (preloader) {
            preloader.classList.remove('hide');
            setTimeout(() => {
                window.location.href = '/index.html'; // Use absolute path to root index.html
            }, 300);
        } else {
            window.location.href = '/index.html';
        }
    });
}




    // Clicking the overlay closes the mobile menu
    overlay?.addEventListener('click', closeMenu);


    // Navbar background changes on scroll to indicate page scroll
    if (navbar) {
        window.addEventListener('scroll', function () {
            navbar.classList.toggle('scrolled', window.scrollY > 10);
        });
    }

});  // <-- Closing brace for the DOMContentLoaded function
window.addEventListener("scroll", () => {
  if (window.innerWidth <= 900) return;

  const images = document.querySelectorAll(".room-showcase-image img");
  if (!images.length) return;

  const windowHeight = window.innerHeight;
  const offset = 400;

  images.forEach((image) => {
    if (image.classList.contains("scale-up")) return; // skip if already scaled-up

    const rect = image.getBoundingClientRect();

    if (rect.top < windowHeight - offset && rect.bottom > offset) {
      image.classList.add("scale-up"); // scale up once when scrolled enough
    }
  });
});
function handleMobileScroll() {
  if (window.innerWidth > 600) return;

  const cards = document.querySelectorAll(".mobile-room-card-box");
  if (!cards.length) return;

  const windowHeight = window.innerHeight;
  const offset = 200;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const image = card.querySelector(".room-card-image");
    const content = card.querySelector(".room-card-content");
    const isVisible = rect.top < windowHeight - offset && rect.bottom > offset;

    if (image) image.classList.toggle("mobile-scroll-visible", isVisible);
    if (content) content.classList.toggle("mobile-scroll-visible", isVisible);
  });
}

window.addEventListener("scroll", handleMobileScroll);
window.addEventListener("touchmove", handleMobileScroll);
window.addEventListener("DOMContentLoaded", handleMobileScroll);
