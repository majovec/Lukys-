const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Zavřít navigaci' : 'Otevřít navigaci');
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));
document.querySelector('#year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelector('#contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const goal = form.elements.goal.value.trim();
  const subject = encodeURIComponent('Zájem o Znovu Silnější 90');
  const body = encodeURIComponent(`Ahoj Lukáši,\n\njmenuji se ${name}.\nMůj e-mail: ${email}\n\nCo bych chtěl změnit:\n${goal || 'Rád bych se dozvěděl více o programu Znovu Silnější 90.'}\n\nDěkuji.`);
  document.querySelector('#form-status').textContent = 'Otevírám e-mailovou zprávu…';
  window.location.href = `mailto:projekt@znovusilnejsi.cz?subject=${subject}&body=${body}`;
});
