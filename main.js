// Teranga Noir: fills the page from content.js, runs the hero video and the mobile menu.
(function () {
  var C = window.GALA || {};
  var get = function (path) {
    return path.split('.').reduce(function (obj, key) { return obj == null ? undefined : obj[key]; }, C);
  };

  // ---------- Times and dates ----------
  var formatTime = function (hm) {
    if (!hm) return '';
    var parts = hm.split(':').map(Number);
    return new Date(2000, 0, 1, parts[0], parts[1]).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };
  C.doorsTime = formatTime(C.doors);
  C.programTime = formatTime(C.program);

  if (C.date) {
    var p = C.date.split('-').map(Number);
    var day = new Date(p[0], p[1] - 1, p[2]);
    var fmt = function (opts) { return day.toLocaleDateString('en-CA', opts); };
    C.dateLong = fmt({ weekday: 'long', month: 'long', day: 'numeric' });
    C.dateShort = fmt({ weekday: 'short', month: 'short', day: 'numeric' });
    C.dateFull = fmt({ month: 'long', day: 'numeric', year: 'numeric' });
    C.year = String(p[0]);
  }

  // ---------- Text: <span data-g="key"> ----------
  document.querySelectorAll('[data-g]').forEach(function (el) {
    var v = get(el.getAttribute('data-g'));
    if (v === undefined || v === null || v === '') return;   // keep the placeholder
    el.textContent = '';
    String(v).split('\n').forEach(function (line, i) {
      if (i) el.appendChild(document.createElement('br'));
      el.appendChild(document.createTextNode(line));
    });
  });

  // ---------- Links ----------
  var openInNewTab = function (a) { a.target = '_blank'; a.rel = 'noopener'; };

  // data-href="key" (+ optional data-fallback="key" or data-fallback-mail="key")
  document.querySelectorAll('[data-href]').forEach(function (a) {
    var url = get(a.getAttribute('data-href'));
    if (!url && a.hasAttribute('data-fallback')) url = get(a.getAttribute('data-fallback'));
    if (url) {
      a.href = url;
      if (/^https?:/.test(url)) openInNewTab(a);
      return;
    }
    var email = a.hasAttribute('data-fallback-mail') && get(a.getAttribute('data-fallback-mail'));
    if (email) a.href = 'mailto:' + email + (a.getAttribute('data-q') || '');
  });

  // data-mail="key" → mailto:, data-tel="key" → tel:
  document.querySelectorAll('[data-mail]').forEach(function (a) {
    var email = get(a.getAttribute('data-mail'));
    if (email) a.href = 'mailto:' + email + (a.getAttribute('data-q') || '');
  });
  document.querySelectorAll('[data-tel]').forEach(function (a) {
    var phone = get(a.getAttribute('data-tel'));
    if (phone) a.href = 'tel:' + phone.replace(/[^\d+]/g, '');
  });

  // ---------- Add to calendar (data-ics) ----------
  if (C.date) {
    var stamp = function (hm) { return C.date.replace(/-/g, '') + 'T' + (hm || '18:00').replace(':', '') + '00'; };
    var ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//TAIBU//Teranga Noir//EN', 'BEGIN:VEVENT',
      'UID:teranga-noir-' + C.date + '@taibugala',
      'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      'DTSTART;TZID=America/Toronto:' + stamp(C.doors),
      'DTEND;TZID=America/Toronto:' + stamp(C.ends),
      'SUMMARY:Teranga Noir',
      'LOCATION:' + [C.venueName, C.venueAddress].filter(Boolean).join(', ').replace(/,/g, '\\,'),
      'DESCRIPTION:Celebrating 18 years of TAIBU Community Health Centre.',
      'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n');
    var icsUrl = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    document.querySelectorAll('[data-ics]').forEach(function (a) { a.href = icsUrl; a.download = 'teranga-noir-gala.ics'; });
  }

  // ---------- Hero video (assets/video/hero.mp4) ----------
  // No autoplay for "reduce motion" users. If the phone blocks autoplay (e.g. Low Power Mode),
  // the poster image shows with a play button.
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var video = document.querySelector('.hero-video');
  if (video) {
    var hero = video.closest('.hero');
    var btn = hero.querySelector('.video-btn');
    var showVideo = function (paused) {
      hero.classList.add('has-video');
      btn.hidden = false;
      btn.classList.toggle('is-paused', paused);
      btn.setAttribute('aria-label', paused ? 'Play background video' : 'Pause background video');
    };
    video.addEventListener('playing', function () { showVideo(false); });
    video.addEventListener('loadeddata', function () { if (reduceMotion) showVideo(true); });
    video.preload = 'auto';
    video.src = video.getAttribute('data-src');
    if (!reduceMotion) {
      var attempt = video.play();
      if (attempt && attempt.catch) attempt.catch(function () {
        if (video.readyState > 0) showVideo(true);   // file exists but autoplay was blocked
      });
    }
    btn.addEventListener('click', function () {
      if (video.paused) { video.play(); showVideo(false); } else { video.pause(); showVideo(true); }
    });
  }

  // ---------- Experience "Read more" (phones only) ----------
  var moreBtn = document.querySelector('.more-btn');
  if (moreBtn) {
    var moreBox = document.getElementById(moreBtn.getAttribute('aria-controls'));
    moreBtn.addEventListener('click', function () {
      var open = moreBtn.getAttribute('aria-expanded') !== 'true';
      moreBtn.setAttribute('aria-expanded', String(open));
      moreBox.classList.toggle('is-open', open);
    });
  }

  // ---------- Mobile menu ----------
  var menuBtn = document.querySelector('.menu-btn');
  var menu = document.getElementById('menu');
  if (menuBtn && menu) {
    var closeBtn = menu.querySelector('.menu__close');
    var openMenu = function () {
      menu.hidden = false;
      menuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    };
    var closeMenu = function (returnFocus) {
      menu.hidden = true;
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (returnFocus) menuBtn.focus();
    };
    menuBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', function () { closeMenu(true); });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { closeMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) closeMenu(true); });
  }
})();
