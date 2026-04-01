"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { cn } from "@/lib";
import { SHOWCASE_PHOTOS, SHOWCASE_STATS, SHOWCASE_VIDEO_ID } from "@/constants";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import {
  PhotoGallerySection,
  ShowcaseStatsSection,
  VideoSection,
  SponsorsSection,
  JurySection,
} from "@/components/sections";
import { useEffect, useRef, useState } from "react";

export function ShowcasePageContent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroInView, setHeroInView] = useState(false);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeroInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const featuredPhotos = SHOWCASE_PHOTOS.filter((p) => p.featured);

  return (
    <div className="bg-bg min-h-screen">
      <Nav />

      {/* Hero */}
      <section ref={heroRef} className="pt-[140px] pb-16 px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto">
          <Link
            href="/"
            className={cn(
              "inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.14em] text-white/50 hover:text-acid uppercase no-underline transition-all duration-700 mb-8",
              heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            Към Началото
          </Link>

          <h1
            className={cn(
              "font-display text-[clamp(52px,9vw,80px)] leading-[1.05] transition-all duration-700 delay-100",
              heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            СЛЕД <span className="text-acid">СЪБИТИЕТО</span>
          </h1>

          <p
            className={cn(
              "max-w-[600px] font-mono text-[13px] text-white/50 leading-[1.8] mt-6 transition-all duration-700 delay-200",
              heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            48 часа код, креативност и AI. Разгледайте най-добрите моменти от RUSE AI HACK &apos;26
            — от първия ред код до финалното представяне.
          </p>
        </div>
      </section>

      <ShowcaseStatsSection stats={SHOWCASE_STATS} />

      <PhotoGallerySection photos={featuredPhotos} showViewAll />

      {SHOWCASE_VIDEO_ID && (
        <VideoSection videoId={SHOWCASE_VIDEO_ID} label="Акценти" title="Видео от събитието" />
      )}

      <SponsorsSection hideCTA />
      <JurySection hideCriteria />

      {/* CTA */}
      <section className="px-6 py-25 md:px-12">
        <div className="max-w-[1100px] mx-auto text-center">
          <h2 className="font-display text-[clamp(36px,6vw,52px)] leading-[1.1] mb-6">
            ДО <span className="text-acid">СЛЕДВАЩИЯ ПЪТ</span>
          </h2>
          <p className="font-mono text-[13px] text-white/50 max-w-[500px] mx-auto leading-[1.8] mb-8">
            Благодарим на всички участници, ментори и спонсори, които направиха събитието възможно.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="font-mono text-[11px] font-bold tracking-[0.14em] uppercase no-underline bg-acid text-black py-3 px-8 hover:bg-white transition-colors"
            >
              Начална страница
            </Link>
            <Link
              href="/showcase/gallery"
              className="font-mono text-[11px] font-bold tracking-[0.14em] uppercase no-underline border border-white/20 text-white/70 py-3 px-8 hover:border-acid/50 hover:text-acid transition-all"
            >
              Пълна галерия →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
