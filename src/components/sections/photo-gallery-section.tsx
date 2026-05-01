"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { ArrowRight, Expand } from "lucide-react";

import { cn } from "@/lib";
import type { ShowcasePhoto } from "@/lib";
import { Lightbox, CornerBrackets } from "@/components/ui";
import { SectionHeader } from "@/components/section-header";
import { useInView } from "@/hooks";

const SPAN_ASPECT: Record<NonNullable<ShowcasePhoto["span"]>, string> = {
  tall: "aspect-[3/4]",
  large: "aspect-square",
  wide: "aspect-[16/9]",
};

const INDEX_ASPECTS = ["aspect-[4/5]", "aspect-[16/9]", "aspect-[4/3]"] as const;

function resolveAspect(span: ShowcasePhoto["span"], index: number): string {
  if (span && SPAN_ASPECT[span]) return SPAN_ASPECT[span];
  if (index % 5 === 0) return INDEX_ASPECTS[0];
  if (index % 7 === 0) return INDEX_ASPECTS[1];
  return INDEX_ASPECTS[2];
}

function GalleryCell({
  photo,
  index,
  onClick,
}: {
  photo: ShowcasePhoto;
  index: number;
  onClick: () => void;
}) {
  const { ref: cellRef, inView: nearViewport } = useInView({ rootMargin: "400px 0px" });
  const [loaded, setLoaded] = useState(false);

  const blurSrc = useMemo(
    () => photo.src.replace(/w=\d+/, "w=20").replace(/q=\d+/, "q=10"),
    [photo.src]
  );
  const aspect = resolveAspect(photo.span, index);

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

      <CornerBrackets variant="fade" size="md" />

      {/* Caption + expand icon on hover */}
      <div className="absolute inset-x-0 bottom-0 p-3 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[3]">
        <span className="font-mono text-[10px] text-white/80 tracking-wide leading-tight line-clamp-1">
          &nbsp;
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
  viewAllUrl?: string;
}

export function PhotoGallerySection({ photos, viewAllUrl }: PhotoGallerySectionProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((i: number) => {
    setLightboxIndex(i);
  }, []);

  return (
    <section className="px-6 py-25 md:px-12 bg-card border-t border-border">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-12">
          <SectionHeader label="Галерия" title="Моменти от събитието" />
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-1.5 [column-fill:_balance]">
          {photos.map((photo, i) => (
            <GalleryCell key={photo.src} photo={photo} index={i} onClick={() => openLightbox(i)} />
          ))}
        </div>

        {viewAllUrl && (
          <div className="mt-12 flex justify-center">
            <Link
              href={viewAllUrl}
              target="_blank"
              rel="noopener noreferrer"
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
