document.addEventListener('DOMContentLoaded', function () {
  // ===== Booking Form Logic =====
  const form = document.querySelector('.booking-form');
  const ctaBtn = document.querySelector('.booking-form .bf-cta, .booking-form #check-availability');
  const dateInput = document.querySelector('#date-range');

  // Counter logic (plus/minus)
  document.querySelectorAll('.booking-form .plus, .booking-form .minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      let val = parseInt(target.textContent, 10);
      if (btn.classList.contains('plus')) {
        if (val < 10) val++;
      } else {
        if (val > 0) val--;
      }
      target.textContent = val;
    });
  });

  // WhatsApp/book confirmation logic
  if (form && ctaBtn) {
    ctaBtn.addEventListener('click', function () {
      const dateRange = (dateInput?.value || '').trim();
      let ci = "", co = "";
      if (dateRange && dateRange.includes(" to ")) {
        [ci, co] = dateRange.split(" to ");
      }

      const adults = parseInt(document.getElementById('adult')?.textContent || '1', 10);
      const children = parseInt(document.getElementById('child')?.textContent || '0', 10);

      if (!ci || !co) {
        alert("Please select both check-in and check-out dates.");
        return;
      }

      const message =
        `Booking Request:%0A🛎 Check-in: ${ci}` +
        `%0A🏨 Check-out: ${co}` +
        `%0A👥 Guests: ${adults} adult(s), ${children} child(ren)` +
        `%0APlease call me to confirm.`;

      const phoneNumber = "919943197263";
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');

      // Show confirmation below form
      const host = form.closest('.hero-content') || form.parentElement || document.body;
      let notice = host.querySelector('.booking-confirmation');
      if (!notice) {
        notice = document.createElement('div');
        notice.className = 'booking-confirmation';
        if (form.nextSibling) {
          host.insertBefore(notice, form.nextSibling);
        } else {
          host.appendChild(notice);
        }
      }
      notice.innerHTML = '';
      const confirmMsg = document.createElement('p');
      confirmMsg.className = 'confirmation';
      confirmMsg.textContent = '🍃🌿 Thank you! Sit back and relax—one of our Mist Valley hosts will connect with you soon to craft your perfect escape.🌿🍃';
      notice.appendChild(confirmMsg);
    });
  }

  // Flatpickr date range
  if (typeof flatpickr !== 'undefined' && dateInput) {
    flatpickr('#date-range', {
      mode: 'range',
      minDate: 'today',
      dateFormat: 'd M Y'
    });
  }

  // ===== Hamburger Mobile Menu =====
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const navbar = document.querySelector('.navbar');
  const overlay = document.querySelector('.menu-overlay');
  const logo = document.querySelector('.nav-logo-text'); // to allow closing menu by clicking logo

  // Helper for closing menu
  function closeMenu() {
    mobileMenu.classList.remove('show');
    navToggle.classList.remove('active');
    navbar.classList.remove('menu-open');
    if (overlay) overlay.classList.remove('show');
  }

  // Open/close menu on hamburger click
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      mobileMenu.classList.toggle('show');
      navToggle.classList.toggle('active');
      navbar.classList.toggle('menu-open', mobileMenu.classList.contains('show'));
      if (overlay) overlay.classList.toggle('show', mobileMenu.classList.contains('show'));
    });
  }

  // Close menu on outside click (including overlay)
  document.addEventListener('click', function (e) {
    if (
      mobileMenu && mobileMenu.classList.contains('show') &&
      !mobileMenu.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Also close menu by clicking logo (optional, per your request)
  if (logo) {
    logo.addEventListener('click', closeMenu);
  }

  // Optionally close menu if overlay is present and clicked
  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  // Navbar background on scroll
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
});
// ---- Hero fixed background visibility control ----
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  const video = document.querySelector(".hero-video");
  const overlay = document.querySelector(".hero-overlay");

  const heroBottom = hero.offsetTop + hero.offsetHeight;
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;

  // If bottom of hero is above top of viewport => hide background
  if (scrollY + 1 >= heroBottom) {
    video.style.visibility = "hidden";
    overlay.style.visibility = "hidden";
  } else {
    video.style.visibility = "visible";
    overlay.style.visibility = "visible";
  }
});
