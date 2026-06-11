/* main.js — bild.fi interactions */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    /* ---------- mobile menu ---------- */
    var header = document.querySelector(".site-header");
    var toggle = document.querySelector(".menu-toggle");
    if (toggle && header) {
      toggle.addEventListener("click", function () {
        var open = header.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
    }

    /* ---------- nav dropdown ---------- */
    document.querySelectorAll(".nav-drop-btn").forEach(function (b) {
      b.addEventListener("click", function (e) {
        e.stopPropagation();
        var d = b.parentNode;
        var open = d.classList.toggle("open");
        b.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
    document.addEventListener("click", function () {
      document.querySelectorAll(".nav-drop.open").forEach(function (d) {
        d.classList.remove("open");
        d.querySelector(".nav-drop-btn").setAttribute("aria-expanded", "false");
      });
    });

    /* ---------- reveal on scroll ---------- */
    var revealed = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealed.length) {
      var ro = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            ro.unobserve(e.target);
          }
        });
      }, { threshold: 0.12 });
      revealed.forEach(function (el) { ro.observe(el); });
    } else {
      revealed.forEach(function (el) { el.classList.add("in"); });
    }

    /* ---------- condition bars: animate to data-val when visible ---------- */
    var barBlocks = document.querySelectorAll(".bars");
    function fillBars(block) {
      block.querySelectorAll(".fill").forEach(function (f) {
        f.style.width = f.dataset.val + "%";
      });
    }
    if ("IntersectionObserver" in window && barBlocks.length) {
      var bo = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            fillBars(e.target);
            bo.unobserve(e.target);
          }
        });
      }, { threshold: 0.3 });
      barBlocks.forEach(function (b) { bo.observe(b); });
    } else {
      barBlocks.forEach(fillBars);
    }

    /* ---------- BILD Engine stepper ---------- */
    var stepper = document.querySelector(".stepper");
    if (stepper) {
      var tabs = stepper.querySelectorAll(".stepper-rail button");
      var dots = stepper.querySelectorAll(".stepper-dots button");
      var copies = stepper.querySelectorAll(".stepper-copy .stepper-step");
      var visuals = stepper.querySelectorAll(".stepper-visual .stepper-step");
      var n = tabs.length;
      var i = 0;
      var timer = null;
      var paused = false;
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      function show(idx) {
        i = (idx + n) % n;
        [tabs, dots, copies, visuals].forEach(function (set) {
          set.forEach(function (el, k) { el.classList.toggle("on", k === i); });
        });
        tabs.forEach(function (t, k) { t.setAttribute("aria-selected", k === i ? "true" : "false"); });
        restartProgress();
      }

      function restartProgress() {
        clearTimeout(timer);
        var bar = stepper.querySelector(".stepper-progress span");
        stepper.classList.remove("running");
        if (paused || reduce) {
          bar.style.width = "100%";
          return;
        }
        bar.style.width = "";
        void bar.offsetWidth; /* restart the CSS animation */
        stepper.classList.add("running");
        timer = setTimeout(function () { show(i + 1); }, 4500);
      }

      tabs.forEach(function (t, k) { t.addEventListener("click", function () { show(k); }); });
      dots.forEach(function (d, k) { d.addEventListener("click", function () { show(k); }); });
      stepper.addEventListener("mouseenter", function () { paused = true; restartProgress(); });
      stepper.addEventListener("mouseleave", function () { paused = false; restartProgress(); });

      show(0);
    }

    /* ---------- hero living record ---------- */
    var stage = document.querySelector(".hero-stage");
    if (stage) {
      var hsEntries = stage.parentNode.querySelectorAll(".hs-entry");
      var hsPill = stage.parentNode.querySelector(".hs-pill");
      var hsReduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (hsReduce) {
        hsEntries.forEach(function (e) { e.classList.add("on"); });
        hsPill.classList.add("on");
      } else {
        var hsStep = 0;
        var hsTotal = hsEntries.length + 2; /* entries + pill beat + hold beat */
        var hsTick = function () {
          hsStep = (hsStep + 1) % (hsTotal + 1);
          hsEntries.forEach(function (e, k) { e.classList.toggle("on", k < hsStep); });
          hsPill.classList.toggle("on", hsStep > hsEntries.length);
        };
        hsTick();
        setInterval(hsTick, 1500);
      }
    }

    /* ---------- contractors: van route ---------- */
    var route = document.querySelector(".route");
    if (route) {
      var rStops = route.querySelectorAll(".route-stop");
      var rCells = document.querySelectorAll(".route-cells .cell");
      var rReduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      var rIdx = 0;
      var setStep = function (k) {
        rIdx = k % rStops.length;
        route.setAttribute("data-step", String(rIdx));
        rStops.forEach(function (st, i) { st.classList.toggle("done", i <= rIdx); });
        rCells.forEach(function (cl, i) { cl.classList.toggle("live", i === rIdx); });
      };
      if (rReduce) {
        setStep(rStops.length - 1);
      } else {
        setStep(0);
        setInterval(function () { setStep(rIdx + 1); }, 2400);
      }
    }

    /* ---------- contact form ---------- */
    var form = document.querySelector("#contact-form");
    if (form) {
      var sent = document.querySelector("#form-sent");
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        form.hidden = true;
        sent.hidden = false;
      });
      var again = document.querySelector("#send-again");
      if (again) {
        again.addEventListener("click", function () {
          form.reset();
          form.hidden = false;
          sent.hidden = true;
        });
      }
    }
  });
})();
