/* global gsap, ScrollTrigger */
import { sporeCanvas } from "./particleCanvas.js";

(function () {
  "use strict";

  // 1. Hero Video Showcase: GPU-composited 3D scroll tilt
  function heroVideo() {
    const gsapVideoShowcase = document.querySelectorAll(
      "[data-gsap-video-showcase]",
    );
    if (!gsapVideoShowcase.length) return;

    const mm = gsap.matchMedia();
    gsapVideoShowcase.forEach((el) => {
      mm.add("(min-width: 1280px)", () => {
        gsap.set(el, { scale: 0.9, rotationX: 8, y: -40, force3D: true });
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top 30%",
            scrub: 0.5,
          },
          scale: 1,
          rotationX: 0,
          y: 0,
          force3D: true,
          ease: "none",
        });
      });
    });
  }

  // 2. Fast GPU-Composited Word Reveal on Headings (zero CPU blur filter)
  function kineticTypography() {
    const headings = document.querySelectorAll(
      "h1, .section-intro .title, h2.hasHighlight, h3.hasHighlight",
    );

    headings.forEach((heading) => {
      if (heading.dataset.qSplit === "true") return;
      heading.dataset.qSplit = "true";

      const wrapNodes = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent;
          if (!text.trim()) return document.createTextNode(text);
          const frag = document.createDocumentFragment();
          const parts = text.split(/(\s+)/);
          parts.forEach((part) => {
            if (/^\s+$/.test(part) || part === "") {
              frag.appendChild(document.createTextNode(part));
            } else {
              const span = document.createElement("span");
              span.className = "q-word";
              span.textContent = part;
              frag.appendChild(span);
            }
          });
          return frag;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.tagName === "BR") return node.cloneNode(false);
          if (node.tagName === "STRONG") {
            const clone = node.cloneNode(true);
            clone.classList.add("q-word", "q-highlight-pill");
            return clone;
          }
          const clone = node.cloneNode(false);
          Array.from(node.childNodes).forEach((child) => {
            clone.appendChild(wrapNodes(child));
          });
          return clone;
        }
        return node.cloneNode(true);
      };

      const children = Array.from(heading.childNodes);
      heading.textContent = "";
      children.forEach((child) => heading.appendChild(wrapNodes(child)));

      const words = heading.querySelectorAll(".q-word");
      if (!words.length) return;

      gsap.fromTo(
        words,
        { y: 24, opacity: 0, force3D: true },
        {
          y: 0,
          opacity: 1,
          force3D: true,
          duration: 0.55,
          stagger: 0.03,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 90%",
             once: true,
          },
        },
      );
    });
  }

  // 3. Fast Section Cascades & Quote Reveal
  function sectionCascades() {
    const sections = document.querySelectorAll(".section, .section-box");
    sections.forEach((sec) => {
      const cards = sec.querySelectorAll(
        ".clay-card:not([data-gsap-video-showcase]), .accordion, .blob-message",
      );
      if (!cards.length) return;

      gsap.fromTo(
        cards,
        { y: 28, opacity: 0, force3D: true },
        {
          y: 0,
          opacity: 1,
          force3D: true,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 85%",
            once: true,
          },
        },
      );
    });

    const pillGroups = document.querySelectorAll(".feature-items-group");
    pillGroups.forEach((group, idx) => {
      const dir = idx % 2 === 0 ? 1 : -1;
      gsap.fromTo(
        group,
        { x: -18 * dir },
        {
          x: 18 * dir,
          ease: "none",
          scrollTrigger: {
            trigger: group,
            start: "top 95%",
            end: "bottom 10%",
            scrub: 0.5,
          },
        },
      );
    });

    const quotes = document.querySelectorAll("blockquote");
    quotes.forEach((quote) => {
      if (quote.dataset.qQuoteSplit === "true") return;
      quote.dataset.qQuoteSplit = "true";

      const rawText = quote.textContent.trim();
      if (!rawText) return;
      quote.textContent = "";
      const words = rawText.split(/\s+/);
      words.forEach((w, i) => {
        const span = document.createElement("span");
        span.className = "q-quote-word";
        span.textContent = w;
        quote.appendChild(span);
        if (i < words.length - 1) {
          quote.appendChild(document.createTextNode(" "));
        }
      });

      const quoteWords = quote.querySelectorAll(".q-quote-word");
      gsap.fromTo(
        quoteWords,
        { opacity: 0.25 },
        {
          opacity: 1,
          stagger: 0.03,
          ease: "none",
          scrollTrigger: {
            trigger: quote,
            start: "top 88%",
            end: "bottom 50%",
            scrub: 0.4,
          },
        },
      );
    });
  }

  // 4. Lightweight QuickTo Interactive Tilt on Clay Cards
  function interactiveClayEffects() {
    if (window.innerWidth < 1024) return;

    const cards = document.querySelectorAll(
      ".clay-card:not([data-gsap-video-showcase])",
    );
    cards.forEach((card) => {
      const rotX = gsap.quickTo(card, "rotationX", { duration: 0.25, ease: "power2.out" });
      const rotY = gsap.quickTo(card, "rotationY", { duration: 0.25, ease: "power2.out" });
      const liftY = gsap.quickTo(card, "y", { duration: 0.25, ease: "power2.out" });
      gsap.set(card, { transformPerspective: 900, force3D: true });

      card.addEventListener(
        "mousemove",
        (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty("--mx", `${x}px`);
          card.style.setProperty("--my", `${y}px`);
          card.style.setProperty("--glare-opacity", "1");

          rotY((x / rect.width - 0.5) * 5);
          rotX(-(y / rect.height - 0.5) * 5);
          liftY(-4);
        },
        { passive: true },
      );

      card.addEventListener(
        "mouseleave",
        () => {
          card.style.setProperty("--glare-opacity", "0");
          rotX(0);
          rotY(0);
          liftY(0);
        },
        { passive: true },
      );
    });
  }

  // 5. Particle spore canvas effect
  function sporesEffect() {
    sporeCanvas(".heroSporeCanvas", 42, 0.8, 2.0, 0.08, 0.28);
  }

  // 6. Pricing toggle: Monthly <-> Yearly
  function pricingToggle() {
    const toggle = document.querySelector("[data-pricing-toggle]");
    const labels = document.querySelectorAll(".price-toggler-btn");
    if (!toggle) return;

    toggle.addEventListener("change", (e) => {
      const isYearly = e.target.checked;

      if (isYearly) {
        labels[0]?.classList.remove("active");
        labels[1]?.classList.add("active");
      } else {
        labels[0]?.classList.add("active");
        labels[1]?.classList.remove("active");
      }

      const monthlyElements = document.querySelectorAll(
        "[data-price-tag-monthly]",
      );
      const yearlyElements = document.querySelectorAll(
        "[data-price-tag-yearly]",
      );
      const elementsToHide = isYearly ? monthlyElements : yearlyElements;
      const elementsToShow = isYearly ? yearlyElements : monthlyElements;

      elementsToHide.forEach((el, index) => {
        setTimeout(() => {
          el.classList.remove("active");
          el.classList.add("inactive");
        }, index * 100);
      });

      elementsToShow.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add("active");
          el.classList.remove("inactive");
        }, index * 100);
      });
    });
  }

  function init() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    heroVideo();
    kineticTypography();
    sectionCascades();
    interactiveClayEffects();
    sporesEffect();
    pricingToggle();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
