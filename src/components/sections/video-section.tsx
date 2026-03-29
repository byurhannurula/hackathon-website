"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

import { cn } from "@/lib";
import { SectionHeader } from "@/components/section-header";

interface VideoSectionProps {
  videoId: string;
}

export function VideoSection({ videoId }: VideoSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(false);

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
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="video" className="px-6 py-25 md:px-12">
      <div className="max-w-[1100px] mx-auto" ref={ref}>
        <div className="mb-12">
          <SectionHeader label="Виж повече" title="КАКВО ТЕ ОЧАКВА" />
        </div>

        {/* Video container */}
        <div
          className={cn(
            "relative w-full aspect-video border border-white/7 bg-card overflow-hidden transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"
          )}
        >
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-acid/40 z-10" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-acid/40 z-10" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-acid/40 z-10" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-acid/40 z-10" />

          {playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <button
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 w-full h-full cursor-pointer"
            >
              {/* Thumbnail */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="Video thumbnail"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/40 to-transparent" />

              {/* Scanline effect */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-scanlines" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex items-center justify-center">
                  {/* Pulse ring */}
                  <div className="absolute w-24 h-24 border border-acid/20 group-hover:border-acid/40 group-hover:scale-125 transition-all duration-500" />
                  {/* Button */}
                  <div className="w-16 h-16 bg-acid flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-7 h-7 text-bg" fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-acid animate-pulse" />
                <span className="font-mono text-[11px] tracking-[0.14em] text-white/50 uppercase">
                  Информационно видео
                </span>
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
