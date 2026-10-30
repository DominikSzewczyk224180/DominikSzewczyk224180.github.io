/* Dominik Szewczyk - Portfolio. Shared behaviour. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Mobile menu */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Rotating word in the hero */
  var rotate = document.querySelector('.rotate');
  if (rotate && !reduce) {
    var words = (rotate.getAttribute('data-words') || '').split('|').filter(Boolean);
    if (words.length > 1) {
      var i = 0;
      setInterval(function () {
        i = (i + 1) % words.length;
        rotate.style.opacity = '0';
        setTimeout(function () {
          rotate.textContent = words[i];
          rotate.style.transition = 'opacity .3s';
          rotate.style.opacity = '1';
        }, 280);
      }, 2600);
    }
  }

  /* Scroll reveal. Content is visible by default (see CSS): we only hide
     below-the-fold items (.pre) and animate them in. Several fallbacks make
     sure nothing can stay stuck hidden if the observer never fires. */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (reveals.length) {
    var showReveal = function (el) { el.classList.remove('pre'); el.classList.add('in'); };
    if (reduce || !('IntersectionObserver' in window)) {
      reveals.forEach(showReveal);
    } else {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      reveals.forEach(function (el) {
        if (el.getBoundingClientRect().top > vh * 0.85) { el.classList.add('pre'); }
        else { showReveal(el); }
      });
      var ro = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { showReveal(e.target); ro.unobserve(e.target); }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(function (el) { if (el.classList.contains('pre')) ro.observe(el); });

      var sweep = function () {
        var h = window.innerHeight || document.documentElement.clientHeight;
        Array.prototype.slice.call(document.querySelectorAll('.reveal.pre')).forEach(function (el) {
          if (el.getBoundingClientRect().top < h * 0.95) { showReveal(el); }
        });
        if (!document.querySelector('.reveal.pre')) {
          window.removeEventListener('scroll', sweep);
          window.removeEventListener('touchmove', sweep);
          window.removeEventListener('resize', sweep);
        }
      };
      window.addEventListener('scroll', sweep, { passive: true });
      window.addEventListener('touchmove', sweep, { passive: true });
      window.addEventListener('resize', sweep);
      setTimeout(function () { reveals.forEach(showReveal); }, 4000);
    }
  }

  /* Animate chart bars when in view */
  var charts = document.querySelectorAll('.chart');
  if (charts.length) {
    var paint = function (chart) {
      chart.querySelectorAll('.fill').forEach(function (f) { f.style.width = f.getAttribute('data-w') + '%'; });
    };
    if (reduce || !('IntersectionObserver' in window)) {
      charts.forEach(paint);
    } else {
      var co = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { paint(e.target); co.unobserve(e.target); }
        });
      }, { threshold: 0.3 });
      charts.forEach(function (c) { co.observe(c); });
    }
  }
})();
