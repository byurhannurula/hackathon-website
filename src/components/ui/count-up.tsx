"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: string; // e.g. "600+", "48H", "€5,750", "FREE"
  className?: string;
}

export function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateValue(value, setDisplayed);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className={className}>
      {displayed}
    </div>
  );
}

function animateValue(target: string, setter: (v: string) => void) {
  // Extract numeric part and prefix/suffix
  const match = target.match(/^([^\d]*?)([\d,]+(?:\.\d+)?)(.*?)$/);
  if (!match) {
    // Non-numeric value like "FREE" — just set immediately
    setter(target);
    return;
  }

  const prefix = match[1]; // e.g. "€"
  const numStr = match[2]; // e.g. "5,750"
  const suffix = match[3]; // e.g. "+"
  const hasComma = numStr.includes(",");
  const num = parseFloat(numStr.replace(/,/g, ""));

  const duration = 1200;
  const steps = 40;
  const stepTime = duration / steps;
  let step = 0;

  const interval = setInterval(() => {
    step++;
    // Ease-out cubic
    const t = step / steps;
    const eased = 1 - Math.pow(1 - t, 3);
    const current = Math.round(eased * num);

    let formatted = String(current);
    if (hasComma) {
      formatted = current.toLocaleString("en-US");
    }

    setter(`${prefix}${formatted}${suffix}`);

    if (step >= steps) {
      clearInterval(interval);
      setter(target); // Ensure exact final value
    }
  }, stepTime);
}
