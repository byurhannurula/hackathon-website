"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks";

interface CountUpProps {
  value: string; // e.g. "600+", "48H", "€5,750", "FREE"
  className?: string;
}

export function CountUp({ value, className }: CountUpProps) {
  const { ref, inView } = useInView({ threshold: 0.5 });
  const [displayed, setDisplayed] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    if (window.innerWidth >= 768) {
      animateValue(value, setDisplayed);
    }
  }, [inView, value]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
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
