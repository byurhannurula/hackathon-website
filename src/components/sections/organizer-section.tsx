import Image from "next/image";
import { Ticker } from "@/components/ticker";

export function OrganizerSection() {
  return (
    <section className="px-6 py-14 md:px-12 border-b border-border">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-13">
        {/* Organizer + co-organizers */}
        <div className="shrink-0 md:w-[360px] text-center md:text-left">
          <div className="font-mono text-[10px] tracking-[0.18em] text-white/50 mb-3 uppercase">
            Организирано от
          </div>
          <Image
            src="/sponsors/organizers/startup-factory.svg"
            alt="Startup Factory"
            width={200}
            height={63}
            className="object-contain w-[200px] h-auto mx-auto md:mx-0"
          />

          <div className="font-mono text-[10px] tracking-[0.18em] text-white/50 mt-6 mb-3 uppercase">
            Със съдействието на
          </div>
          <div className="flex items-center gap-6 justify-center md:justify-start">
            <Image
              src="/sponsors/organizers/uni-ruse.png"
              alt="Русенски Университет"
              width={70}
              height={70}
              style={{ width: "70px", height: "70px" }}
              className="object-contain brightness-120 mix-blend-lighten"
            />
            <Image
              src="/sponsors/organizers/software-roastery.svg"
              alt="Software Roastery"
              width={200}
              height={84}
              style={{ width: "200px", height: "auto" }}
              className="object-contain brightness-120 mix-blend-lighten"
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
