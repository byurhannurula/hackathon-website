"use client";

import dynamic from "next/dynamic";
import { Instagram, Linkedin, Send } from "lucide-react";

const DottedSurface = dynamic(
  () => import("@/components/ui/dotted-surface").then((m) => m.DottedSurface),
  { ssr: false }
);

import { cn } from "@/lib";
import { useInView } from "@/hooks";
import { Nav } from "@/components/nav";
import { Link } from "@/components/ui";
import { LogoGlitchNoise } from "@/components/ui/logo-glitch-noise";
import { Footer } from "@/components/footer";
import {
  PhotoGallerySection,
  ShowcaseStatsSection,
  VideoSection,
  SponsorsSection,
  JurySection,
  OrganizerCreditsSection,
  WinnersSection,
} from "@/components/sections";
import {
  SHOWCASE_PHOTOS,
  SHOWCASE_STATS,
  SHOWCASE_VIDEO_ID,
  SHOWCASE_WINNERS,
  siteConfig,
} from "@/constants";

export function Showcase() {
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.2 });

  return (
    <div className="bg-bg min-h-screen">
      <Nav />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[calc(100vh-50px)] flex items-center overflow-hidden pt-[140px] pb-20 px-6 md:px-12"
      >
        <DottedSurface className="absolute inset-0 z-0" />
        <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle,rgba(var(--acid-rgb),0.08)_1px,transparent_1px)] bg-size-[60px_60px]" />
        <div className="absolute inset-0 pointer-events-none z-1 bg-[radial-gradient(ellipse_90%_70%_at_50%_50%,transparent_30%,rgba(5,5,5,0.75)_70%,rgba(5,5,5,0.98)_100%)]" />

        <div className="relative z-2 w-full max-w-[1100px] mx-auto text-center">
          <h1 className="sr-only">
            {siteConfig.event.name} {siteConfig.event.year} — След събитието
          </h1>

          <div
            className={cn(
              "flex items-center justify-center transition-all duration-700",
              heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            <LogoGlitchNoise className="w-[clamp(180px,50vw,400px)]!" />
          </div>

          <div
            className={cn(
              "font-mono text-[12px] md:text-[14px] tracking-[0.18em] text-white/70 uppercase mt-7 transition-all duration-700 delay-100",
              heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            {siteConfig.event.dateBG} · <span className="text-acid">Русе</span>
          </div>

          <div
            className={cn(
              "font-display text-[clamp(22px,3.5vw,38px)] tracking-[0.02em] text-white/75 mt-4 transition-all duration-700 delay-150",
              heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Първото издание <span className="text-acid">приключи</span>
          </div>

          <p
            className={cn(
              "max-w-[640px] mx-auto font-mono text-[14px] md:text-[15px] text-white/60 leading-[1.9] mt-7 transition-all duration-700 delay-200",
              heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            {/* 48 часа. 70+ участници. 20 отбора. Един уикенд, в който Русе кодира бъдещето си. */}
            48 часа код, креативност и AI. Разгледайте най-добрите моменти от <br />{" "}
            {siteConfig.event.name} {siteConfig.event.year} — от първия ред код до финалното
            представяне.
          </p>
        </div>
      </section>

      <OrganizerCreditsSection />

      <ShowcaseStatsSection stats={SHOWCASE_STATS} />

      <WinnersSection winners={SHOWCASE_WINNERS} />

      <PhotoGallerySection photos={SHOWCASE_PHOTOS} viewAllUrl={siteConfig.galleryUrl} />

      {SHOWCASE_VIDEO_ID && (
        <VideoSection videoId={SHOWCASE_VIDEO_ID} label="Акценти" title="Видео от събитието" />
      )}

      <SponsorsSection hideCTA />
      <JurySection hideCriteria />

      {/* CTA — До следващия път */}
      <section className="relative px-6 py-24 md:px-12 border-t border-border overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--color-acid) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative max-w-[1100px] mx-auto text-center">
          <div className="font-mono text-[11px] tracking-[0.18em] text-acid uppercase mb-4">
            {siteConfig.event.name} {siteConfig.event.year} · Край
          </div>
          <h2 className="font-display text-[clamp(40px,7vw,64px)] leading-[1.05] mb-6">
            До <span className="text-acid">следващия път</span>
          </h2>
          <p className="font-mono text-[13px] text-white/55 max-w-[560px] mx-auto leading-[1.9] mb-10">
            Благодарим на всички участници, ментори, жури и спонсори, които направиха събитието
            възможно. Следвайте ни, за да сте първи, когато обявим следващото издание.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <Link href="https://startupfactory.bg/buletin/" variant="primary" size="xs">
              <Send className="w-4 h-4" />
              Абонирай се за бюлетин
            </Link>
            <Link href={siteConfig.social.instagram} variant="ghost" size="xs">
              <Instagram className="w-4 h-4" />
              Instagram
            </Link>
            <Link href={siteConfig.social.linkedin} variant="ghost" size="xs">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </Link>
          </div>

          <div className="flex flex-wrap justify-center font-mono text-[10px] tracking-[0.18em] text-white/45 uppercase">
            <Link href={siteConfig.galleryUrl} className="hover:text-acid">
              Пълна галерия →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
