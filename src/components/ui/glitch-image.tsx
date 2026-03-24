"use client";

import Image from "next/image";
import { cn } from "@/lib";

interface GlitchImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
}

export function GlitchImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  containerClassName,
}: GlitchImageProps) {
  const imgClass = cn("h-auto select-none pointer-events-none", className);

  return (
    <div className={cn("glitch-img relative", containerClassName)}>
      {/* Red/pink channel — offset left */}
      <Image
        src={src}
        alt="AI HACK Text"
        width={width}
        height={height}
        priority={priority}
        className={cn(imgClass, "glitch-img__layer glitch-img__layer--r absolute inset-0")}
      />
      {/* Teal/cyan channel — offset right */}
      <Image
        src={src}
        alt="AI HACK Text"
        width={width}
        height={height}
        priority={priority}
        className={cn(imgClass, "glitch-img__layer glitch-img__layer--g absolute inset-0")}
      />
      {/* Base layer — always visible */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={imgClass}
      />
    </div>
  );
}
