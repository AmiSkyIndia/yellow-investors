(function () {
  "use strict";

  var header = document.getElementById("site-header");
  var menuToggle = document.getElementById("menu-toggle");
  var nav = document.getElementById("nav");
  var navLinks = document.querySelectorAll(".nav-link");
  var backToTop = document.getElementById("back-to-top");
  var yearEl = document.getElementById("year");

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Sticky header shadow + back-to-top visibility
  window.addEventListener("scroll", function () {
    var scrolled = window.scrollY > 10;
    header.classList.toggle("scrolled", scrolled);
    backToTop.classList.toggle("visible", window.scrollY > 400);
  });

  // Mobile menu toggle
  menuToggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Active nav link on scroll
  var sections = document.querySelectorAll("main section[id]");
  var navObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute("id");
          navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );
  sections.forEach(function (section) { navObserver.observe(section); });

  // Scroll reveal animations
  document.querySelectorAll(
    ".about-grid, .services-grid .service-card, .benefits-grid .benefit, .why-grid .why-card, .price-table-wrap, .contact-grid"
  ).forEach(function (el) { el.classList.add("reveal"); });

  var revealObserver = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach(function (el) { revealObserver.observe(el); });
})();
