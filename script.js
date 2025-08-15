// ===== Preloader hides after page load =====
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hide');
});

document.addEventListener('DOMContentLoaded', function () {

    // ================== BOOKING FORM LOGIC ==================
    const form = document.querySelector('.booking-form');
    const ctaBtn = document.querySelector('.booking-form .bf-cta, .booking-form #check-availability');
    const dateInput = document.querySelector('#date-range');

    // Counter logic (plus/minus buttons)
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

    // WhatsApp booking confirmation
    if (form && ctaBtn) {
        ctaBtn.addEventListener('click', function () {
            const dateRange = (dateInput?.value || '').trim();
            let ci = "", co = "";
            if (dateRange.includes(" to ")) {
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

            // Show confirmation message
            const host = form.closest('.hero-content') || form.parentElement || document.body;
            let notice = host.querySelector('.booking-confirmation');
            if (!notice) {
                notice = document.createElement('div');
                notice.className = 'booking-confirmation';
                form.after(notice);
            }
            notice.innerHTML = '';
            const confirmMsg = document.createElement('p');
            confirmMsg.className = 'confirmation';
            confirmMsg.textContent = '🍃🌿 Thank you! Sit back and relax—one of our Mist Valley hosts will connect with you soon to craft your perfect escape.🌿🍃';
            notice.appendChild(confirmMsg);
        });
    }

    // Date range picker
    if (typeof flatpickr !== 'undefined' && dateInput) {
        flatpickr('#date-range', {
            mode: 'range',
            minDate: 'today',
            dateFormat: 'd M Y'
        });
    }

    // ================== HAMBURGER / MOBILE MENU ==================
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navbar = document.querySelector('.navbar');
    const overlay = document.querySelector('.menu-overlay');
    const logo = document.querySelector('.nav-logo-text');

    function closeMenu() {
        mobileMenu?.classList.remove('show');
        navToggle?.classList.remove('active');
        navbar?.classList.remove('menu-open');
        overlay?.classList.remove('show');
    }

    // Hamburger click
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('show');
            navToggle.classList.toggle('active');
            navbar?.classList.toggle('menu-open', mobileMenu.classList.contains('show'));
            overlay?.classList.toggle('show', mobileMenu.classList.contains('show'));
        });
    }

    // Outside click closes menu
    document.addEventListener('click', function (e) {
        if (mobileMenu?.classList.contains('show') &&
            !mobileMenu.contains(e.target) &&
            !navToggle.contains(e.target)) {
            closeMenu();
        }
    });

    // Close on logo click (also show preloader & go home)
if (logo) {
    logo.addEventListener('click', function (e) {
        e.preventDefault();
        closeMenu();
        const preloader = document.getElementById('preloader');

        if (preloader) {
            // Show the preloader instantly (cover the screen)
            preloader.classList.remove('hide');

            // Wait a short moment for the black screen to appear, then reload
            setTimeout(() => {
                window.location.reload();
            }, 300); // 300ms delay to ensure preloader is visible before reload
        } else {
            // If no preloader exists, just reload
            window.location.reload();
        }
    });
}

    overlay?.addEventListener('click', closeMenu);

    // Navbar scroll background effect
    if (navbar) {
        window.addEventListener('scroll', function () {
            navbar.classList.toggle('scrolled', window.scrollY > 10);
        });
    }

    // ================== SCROLL-ANIMATE ELEMENTS ==================
    const animatedElements = document.querySelectorAll(".scroll-animate");
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    animatedElements.forEach(el => scrollObserver.observe(el));

    // ================== LUXURY BANNER ANIMATION ==================
    const banner = document.getElementById("luxury-banner");
    if (banner) {
        const bannerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    banner.classList.add("animate");
                }
            });
        }, { threshold: 0.4 });
        bannerObserver.observe(banner);
    }
});

// ================== HERO FIXED BACKGROUND CONTROL ==================
window.addEventListener("scroll", () => {
    const hero = document.querySelector(".hero");
    const video = document.querySelector(".hero-video");
    const overlay = document.querySelector(".hero-overlay");

    if (!hero || !video || !overlay) return;

    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const scrollY = window.scrollY;

    if (scrollY + 1 >= heroBottom) {
        video.style.visibility = "hidden";
        overlay.style.visibility = "hidden";
    } else {
        video.style.visibility = "visible";
        overlay.style.visibility = "visible";
    }
});
if (window.innerWidth <= 1024) {
  const overlay = document.querySelector('.luxury-overlay');
  if (overlay) {
    overlay.style.background = 'transparent';
  }
}
