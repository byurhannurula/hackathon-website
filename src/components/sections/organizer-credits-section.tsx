import Image from "next/image";
import { siteConfig } from "@/constants/site";

const ORGANIZERS = {
  startupFactory: siteConfig.contact.organizerUrl,
  uniRuse: "https://www.uni-ruse.bg/",
  softwareRoastery: "https://softwareroastery.com/",
} as const;

export function OrganizerCreditsSection() {
  return (
    <section className="px-6 py-12 md:px-12">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="font-mono text-[10px] tracking-[0.22em] text-white/40 uppercase">
            Организатор
          </div>
          <a
            href={ORGANIZERS.startupFactory}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Startup Factory"
            className="opacity-70 hover:opacity-100 transition-opacity"
          >
            <Image
              src="/sponsors/organizers/startup-factory.svg"
              alt="Startup Factory"
              width={170}
              height={54}
              className="object-contain w-[170px] h-auto"
            />
          </a>
        </div>

        <div className="hidden md:block w-px self-stretch bg-white/10" />

        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="font-mono text-[10px] tracking-[0.22em] text-white/40 uppercase">
            Със съдействието на
          </div>
          <div className="flex items-center gap-8">
            <a
              href={ORGANIZERS.uniRuse}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Русенски Университет"
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <Image
                src="/sponsors/organizers/uni-ruse.png"
                alt="Русенски Университет"
                width={56}
                height={56}
                style={{ width: "56px", height: "56px" }}
                className="object-contain brightness-120 mix-blend-lighten"
              />
            </a>
            <a
              href={ORGANIZERS.softwareRoastery}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Software Roastery"
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <Image
                src="/sponsors/organizers/software-roastery.svg"
                alt="Software Roastery"
                width={170}
                height={71}
                style={{ width: "170px", height: "auto" }}
                className="object-contain brightness-120 mix-blend-lighten"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
