"use client";

import { useEffect, useRef } from "react";

interface CursorTrailProps {
  /** Set to false to disable entirely */
  enabled?: boolean;
  /** CSS selector for the container element to constrain the trail to */
  containerSelector?: string;
  /** Particle color */
  color?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
}

/**
 * Acid-green particle trail following the cursor.
 * Constrained to a container (default: first <section>).
 * GPU-accelerated canvas, lightweight.
 *
 * Toggle: set `enabled={false}` to disable without removing from tree.
 */
export function CursorTrail({
  enabled = true,
  containerSelector = "section",
  color = "254, 238, 4",
}: CursorTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -100, y: -100, active: false });
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;

    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const container = document.querySelector(containerSelector);
    if (!container) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      canvas.style.top = `${rect.top + window.scrollY}px`;
      canvas.style.left = `${rect.left}px`;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", resize);

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

      mouseRef.current = { x, y, active: inside };

      if (inside) {
        for (let i = 0; i < 2; i++) {
          particlesRef.current.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5 - 0.5,
            alpha: 0.6 + Math.random() * 0.4,
            size: 1 + Math.random() * 2,
          });
        }
      }
    };

    window.addEventListener("mousemove", handleMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.015;
        p.size *= 0.98;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.alpha})`;
        ctx.fill();
      }

      // Limit particle count
      if (particles.length > 150) {
        particles.splice(0, particles.length - 150);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", resize);
      particlesRef.current = [];
    };
  }, [enabled, containerSelector, color]);

  if (!enabled) return null;

  return <canvas ref={canvasRef} className="absolute pointer-events-none z-3" aria-hidden="true" />;
}
