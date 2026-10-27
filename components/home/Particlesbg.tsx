"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

const PARTICLE_COUNT = 85; // maximum, scaled down on smaller areas
const LINK_DISTANCE = 145;
const MOUSE_DISTANCE = 170;

export default function ParticlesBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let running = false;
    let visible = true;
    let particles: Particle[] = [];
    let resizeObserver: ResizeObserver | null = null;
    let intersectionObserver: IntersectionObserver | null = null;
    let started = false;

    const mouse = { x: -9999, y: -9999, active: false };

    const createParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      size: Math.random() * 2.2 + 1.2,
    });

    // Fewer particles on small screens keeps it light and uncluttered
    const targetCount = () =>
      Math.max(
        28,
        Math.round(
          PARTICLE_COUNT * Math.min(1, (width * height) / (1280 * 720))
        )
      );

    const getPalette = () => {
      const dark = document.documentElement.classList.contains("dark");
      return dark
        ? { rgb: "96, 165, 250", dot: 0.85, link: 0.32, mouse: 0.5 }
        : { rgb: "37, 99, 235", dot: 0.6, link: 0.22, mouse: 0.4 };
    };

    const render = (step: boolean) => {
      const palette = getPalette();

      ctx.clearRect(0, 0, width, height);

      for (const particle of particles) {
        if (step) {
          // Gentle repel from the cursor
          if (mouse.active) {
            const dx = particle.x - mouse.x;
            const dy = particle.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 0 && distance < MOUSE_DISTANCE) {
              const force = (1 - distance / MOUSE_DISTANCE) * 0.9;
              particle.x += (dx / distance) * force;
              particle.y += (dy / distance) * force;
            }
          }

          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x <= 0 || particle.x >= width) {
            particle.vx *= -1;
            particle.x = Math.min(Math.max(particle.x, 0), width);
          }

          if (particle.y <= 0 || particle.y >= height) {
            particle.vy *= -1;
            particle.y = Math.min(Math.max(particle.y, 0), height);
          }
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${palette.rgb}, ${palette.dot})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const first = particles[i];
          const second = particles[j];
          const dx = first.x - second.x;
          const dy = first.y - second.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < LINK_DISTANCE) {
            const opacity = (1 - distance / LINK_DISTANCE) * palette.link;

            ctx.beginPath();
            ctx.moveTo(first.x, first.y);
            ctx.lineTo(second.x, second.y);
            ctx.strokeStyle = `rgba(${palette.rgb}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Links from the cursor to nearby particles
      if (mouse.active) {
        for (const particle of particles) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < MOUSE_DISTANCE) {
            const opacity = (1 - distance / MOUSE_DISTANCE) * palette.mouse;

            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(particle.x, particle.y);
            ctx.strokeStyle = `rgba(${palette.rgb}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    const loop = () => {
      render(true);
      animationFrame = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (running || reduceMotion || !visible || document.hidden) {
        return;
      }

      running = true;
      animationFrame = requestAnimationFrame(loop);
    };

    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(animationFrame);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const previousWidth = width;
      const previousHeight = height;

      if (!rect.width || !rect.height) {
        return;
      }

      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Keep existing particles in place proportionally instead of re-rolling
      if (previousWidth && previousHeight) {
        for (const particle of particles) {
          particle.x *= width / previousWidth;
          particle.y *= height / previousHeight;
        }
      }

      const count = targetCount();

      if (particles.length > count) {
        particles.length = count;
      } else {
        while (particles.length < count) {
          particles.push(createParticle());
        }
      }

      // When not animating, repaint so the canvas never goes blank
      if (!running) {
        render(false);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      mouse.active = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      mouse.x = x;
      mouse.y = y;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
    };

    const handleVisibility = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    };

    const start = () => {
      started = true;
      resize();

      if (reduceMotion) {
        render(false);
      } else {
        startLoop();
      }

      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);

      intersectionObserver = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;

        if (visible) {
          startLoop();
        } else {
          stopLoop();
        }
      });
      intersectionObserver.observe(canvas);
    };

    const idleCallback: number | ReturnType<typeof setTimeout> =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(start, { timeout: 1800 })
        : globalThis.setTimeout(start, 1200);

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.documentElement.addEventListener(
      "pointerleave",
      handlePointerLeave
    );
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleCallback as number);
      } else {
        globalThis.clearTimeout(idleCallback);
      }

      if (started) {
        stopLoop();
      }

      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
    />
  );
}
