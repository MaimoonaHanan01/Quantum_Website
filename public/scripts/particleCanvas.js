"use strict";

export function sporeCanvas(
  targetElementClassName,
  particleCount = 45,
  particleMinSize = 0.8,
  particleMaxSize = 2.2,
  particleMinSpeed = 0.08,
  particleMaxSpeed = 0.35,
) {
  const particleColors = ["#5D8A77", "#4F7D92", "#8CA89B"];
  const isMobile = window.innerWidth < 768;
  const count = isMobile ? 18 : Math.min(particleCount, 48);
  const cw = isMobile ? 320 : 560;
  const ch = isMobile ? 180 : 260;

  const canvasElements = document.querySelectorAll(targetElementClassName);

  canvasElements.forEach((canvas) => {
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    canvas.width = cw;
    canvas.height = ch;

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * cw,
      y: Math.random() * ch,
      size:
        Math.random() * (particleMaxSize - particleMinSize) + particleMinSize,
      speedY:
        -(Math.random() * (particleMaxSpeed - particleMinSpeed) + particleMinSpeed),
      color:
        particleColors[Math.floor(Math.random() * particleColors.length)],
    }));

    let isVisible = false;
    let rafId = null;

    function tick() {
      if (!isVisible) {
        rafId = null;
        return;
      }
      ctx.clearRect(0, 0, cw, ch);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        if (p.y < -6) {
          p.y = ch + 6;
          p.x = Math.random() * cw;
        }
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      rafId = requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !rafId) {
            rafId = requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.05 },
    );

    observer.observe(canvas);
  });
}
