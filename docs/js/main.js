/* ============================================
   Boulder Bathroom Remodeling — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile Nav Toggle ---------- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---------- Before/After Slider ---------- */
  document.querySelectorAll('.ba-slider').forEach(function (slider) {
    var handle = slider.querySelector('.ba-handle');
    var afterImg = slider.querySelector('.ba-after');
    if (!handle || !afterImg) return; /* the homepage uses the ba-slider__ markup handled below */
    var isDragging = false;

    function updateSlider(x) {
      var rect = slider.getBoundingClientRect();
      var pos = Math.max(0, Math.min(x - rect.left, rect.width));
      var pct = (pos / rect.width) * 100;
      handle.style.left = pct + '%';
      afterImg.style.clipPath = 'inset(0 0 0 ' + pct + '%)';
    }

    // Mouse events
    handle.addEventListener('mousedown', function (e) {
      e.preventDefault();
      isDragging = true;
    });
    slider.addEventListener('mousedown', function (e) {
      isDragging = true;
      updateSlider(e.clientX);
    });
    document.addEventListener('mousemove', function (e) {
      if (isDragging) updateSlider(e.clientX);
    });
    document.addEventListener('mouseup', function () {
      isDragging = false;
    });

    // Touch events
    handle.addEventListener('touchstart', function (e) {
      e.preventDefault();
      isDragging = true;
    });
    slider.addEventListener('touchstart', function (e) {
      isDragging = true;
      updateSlider(e.touches[0].clientX);
    });
    slider.addEventListener('touchmove', function (e) {
      if (isDragging) {
        e.preventDefault();
        updateSlider(e.touches[0].clientX);
      }
    }, { passive: false });
    document.addEventListener('touchend', function () {
      isDragging = false;
    });
  });

  /* ---------- Header menu, slider and FAQ for the header__ / ba-slider__ / faq-item__ markup (2026-10-07) ---------- */
  var navBtn = document.getElementById('hamburger');
  var navPanel = document.getElementById('nav');
  if (navBtn && navPanel) {
    navBtn.addEventListener('click', function () {
      var open = navPanel.classList.toggle('open');
      navBtn.classList.toggle('active', open);
      navBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    navPanel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navPanel.classList.remove('open'); navBtn.classList.remove('active');
        navBtn.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '';
      });
    });
  }
  document.querySelectorAll('.ba-slider').forEach(function (slider) {
    var before = slider.querySelector('.ba-slider__before');
    var bar = slider.querySelector('.ba-slider__handle');
    if (!before || !bar) return;
    var dragging = false;
    function setPos(x) {
      var r = slider.getBoundingClientRect();
      var pct = Math.max(0, Math.min(100, (x - r.left) / r.width * 100));
      bar.style.left = pct + '%';
      before.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
    }
    slider.addEventListener('mousedown', function (e) { dragging = true; setPos(e.clientX); });
    window.addEventListener('mousemove', function (e) { if (dragging) setPos(e.clientX); });
    window.addEventListener('mouseup', function () { dragging = false; });
    slider.addEventListener('touchstart', function (e) { dragging = true; setPos(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchmove', function (e) { if (dragging) setPos(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchend', function () { dragging = false; });
  });
  document.querySelectorAll('.faq-item__question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (el) { el.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
      btn.setAttribute('aria-expanded', wasOpen ? 'false' : 'true');
    });
  });

  /* ---------- FAQ Accordion ---------- */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(function (el) {
        el.classList.remove('open');
      });
      // Open clicked if was closed
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---------- Sticky Header Shadow on Scroll ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,.12)';
      } else {
        header.style.boxShadow = '0 2px 12px rgba(0,0,0,.08)';
      }
    });
  }

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
