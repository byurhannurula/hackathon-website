"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { ArrowRight, Expand } from "lucide-react";

import { cn } from "@/lib";
import type { ShowcasePhoto } from "@/constants";
import { Lightbox } from "@/components/ui";
import { SectionHeader } from "@/components/section-header";

// ── LQIP blur-up cell with lazy loading ──
function GalleryCell({
  photo,
  index,
  inView,
  onClick,
}: {
  photo: ShowcasePhoto;
  index: number;
  inView: boolean;
  onClick: () => void;
}) {
  const cellRef = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Only start loading when cell is within 400px of the viewport
  useEffect(() => {
    const el = cellRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          obs.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Tiny Unsplash URL for blur placeholder (swap w= param to 20px)
  const blurSrc = photo.src.replace(/w=\d+/, "w=20").replace(/q=\d+/, "q=10");

  const aspect =
    photo.span === "tall"
      ? "aspect-[3/4]"
      : photo.span === "large"
        ? "aspect-square"
        : photo.span === "wide"
          ? "aspect-[16/9]"
          : index % 5 === 0
            ? "aspect-[4/5]"
            : index % 7 === 0
              ? "aspect-[16/9]"
              : "aspect-[4/3]";

  return (
    <div
      ref={cellRef}
      className={cn(
        "group relative overflow-hidden bg-card cursor-pointer mb-1.5 break-inside-avoid",
        aspect,
        "transition-all duration-500 ease-out",
        nearViewport ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
      onClick={onClick}
    >
      {nearViewport && (
        <>
          {/* LQIP: tiny blurred version as background */}
          <div
            className={cn(
              "absolute inset-0 bg-cover bg-center transition-opacity duration-500",
              loaded ? "opacity-0" : "opacity-100"
            )}
            style={{
              backgroundImage: `url(${blurSrc})`,
              filter: "blur(20px)",
              transform: "scale(1.1)",
            }}
          />

          {/* Full image — only rendered once near viewport */}
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={cn(
              "object-cover transition-all duration-500 ease-out group-hover:scale-[1.06]",
              loaded ? "opacity-100 grayscale-[0.8] group-hover:grayscale-0" : "opacity-0"
            )}
            onLoad={() => setLoaded(true)}
          />
        </>
      )}

      {/* Dark gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-[1]" />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-acid/0 group-hover:border-acid/70 transition-all duration-300 z-[2]" />
      <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-acid/0 group-hover:border-acid/70 transition-all duration-300 z-[2]" />
      <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-acid/0 group-hover:border-acid/70 transition-all duration-300 z-[2]" />
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-acid/0 group-hover:border-acid/70 transition-all duration-300 z-[2]" />

      {/* Caption + expand icon on hover */}
      <div className="absolute inset-x-0 bottom-0 p-3 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[3]">
        <span className="font-mono text-[10px] text-white/80 tracking-wide leading-tight line-clamp-1">
          {photo.alt}
        </span>
        <Expand className="w-3.5 h-3.5 text-acid/80 shrink-0 ml-2" />
      </div>

      {/* Top shine line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-acid/0 group-hover:via-acid/30 to-transparent transition-all duration-500 z-[2]" />
    </div>
  );
}

// ── Main gallery section ──
interface PhotoGallerySectionProps {
  photos: ShowcasePhoto[];
  showViewAll?: boolean;
}

export function PhotoGallerySection({ photos, showViewAll }: PhotoGallerySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const openLightbox = useCallback((i: number) => {
    setLightboxIndex(i);
  }, []);

  return (
    <section className="px-6 py-25 md:px-12">
      <div className="max-w-[1100px] mx-auto" ref={ref}>
        <div className="mb-12">
          <SectionHeader label="Галерия" title="Моменти от събитието" />
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-1.5 [column-fill:_balance]">
          {photos.map((photo, i) => (
            <GalleryCell
              key={photo.src}
              photo={photo}
              index={i}
              inView={inView}
              onClick={() => openLightbox(i)}
            />
          ))}
        </div>

        {showViewAll && (
          <div className="mt-12 flex justify-center">
            <Link
              href="/showcase/gallery"
              className="group inline-flex items-center gap-3 font-mono text-[12px] tracking-[0.14em] uppercase text-acid/80 hover:text-acid no-underline transition-colors border border-acid/20 hover:border-acid/50 px-6 py-3"
            >
              Разгледай цялата галерия
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={photos}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
