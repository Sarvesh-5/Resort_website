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


// HERO SECTION

document.addEventListener("DOMContentLoaded", function() {
    const hero = document.querySelector('.hero-section');
    const imgPath = hero.getAttribute('data-image');
    hero.style.setProperty('--hero-image', `url('${imgPath}')`);
    setTimeout(() => {
        hero.classList.add('zoomed-out');
    }, 150);
});

//Details scrolling
document.addEventListener('DOMContentLoaded', function() {
  const items = Array.from(document.querySelectorAll('.amenities-list li'));
  let revealedCount = 0;

  function revealNextItem() {
    // Reveal items one by one based on scroll position
    while (revealedCount < items.length) {
      const item = items[revealedCount];
      const rect = item.getBoundingClientRect();

      // Check if the next unshown item is in viewport threshold
      if (rect.top < window.innerHeight * 0.85) {
        item.classList.add('visible');
        revealedCount++;
      } else {
        break; // Stop revealing further items if next is not yet in view
      }
    }
  }

  window.addEventListener('scroll', revealNextItem);
  revealNextItem(); // Run once on initial load
});



const track = document.querySelector('.gallery-track');
const allImages = Array.from(track.querySelectorAll('img'));
const images = allImages.map(img => img.src);

let current = 0;

// Calculate slide distance based on first image width + 81px gap
const slideDistance = allImages[0].offsetWidth + 81;

function renderGallery() {
  track.innerHTML = "";

  const leftIdx = (current - 1 + images.length) % images.length;
  const centerIdx = current;
  const rightIdx = (current + 1) % images.length;

  // Create left, center, right images
  [leftIdx, centerIdx, rightIdx].forEach((idx, i) => {
    const img = document.createElement("img");
    img.src = images[idx];
    img.className = "gallery-image";
    if (i === 1) img.classList.add("center"); // center image gets 'center' class
    track.appendChild(img);
  });
}

function disableArrows() {
  document.querySelector('.gallery-arrow-left').disabled = true;
  document.querySelector('.gallery-arrow-right').disabled = true;
}

function enableArrows() {
  document.querySelector('.gallery-arrow-left').disabled = false;
  document.querySelector('.gallery-arrow-right').disabled = false;
}

function slideLeft() {
  disableArrows();
  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(${slideDistance}px)`;
  track.addEventListener("transitionend", onLeftSlideEnd, { once: true });
}

function onLeftSlideEnd() {
  track.style.transition = "";
  track.style.transform = "";
  current = (current - 1 + images.length) % images.length;
  renderGallery();

  const centerImg = track.querySelector('.gallery-image.center');
  if (centerImg) {
    centerImg.style.transition = "transform 0.5s ease, opacity 0.5s ease";
    centerImg.style.transform = "scale(1.0)";
    centerImg.style.opacity = "1";

    centerImg.addEventListener('transitionend', () => {
      centerImg.style.transition = "";
    }, { once: true });
  }

  enableArrows();
}

function slideRight() {
  disableArrows();
  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(-${slideDistance}px)`;
  track.addEventListener("transitionend", onRightSlideEnd, { once: true });
}

function onRightSlideEnd() {
  track.style.transition = "";
  track.style.transform = "";
  current = (current + 1) % images.length;
  renderGallery();

  const centerImg = track.querySelector('.gallery-image.center');
  if (centerImg) {
    centerImg.style.transition = "transform 0.5s ease, opacity 0.5s ease";
    centerImg.style.transform = "scale(1.05)";
    centerImg.style.opacity = "1";

    centerImg.addEventListener('transitionend', () => {
      centerImg.style.transition = "";
    }, { once: true });
  }

  enableArrows();
}

// Attach event listeners for arrows
document.querySelector('.gallery-arrow-left').addEventListener('click', slideLeft);
document.querySelector('.gallery-arrow-right').addEventListener('click', slideRight);

// Initial gallery rendering
renderGallery();
