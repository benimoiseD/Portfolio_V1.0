const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');

const setMenuState = (open) => {
  if (!menuButton || !mobileNav) return;

  menuButton.classList.toggle('open', open);
  mobileNav.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  mobileNav.setAttribute('aria-hidden', String(!open));
};

if (menuButton && mobileNav) {
  menuButton.addEventListener('click', () => {
    setMenuState(!menuButton.classList.contains('open'));
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.classList.contains('open')) {
      setMenuState(false);
      menuButton.focus();
    }
  });
}

const revealElements = document.querySelectorAll('.reveal, .project-card, .timeline li');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealElements.forEach((element) => element.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  revealElements.forEach((element) => revealObserver.observe(element));
}

const footer = document.querySelector('footer');
if (footer) {
  const footerObserver = new IntersectionObserver((entries, observer) => {
    if (!entries[0].isIntersecting) return;

    footer.classList.add('footer-visible');
    observer.disconnect();
  }, { threshold: 0.1 });

  footerObserver.observe(footer);
}

const buttons = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('[data-category]');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    buttons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;
    projects.forEach((project) => {
      const shouldHide = filter !== 'Tous' && project.dataset.category !== filter;
      project.classList.toggle('hidden', shouldHide);

      if (!shouldHide) {
        project.classList.add('is-visible');
      }
    });
  });
});
