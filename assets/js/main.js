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

  /* Scroll reveal */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('in'); });
    } else {
      var ro = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      reveals.forEach(function (el) { ro.observe(el); });
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
