/* global gsap, ScrollTrigger */
import { sporeCanvas } from "./particleCanvas.js";

(function () {
  "use strict";

  // 1. Sliding SaaS Navbar Tab Hover Pill
  function navTabHoverIndicator() {
    const navList = document.querySelector(".navbar-nav");
    if (!navList) return;

    const links = navList.querySelectorAll(".nav-link");
    if (!links.length) return;

    navList.style.position = "relative";
    const pill = document.createElement("span");
    pill.className = "q-nav-sliding-pill";
    pill.style.cssText =
      "position:absolute;top:6px;bottom:6px;left:0;width:0;opacity:0;pointer-events:none;border-radius:9999px;background:linear-gradient(145deg,rgba(255,255,255,0.28),rgba(255,255,255,0.12));box-shadow:0 6px 14px -3px rgba(22,45,38,0.25),inset 1px 1px 2px rgba(255,255,255,0.55);border:1px solid rgba(255,255,255,0.42);z-index:0;transition:opacity 0.2s ease;";
    navList.prepend(pill);

    const xTo = gsap.quickTo(pill, "x", { duration: 0.28, ease: "power3.out" });
    const wTo = gsap.quickTo(pill, "width", { duration: 0.28, ease: "power3.out" });

    links.forEach((link) => {
      link.style.position = "relative";
      link.style.zIndex = "1";

      link.addEventListener("mouseenter", () => {
        if (window.innerWidth < 1024) return;
        const navRect = navList.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();
        xTo(linkRect.left - navRect.left);
        wTo(linkRect.width);
        pill.style.opacity = "1";
      });
    });

    navList.addEventListener("mouseleave", () => {
      pill.style.opacity = "0";
    });
  }

  // 2. Hero Entrance & 3D Video Showcase Scroll Tilt
  function heroVideo() {
    const heroIntro = document.querySelectorAll(
      ".hero-title, .hero-subtitle, .hero-cta-group",
    );
    if (heroIntro.length) {
      gsap.fromTo(
        heroIntro,
        { y: 24, opacity: 0, force3D: true },
        {
          y: 0,
          opacity: 1,
          force3D: true,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
        },
      );
    }

    const gsapVideoShowcase = document.querySelectorAll(
      "[data-gsap-video-showcase]",
    );
    if (!gsapVideoShowcase.length) return;

    const mm = gsap.matchMedia();
    gsapVideoShowcase.forEach((el) => {
      mm.add("(min-width: 1024px)", () => {
        gsap.set(el, { scale: 0.9, rotationX: 9, y: -36, force3D: true });
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            end: "top 28%",
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

  // 3. Fast GPU-Composited Word Reveal on Section Headings
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
        { y: 22, opacity: 0, force3D: true },
        {
          y: 0,
          opacity: 1,
          force3D: true,
          duration: 0.52,
          stagger: 0.028,
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

  // 4. Distinct Section-by-Section SaaS Scroll Animations
  function sectionCascades() {
    // A. Section Introductions (badge + subtitle fade-up)
    const intros = document.querySelectorAll(".section-intro");
    intros.forEach((intro) => {
      const children = intro.querySelectorAll("div:first-child, .subtitle");
      if (!children.length) return;
      gsap.fromTo(
        children,
        { y: 18, opacity: 0, force3D: true },
        {
          y: 0,
          opacity: 1,
          force3D: true,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: intro,
            start: "top 88%",
            once: true,
          },
        },
      );
    });

    // B. Core Engine Pill Rows: Staggered pop-in + opposing scroll scrub
    const pillGroups = document.querySelectorAll(".feature-items-group");
    pillGroups.forEach((group, idx) => {
      const pills = group.children;
      if (pills.length) {
        gsap.fromTo(
          pills,
          { scale: 0.9, y: 20, opacity: 0, force3D: true },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            force3D: true,
            duration: 0.45,
            stagger: 0.05,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: group,
              start: "top 90%",
              once: true,
            },
          },
        );
      }

      const dir = idx % 2 === 0 ? 1 : -1;
      gsap.fromTo(
        group,
        { x: -22 * dir, force3D: true },
        {
          x: 22 * dir,
          force3D: true,
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

    // C. 9-Cell Feature Matrix: Wave Cascade Reveal
    const featureCells = document.querySelectorAll(".q-feature-cell");
    if (featureCells.length) {
      gsap.fromTo(
        featureCells,
        { y: 30, scale: 0.95, opacity: 0, force3D: true },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          force3D: true,
          duration: 0.5,
          stagger: 0.055,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featureCells[0].closest(".clay-card") || featureCells[0],
            start: "top 85%",
            once: true,
          },
        },
      );
    }

    // D. 5 Filing Pillars: Diagonal Staircase Reveal + Number Parallax
    const pillarCards = document.querySelectorAll("[data-bn-card]");
    pillarCards.forEach((card, i) => {
      const fromX = i % 2 === 0 ? -24 : 24;
      gsap.fromTo(
        card,
        { x: fromX, y: 32, opacity: 0, force3D: true },
        {
          x: 0,
          y: 0,
          opacity: 1,
          force3D: true,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            once: true,
          },
        },
      );

      const strokeNum = card.querySelector(".t-stroke");
      if (strokeNum) {
        gsap.fromTo(
          strokeNum,
          { y: 18, force3D: true },
          {
            y: -18,
            force3D: true,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              end: "bottom 15%",
              scrub: 0.4,
            },
          },
        );
      }
    });

    // E. Comparison Rows: Split Left/Center/Right Convergence
    const comparisonRows = document.querySelectorAll(".q-comparison-row");
    if (comparisonRows.length) {
      gsap.fromTo(
        comparisonRows,
        { y: 22, opacity: 0, force3D: true },
        {
          y: 0,
          opacity: 1,
          force3D: true,
          duration: 0.48,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: comparisonRows[0],
            start: "top 88%",
            once: true,
          },
        },
      );
    }

    // F. General Section Clay Cards, Accordions, and Lists
    const sections = document.querySelectorAll(".section, .section-box");
    sections.forEach((sec) => {
      const cards = sec.querySelectorAll(
        ".clay-card:not([data-gsap-video-showcase]):not([data-bn-card]), .accordion, .blob-message",
      );
      if (cards.length) {
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0, force3D: true },
          {
            y: 0,
            opacity: 1,
            force3D: true,
            duration: 0.55,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 84%",
              once: true,
            },
          },
        );
      }

      const listItems = sec.querySelectorAll(
        "ul.stars-list li, ul.green-tick-list li",
      );
      if (listItems.length) {
        gsap.fromTo(
          listItems,
          { x: -16, opacity: 0, force3D: true },
          {
            x: 0,
            opacity: 1,
            force3D: true,
            duration: 0.4,
            stagger: 0.04,
            ease: "power2.out",
            scrollTrigger: {
              trigger: listItems[0],
              start: "top 90%",
              once: true,
            },
          },
        );
      }
    });

    // G. Testimonial Quote Word-by-Word Scroll Illumination
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

  // 5. Lightweight QuickTo Interactive 3D Tilt on Clay Cards & Magnetic Buttons
  function interactiveClayEffects() {
    if (window.innerWidth < 1024) return;

    const cards = document.querySelectorAll(
      ".clay-card:not([data-gsap-video-showcase])",
    );
    cards.forEach((card) => {
      const rotX = gsap.quickTo(card, "rotationX", {
        duration: 0.25,
        ease: "power2.out",
      });
      const rotY = gsap.quickTo(card, "rotationY", {
        duration: 0.25,
        ease: "power2.out",
      });
      const liftY = gsap.quickTo(card, "y", {
        duration: 0.25,
        ease: "power2.out",
      });
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

          rotY((x / rect.width - 0.5) * 4.5);
          rotX(-(y / rect.height - 0.5) * 4.5);
          liftY(-5);
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

    // Subtle magnetic pull on CTA buttons
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((btn) => {
      const xTo = gsap.quickTo(btn, "x", { duration: 0.22, ease: "power2.out" });
      const yTo = gsap.quickTo(btn, "y", { duration: 0.22, ease: "power2.out" });

      btn.addEventListener(
        "mousemove",
        (e) => {
          const rect = btn.getBoundingClientRect();
          const relX = e.clientX - rect.left - rect.width / 2;
          const relY = e.clientY - rect.top - rect.height / 2;
          xTo(relX * 0.14);
          yTo(relY * 0.2);
        },
        { passive: true },
      );

      btn.addEventListener(
        "mouseleave",
        () => {
          xTo(0);
          yTo(0);
        },
        { passive: true },
      );
    });
  }

  // 6. Particle spore canvas effect (disabled for clean background)
  function sporesEffect() {
    sporeCanvas(".heroSporeCanvas", 42, 0.8, 2.0, 0.08, 0.28);
  }

  // 7. Pricing toggle: Monthly <-> Yearly
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
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined")
      return;
    gsap.registerPlugin(ScrollTrigger);

    navTabHoverIndicator();
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
