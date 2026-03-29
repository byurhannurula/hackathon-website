import Image from "next/image";
import { Ticker } from "@/components/ticker";

export function OrganizerSection() {
  return (
    <section className="px-6 py-14 md:px-12 border-b border-border">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-13">
        {/* Organizer + co-organizers */}
        <div className="shrink-0 md:w-[360px]">
          <div className="font-mono text-[10px] tracking-[0.18em] text-white/50 mb-3 uppercase">
            Организирано от
          </div>
          <Image
            src="/sponsors/startupfactory-horizontal.svg"
            alt="Startup Factory"
            width={200}
            height={63}
            className="object-contain w-[200px] h-auto"
          />

          <div className="font-mono text-[10px] tracking-[0.18em] text-white/50 mt-6 mb-3 uppercase">
            Със съдействието на
          </div>
          <div className="flex items-center gap-6">
            <Image
              src="/sponsors/uni-ruse.png"
              alt="Русенски Университет"
              width={70}
              height={70}
              className="object-contain brightness-120 mix-blend-lighten w-[70px] h-[70px]"
            />
            <Image
              src="/sponsors/software-roastery.png"
              alt="Software Roastery"
              width={200}
              height={84}
              className="object-contain brightness-120 mix-blend-lighten w-[200px] h-auto"
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
