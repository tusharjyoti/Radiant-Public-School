/**
 * RADIANT PUBLIC SCHOOL - INTERACTIVE SCRIPT
 * Vanilla JS | No Libraries | Premium Performance
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. SCROLL PROGRESS BAR
  ========================================== */
  const scrollProgress = document.getElementById('scrollProgress');
  
  window.addEventListener('scroll', () => {
    if (scrollProgress) {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollLen = `${(scrollPx / winHeightPx) * 100}%`;
      scrollProgress.style.width = scrollLen;
    }
  });

  /* ==========================================
     2. CUSTOM CURSOR GLOW
  ========================================== */
  const cursorGlow = document.getElementById('cursorGlow');
  let isMouseMoving = false;
  
  document.addEventListener('mousemove', (e) => {
    isMouseMoving = true;
    if (cursorGlow) {
      cursorGlow.style.opacity = '1';
      // Use requestAnimationFrame for smooth performance
      requestAnimationFrame(() => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
      });
    }
  });

  document.addEventListener('mouseleave', () => {
    if (cursorGlow) cursorGlow.style.opacity = '0';
  });

  /* ==========================================
     3. STICKY NAVBAR & ACTIVE LINKS
  ========================================== */
  const header = document.getElementById('siteHeader');
  const navContainer = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-pill');
  
  window.addEventListener('scroll', () => {
    // Sticky Nav Style
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
      navContainer.style.maxWidth = '100%';
      navContainer.style.borderRadius = '0';
      navContainer.style.border = 'none';
      navContainer.style.marginTop = '-8px';
      navContainer.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
      header.classList.remove('scrolled');
      navContainer.style.maxWidth = '1400px';
      navContainer.style.borderRadius = 'var(--radius-pill)';
      navContainer.style.border = '1px solid rgba(255, 255, 255, 0.5)';
      navContainer.style.marginTop = '0';
      navContainer.style.background = 'rgba(255, 255, 255, 0.85)';
    }

    // Active Link Highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.dataset.section === current) {
        link.classList.add('active');
      }
    });
  });

  /* ==========================================
     4. MOBILE MENU TOGGLE
  ========================================== */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden'; // prevent scrolling
    });

    const closeMenu = () => {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    };

    mobileClose.addEventListener('click', closeMenu);
    
    // Close when clicking a link
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ==========================================
     5. SMOOTH ANCHOR SCROLLING
  ========================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        window.scrollTo({
          top: targetEl.offsetTop - 80, // offset for fixed header
          behavior: 'smooth'
        });
      }
    });
  });

  /* ==========================================
     6. SCROLL REVEAL ANIMATIONS
  ========================================== */
  const revealElements = document.querySelectorAll('.reveal-up, .line-reveal');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Stop observing once revealed to keep it visible
        observer.unobserve(entry.target);
      }
    });
  };

  const revealOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
  
  revealElements.forEach(el => revealObserver.observe(el));

  /* ==========================================
     7. NUMBER COUNTER ANIMATION
  ========================================== */
  const counters = document.querySelectorAll('.stat-num');
  let startedCounters = false;

  const startCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000; // ms
      const increment = target / (duration / 16); // 60fps
      
      let currentNum = 0;
      const updateCounter = () => {
        currentNum += increment;
        if (currentNum < target) {
          counter.innerText = Math.ceil(currentNum);
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target;
        }
      };
      updateCounter();
    });
  };

  // Trigger counters when stats row is visible
  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !startedCounters) {
        startCounters();
        startedCounters = true;
      }
    }, { threshold: 0.5 });
    statsObserver.observe(statsSection);
  }

  /* ==========================================
     8. MAGNETIC BUTTON HOVER EFFECT
  ========================================== */
  const magneticButtons = document.querySelectorAll('.magnetic');
  
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const h = rect.width / 2;
      const v = rect.height / 2;
      
      const x = e.clientX - rect.left - h;
      const y = e.clientY - rect.top - v;
      
      // Move button slightly
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = `translate(0px, 0px)`;
    });
  });

  /* ==========================================
     9. TESTIMONIAL SLIDER
  ========================================== */
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const dotBtns = document.querySelectorAll('.slider-dots .dot');
  const prevBtn = document.getElementById('testPrev');
  const nextBtn = document.getElementById('testNext');
  let currentTestimonial = 0;
  const totalTestimonials = testimonialCards.length;
  let sliderInterval;

  const showTestimonial = (index) => {
    testimonialCards.forEach(card => card.classList.remove('active'));
    dotBtns.forEach(dot => dot.classList.remove('active'));
    
    testimonialCards[index].classList.add('active');
    if (dotBtns[index]) dotBtns[index].classList.add('active');
  };

  const nextTestimonial = () => {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
  };

  const prevTestimonialFn = () => {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(currentTestimonial);
  };

  if (testimonialCards.length > 0) {
    // Buttons
    if (nextBtn) nextBtn.addEventListener('click', () => { nextTestimonial(); resetSliderInterval(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevTestimonialFn(); resetSliderInterval(); });
    
    // Dots
    dotBtns.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
        resetSliderInterval();
      });
    });

    // Auto Play
    const resetSliderInterval = () => {
      clearInterval(sliderInterval);
      sliderInterval = setInterval(nextTestimonial, 5000);
    };
    resetSliderInterval();
  }

  /* ==========================================
     10. FAQ ACCORDION
  ========================================== */
  const faqButtons = document.querySelectorAll('.faq-question');
  
  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      const answer = button.nextElementSibling;
      
      // Close all others
      document.querySelectorAll('.faq-question').forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
        btn.nextElementSibling.hidden = true;
      });

      // Toggle current
      if (!isExpanded) {
        button.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
        
        // Simple slide down animation using JS (optional since CSS handles basic display)
        answer.style.opacity = 0;
        answer.style.transform = 'translateY(-10px)';
        answer.style.transition = 'all 0.3s ease';
        
        requestAnimationFrame(() => {
          answer.style.opacity = 1;
          answer.style.transform = 'translateY(0)';
        });
      }
    });
  });

  /* ==========================================
     11. FORM VALIDATION
  ========================================== */
  const enquiryForm = document.getElementById('enquiryForm');
  
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      
      // Get fields
      const pName = document.getElementById('parentName');
      const cName = document.getElementById('childName');
      const cls = document.getElementById('classApply');
      const phone = document.getElementById('phone');
      
      // Clear errors
      document.querySelectorAll('.form-error').forEach(err => err.innerText = '');
      
      // Validate Parent Name
      if (!pName.value.trim()) {
        document.getElementById('parentNameError').innerText = 'Please enter parent name.';
        isValid = false;
      }
      
      // Validate Child Name
      if (!cName.value.trim()) {
        document.getElementById('childNameError').innerText = 'Please enter child name.';
        isValid = false;
      }
      
      // Validate Class
      if (!cls.value) {
        document.getElementById('classApplyError').innerText = 'Please select a class.';
        isValid = false;
      }
      
      // Validate Phone
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phone.value.match(phoneRegex)) {
        document.getElementById('phoneError').innerText = 'Enter a valid 10-digit phone number.';
        isValid = false;
      }
      
      if (isValid) {
        // Submit logical (Mock)
        const btn = enquiryForm.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        btn.innerText = 'Sending...';
        btn.disabled = true;
        
        setTimeout(() => {
          btn.innerText = 'Enquiry Sent Successfully ✓';
          btn.style.backgroundColor = '#27ae60';
          enquiryForm.reset();
          
          setTimeout(() => {
            btn.innerText = originalText;
            btn.disabled = false;
            btn.style.backgroundColor = '';
          }, 3000);
        }, 1500);
      }
    });
  }

  /* ==========================================
     12. BACK TO TOP BUTTON
  ========================================== */
  const backToTopBtn = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================
     13. TRIGGER INITIAL REVEAL (HERO)
  ========================================== */
  setTimeout(() => {
    const initialElements = document.querySelectorAll('#hero .reveal-up, #hero .line-reveal');
    initialElements.forEach(el => el.classList.add('active'));
  }, 100);

});
