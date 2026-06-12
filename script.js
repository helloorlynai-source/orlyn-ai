/* ═══════════════════════════════════════════════════════════
   ORLYN.AI — PREMIUM INTERACTIONS
   Navy & Electric Blue Edition
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

  /* ── LOADER ── */
  const loader = document.getElementById('loader');
  const fill = document.getElementById('loader-fill');
  const status = document.getElementById('loader-status');
  const messages = ['Initializing', 'Loading assets', 'Preparing interface', 'Almost ready'];
  let progress = 0;
  let msgIndex = 0;

  const loadInterval = setInterval(() => {
    progress += Math.random() * 10 + 3;
    if (progress >= 100) {
      progress = 100;
      fill.style.width = '100%';
      status.textContent = messages[3];
      clearInterval(loadInterval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.add('site-loaded');
        initHeroReveal();
      }, 600);
    } else {
      fill.style.width = progress + '%';
      const newMsg = Math.floor((progress / 100) * messages.length);
      if (newMsg > msgIndex && newMsg < messages.length) {
        msgIndex = newMsg;
        status.textContent = messages[msgIndex];
      }
    }
  }, 160);

  /* ── HERO WORD-BY-WORD REVEAL ── */
  function initHeroReveal() {
    const words = document.querySelectorAll('.hero-word');
    words.forEach((word, i) => {
      // Wrap text content in inner span
      const text = word.textContent;
      word.innerHTML = `<span class="hero-word-inner">${text}</span>`;
    });

    // Stagger reveal
    setTimeout(() => {
      let maxDelay = 0;
      words.forEach((word, i) => {
        const delay = parseInt(word.dataset.delay) || 0;
        if (delay > maxDelay) maxDelay = delay;
        setTimeout(() => {
          word.classList.add('revealed');
        }, delay * 85); // 85ms stagger feels punchy and authoritative
      });

      // Draw headline underline after last word finishes revealing
      setTimeout(() => {
        const headlineLine = document.getElementById('hero-headline-line');
        if (headlineLine) {
          headlineLine.classList.add('active');
        }
      }, maxDelay * 85 + 400); // Trigger draw shortly after last word reveals
    }, 200);
  }

  /* ── CUSTOM CURSOR ── */
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.08;
    followerY += (mouseY - followerY) * 0.08;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Cursor hover states
  const hoverTargets = document.querySelectorAll('a, button, .demo-tab, .calc-input, .contact-email-card, .pricing-card, .portfolio-card');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('active');
      follower.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
      follower.classList.remove('active');
    });
  });

  /* ── MAGNETIC BUTTONS ── */
  const magneticBtns = document.querySelectorAll('.magnetic');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  /* ── SCROLL REVEAL ── */
  const revealElements = document.querySelectorAll('.reveal-up');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay) || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ── KINETIC HITL SCROLL ── */
  const hitlSteps = document.querySelectorAll('[data-kinetic]');
  const hitlFlow = document.querySelector('.hitl-flow');

  if (hitlFlow) {
    const hitlObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          hitlSteps.forEach((step, i) => {
            setTimeout(() => {
              step.classList.add('kinetic-visible');
            }, i * 180);
          });
          hitlObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    hitlObserver.observe(hitlFlow);
  }

  /* ── DEMO TABS ── */
  document.querySelectorAll('.demo-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');
      const parent = tab.closest('.agent-demo');
      if (!parent) return;

      parent.querySelectorAll('.demo-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      parent.querySelectorAll('.demo-content').forEach(c => c.classList.remove('visible'));
      const target = document.getElementById(targetId);
      if (target) target.classList.add('visible');
    });
  });

  /* ── ROI CALCULATOR ── */
  const calcIndustry = document.getElementById('calc-industry');
  const calcClients = document.getElementById('calc-clients');
  const calcHours = document.getElementById('calc-hours');
  const calcLoss = document.getElementById('calc-loss');
  const calcSub = document.getElementById('calc-sub');

  function updateCalc() {
    const industry = calcIndustry ? calcIndustry.value : 'agency';
    const people = parseInt(calcClients.value) || 0;
    const hours = parseInt(calcHours.value) || 0;
    const hourlyRate = industry === 'realestate' ? 55 : industry === 'ecommerce' ? 35 : 40;
    const monthlyLoss = people * hours * 4 * hourlyRate;
    const annualLoss = monthlyLoss * 12;

    if (calcLoss) calcLoss.textContent = '$' + monthlyLoss.toLocaleString() + '/mo';
    if (calcSub) {
      if (!people || !hours) {
        calcSub.innerHTML = 'Enter your numbers above to see your savings estimate.';
      } else {
        calcSub.innerHTML = 'in labor on tasks a single AI agent could handle. That\'s <strong>$' + annualLoss.toLocaleString() + '/year</strong> in recoverable overhead — before counting the revenue impact of faster lead response and fewer missed opportunities.';
      }
    }
  }

  if (calcIndustry) calcIndustry.addEventListener('change', updateCalc);
  if (calcClients) calcClients.addEventListener('input', updateCalc);
  if (calcHours) calcHours.addEventListener('input', updateCalc);
  if (calcClients || calcHours) updateCalc();

  /* ── SMOOTH NAV SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── NAV SCROLL EFFECT ── */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 80) {
      nav.style.borderBottomColor = 'rgba(255,255,255,0.06)';
      nav.style.background = 'rgba(11,14,23,0.92)';
    } else {
      nav.style.borderBottomColor = 'rgba(255,255,255,0.04)';
      nav.style.background = 'rgba(11,14,23,0.8)';
    }
  });

  /* ── MOBILE MENU TOGGLE ── */
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('active');
      navToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      mobileMenu.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
      navToggle.setAttribute('aria-expanded', !isOpen);
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenu.setAttribute('aria-hidden', 'true');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── SCROLL TO TOP ── */
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 600) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      const isActive = item.classList.contains('active');
      
      // Close all other FAQ items
      document.querySelectorAll('.faq-item').forEach(faq => {
        faq.classList.remove('active');
        faq.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
      });
      
      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── LAZY LOAD SECTIONS ── */
  const lazySections = document.querySelectorAll('section');
  const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
        lazyObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '100px 0px' });

  lazySections.forEach(section => {
    section.classList.add('lazy-section');
    lazyObserver.observe(section);
  });

})();
