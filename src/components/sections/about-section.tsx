"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Cpu, Users, Calendar, Rocket, Target } from "lucide-react";

import { cn } from "@/lib";
import { ABOUT_CARDS, ABOUT_THEMES } from "@/constants";
import { SectionHeader } from "@/components/section-header";
import { FormButton, GlowingEffect } from "@/components/ui";

interface GridItemProps {
  className?: string;
  icon: ReactNode;
  title: string;
  description: ReactNode;
  extra?: ReactNode;
}

const GridItem = ({ className, icon, title, description, extra }: GridItemProps) => {
  return (
    <li className={cn("min-h-48 list-none", className)}>
      <div className="relative h-full border border-white/7">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={2}
        />
        <div className="relative flex h-full flex-col gap-4 bg-card p-6 md:p-7">
          <div className="w-fit border border-white/10 bg-white/5 p-2 text-acid">{icon}</div>
          <div className="space-y-2.5">
            <h3 className="text-lg font-semibold font-body tracking-[-0.02em] md:text-xl text-white">
              {title}
            </h3>
            <p className="font-mono text-[12px] leading-[1.7] text-white/60">{description}</p>
          </div>
          {extra}
        </div>
      </div>
    </li>
  );
};

export function AboutSection() {
  const router = useRouter();

  return (
    <section id="about" className="px-6 py-25 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-12">
          <SectionHeader label="Накратко" title="За хакатона" />
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          <GridItem
            icon={<Cpu className="h-4 w-4" />}
            title={ABOUT_CARDS.what.title}
            description={ABOUT_CARDS.what.desc}
          />
          <GridItem
            icon={<Users className="h-4 w-4" />}
            title={ABOUT_CARDS.who.title}
            description={ABOUT_CARDS.who.desc}
          />
          <GridItem
            icon={<Calendar className="h-4 w-4" />}
            title={ABOUT_CARDS.format.title}
            description={ABOUT_CARDS.format.desc}
          />
          <GridItem
            icon={<Rocket className="h-4 w-4" />}
            title={ABOUT_CARDS.requirements.title}
            description={ABOUT_CARDS.requirements.desc}
          />
          <GridItem
            className="md:col-span-2"
            icon={<Target className="h-4 w-4" />}
            title={ABOUT_CARDS.goals.title}
            description={ABOUT_CARDS.goals.desc}
            extra={
              <div className="flex flex-wrap gap-2 mt-2">
                {ABOUT_THEMES.map((theme) => (
                  <span
                    key={theme}
                    className="font-mono text-[11px] tracking-wide px-3.5 py-1.5 border border-acid/20 text-acid/80 bg-acid/5 transition-colors duration-200 hover:bg-acid/10 hover:border-acid/40"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            }
          />
        </ul>

        <div className="flex items-center justify-center">
          <FormButton type="button" size="sm" onClick={() => router.push("/info")} className="mt-8">
            Повече Информация & Правила
          </FormButton>
        </div>
      </div>
    </section>
  );
}
