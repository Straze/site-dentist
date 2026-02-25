/**
 * anca&raluca smyle - Back to top floating button
 * Works on all pages (normal scroll + index custom scroll)
 */

(function () {
    'use strict';

    const btn = document.getElementById('backToTop');
    if (!btn) return;

    const scrollContainer = document.getElementById('scrollContainer');
    const THRESHOLD = 300;

    function setVisible(visible) {
        btn.classList.toggle('is-visible', visible);
        btn.setAttribute('aria-hidden', !visible);
    }

    function updateVisibility() {
        if (scrollContainer) {
            return;
        }
        setVisible(window.scrollY > THRESHOLD);
    }

    if (!scrollContainer) {
        window.addEventListener('scroll', updateVisibility, { passive: true });
        updateVisibility();
    }

    window.updateBackToTopVisibility = function (visible) {
        setVisible(visible);
    };

    btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (typeof window.scrollToTop === 'function') {
            window.scrollToTop();
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
})();
