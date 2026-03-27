"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib";

const ACID = "#feee04";
const LOGO = "/logos/ai-hack-logo.svg";

/* ─── Burst state (timed glitch) ─── */

interface BurstState {
  active: boolean;
  rX: number;
  rY: number;
  gX: number;
  gY: number;
  baseX: number;
  baseScaleY: number;
}

const BURST_IDLE: BurstState = {
  active: false,
  rX: 0,
  rY: 0,
  gX: 0,
  gY: 0,
  baseX: 0,
  baseScaleY: 1,
};

function randomBurst(): BurstState {
  return {
    active: true,
    rX: -4 - Math.random() * 4,
    rY: -1 - Math.random() * 2,
    gX: 4 + Math.random() * 4,
    gY: 1 + Math.random() * 2,
    baseX: (Math.random() - 0.5) * 4,
    baseScaleY: 0.998 + Math.random() * 0.004,
  };
}

/* ─── Hover-reactive chromatic split ──────────────────────
 * Remove this section + the `reactive` prop + the mousemove
 * handler on the container div to disable hover reactivity.
 * ──────────────────────────────────────────────────────── */

const HOVER_INTENSITY = 6; // max px offset at container edge
const HOVER_DECAY = 0.12; // lerp factor for smooth follow

interface HoverOffset {
  x: number;
  y: number;
}

function useHoverChromatic(enabled: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HoverOffset>({ x: 0, y: 0 });
  const currentRef = useRef<HoverOffset>({ x: 0, y: 0 });
  const [offset, setOffset] = useState<HoverOffset>({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const activeRef = useRef(false);

  const startLoop = useCallback(() => {
    if (activeRef.current) return;
    activeRef.current = true;

    const tick = () => {
      const cur = currentRef.current;
      const tgt = targetRef.current;
      const dx = tgt.x - cur.x;
      const dy = tgt.y - cur.y;

      // Stop loop when close enough and target is zero (mouse left)
      if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05 && tgt.x === 0 && tgt.y === 0) {
        currentRef.current = { x: 0, y: 0 };
        setOffset({ x: 0, y: 0 });
        activeRef.current = false;
        return;
      }

      cur.x += dx * HOVER_DECAY;
      cur.y += dy * HOVER_DECAY;
      setOffset({ x: cur.x, y: cur.y });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!enabled || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Normalize to -1…+1 from center
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetRef.current = {
        x: nx * HOVER_INTENSITY,
        y: ny * HOVER_INTENSITY,
      };
      startLoop();
    },
    [enabled, startLoop]
  );

  const onMouseLeave = useCallback(() => {
    targetRef.current = { x: 0, y: 0 };
    // loop continues and lerps back to 0
  }, []);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return { containerRef, offset, onMouseMove, onMouseLeave };
}

/* ─── End hover-reactive section ─── */

/**
 * Glitch + Noise Combination
 * Combines SVG feTurbulence noise distortion with chromatic aberration.
 * Periodically intensifies both effects in sync for a "signal interference" burst.
 *
 * Props:
 *  - reactive: enable hover-reactive chromatic split (default true, set false to disable)
 */
export const LogoGlitchNoise = memo(function LogoGlitchNoise({
  className = "",
  logo = LOGO,
  reactive = true,
}: {
  className?: string;
  logo?: string;
  /** Enable hover-reactive chromatic split. Set false to remove hover effect. */
  reactive?: boolean;
}) {
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const [burst, setBurst] = useState<BurstState>(BURST_IDLE);

  /* ── Hover-reactive chromatic (removable) ── */
  const { containerRef, offset: hover, onMouseMove, onMouseLeave } = useHoverChromatic(reactive);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let animFrame: number;

    // Animate the turbulence seed for continuous noise movement
    let seed = 0;
    const animateNoise = () => {
      seed += 1;
      if (turbRef.current) {
        turbRef.current.setAttribute("seed", String(seed % 100));
      }
      animFrame = requestAnimationFrame(animateNoise);
    };
    animFrame = requestAnimationFrame(animateNoise);

    // Schedule periodic burst intensification
    const scheduleBurst = () => {
      const delay = 3000 + Math.random() * 5000;
      timeout = setTimeout(() => {
        setBurst(randomBurst());

        if (dispRef.current) {
          dispRef.current.setAttribute("scale", String(12 + Math.random() * 8));
        }

        setTimeout(
          () => {
            setBurst(BURST_IDLE);
            if (dispRef.current) {
              dispRef.current.setAttribute("scale", "2");
            }

            if (Math.random() > 0.5) {
              setTimeout(() => {
                setBurst(randomBurst());
                if (dispRef.current) {
                  dispRef.current.setAttribute("scale", String(8 + Math.random() * 6));
                }
                setTimeout(() => {
                  setBurst(BURST_IDLE);
                  if (dispRef.current) {
                    dispRef.current.setAttribute("scale", "2");
                  }
                }, 100);
              }, 60);
            }

            scheduleBurst();
          },
          150 + Math.random() * 150
        );
      }, delay);
    };
    scheduleBurst();

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const maskBase: React.CSSProperties = {
    WebkitMaskImage: `url(${logo})`,
    maskImage: `url(${logo})`,
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  };

  // Combine burst + hover offsets. Burst dominates when active.
  const rTransform = burst.active
    ? `translate(${burst.rX}px, ${burst.rY}px)`
    : hover.x !== 0 || hover.y !== 0
      ? `translate(${-hover.x}px, ${-hover.y}px)`
      : undefined;

  const gTransform = burst.active
    ? `translate(${burst.gX}px, ${burst.gY}px)`
    : hover.x !== 0 || hover.y !== 0
      ? `translate(${hover.x}px, ${hover.y}px)`
      : undefined;

  const rOpacity = burst.active
    ? 0.7
    : Math.min(0.55, (Math.hypot(hover.x, hover.y) / HOVER_INTENSITY) * 0.55);
  const gOpacity = burst.active
    ? 0.7
    : Math.min(0.55, (Math.hypot(hover.x, hover.y) / HOVER_INTENSITY) * 0.55);

  return (
    <>
      {/* SVG filter for noise distortion */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="logo-noise-filter" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves="3"
              seed="0"
              result="noise"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="noise"
              scale="2"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div
        ref={containerRef}
        className={cn("relative w-full aspect-1164/1232", className)}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {/* Chromatic aberration — red channel */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            ...maskBase,
            backgroundColor: "#ff0040",
            opacity: rOpacity,
            transform: rTransform,
            transition: burst.active ? "opacity 0.05s, transform 0.05s" : "opacity 0.15s",
          }}
        />
        {/* Chromatic aberration — cyan channel */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            ...maskBase,
            backgroundColor: "#00ffff",
            opacity: gOpacity,
            transform: gTransform,
            transition: burst.active ? "opacity 0.05s, transform 0.05s" : "opacity 0.15s",
          }}
        />

        {/* Main logo with noise filter */}
        <div
          className="absolute inset-0"
          style={{
            ...maskBase,
            backgroundColor: ACID,
            filter: "url(#logo-noise-filter)",
            transition: "transform 0.05s",
            transform: burst.active
              ? `translateX(${burst.baseX}px) scaleY(${burst.baseScaleY})`
              : undefined,
          }}
        />

        {/* Noise static overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            ...maskBase,
            opacity: burst.active ? 0.15 : 0.04,
            animation: "gnoise-static 0.5s steps(4) infinite",
            mixBlendMode: "overlay",
          }}
        />
      </div>
    </>
  );
});

export default LogoGlitchNoise;
