"use client";

import { ArrowLeft } from "lucide-react";

import { cn } from "@/lib";
import { SHOWCASE_PHOTOS } from "@/constants";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Link } from "@/components/ui";
import { PhotoGallerySection } from "@/components/sections";
import { useInView } from "@/hooks";

export function Gallery() {
  const { ref: headerRef, inView } = useInView({ threshold: 0.2 });

  return (
    <div className="bg-bg min-h-screen">
      <Nav />

      <section ref={headerRef} className="pt-[140px] pb-8 px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto">
          <Link
            href="/showcase"
            className={cn(
              "inline-flex items-center gap-2 text-[12px] tracking-[0.14em] text-white/50 hover:text-acid uppercase transition-all duration-700 mb-8",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            Назад
          </Link>

          <div className="flex items-baseline gap-4">
            <h1
              className={cn(
                "font-display text-[clamp(52px,9vw,80px)] leading-[1.05] transition-all duration-700 delay-100",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
            >
              ГАЛЕРИЯ
            </h1>
            <span
              className={cn(
                "font-mono text-[13px] text-white/40 transition-all duration-700 delay-200",
                inView ? "opacity-100" : "opacity-0"
              )}
            >
              {SHOWCASE_PHOTOS.length} снимки
            </span>
          </div>
        </div>
      </section>

      <PhotoGallerySection photos={SHOWCASE_PHOTOS} />

      <Footer />
    </div>
  );
}
