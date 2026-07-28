// Plateforme des Concours - Ministère de la Défense
// Comportements spécifiques à la plateforme concours

document.addEventListener('DOMContentLoaded', function () {
  initAlertToggles();
  initConcoursFilters();
  initFaqAccordion();
  initAuthTabs();
  initHeroSearch();
  initMockForms();
});

function initMockForms() {
  document.querySelectorAll('.auth-panel form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
    });
  });
}

function initAlertToggles() {
  document.querySelectorAll('.alert-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var details = btn.nextElementSibling;
      var isOpen = details.classList.toggle('open');
      btn.textContent = isOpen ? 'Voir moins ▲' : 'Voir le détail ▼';
    });
  });
}

function initConcoursFilters() {
  var searchInput = document.querySelector('#concours-search-input');
  var chips = document.querySelectorAll('.chip-filter');
  var groups = document.querySelectorAll('.corps-group');

  function applyFilters() {
    var query = (searchInput ? searchInput.value : '').trim().toLowerCase();
    var activeChip = document.querySelector('.chip-filter.active');
    var corpsFilter = activeChip ? activeChip.getAttribute('data-corps') : 'all';

    groups.forEach(function (group) {
      var groupCorps = group.getAttribute('data-corps');
      var matchesCorps = corpsFilter === 'all' || corpsFilter === groupCorps;
      var cards = group.querySelectorAll('.concours-card');
      var visibleCount = 0;

      cards.forEach(function (card) {
        var text = card.textContent.toLowerCase();
        var matchesQuery = query === '' || text.indexOf(query) !== -1;
        var show = matchesCorps && matchesQuery;
        card.style.display = show ? '' : 'none';
        if (show) visibleCount++;
      });

      group.style.display = (matchesCorps && (visibleCount > 0 || query === '')) ? '' : 'none';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      applyFilters();
    });
  });
}

function initFaqAccordion() {
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (el) {
        el.classList.remove('open');
      });
      if (!wasOpen) {
        item.classList.add('open');
      }
    });
  });
}

function initAuthTabs() {
  var tabs = document.querySelectorAll('.auth-tab');
  if (!tabs.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = tab.getAttribute('data-tab');
      document.querySelectorAll('.auth-tab').forEach(function (t) { t.classList.remove('active'); });
      document.querySelectorAll('.auth-panel').forEach(function (p) { p.classList.remove('active'); });
      tab.classList.add('active');
      document.querySelector('#' + target).classList.add('active');
    });
  });
}

function initHeroSearch() {
  var form = document.querySelector('#hero-search-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var query = document.querySelector('#hero-search-input').value.trim();
    var url = 'concours-disponibles.html';
    if (query) {
      url += '?q=' + encodeURIComponent(query);
    }
    window.location.href = url;
  });
}

// Pré-remplit la recherche sur la page "concours disponibles" si un paramètre ?q= est présent
(function prefillSearchFromQuery() {
  var params = new URLSearchParams(window.location.search);
  var q = params.get('q');
  if (!q) return;
  document.addEventListener('DOMContentLoaded', function () {
    var input = document.querySelector('#concours-search-input');
    if (input) {
      input.value = q;
      input.dispatchEvent(new Event('input'));
    }
  });
})();
