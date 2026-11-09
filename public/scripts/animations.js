/* global gsap, ScrollTrigger */
import { sporeCanvas } from "./particleCanvas.js";

(function () {
  "use strict";

  let retries = 0;

  // 1. Top Scroll Progress Ribbon & Floating Section Indicator Pill
  function scrollProgressAndSectionPill() {
    const ribbon = document.getElementById("q-scroll-ribbon");
    const pill = document.getElementById("q-section-pill");
    const numEl = document.getElementById("q-section-num");
    const labelEl = document.getElementById("q-section-label");

    if (ribbon) {
      gsap.to(ribbon, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.15,
        },
      });
    }

    if (!pill || !numEl || !labelEl) return;

    pill.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const sectionLabels = [
      "Overview",
      "Auto-Resolve",
      "Return Engine",
      "Compliance Matrix",
      "Filing Pillars",
      "Excise Simulator",
      "Audit Quote",
      "Testimonials",
      "3-Step Close",
      "Engine Principles",
      "Workspace Modules",
      "5-Tab Workbook",
      "Filing Tiers",
    ];

    const allSections = document.querySelectorAll(
      "main > section, main > .section, main > .section-box",
    );
    allSections.forEach((sec, idx) => {
      const num = String(idx + 1).padStart(2, "0");
      const title = sectionLabels[idx] || `Section ${num}`;
      ScrollTrigger.create({
        trigger: sec,
        start: "top 55%",
        end: "bottom 55%",
        onEnter: () => {
          numEl.textContent = num;
          labelEl.textContent = title;
        },
        onEnterBack: () => {
          numEl.textContent = num;
          labelEl.textContent = title;
        },
      });
    });

    ScrollTrigger.create({
      start: 260,
      end: 999999,
      onToggle: (self) => {
        if (self.isActive) {
          pill.classList.remove("opacity-0", "translate-y-4");
          pill.classList.add("opacity-100", "translate-y-0");
        } else {
          pill.classList.add("opacity-0", "translate-y-4");
          pill.classList.remove("opacity-100", "translate-y-0");
        }
      },
    });
  }

  // 2. Sliding SaaS Navbar Tab Hover Pill
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
    const wTo = gsap.quickTo(pill, "width", {
      duration: 0.28,
      ease: "power3.out",
    });

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

  // 3. Hero 3D Video Showcase Scroll Tilt & Floating Telemetry Parallax
  function heroVideo() {
    const gsapVideoShowcase = document.querySelectorAll(
      "[data-gsap-video-showcase]",
    );
    if (gsapVideoShowcase.length) {
      const mm = gsap.matchMedia();
      gsapVideoShowcase.forEach((el) => {
        mm.add("(min-width: 1024px)", () => {
          gsap.set(el, { scale: 0.92, rotationX: 8, y: -32, force3D: true });
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

    const floats = document.querySelectorAll("[data-parallax-speed]");
    floats.forEach((fl) => {
      const speed = parseFloat(fl.getAttribute("data-parallax-speed") || "-20");
      gsap.to(fl, {
        y: speed,
        ease: "none",
        scrollTrigger: {
          trigger: fl,
          start: "top 90%",
          end: "bottom 10%",
          scrub: 0.4,
        },
      });
    });
  }

  // 4. Before -> After Bottleneck Morph Deck
  function bottleneckMorphCycle() {
    const deck = document.querySelector("[data-bottleneck-deck]");
    if (!deck) return;

    const pills = Array.from(deck.querySelectorAll("[data-bottleneck-pill]"));
    if (!pills.length) return;

    let activeIdx = 0;
    let isHovered = false;

    const setResolved = (pill, resolved) => {
      const stateEl = pill.querySelector(".q-bn-state");
      const labelEl = pill.querySelector(".q-bn-label");
      if (!stateEl || !labelEl) return;

      if (resolved) {
        pill.classList.add("q-bn-resolved");
        stateEl.textContent = "ExciseR.com";
        labelEl.textContent = labelEl.getAttribute("data-good") || "";
      } else {
        pill.classList.remove("q-bn-resolved");
        stateEl.textContent = "Legacy";
        labelEl.textContent = labelEl.getAttribute("data-bad") || "";
      }
    };

    const highlightPair = (idx) => {
      pills.forEach((p, i) => {
        setResolved(p, i === idx || i === (idx + 3) % pills.length);
      });
    };

    pills.forEach((pill) => {
      pill.addEventListener("mouseenter", () => {
        isHovered = true;
        setResolved(pill, true);
      });
      pill.addEventListener("mouseleave", () => {
        isHovered = false;
      });
    });

    ScrollTrigger.create({
      trigger: deck,
      start: "top 88%",
      once: true,
      onEnter: () => {
        highlightPair(0);
        setInterval(() => {
          if (isHovered) return;
          activeIdx = (activeIdx + 1) % 3;
          highlightPair(activeIdx);
        }, 2100);
      },
    });
  }

  // 5. Fast GPU-Composited Word Reveal on Section Headings
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
        { y: 20, opacity: 0, force3D: true },
        {
          y: 0,
          opacity: 1,
          force3D: true,
          duration: 0.5,
          stagger: 0.025,
          ease: "power2.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: heading,
            start: "top 92%",
            once: true,
          },
        },
      );
    });
  }

  // 6. Signature Animation #1: Sticky Stacking Deck (5 Filing Pillars)
  function stickyStackingDeck() {
    const stackCards = document.querySelectorAll(".q-stack-card");
    if (!stackCards.length) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      stackCards.forEach((card, i) => {
        const nextCard = stackCards[i + 1];
        if (nextCard) {
          const targetScale = 1 - (stackCards.length - 1 - i) * 0.024;
          gsap.to(card, {
            scale: targetScale,
            y: -10,
            force3D: true,
            ease: "none",
            scrollTrigger: {
              trigger: nextCard,
              start: "top 82%",
              end: "top 24%",
              scrub: 0.35,
            },
          });
        }
      });
    });

    stackCards.forEach((card) => {
      const strokeNum = card.querySelector(".t-stroke");
      if (strokeNum) {
        gsap.fromTo(
          strokeNum,
          { y: 16, force3D: true },
          {
            y: -16,
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
  }

  // 7. Signature Animation #2: Value Proposition 3D Fan Unfold
  function valueDeckUnfold() {
    const grid = document.querySelector("[data-value-grid]");
    if (!grid) return;

    const cards = grid.querySelectorAll("[data-value-card]");
    if (!cards.length) return;

    cards.forEach((card, i) => {
      const offsetIdx = i - (cards.length - 1) / 2;
      const bar = card.querySelector(".q-val-bar");

      gsap.fromTo(
        card,
        {
          x: -offsetIdx * 45,
          y: 34,
          rotationZ: offsetIdx * 4,
          opacity: 0,
          force3D: true,
        },
        {
          x: 0,
          y: 0,
          rotationZ: 0,
          opacity: 1,
          force3D: true,
          duration: 0.65,
          delay: i * 0.07,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: grid,
            start: "top 86%",
            once: true,
          },
          onComplete: () => {
            if (bar) {
              gsap.to(bar, {
                width: "100%",
                duration: 0.7,
                ease: "power2.out",
              });
            }
          },
        },
      );
    });
  }

  // 8. Signature Animation #3: 9-Cell Compliance Matrix Scanner
  function matrixScannerCycle() {
    const matrix = document.querySelector("[data-feature-matrix]");
    if (!matrix) return;

    const cells = Array.from(matrix.querySelectorAll("[data-feature-cell]"));
    if (!cells.length) return;

    let idx = 0;
    let timer = null;
    let isHovered = false;

    const highlightCell = (activeIdx) => {
      cells.forEach((cell, i) => {
        const bar = cell.querySelector(".q-cell-bar");
        if (i === activeIdx) {
          cell.classList.add("q-matrix-active");
          if (bar) {
            gsap.killTweensOf(bar);
            gsap.fromTo(
              bar,
              { width: "0%" },
              {
                width: "100%",
                duration: isHovered ? 0.28 : 1.75,
                ease: "linear",
              },
            );
          }
        } else {
          cell.classList.remove("q-matrix-active");
          if (bar) {
            gsap.killTweensOf(bar);
            gsap.set(bar, { width: "0%" });
          }
        }
      });
    };

    const startScan = () => {
      if (timer) clearInterval(timer);
      highlightCell(idx);
      timer = setInterval(() => {
        if (isHovered) return;
        idx = (idx + 1) % cells.length;
        highlightCell(idx);
      }, 1850);
    };

    cells.forEach((cell, i) => {
      cell.addEventListener("mouseenter", () => {
        isHovered = true;
        idx = i;
        highlightCell(i);
      });
      cell.addEventListener("mouseleave", () => {
        isHovered = false;
      });
    });

    ScrollTrigger.create({
      trigger: matrix,
      start: "top 86%",
      once: true,
      onEnter: startScan,
    });
  }

  // 9. Signature Animation #4: Animated SVG Pipeline Flow (3-Step Monthly Close)
  function pipelineFlowAnimation() {
    const grid = document.querySelector("[data-pipeline-grid]");
    if (!grid) return;

    const line = document.getElementById("q-pipeline-line");
    const cards = grid.querySelectorAll("[data-process-card]");

    if (line) {
      gsap.fromTo(
        line,
        { strokeDashoffset: 100 },
        {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: grid,
            start: "top 82%",
            once: true,
          },
        },
      );
    }

    cards.forEach((card, i) => {
      const bar = card.querySelector("[data-process-bar]");
      ScrollTrigger.create({
        trigger: grid,
        start: "top 82%",
        once: true,
        onEnter: () => {
          setTimeout(() => {
            card.classList.add("q-process-active");
            if (bar) {
              gsap.to(bar, {
                width: "100%",
                duration: 0.7,
                ease: "power2.out",
              });
            }
          }, i * 340);
        },
      });
    });
  }

  // 10. Signature Animation #5: Live Number Counters & Meter Bars
  function liveCountersAndMeters() {
    const counters = document.querySelectorAll("[data-count-up]");
    counters.forEach((el) => {
      const raw = (el.getAttribute("data-count-up") || "").trim();
      const match = raw.match(/^([^0-9]*)([0-9][0-9,]*(?:\.[0-9]+)?)(.*)$/);
      if (!match) return;

      const prefix = match[1];
      const numRaw = match[2];
      const suffix = match[3];
      const hasComma = numRaw.includes(",");
      const cleanNum = numRaw.replace(/,/g, "");
      const targetVal = parseFloat(cleanNum);
      if (isNaN(targetVal) || targetVal === 0) return;

      const decimals = cleanNum.includes(".")
        ? cleanNum.split(".")[1].length
        : 0;

      const formatVal = (v) => {
        const fixed = v.toFixed(decimals);
        if (!hasComma) return fixed;
        const parts = fixed.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
      };

      const state = { val: 0 };
      gsap.to(state, {
        val: targetVal,
        duration: 1.35,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${prefix}${formatVal(state.val)}${suffix}`;
        },
      });
    });

    const meters = document.querySelectorAll("[data-meter-width]");
    meters.forEach((bar) => {
      const targetWidth = bar.getAttribute("data-meter-width") || "95%";
      gsap.to(bar, {
        width: targetWidth,
        duration: 1.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bar,
          start: "top 94%",
          once: true,
        },
      });
    });
  }

  // 11. Interactive Live Excise Batch Simulator
  function interactiveExciseSimulator() {
    const sec = document.querySelector("[data-excise-sim-section]");
    if (!sec) return;

    const btns = Array.from(sec.querySelectorAll("[data-batch-val]"));
    const rows = Array.from(sec.querySelectorAll("[data-comp-row]"));
    if (!btns.length || !rows.length) return;

    const updateBatch = (batchVal, activeBtn) => {
      btns.forEach((b) => {
        if (b === activeBtn) {
          b.classList.add("q-wb-tab-active");
          b.classList.remove("bg-white/80", "text-dark");
        } else {
          b.classList.remove("q-wb-tab-active");
          b.classList.add("bg-white/80", "text-dark");
        }
      });

      rows.forEach((row) => {
        const mult = parseFloat(row.getAttribute("data-excise-mult") || "0.45");
        const estEl = row.querySelector("[data-live-excise]");
        const meterEl = row.querySelector(".q-comp-meter");
        if (!estEl) return;

        const targetTax = Math.round(batchVal * mult);
        const state = { v: 0 };
        gsap.to(state, {
          v: targetTax,
          duration: 0.45,
          ease: "power2.out",
          onUpdate: () => {
            estEl.textContent = `$${Math.round(state.v).toLocaleString("en-US")} est.`;
          },
        });

        if (meterEl) {
          gsap.fromTo(
            meterEl,
            { width: "35%" },
            {
              width: meterEl.getAttribute("data-meter-width") || "92%",
              duration: 0.5,
              ease: "power2.out",
            },
          );
        }
      });
    };

    btns.forEach((btn) => {
      const val = parseFloat(btn.getAttribute("data-batch-val") || "10000");
      btn.addEventListener("click", () => updateBatch(val, btn));
      btn.addEventListener("mouseenter", () => updateBatch(val, btn));
    });
  }

  // 12. Signature Animation #6: Auto-Cycling Module Spotlight (8 Workspace Modules)
  function moduleSpotlightCycle() {
    const grid = document.querySelector("[data-module-grid]");
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll("[data-module-card]"));
    if (!cards.length) return;

    let currentIdx = 0;
    let timer = null;
    let isHovered = false;

    const activateCard = (idx) => {
      cards.forEach((c, i) => {
        const bar = c.querySelector(".q-mod-progress");
        if (i === idx) {
          c.classList.add("q-module-active");
          if (bar) {
            gsap.killTweensOf(bar);
            gsap.fromTo(
              bar,
              { width: "0%" },
              {
                width: "100%",
                duration: isHovered ? 0.3 : 2.1,
                ease: "linear",
              },
            );
          }
        } else {
          c.classList.remove("q-module-active");
          if (bar) {
            gsap.killTweensOf(bar);
            gsap.set(bar, { width: "0%" });
          }
        }
      });
    };

    const startCycle = () => {
      if (timer) clearInterval(timer);
      activateCard(currentIdx);
      timer = setInterval(() => {
        if (isHovered) return;
        currentIdx = (currentIdx + 1) % cards.length;
        activateCard(currentIdx);
      }, 2200);
    };

    cards.forEach((card, i) => {
      card.addEventListener("mouseenter", () => {
        isHovered = true;
        currentIdx = i;
        activateCard(i);
      });
      card.addEventListener("mouseleave", () => {
        isHovered = false;
      });
    });

    ScrollTrigger.create({
      trigger: grid,
      start: "top 90%",
      once: true,
      onEnter: startCycle,
    });
  }

  // 13. Signature Animation #7: Interactive 5-Tab Workbook Switcher Deck
  function workbookTabSwitcher() {
    const widget = document.querySelector("[data-workbook-widget]");
    if (!widget) return;

    const tabs = Array.from(widget.querySelectorAll("[data-wb-tab]"));
    const panels = Array.from(widget.querySelectorAll("[data-wb-panel]"));
    const progressBar = widget.querySelector(".q-wb-progress");
    if (!tabs.length || !panels.length) return;

    let activeIdx = 0;
    let paused = false;

    const showTab = (idx) => {
      activeIdx = idx;
      tabs.forEach((t, i) => {
        if (i === idx) {
          t.classList.add("q-wb-tab-active");
          t.classList.remove("bg-white/75", "text-dark");
        } else {
          t.classList.remove("q-wb-tab-active");
          t.classList.add("bg-white/75", "text-dark");
        }
      });

      panels.forEach((p, i) => {
        if (i === idx) {
          p.classList.remove("hidden");
          p.classList.add("block");
          gsap.fromTo(
            p,
            { y: 8, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.26,
              ease: "power2.out",
              clearProps: "transform",
            },
          );
        } else {
          p.classList.add("hidden");
          p.classList.remove("block");
        }
      });

      if (progressBar) {
        gsap.killTweensOf(progressBar);
        gsap.fromTo(
          progressBar,
          { width: "0%" },
          { width: "100%", duration: paused ? 0.35 : 2.7, ease: "linear" },
        );
      }
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => {
        paused = true;
        showTab(i);
      });
      tab.addEventListener("mouseenter", () => {
        paused = true;
        showTab(i);
      });
    });

    widget.addEventListener("mouseleave", () => {
      paused = false;
    });

    ScrollTrigger.create({
      trigger: widget,
      start: "top 88%",
      once: true,
      onEnter: () => {
        showTab(0);
        setInterval(() => {
          if (paused) return;
          showTab((activeIdx + 1) % tabs.length);
        }, 2800);
      },
    });
  }

  // 14. Signature Animation #8: Core Engine Principles Sequential Pulse
  function principlesCascadeCycle() {
    const stack = document.querySelector("[data-principles-stack]");
    if (!stack) return;

    const pills = Array.from(stack.querySelectorAll("[data-principle-pill]"));
    if (!pills.length) return;

    let idx = 0;
    let isHovered = false;

    const activatePill = (activeIdx) => {
      pills.forEach((p, i) => {
        if (i === activeIdx) {
          p.classList.add("q-principle-active");
        } else {
          p.classList.remove("q-principle-active");
        }
      });
    };

    pills.forEach((p, i) => {
      p.addEventListener("mouseenter", () => {
        isHovered = true;
        idx = i;
        activatePill(i);
      });
      p.addEventListener("mouseleave", () => {
        isHovered = false;
      });
    });

    ScrollTrigger.create({
      trigger: stack,
      start: "top 88%",
      once: true,
      onEnter: () => {
        activatePill(0);
        setInterval(() => {
          if (isHovered) return;
          idx = (idx + 1) % pills.length;
          activatePill(idx);
        }, 1900);
      },
    });
  }

  // 15. Signature Animation #9: Live Comparison Sweep (Quantum vs. Legacy)
  function comparisonSweepAnimation() {
    const rows = document.querySelectorAll(".q-comparison-row");
    rows.forEach((row, i) => {
      const sweep = row.querySelector("[data-comp-sweep]");
      const tags = row.querySelectorAll(".q-comp-tag");

      gsap.fromTo(
        row,
        { y: 20, opacity: 0, force3D: true },
        {
          y: 0,
          opacity: 1,
          force3D: true,
          duration: 0.45,
          delay: i * 0.04,
          ease: "power2.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: row,
            start: "top 92%",
            once: true,
          },
        },
      );

      if (sweep) {
        gsap.to(sweep, {
          width: "100%",
          duration: 0.9,
          delay: 0.08 + i * 0.05,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: row,
            start: "top 90%",
            once: true,
          },
        });
      }

      if (tags.length) {
        gsap.fromTo(
          tags,
          { scale: 0.88, opacity: 0, force3D: true },
          {
            scale: 1,
            opacity: 1,
            force3D: true,
            duration: 0.35,
            stagger: 0.04,
            delay: 0.1 + i * 0.04,
            ease: "back.out(1.4)",
            clearProps: "transform",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              once: true,
            },
          },
        );
      }
    });
  }

  // 16. General Section Cascades & Testimonial Quote Reveal
  function sectionCascades() {
    const pillGroups = document.querySelectorAll(".feature-items-group");
    pillGroups.forEach((group, idx) => {
      const pills = group.children;
      if (pills.length) {
        gsap.fromTo(
          pills,
          { scale: 0.92, y: 18, opacity: 0, force3D: true },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            force3D: true,
            duration: 0.42,
            stagger: 0.04,
            ease: "back.out(1.4)",
            clearProps: "transform",
            scrollTrigger: {
              trigger: group,
              start: "top 92%",
              once: true,
            },
          },
        );
      }

      const dir = idx % 2 === 0 ? 1 : -1;
      gsap.fromTo(
        group,
        { x: -20 * dir, force3D: true },
        {
          x: 20 * dir,
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

    const featureCells = document.querySelectorAll(".q-feature-cell");
    if (featureCells.length) {
      gsap.fromTo(
        featureCells,
        { y: 24, scale: 0.95, opacity: 0, force3D: true },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          force3D: true,
          duration: 0.45,
          stagger: 0.05,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: featureCells[0].closest(".clay-card") || featureCells[0],
            start: "top 88%",
            once: true,
          },
        },
      );
    }

    const sections = document.querySelectorAll(".section, .section-box");
    sections.forEach((sec) => {
      const cards = sec.querySelectorAll(
        ".clay-card:not([data-gsap-video-showcase]):not([data-bn-card]):not(.q-module-card):not(.q-process-card):not(.q-value-card):not(.q-comp-left):not(.q-comp-right), .accordion, .blob-message",
      );
      if (cards.length) {
        gsap.fromTo(
          cards,
          { y: 24, opacity: 0, force3D: true },
          {
            y: 0,
            opacity: 1,
            force3D: true,
            duration: 0.48,
            stagger: 0.05,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: sec,
              start: "top 86%",
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
          { x: -14, opacity: 0, force3D: true },
          {
            x: 0,
            opacity: 1,
            force3D: true,
            duration: 0.38,
            stagger: 0.04,
            ease: "power2.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: listItems[0],
              start: "top 92%",
              once: true,
            },
          },
        );
      }
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

  // 17. Specular Cursor Spotlight & Magnetic Buttons
  function interactiveClayEffects() {
    if (window.innerWidth < 1024) return;

    const cards = document.querySelectorAll(".clay-card");
    cards.forEach((card) => {
      card.addEventListener(
        "mousemove",
        (e) => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
          card.style.setProperty("--my", `${e.clientY - rect.top}px`);
        },
        { passive: true },
      );
      card.addEventListener(
        "mouseleave",
        () => {
          card.style.setProperty("--my", "-200px");
        },
        { passive: true },
      );
    });

    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((btn) => {
      const xTo = gsap.quickTo(btn, "x", {
        duration: 0.22,
        ease: "power2.out",
      });
      const yTo = gsap.quickTo(btn, "y", {
        duration: 0.22,
        ease: "power2.out",
      });

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

  // 18. Particle spore canvas effect (disabled for clean background)
  function sporesEffect() {
    sporeCanvas(".heroSporeCanvas", 42, 0.8, 2.0, 0.08, 0.28);
  }

  // 19. Pricing toggle: Monthly <-> Yearly
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
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      if (retries < 50) {
        retries += 1;
        setTimeout(init, 40);
      }
      return;
    }
    gsap.registerPlugin(ScrollTrigger);

    scrollProgressAndSectionPill();
    navTabHoverIndicator();
    heroVideo();
    bottleneckMorphCycle();
    kineticTypography();
    stickyStackingDeck();
    valueDeckUnfold();
    matrixScannerCycle();
    pipelineFlowAnimation();
    liveCountersAndMeters();
    interactiveExciseSimulator();
    moduleSpotlightCycle();
    workbookTabSwitcher();
    principlesCascadeCycle();
    comparisonSweepAnimation();
    sectionCascades();
    interactiveClayEffects();
    sporesEffect();
    pricingToggle();

    ScrollTrigger.refresh();
    window.addEventListener("load", () => ScrollTrigger.refresh(), {
      once: true,
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
