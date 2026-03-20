// Nav scroll
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

    // Mobile accordion
    document.querySelectorAll('.mob-group-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const sub = btn.nextElementSibling;
        const isOpen = sub.classList.toggle('open');
        btn.setAttribute('aria-expanded', isOpen);
        btn.querySelector('span').textContent = isOpen ? '−' : '+';
      });
    });

    // FAQ accordion
    document.querySelectorAll('.faq-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.toggle('open');
        btn.setAttribute('aria-expanded', isOpen);
      });
    });