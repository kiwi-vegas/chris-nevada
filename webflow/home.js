// ── Trust bar counter animation ──────────────────────────────────────
    (function() {
      const DURATION = 2000; // ms for the full count
      const EASE_OUT = t => 1 - Math.pow(1 - t, 3); // cubic ease-out

      function formatNum(val, decimals, useComma) {
        if (decimals > 0) return val.toFixed(decimals);
        const n = Math.round(val);
        return useComma ? n.toLocaleString('en-US') : String(n);
      }

      function animateCounter(el) {
        if (el.dataset.animated) return; // only fire once
        el.dataset.animated = '1';

        if (el.dataset.countStatic) return; // static label — no counting

        const target  = parseFloat(el.dataset.countTarget);
        const prefix  = el.dataset.countPrefix  || '';
        const suffix  = el.dataset.countSuffix  || '';
        const decimals = parseInt(el.dataset.countDecimals || '0', 10);
        const useComma = el.hasAttribute('data-count-comma');

        const start = performance.now();

        function tick(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / DURATION, 1);
          const value = EASE_OUT(progress) * target;
          el.textContent = prefix + formatNum(value, decimals, useComma) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
      }

      const counters = document.querySelectorAll('[data-count-target], [data-count-static]');

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target); // fire once, clean up
          }
        });
      }, { threshold: 0.3 });

      counters.forEach(el => observer.observe(el));
    })();
    // ────────────────────────────────────────────────────────────────────

    // Nav scroll effect
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    // Mobile hamburger
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNav = document.getElementById('mobile-nav');
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });
    // Close mobile nav on leaf link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
    // Mobile accordion toggles
    document.querySelectorAll('.mob-group-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const submenu = btn.nextElementSibling;
        const isOpen = btn.classList.toggle('open');
        btn.setAttribute('aria-expanded', isOpen);
        if (submenu) submenu.classList.toggle('open', isOpen);
      });
    });

    // Community market tabs
    const tabs = document.querySelectorAll('.market-tab');
    const panels = document.querySelectorAll('.communities-panel');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const market = tab.dataset.market;
        tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        document.getElementById('panel-' + market).classList.add('active');
      });
    });

    // Flip cards — lazy load map iframe on first hover, touch-toggle on mobile
    document.querySelectorAll('.community-card').forEach(card => {
      let loaded = false;
      const loadMap = () => {
        if (loaded) return;
        loaded = true;
        card.querySelectorAll('iframe[data-src]').forEach(iframe => {
          iframe.src = iframe.dataset.src;
        });
      };
      card.addEventListener('mouseenter', loadMap);
      card.addEventListener('touchstart', () => {
        loadMap();
        card.classList.toggle('flipped');
      }, { passive: true });
    });

    // Review carousels
    document.querySelectorAll('.carousel-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const carouselId = 'carousel-' + btn.dataset.carousel;
        const carousel = document.getElementById(carouselId);
        if (!carousel) return;
        const card = carousel.querySelector('.review-card');
        const scrollAmt = (card ? card.offsetWidth + 16 : 336) * parseInt(btn.dataset.dir);
        carousel.scrollBy({ left: scrollAmt, behavior: 'smooth' });
      });
    });