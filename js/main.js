// Ministère de la Défense - Côte d'Ivoire
// Comportements communs du site

document.addEventListener('DOMContentLoaded', function () {
  initNavToggle();
  initNewsFilter();
  initContactForm();
  setActiveNavLink();
});

function initNavToggle() {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function setActiveNavLink() {
  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === current) {
      link.classList.add('active');
    }
  });
}

function initNewsFilter() {
  var filterBar = document.querySelector('.filter-bar');
  if (!filterBar) return;

  var buttons = filterBar.querySelectorAll('.filter-btn');
  var articles = document.querySelectorAll('[data-category]');

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var category = btn.getAttribute('data-filter');
      articles.forEach(function (article) {
        if (category === 'all' || article.getAttribute('data-category') === category) {
          article.style.display = '';
        } else {
          article.style.display = 'none';
        }
      });
    });
  });
}

function initContactForm() {
  var form = document.querySelector('#contact-form');
  if (!form) return;

  var successBox = document.querySelector('.form-success');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (successBox) {
      successBox.classList.add('visible');
      successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    form.reset();
  });
}
