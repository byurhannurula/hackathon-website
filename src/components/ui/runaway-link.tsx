"use client";

import { useEffect, useRef, useState } from "react";

interface RunawayLinkProps {
  href: string;
  children: React.ReactNode;
  /** ms the button keeps dodging once triggered. */
  panicDuration?: number;
  /** Label shown after the button surrenders. */
  surrenderLabel?: string;
}

export function RunawayLink({
  href,
  children,
  panicDuration = 25000,
  surrenderLabel = "добре, добре — кликни →",
}: RunawayLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [panicking, setPanicking] = useState(false);
  const [stopped, setStopped] = useState(false);

  // Trigger panic on initial near-approach (only fired when cursor crosses the wrapper).
  const onMove = (e: React.MouseEvent) => {
    if (stopped || panicking || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist < 140) {
      setPanicking(true);
    }
  };

  // While panicking: track cursor globally, dodge away on every move, auto-stop after timeout.
  useEffect(() => {
    if (!panicking) return;

    const node = ref.current;
    if (!node) return;

    const handler = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const trigger = 220;
      if (dist > trigger) return;

      const angle = Math.atan2(dy, dx);
      const power = (trigger - dist) * 0.7;

      setPos((p) => {
        let nx = p.x - Math.cos(angle) * power;
        let ny = p.y - Math.sin(angle) * power;

        // Clamp so the anchor stays within the viewport — keep clear of the 60px fixed nav.
        const margin = 24;
        const navOffset = 60 + margin;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const futureLeft = rect.left + (nx - p.x);
        const futureTop = rect.top + (ny - p.y);
        if (futureLeft < margin) nx += margin - futureLeft;
        if (futureLeft + rect.width > vw - margin) nx -= futureLeft + rect.width - (vw - margin);
        if (futureTop < navOffset) ny += navOffset - futureTop;
        if (futureTop + rect.height > vh - margin) ny -= futureTop + rect.height - (vh - margin);

        return { x: nx, y: ny };
      });
    };

    window.addEventListener("mousemove", handler);
    const stopTimer = window.setTimeout(() => {
      setPanicking(false);
      setStopped(true);
      setPos({ x: 0, y: 0 });
    }, panicDuration);

    return () => {
      window.removeEventListener("mousemove", handler);
      window.clearTimeout(stopTimer);
    };
  }, [panicking, panicDuration]);

  return (
    <span onMouseMove={onMove} className="relative inline-block p-10 -m-10">
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          transition: "transform 220ms cubic-bezier(0.25, 1.4, 0.5, 1)",
        }}
        className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] bg-acid text-black px-5 py-3 no-underline hover:bg-white"
      >
        {stopped ? surrenderLabel : children}
      </a>
    </span>
  );
}
