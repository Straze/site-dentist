/**
 * anca&raluca smyle - Landing Page Scripts
 * Hybrid scroll: snap hero↔services, then free scroll for the rest
 */

(function () {
    'use strict';

    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const headerNav = document.getElementById('headerNav');
    const scrollContainer = document.getElementById('scrollContainer');

    let scrollY = 0;
    let maxScroll = 0;
    let snapThreshold = 0;
    let scrollLocked = false;
    let snapAnimationId = null;
    let touchStartY = 0;

    function updateMaxScroll() {
        if (scrollContainer) {
            maxScroll = Math.max(0, scrollContainer.offsetHeight - window.innerHeight);
        }
    }

    function updateSnapThreshold() {
        var hero = document.querySelector('.hero');
        var services = document.querySelector('.services-section');
        if (hero && services) {
            var h = hero.offsetHeight;
            var s = services.offsetHeight;
            snapThreshold = h + s;
            if (window.innerWidth <= 768) {
                snapThreshold = Math.max(0, h - 70) + s;
            }
        }
    }

    function getIntroSnapPoints() {
        var hero = document.querySelector('.hero');
        var services = document.querySelector('.services-section');
        if (!hero || !services) return [0];
        var p1 = hero.offsetHeight;
        if (window.innerWidth <= 768) {
            p1 = Math.max(0, p1 - 70);
        }
        return [0, p1];
    }

    function findIntroSnapTarget(direction) {
        var points = getIntroSnapPoints();
        if (direction > 0) {
            for (var i = 0; i < points.length; i++) {
                if (points[i] > scrollY) return points[i];
            }
            return points[points.length - 1];
        } else {
            for (var j = points.length - 1; j >= 0; j--) {
                if (points[j] < scrollY) return points[j];
            }
            return 0;
        }
    }

    function applyScroll() {
        if (scrollContainer) {
            scrollContainer.style.transform = 'translate3d(0, ' + (-scrollY) + 'px, 0)';
        }
    }

    function animateTo(target, onComplete) {
        if (snapAnimationId) cancelAnimationFrame(snapAnimationId);
        var startY = scrollY;
        var startTime = performance.now();
        var duration = 400;

        function step(now) {
            var elapsed = now - startTime;
            var t = Math.min(elapsed / duration, 1);
            t = 1 - Math.pow(1 - t, 3);
            scrollY = startY + (target - startY) * t;
            scrollY = Math.max(0, Math.min(scrollY, maxScroll));
            applyScroll();
            updateScrollReveal();
            updateHeaderOnScroll();
            if (t < 1) {
                snapAnimationId = requestAnimationFrame(step);
            } else {
                snapAnimationId = null;
                scrollLocked = true;
                var lockMs = window.innerWidth <= 768 ? 280 : 400;
                setTimeout(function () { scrollLocked = false; }, lockMs);
                if (onComplete) onComplete();
            }
        }
        snapAnimationId = requestAnimationFrame(step);
    }

    function updateHeaderOnScroll() {
        if (header) {
            header.classList.toggle('scrolled', scrollY > 20);
        }
        if (typeof window.updateBackToTopVisibility === 'function') {
            window.updateBackToTopVisibility(scrollY > 300);
        }
    }

    function handleWheel(e) {
        if (scrollLocked) return;
        var delta = e.deltaY;
        var wouldBe = scrollY + delta;
        var points = getIntroSnapPoints();
        var lastSnap = points[points.length - 1];
        var atLastSnapAndScrollingDown = scrollY >= lastSnap - 2 && delta > 0;
        if (wouldBe < snapThreshold && !atLastSnapAndScrollingDown) {
            e.preventDefault();
            var target = findIntroSnapTarget(delta);
            if (target !== scrollY) {
                animateTo(target);
            }
        } else {
            var newY = Math.max(0, Math.min(wouldBe, maxScroll));
            if (newY !== scrollY) {
                e.preventDefault();
                scrollY = newY;
                applyScroll();
                updateScrollReveal();
                updateHeaderOnScroll();
            }
        }
    }

    function handleTouchStart(e) {
        touchStartY = e.touches[0].clientY;
    }

    function isFormControl(el) {
        if (!el || !el.closest) return false;
        var form = el.closest('form');
        if (!form) return false;
        var tag = el.tagName && el.tagName.toLowerCase();
        var role = el.getAttribute && el.getAttribute('role');
        return tag === 'input' || tag === 'textarea' || tag === 'select' || tag === 'button' || role === 'textbox' || role === 'combobox';
    }

    function handleTouchMove(e) {
        if (scrollLocked) {
            e.preventDefault();
            return;
        }
        if (isFormControl(e.target)) return;
        var delta = touchStartY - e.touches[0].clientY;
        touchStartY = e.touches[0].clientY;
        var wouldBe = scrollY + delta;
        var points = getIntroSnapPoints();
        var lastSnap = points[points.length - 1];
        var atLastSnapAndScrollingDown = scrollY >= lastSnap - 2 && delta > 0;
        if (wouldBe < snapThreshold && !atLastSnapAndScrollingDown) {
            var target = findIntroSnapTarget(delta);
            if (target !== scrollY) {
                e.preventDefault();
                animateTo(target);
            }
        } else {
            var newY = Math.max(0, Math.min(wouldBe, maxScroll));
            if (newY !== scrollY) {
                e.preventDefault();
                scrollY = newY;
                applyScroll();
                updateScrollReveal();
                updateHeaderOnScroll();
            }
        }
    }

    if (scrollContainer) {
        window.scrollToTop = function () {
            animateTo(0);
        };
        window.addEventListener('wheel', handleWheel, { passive: false });
        scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
        scrollContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('resize', function () {
            updateMaxScroll();
            updateSnapThreshold();
            scrollY = Math.min(scrollY, maxScroll);
            applyScroll();
            updateScrollReveal();
        });
        window.addEventListener('load', function () {
            updateMaxScroll();
            updateSnapThreshold();
            applyScroll();
        });
        updateMaxScroll();
        updateSnapThreshold();
        applyScroll();
        setTimeout(function () {
            if (typeof window.updateBackToTopVisibility === 'function') {
                window.updateBackToTopVisibility(scrollY > 300);
            }
        }, 0);
    }

    // Mobile menu toggle (Apple-style expand)
    if (menuToggle && headerNav) {
        const header = document.getElementById('header');
        menuToggle.addEventListener('click', function () {
            const isOpen = headerNav.classList.contains('is-open');
            headerNav.classList.toggle('is-open', !isOpen);
            if (header) header.classList.toggle('is-menu-open', !isOpen);
            menuToggle.setAttribute('aria-expanded', !isOpen);
            document.body.style.overflow = isOpen ? '' : 'hidden';
        });

        headerNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function (e) {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const targetEl = document.querySelector(href);
                    if (targetEl) {
                        e.preventDefault();
                        var targetY = targetEl.getBoundingClientRect().top + scrollY;
                        targetY = Math.max(0, Math.min(targetY, maxScroll));
                        animateTo(targetY);
                    }
                }
                headerNav.classList.remove('is-open');
                if (header) header.classList.remove('is-menu-open');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth >= 769) {
                headerNav.classList.remove('is-open');
                if (header) header.classList.remove('is-menu-open');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // Nav dropdown toggles (mobile)
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

    // Scroll reveal: elements invisible by default, animate in when entering viewport (trigger once, stay visible)
    const scrollRevealEls = document.querySelectorAll('.scroll-reveal');
    const revealed = new Set();

    function isInView(el) {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        return rect.top < vh * 0.85 && rect.bottom > vh * 0.15;
    }

    function updateScrollReveal() {
        scrollRevealEls.forEach(function (el, i) {
            if (!el.classList.contains('scroll-reveal--from-left') && !el.classList.contains('scroll-reveal--from-right') && !el.classList.contains('scroll-reveal--fade')) {
                el.classList.add(i % 2 === 0 ? 'scroll-reveal--from-left' : 'scroll-reveal--from-right');
            }
            if (isInView(el) && !revealed.has(el)) {
                revealed.add(el);
                el.classList.add('scroll-reveal--in-view');
                setTimeout(function () {
                    el.classList.add('scroll-reveal--ready');
                }, 1000);
            }
        });
    }

    scrollRevealEls.forEach(function (el, i) {
        if (!el.classList.contains('scroll-reveal--from-left') && !el.classList.contains('scroll-reveal--from-right') && !el.classList.contains('scroll-reveal--fade')) {
            el.classList.add(i % 2 === 0 ? 'scroll-reveal--from-left' : 'scroll-reveal--from-right');
        }
    });

    if (scrollRevealEls.length) {
        requestAnimationFrame(function () {
            updateScrollReveal();
            updateHeaderOnScroll();
        });
    }

    // Hero: wrap letters in spans for bounce animation
    (function initHeroLetters() {
        const TITLE_DELAY = 0.02;
        const SUBTITLE_START = 0.25;
        const SUBTITLE_DELAY = 0.01;
        let charIndex = 0;

        function wrapTextInLetters(node, baseDelay, letterDelay) {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                const words = text.split(/\s+/).filter(Boolean);
                const fragment = document.createDocumentFragment();
                for (var w = 0; w < words.length; w++) {
                    if (w > 0) {
                        var spaceSpan = document.createElement('span');
                        spaceSpan.className = 'hero__letter hero__letter--space';
                        spaceSpan.textContent = '\u00A0';
                        spaceSpan.style.animationDelay = (baseDelay + charIndex * letterDelay) + 's';
                        fragment.appendChild(spaceSpan);
                        charIndex++;
                    }
                    var wordSpan = document.createElement('span');
                    wordSpan.className = 'hero__word';
                    for (var i = 0; i < words[w].length; i++) {
                        var char = words[w][i];
                        var span = document.createElement('span');
                        span.className = 'hero__letter';
                        span.textContent = char;
                        span.style.animationDelay = (baseDelay + charIndex * letterDelay) + 's';
                        wordSpan.appendChild(span);
                        charIndex++;
                    }
                    fragment.appendChild(wordSpan);
                }
                node.parentNode.replaceChild(fragment, node);
            } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'BR') {
                Array.from(node.childNodes).forEach(function (n) { wrapTextInLetters(n, baseDelay, letterDelay); });
            }
        }

        const title = document.querySelector('.hero__title');
        const subtitle = document.querySelector('.hero__subtitle');
        if (title) {
            Array.from(title.childNodes).forEach(function (n) { wrapTextInLetters(n, 0, TITLE_DELAY); });
        }
        if (subtitle) {
            charIndex = 0;
            Array.from(subtitle.childNodes).forEach(function (n) { wrapTextInLetters(n, SUBTITLE_START, SUBTITLE_DELAY); });
        }
    })();

    // FAQ accordion
    document.querySelectorAll('.faq-item__question').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var item = btn.closest('.faq-item');
            var isOpen = item.classList.contains('is-open');
            var list = item.closest('.faq-section__list');
            if (list) {
                list.querySelectorAll('.faq-item').forEach(function (i) {
                    i.classList.remove('is-open');
                    var q = i.querySelector('.faq-item__question');
                    if (q) q.setAttribute('aria-expanded', 'false');
                });
            }
            if (!isOpen) {
                item.classList.add('is-open');
                btn.setAttribute('aria-expanded', 'true');
                setTimeout(function () {
                    item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            }
        });
    });

    // Anchor link smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            const href = link.getAttribute('href');
            if (href === '#') return;
            const targetEl = document.querySelector(href);
            if (targetEl) {
                e.preventDefault();
                var targetY = targetEl.getBoundingClientRect().top + scrollY;
                targetY = Math.max(0, Math.min(targetY, maxScroll));
                animateTo(targetY);
            }
        });
    });

    // Booking form (schedule section): submit via AJAX, show success card
    var bookingForm = document.getElementById('bookingForm');
    var bookingSuccess = document.getElementById('bookingSuccess');
    var bookingSubmitBtn = document.getElementById('bookingSubmitBtn');
    if (bookingForm && bookingSuccess) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!bookingSubmitBtn) return;
            bookingSubmitBtn.disabled = true;
            bookingSubmitBtn.textContent = 'Se trimite...';
            var formData = new FormData(bookingForm);
            var data = {};
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
