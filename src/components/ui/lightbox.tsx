"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import type { ShowcasePhoto } from "@/constants";

interface LightboxProps {
  images: ShowcasePhoto[];
  initialIndex: number;
  onClose: () => void;
}

export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir);
      setCurrentIndex((prev) => (prev + dir + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goTo(-1);
      if (e.key === "ArrowRight") goTo(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, goTo]);

  const current = images[currentIndex];

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-xl"
      onClick={onClose}
    >
      {/* Content wrapper — scale from center on open/close */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
          aria-label="Затвори"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Previous */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            goTo(-1);
          }}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center border border-white/15 text-white/60 hover:text-acid hover:border-acid/40 transition-all cursor-pointer"
          aria-label="Предишна"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            goTo(1);
          }}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center border border-white/15 text-white/60 hover:text-acid hover:border-acid/40 transition-all cursor-pointer"
          aria-label="Следваща"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Main image */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={(_e, info) => {
              if (Math.abs(info.velocity.x) > 300 || Math.abs(info.offset.x) > 100) {
                goTo(info.offset.x > 0 ? -1 : 1);
              }
            }}
            className="relative w-[90vw] h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Counter */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[11px] text-white/50">
          {currentIndex + 1} / {images.length}
        </div>
      </motion.div>
    </motion.div>
  );
}
