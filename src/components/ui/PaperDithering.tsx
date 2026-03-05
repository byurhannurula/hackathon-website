"use client";
import React, { Suspense, lazy } from "react";

const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({
    default: mod.Dithering,
  })),
);

interface PaperDitheringProps {
  isHovered?: boolean;
}

export function PaperDithering({ isHovered = false }: PaperDitheringProps) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60 mix-blend-screen">
      <Suspense fallback={<div className="absolute inset-0 bg-transparent" />}>
        <Dithering
          colorBack="#00000000" // Transparent
          colorFront="#C8FF00" // Acid Green
          shape="warp"
          type="4x4"
          speed={isHovered ? 0.6 : 0.2}
          className="size-full"
          minPixelRatio={1}
        />
      </Suspense>
    </div>
  );
}
