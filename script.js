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
document.addEventListener('DOMContentLoaded', function () {
  const animatedElements = document.querySelectorAll('.scroll-animate');
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        scrollObserver.unobserve(entry.target); // optional: only animate once
      }
    });
  }, { threshold: 0.2 }); // adjust threshold for how much is visible

  animatedElements.forEach(el => scrollObserver.observe(el));
});
document.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('.facilities-title');
  const facilities = document.querySelectorAll('.facility-box');

  // Observer for heading
  const titleObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        title.classList.add('visible');
        titleObserver.unobserve(title);
      }
    });
  }, { threshold: 0.5 });

  titleObserver.observe(title);

  // Observer for facilities with staggered delay
  const facilitiesObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Array.from(facilities).indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 0.3}s`;
        entry.target.classList.add('visible');
        facilitiesObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  facilities.forEach(facility => facilitiesObserver.observe(facility));
});
document.addEventListener('DOMContentLoaded', () => {
  const roomCards = document.querySelectorAll('.room-card-large, .room-card-small');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Array.from(roomCards).indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 0.3}s`; // 0.3s stagger per card
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  roomCards.forEach(card => observer.observe(card));
});
document.addEventListener('DOMContentLoaded', () => {
  // Select title and subtitle elements
  const roomsTitle = document.querySelector('.rooms-title');
  const roomsSubtitle = document.querySelector('.rooms-subtitle');
  
  // Helper function for observing and revealing an element
  function observeAndShow(element) {
    if (element) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            element.classList.add('visible');
            observer.unobserve(element);
          }
        });
      }, { threshold: 0.55 });
      observer.observe(element);
    }
  }
  
  // Observe both
  observeAndShow(roomsTitle);
  observeAndShow(roomsSubtitle);
});
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.local-amenity-img');
  const texts = document.querySelectorAll('.local-amenity-text');
  const offset = 300; // Adjust this for when animation triggers

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
      rect.bottom >= offset
    );
  }

  function checkElements() {
    images.forEach(img => {
      if (isInViewport(img)) {
        img.classList.add('scale-up');
      }
    });
    texts.forEach(text => {
      if (isInViewport(text)) {
        text.classList.add('visible');
      }
    });
  }

  // Initial check
  checkElements();

  // Listen for scroll events
  window.addEventListener('scroll', checkElements);
});











