/**
 * Anca&Raluca smyle - Prices Page
 * Category filtering and search
 */

(function () {
    'use strict';

    const searchInput = document.getElementById('priceSearch');
    const tabs = document.querySelectorAll('.prices-tab');
    const categories = document.querySelectorAll('.price-category');
    const emptyMsg = document.getElementById('pricesEmpty');

    function normalize(str) {
        return String(str)
            .toLowerCase()
            .replace(/s/g, 's').replace(/ş/g, 's')
            .replace(/t/g, 't').replace(/ţ/g, 't')
            .replace(/a/g, 'a').replace(/a/g, 'a').replace(/i/g, 'i')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim();
    }

    function matchesSearch(row, query) {
        if (!query) return true;
        const category = row.closest('.price-category');
        const categoryTitle = category ? category.querySelector('.price-category__title') : null;
        const name = row.querySelector('.price-row__name');
        const value = row.querySelector('.price-row__value');
        let text = (name ? name.textContent : '') + ' ' + (value ? value.textContent : '');
        if (categoryTitle) text += ' ' + categoryTitle.textContent;
        return normalize(text).includes(normalize(query));
    }

    function filterPrices() {
        const activeTab = document.querySelector('.prices-tab.is-active');
        const category = activeTab ? activeTab.getAttribute('data-category') : 'all';
        const query = searchInput ? searchInput.value.trim() : '';

        let visibleCount = 0;

        categories.forEach(function (cat) {
            const catKey = cat.getAttribute('data-category');
            const rows = cat.querySelectorAll('.price-row');
            let visibleRows = 0;

            rows.forEach(function (row) {
                const catMatch = category === 'all' || catKey === category;
                const searchMatch = matchesSearch(row, query);
                const show = catMatch && searchMatch;

                row.style.display = show ? '' : 'none';
                if (show) visibleRows++;
            });

            const showCategory = visibleRows > 0;
            cat.classList.toggle('is-hidden', !showCategory);
            if (showCategory) visibleCount++;
        });

        if (emptyMsg) {
            emptyMsg.hidden = visibleCount > 0 || !query;
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterPrices);
        searchInput.addEventListener('search', filterPrices);
    }

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            tabs.forEach(function (t) {
                t.classList.remove('is-active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('is-active');
            tab.setAttribute('aria-selected', 'true');
            filterPrices();
        });
    });

    // Keyboard navigation for tabs
    tabs.forEach(function (tab, i) {
        tab.addEventListener('keydown', function (e) {
            let next;
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                next = tabs[i + 1] || tabs[0];
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                next = tabs[i - 1] || tabs[tabs.length - 1];
            } else if (e.key === 'Home') {
                next = tabs[0];
            } else if (e.key === 'End') {
                next = tabs[tabs.length - 1];
            }
            if (next) {
                e.preventDefault();
                next.focus();
                next.click();
            }
        });
    });

    // Mobile menu
    const menuToggle = document.getElementById('menuToggle');
    const headerNav = document.getElementById('headerNav');

    if (menuToggle && headerNav) {
        const header = document.getElementById('header');
        menuToggle.addEventListener('click', function () {
            const isOpen = headerNav.classList.contains('is-open');
            headerNav.classList.toggle('is-open', !isOpen);
            if (header) header.classList.toggle('is-menu-open', !isOpen);
            menuToggle.setAttribute('aria-expanded', !isOpen);
            document.body.style.overflow = isOpen ? '' : 'hidden';
        });

        function closeMenu() {
            headerNav.classList.remove('is-open');
            if (header) header.classList.remove('is-menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            headerNav.querySelectorAll('.header__nav-item.is-open').forEach(function (el) {
                el.classList.remove('is-open');
                var btn = el.querySelector('.header__link--toggle');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            });
        }

        headerNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth >= 769) closeMenu();
        });
    }

    document.querySelectorAll('.header__link--services-toggle, .header__link--prices-toggle').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            var parent = btn.closest('.header__nav-item');
            if (parent) {
                headerNav.querySelectorAll('.header__nav-item.is-open').forEach(function (el) {
                    if (el !== parent) {
                        el.classList.remove('is-open');
                        var otherBtn = el.querySelector('.header__link--toggle');
                        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                    }
                });
                var isOpen = parent.classList.toggle('is-open');
                btn.setAttribute('aria-expanded', isOpen);
            }
        });
    });

    // Select tab from URL hash (e.g. prices.html#consultatie)
    function selectTabFromHash() {
        var hash = (window.location.hash || '').replace(/^#/, '').toLowerCase();
        if (!hash) return;
        var tab = Array.prototype.find.call(tabs, function (t) {
            return t.getAttribute('data-category') === hash;
        });
        if (tab) {
            tabs.forEach(function (t) {
                t.classList.remove('is-active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('is-active');
            tab.setAttribute('aria-selected', 'true');
        }
    }
    selectTabFromHash();
    filterPrices();

    // Booking form: submit via AJAX, show success card instead of redirect
    const bookingForm = document.getElementById('bookingForm');
    const bookingSuccess = document.getElementById('bookingSuccess');
    const bookingSubmitBtn = document.getElementById('bookingSubmitBtn');

    if (bookingForm && bookingSuccess) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!bookingSubmitBtn) return;
            bookingSubmitBtn.disabled = true;
            bookingSubmitBtn.textContent = 'Se trimite...';

            const formData = new FormData(bookingForm);
            const data = {};
            formData.forEach(function (value, key) {
                data[key] = value;
            });

            fetch('https://formsubmit.co/ajax/ancaralucasmyle@contact.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(function (response) {
                return response.json();
            })
            .then(function () {
                bookingForm.hidden = true;
                bookingSuccess.hidden = false;
            })
            .catch(function () {
                bookingSubmitBtn.disabled = false;
                bookingSubmitBtn.textContent = 'Trimite programarea';
                alert('A aparut o eroare. Te rugam sa incerci din nou sau sa ne suni direct.');
            });
        });
    }

    // Header scroll effect
    const header = document.getElementById('header');
    function updateHeaderScroll() {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 20);
        }
    }
    window.addEventListener('scroll', updateHeaderScroll);
    updateHeaderScroll();
})();
