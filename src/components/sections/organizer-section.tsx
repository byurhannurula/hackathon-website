"use client";

import Image from "next/image";
import { Ticker } from "@/components/ticker";

export function OrganizerSection() {
  return (
    <section className="px-6 py-14 md:px-12 border-b border-border">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-13">
        {/* Organizer + co-organizers */}
        <div className="shrink-0 md:w-[360px]">
          <div className="font-mono text-[10px] tracking-[0.18em] text-white/45 mb-3 uppercase">
            Организирано от
          </div>
          <Image
            src="/logos/startupfactory2.png"
            alt="Startup Factory"
            width={200}
            height={100}
            className="object-contain brightness-150"
            // style={{ mixBlendMode: "lighten" }}
          />

          <div className="font-mono text-[10px] tracking-[0.18em] text-white/30 mt-6 mb-3 uppercase">
            Със съдействието на
          </div>
          <div className="flex items-center gap-6">
            <Image
              src="/logos/ur4.png"
              alt="Русенски Университет"
              width={70}
              height={30}
              className="object-contain brightness-120"
              style={{ mixBlendMode: "lighten" }}
            />
            <Image
              src="/logos/software-roastery3.png"
              alt="Software Roastery"
              width={200}
              height={60}
              className="object-contain brightness-120"
              style={{ mixBlendMode: "lighten" }}
            />
          </div>
        </div>

        <div className="hidden md:block w-px self-stretch bg-white/10 shrink-0" />

        <div className="w-full md:flex-1 min-w-[200px] overflow-hidden">
          <div className="font-mono text-[10px] tracking-[0.18em] text-white/45 mb-3 uppercase">
            Технологични партньори
          </div>
          <Ticker />
        </div>
      </div>
    </section>
  );
}
