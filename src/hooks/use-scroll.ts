"use client";

import { useState, useEffect } from "react";

/**
 * Returns true when the page has scrolled past the given threshold.
 */
export function useScroll(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);

  return scrolled;
}
