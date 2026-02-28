/**
 * Anca&Raluca smyle - Schedule Page
 * Mobile menu, header scroll, booking form
 */

(function () {
    'use strict';

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

    const header = document.getElementById('header');
    function updateHeaderScroll() {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 20);
        }
    }
    window.addEventListener('scroll', updateHeaderScroll);
    updateHeaderScroll();

    // Booking form: submit via AJAX, show success card
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
            .then(function (response) { return response.json(); })
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
})();
