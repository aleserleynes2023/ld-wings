/*
 * L&D Wings — site features
 * Replaces the template's js/scripts.js (Start Bootstrap Business Casual v7.0.9, MIT).
 * The template's "highlight today's hours" idea is kept in initHours(), with a guard so it
 * doesn't crash on pages without an hours list.
 *
 * Features:
 *   1. Menu search + category/heat filters (menu.html)
 *   2. Gallery filter + accessible lightbox (gallery.html)
 *   3. Validated contact / reservation form (contact.html)
 *   4. Animated spice-meter infographic (index.html)
 *   5. Business hours: highlight today + "open now" status (about.html)
 *   6. Promo video fallback when the video file is missing (index.html)
 */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        initMenuFilter();
        initGallery();
        initContactForm();
        initSpiceMeter();
        initHours();
        initVideoFallback();
    });

    /* ---------- Shared: toggle-button groups ---------- */
    function setupFilterGroup(group, onChange) {
        if (!group) return;
        group.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-filter]');
            if (!btn) return;
            group.querySelectorAll('[data-filter]').forEach(function (b) {
                b.setAttribute('aria-pressed', String(b === btn));
            });
            onChange(btn.getAttribute('data-filter'));
        });
    }

    /* ---------- 1. Menu search + filter ---------- */
    function initMenuFilter() {
        var list = document.getElementById('menuList');
        if (!list) return;

        var items = Array.prototype.slice.call(list.querySelectorAll('[data-menu-item]'));
        var search = document.getElementById('menuSearch');
        var count = document.getElementById('menuCount');
        var empty = document.getElementById('menuEmpty');
        var state = { text: '', category: 'all', heat: 'all' };

        function apply() {
            var shown = 0;
            items.forEach(function (item) {
                var text = item.textContent.toLowerCase();
                var ok =
                    (state.text === '' || text.indexOf(state.text) !== -1) &&
                    (state.category === 'all' || item.dataset.category === state.category) &&
                    (state.heat === 'all' || item.dataset.heat === state.heat);
                item.hidden = !ok;
                if (ok) shown++;
            });
            empty.hidden = shown !== 0;
            count.textContent = shown === items.length
                ? 'Showing all ' + items.length + ' items'
                : 'Showing ' + shown + ' of ' + items.length + ' items';
        }

        search.addEventListener('input', function () {
            state.text = search.value.trim().toLowerCase();
            apply();
        });
        setupFilterGroup(document.querySelector('[data-filter-group="category"]'), function (v) {
            state.category = v;
            apply();
        });
        setupFilterGroup(document.querySelector('[data-filter-group="heat"]'), function (v) {
            state.heat = v;
            apply();
        });
        apply();
    }

    /* ---------- 2. Gallery filter + lightbox ---------- */
    function initGallery() {
        var gallery = document.getElementById('gallery');
        var box = document.getElementById('lightbox');
        if (!gallery || !box) return;

        var buttons = Array.prototype.slice.call(gallery.querySelectorAll('.gallery-item'));
        var img = document.getElementById('lightboxImg');
        var caption = document.getElementById('lightboxCaption');
        var current = 0;
        var lastFocus = null;

        setupFilterGroup(document.querySelector('[data-filter-group="gallery"]'), function (v) {
            buttons.forEach(function (b) {
                b.closest('figure').hidden = !(v === 'all' || b.dataset.category === v);
            });
        });

        function visible() {
            return buttons.filter(function (b) { return !b.closest('figure').hidden; });
        }

        function show(index) {
            var list = visible();
            current = (index + list.length) % list.length;
            var btn = list[current];
            var thumb = btn.querySelector('img');
            img.src = btn.dataset.full;
            img.alt = thumb.alt;
            caption.textContent = btn.querySelector('figcaption').textContent +
                ' (' + (current + 1) + ' of ' + list.length + ')';
        }

        function open(btn) {
            lastFocus = btn;
            box.hidden = false;
            document.body.style.overflow = 'hidden';
            show(visible().indexOf(btn));
            box.querySelector('[data-lightbox="close"]').focus();
        }

        function close() {
            box.hidden = true;
            document.body.style.overflow = '';
            img.removeAttribute('src');
            if (lastFocus) lastFocus.focus();
        }

        buttons.forEach(function (btn) {
            btn.addEventListener('click', function () { open(btn); });
        });

        box.addEventListener('click', function (e) {
            var action = e.target.closest('[data-lightbox]');
            if (action) {
                var a = action.getAttribute('data-lightbox');
                if (a === 'close') close();
                if (a === 'prev') show(current - 1);
                if (a === 'next') show(current + 1);
            } else if (e.target === box) {
                close(); // click on the dark backdrop
            }
        });

        document.addEventListener('keydown', function (e) {
            if (box.hidden) return;
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') show(current - 1);
            if (e.key === 'ArrowRight') show(current + 1);
            if (e.key === 'Tab') {
                // keep keyboard focus inside the dialog
                var f = box.querySelectorAll('button');
                var first = f[0], last = f[f.length - 1];
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        });
    }

    /* ---------- 3. Contact form validation ---------- */
    function initContactForm() {
        var form = document.getElementById('contactForm');
        if (!form) return;

        var f = form.elements;
        var booking = document.getElementById('bookingFields');
        var counter = document.getElementById('message-count');
        var success = document.getElementById('formSuccess');

        // Earliest reservation date is today
        var today = new Date();
        var isoToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
        f.date.min = isoToday;

        function needsBooking() {
            return f.topic.value === 'reservation' || f.topic.value === 'party';
        }

        f.topic.addEventListener('change', function () {
            booking.hidden = !needsBooking();
            if (form.classList.contains('was-checked')) validateAll();
        });

        f.message.addEventListener('input', function () {
            counter.textContent = f.message.value.length + ' / 500 characters';
        });

        // Each rule returns an error message, or '' when the field is valid
        var rules = {
            name: function (v) {
                v = v.trim();
                if (!v) return 'Please enter your name.';
                if (v.length < 2) return 'Your name looks too short.';
                if (!/^[A-Za-zÀ-ÿñÑ .'-]+$/.test(v)) return 'Use letters only (spaces, dots and hyphens are fine).';
                return '';
            },
            email: function (v) {
                v = v.trim();
                if (!v) return 'Please enter your email address.';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Enter an email like juan@example.com.';
                return '';
            },
            phone: function (v) {
                var digits = v.replace(/[\s-]/g, '');
                if (!digits) return 'Please enter your mobile number.';
                if (!/^(09\d{9}|\+639\d{9})$/.test(digits)) return 'Enter an 11-digit PH mobile number starting with 09, e.g. 0917 123 4567.';
                return '';
            },
            topic: function (v) {
                return v ? '' : 'Please choose a topic.';
            },
            date: function (v) {
                if (!needsBooking()) return '';
                if (!v) return 'Please pick a date.';
                if (v < isoToday) return 'The date can\'t be in the past.';
                return '';
            },
            guests: function (v) {
                if (!needsBooking()) return '';
                var n = Number(v);
                if (!v) return 'How many guests are coming?';
                if (!Number.isInteger(n) || n < 1 || n > 40) return 'Enter a number from 1 to 40. For bigger groups, call us.';
                return '';
            },
            message: function (v) {
                v = v.trim();
                if (!v) return 'Please write a message.';
                if (v.length < 10) return 'Please write at least 10 characters.';
                return '';
            },
            consent: function () {
                return f.consent.checked ? '' : 'Please tick this box so we can reply to you.';
            }
        };

        function validateField(name) {
            var input = f[name];
            var msg = rules[name](input.value);
            var errorEl = document.getElementById(name + '-error');
            errorEl.textContent = msg;
            input.classList.toggle('is-invalid', !!msg);
            input.classList.toggle('is-valid', !msg && (input.type !== 'checkbox'));
            input.setAttribute('aria-invalid', msg ? 'true' : 'false');
            return !msg;
        }

        function validateAll() {
            var firstBad = null;
            Object.keys(rules).forEach(function (name) {
                if (!validateField(name) && !firstBad) firstBad = f[name];
            });
            return firstBad;
        }

        // Re-check a field as the user fixes it, after the first submit attempt
        Object.keys(rules).forEach(function (name) {
            var evt = (name === 'topic' || name === 'consent' || name === 'date') ? 'change' : 'input';
            f[name].addEventListener(evt, function () {
                if (form.classList.contains('was-checked')) validateField(name);
            });
            f[name].addEventListener('blur', function () {
                if (f[name].value) validateField(name);
            });
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            form.classList.add('was-checked');
            success.hidden = true;
            var firstBad = validateAll();
            if (firstBad) {
                firstBad.focus();
                return;
            }
            // No server for this school project: show a confirmation instead of sending.
            var first = f.name.value.trim().split(' ')[0];
            var extra = needsBooking()
                ? ' We\'ve noted your table for ' + f.guests.value + ' on ' +
                  new Date(f.date.value + 'T00:00').toLocaleDateString('en-PH', { weekday: 'long', month: 'long', day: 'numeric' }) + '.'
                : '';
            success.textContent = 'Salamat, ' + first + '! Your message is ready.' + extra +
                ' (Demo only: this form doesn\'t send anything yet.)';
            success.hidden = false;
            form.reset();
            form.classList.remove('was-checked');
            booking.hidden = true;
            counter.textContent = '0 / 500 characters';
            form.querySelectorAll('.is-valid, .is-invalid').forEach(function (el) {
                el.classList.remove('is-valid', 'is-invalid');
                el.removeAttribute('aria-invalid');
            });
            success.focus();
        });
    }

    /* ---------- 4. Spice meter animation ---------- */
    function initSpiceMeter() {
        var meter = document.getElementById('spiceMeter');
        if (!meter) return;
        if (!('IntersectionObserver' in window)) {
            meter.classList.add('is-visible');
            return;
        }
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    meter.classList.add('is-visible');
                    io.disconnect();
                }
            });
        }, { threshold: 0.35 });
        io.observe(meter);
    }

    /* ---------- 5. Business hours ---------- */
    // Minutes after midnight. A close time past 1440 means "after midnight, next day".
    var HOURS = [
        [660, 1380], // Sunday    11:00 AM - 11:00 PM
        [660, 1380], // Monday
        [660, 1380], // Tuesday
        [660, 1380], // Wednesday
        [660, 1380], // Thursday
        [660, 1560], // Friday    11:00 AM - 2:00 AM
        [660, 1560]  // Saturday  11:00 AM - 2:00 AM
    ];

    function isOpen(now) {
        var day = now.getDay();
        var mins = now.getHours() * 60 + now.getMinutes();
        var yesterday = (day + 6) % 7;
        // still open from last night's late shift?
        if (mins + 1440 < HOURS[yesterday][1]) return true;
        return mins >= HOURS[day][0] && mins < HOURS[day][1];
    }

    function initHours() {
        var rows = document.querySelectorAll('.list-hours li');
        if (rows.length === 7) {
            rows[new Date().getDay()].classList.add('today'); // from the original template
            rows[new Date().getDay()].setAttribute('aria-current', 'date');
        }
        var status = document.getElementById('openStatus');
        if (status) {
            var open = isOpen(new Date());
            status.textContent = open ? 'Open now. Come on in!' : 'Closed right now. We open at 11:00 AM.';
            status.classList.add(open ? 'is-open' : 'is-closed');
        }
    }

    /* ---------- 6. Video fallback ---------- */
    function initVideoFallback() {
        var video = document.getElementById('promoVideo');
        var frame = document.getElementById('promoVideoFrame');
        if (!video || !frame) return;
        var source = video.querySelector('source');
        function missing() { frame.classList.add('is-missing'); }
        if (source) source.addEventListener('error', missing);
        video.addEventListener('error', missing);
        // The source may have failed before this script ran
        if (video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) missing();
    }
})();
