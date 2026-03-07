"use client";

interface AgendaItemProps {
  time: string;
  label: string;
  desc: string;
}

export const AgendaItem = ({ time, label, desc }: AgendaItemProps) => {
  return (
    <div className="group border-l-2 border-l-white/10 border-b border-b-white/6 p-6 md:p-7 transition-all duration-200 hover:bg-acid/3 hover:border-l-acid">
      <div className="font-mono text-[11px] tracking-[0.14em] text-acid">{time}</div>
      <div className="font-body font-bold text-base text-white mt-1.5">{label}</div>
      <div className="font-mono text-[11px] text-white/55 mt-1.5 leading-[1.8]">{desc}</div>
    </div>
  );
};
