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

document.addEventListener("DOMContentLoaded", function() {
    const hero = document.querySelector('.hero-section');
    const imgPath = hero.getAttribute('data-image');
    hero.style.setProperty('--hero-image', `url('${imgPath}')`);
    setTimeout(() => {
        hero.classList.add('zoomed-out');
    }, 150);
});


document.addEventListener("DOMContentLoaded", function () {
  const figures = document.querySelectorAll(".gallery figure");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1, // Trigger when at least 10% visible
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target); // Animate only once per image
      }
    });
  }, observerOptions);

  figures.forEach((fig) => {
    observer.observe(fig);
  });
});