document.addEventListener('DOMContentLoaded', function() {
  const slidesCount = 3;
  const dots = document.querySelectorAll('.dot');
  const slideContainer = document.querySelector('.carousel-slide-container');

  // Calculate slide width including margin
  const firstSlide = slideContainer.children[0];
  const slideStyle = window.getComputedStyle(firstSlide);
  const slideWidth = firstSlide.offsetWidth + parseInt(slideStyle.marginLeft) + parseInt(slideStyle.marginRight);

  // Clone first and last slides for infinite effect
  const firstClone = slideContainer.children[0].cloneNode(true);
  const lastClone = slideContainer.children[slidesCount - 1].cloneNode(true);

  // Append and prepend clones
  slideContainer.appendChild(firstClone);
  slideContainer.insertBefore(lastClone, slideContainer.children[0]);

  const totalSlides = slidesCount + 2;
  slideContainer.style.width = `${totalSlides * slideWidth}px`;

  let current = 1; // Start at the first real slide (index 1 due to prepended clone)
  let startX = 0;
  let currentTranslate = -slideWidth * current;
  let prevTranslate = currentTranslate;
  let isDragging = false;

  const swipeThreshold = slideWidth / 4; // 25% swipe to trigger slide change

  function updateActiveDot(idx) {
    dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
  }

  function goToSlide(idx) {
    slideContainer.style.transition = 'transform 0.3s ease-in-out';
    currentTranslate = -slideWidth * idx;
    prevTranslate = currentTranslate;
    slideContainer.style.transform = `translateX(${currentTranslate}px)`;
    current = idx;

    // Update dots based on real slides index
    updateActiveDot((current - 1 + slidesCount) % slidesCount);
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => goToSlide(idx + 1));
  });

  // Handle transition end to jump without animation if at clone slide
  slideContainer.addEventListener('transitionend', () => {
    if (current === 0) {
      slideContainer.style.transition = 'none';
      current = slidesCount;
      currentTranslate = -slideWidth * current;
      prevTranslate = currentTranslate;
      slideContainer.style.transform = `translateX(${currentTranslate}px)`;
    } else if (current === slidesCount + 1) {
      slideContainer.style.transition = 'none';
      current = 1;
      currentTranslate = -slideWidth * current;
      prevTranslate = currentTranslate;
      slideContainer.style.transform = `translateX(${currentTranslate}px)`;
    }
  });

  slideContainer.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return; // only left mouse button
    isDragging = true;
    slideContainer.style.transition = 'none';
    startX = e.pageX;
  });

  slideContainer.addEventListener('touchstart', (e) => {
    e.preventDefault(); // prevent scrolling
    isDragging = true;
    slideContainer.style.transition = 'none';
    startX = e.touches[0].pageX;
  });

  slideContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const currentX = e.pageX;
    const diff = currentX - startX;
    slideContainer.style.transform = `translateX(${prevTranslate + diff}px)`;
    currentTranslate = prevTranslate + diff;
  });

  slideContainer.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault(); // prevent scrolling
    const currentX = e.touches[0].pageX;
    const diff = currentX - startX;
    slideContainer.style.transform = `translateX(${prevTranslate + diff}px)`;
    currentTranslate = prevTranslate + diff;
  });

  function finishDrag(endX) {
    const movedBy = endX - startX;

    slideContainer.style.transition = 'transform 0.3s ease-in-out';

    // Calculate how many slides to move: negative for left swipe, positive for right swipe
    const movedSlides = Math.round(movedBy / slideWidth);

    if (movedSlides !== 0) {
      let nextSlide = current - movedSlides;

      // Limit nextSlide within possible range (clones included)
      if (nextSlide < 0) nextSlide = 0;
      if (nextSlide > slidesCount + 1) nextSlide = slidesCount + 1;

      goToSlide(nextSlide);
    } else {
      // Not moved enough, snap back to current
      goToSlide(current);
    }
  }

  slideContainer.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    finishDrag(e.pageX);
  });

  slideContainer.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    finishDrag(e.changedTouches[0].pageX);
  });

  slideContainer.addEventListener('mouseleave', (e) => {
    if (!isDragging) return;
    isDragging = false;
    finishDrag(e.pageX);
  });

  // Initialize carousel at first real slide
  goToSlide(1);
});

document.addEventListener('DOMContentLoaded', () => {
  const slideContainer = document.querySelector('.carousel-slide-container');
  const slides = document.querySelectorAll('.highlight-slide');
  const numSlides = slides.length;
  const backgroundLayer = document.querySelector('.background-layer');
  const dots = document.querySelectorAll('.carousel-dots .dot');

  // Dynamically set container width
  slideContainer.style.width = `${numSlides * 100}%`;

  function updateDots(index) {
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  // Automatic sliding removed

  // Zoom out background slowly on vertical scroll
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const scale = Math.max(1 - scrollY / 2000, 0.8); // min scale 0.8
    backgroundLayer.style.transform = `scale(${scale})`;
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const footer = document.querySelector('.footer');
  const sections = document.querySelectorAll('.section-to-hide');

  function checkScroll() {
    const footerRect = footer.getBoundingClientRect();

    // Show footer if it almost enters viewport
    if (footerRect.top < window.innerHeight) {
      footer.classList.add('visible');
    } else {
      footer.classList.remove('visible');
    }

    // Hide preceding sections as footer approaches
    if (footerRect.top < window.innerHeight + 100) {
      sections.forEach(sec => sec.classList.add('hidden'));
    } else {
      sections.forEach(sec => sec.classList.remove('hidden'));
    }
  }

  window.addEventListener('scroll', checkScroll);
  checkScroll(); // initial check on load
});
