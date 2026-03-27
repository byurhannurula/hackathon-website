import { AGENDA_DAYS, siteConfig } from "@/constants";
import { SectionHeader } from "@/components/section-header";

export function AgendaSection() {
  return (
    <section id="agenda" className="px-6 py-25 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader label={siteConfig.event.dateBG} title="ПРОГРАМА" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          {AGENDA_DAYS.map((day) => (
            <div key={day.day} className="border border-white/7 bg-card">
              {/* Day header */}
              <div className="px-5 py-4 border-b border-white/7">
                <div className="font-display text-lg tracking-[0.06em] text-acid">{day.day}</div>
                <div className="font-mono text-[10px] tracking-[0.14em] text-white/50 mt-0.5">
                  {day.date}
                </div>
              </div>
              {/* Day items */}
              <div className="divide-y divide-white/5">
                {day.items.map((item, i) => (
                  <div
                    key={i}
                    className="px-5 py-3.5 transition-colors duration-200 hover:bg-acid/3"
                  >
                    <div className="font-mono text-[11px] tracking-widest text-acid/70">
                      {item.time}
                    </div>
                    <div className="font-body font-bold text-[13px] text-white mt-1">
                      {item.label}
                    </div>
                    <div className="font-mono text-[10px] text-white/45 mt-1 leading-[1.7]">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
