document.documentElement.classList.add('has-js');

const menu = document.querySelector('.menu');
const cards = document.querySelectorAll('.card');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion && 'IntersectionObserver' in window) {
  cards.forEach((card) => card.classList.add('reveal-pending'));

  const cardObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-pending');
          entry.target.classList.add('is-visible');
          entry.target.addEventListener('animationend', () => entry.target.classList.remove('is-visible'), {
            once: true,
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  cards.forEach((card) => cardObserver.observe(card));
}

document.addEventListener('click', (event) => {
  if (menu?.open && !menu.contains(event.target)) {
    menu.open = false;
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu?.open) {
    menu.open = false;
    menu.querySelector('summary')?.focus();
  }
});
