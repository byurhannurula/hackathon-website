"use client";

import { useRef, useState, useCallback } from "react";

interface UseTiltOptions {
  maxRotation?: number;
  interactive?: boolean;
}

export function useTilt({ maxRotation = 10, interactive = true }: UseTiltOptions = {}) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const [hov, setHov] = useState(false);

  const setRef = useCallback((node: HTMLDivElement | null) => {
    elRef.current = node;
  }, []);

  const onMouseEnter = useCallback(() => setHov(true), []);

  const onMouseLeave = useCallback(() => {
    setHov(false);
    setRot({ x: 0, y: 0 });
    setShine({ x: 50, y: 50 });
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive || !elRef.current) return;
      const r = elRef.current.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      setRot({
        x: -(py - 0.5) * maxRotation,
        y: (px - 0.5) * maxRotation,
      });
      setShine({ x: px * 100, y: py * 100 });
    },
    [interactive, maxRotation]
  );

  const handlers = {
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
  };

  return { setRef, rot, shine, hov, handlers } as const;
}
