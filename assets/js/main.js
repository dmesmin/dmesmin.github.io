/* jshint esversion: 6 */
'use strict';

// ---- Language toggle ----
// index.html is authored in French: capture its original text as the 'fr' source
// of truth before any translation is applied, so it never needs duplicating in JS.
const defaultTexts = {};
document.querySelectorAll('[data-i18n]').forEach(function (el) {
  defaultTexts[el.dataset.i18n] = el.textContent;
});

let currentLang = localStorage.getItem('lang') || 'fr';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    const key = el.dataset.i18n;
    const dict = translations[lang];
    el.textContent = (dict && dict[key] !== undefined) ? dict[key] : defaultTexts[key];
  });
  document.getElementById('langToggle').textContent = lang === 'fr' ? 'EN' : 'FR';
}

document.getElementById('langToggle').addEventListener('click', function () {
  applyLang(currentLang === 'fr' ? 'en' : 'fr');
});

applyLang(currentLang);

// ---- Mobile burger ----
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', function () {
  const isOpen = navLinks.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('.nav__link').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// ---- Nav background on scroll ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', function () {
  nav.classList.toggle('nav--scrolled', window.scrollY > 10);
}, { passive: true });
