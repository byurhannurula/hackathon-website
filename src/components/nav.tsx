"use client";

import Link from "next/link";

import { cn } from "@/lib";
import { siteConfig } from "@/constants";

interface NavProps {
  onRegister?: () => void;
}

export function Nav({}: NavProps) {
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-200 h-[60px] flex items-center justify-between px-6 md:px-12 transition-all duration-400",
        "bg-bg/94 backdrop-blur-xl border-b border-border"
        // scroll
        //   ? "bg-bg/94 backdrop-blur-xl border-b border-border"
        //   : "bg-transparent border-b border-transparent"
      )}
    >
      <Link href="/" className="no-underline flex items-baseline gap-1.5">
        <span className="font-display text-[22px] text-acid">RUSE</span>
        <span className="font-display text-[22px] text-white">AI HACK</span>
        <span className="font-mono text-[11px] text-white/45 ml-1">{siteConfig.event.year}</span>
      </Link>
      <div className="flex gap-7 items-center">
        {[
          { key: "about", label: "За нас" },
          { key: "sponsors", label: "Спонсори" },
          { key: "agenda", label: "Програма" },
          { key: "jury", label: "Жури" },
          { key: "prizes", label: "Награди" },
          { key: "faq", label: "Въпроси" },
        ].map((item) => (
          <Link
            key={item.key}
            href={`/#${item.key}`}
            className="font-mono text-[10px] tracking-[0.14em] text-white/35 cursor-pointer uppercase transition-colors duration-200 hover:text-acid hidden md:inline no-underline"
            onClick={(e) => {
              const el = document.getElementById(item.key);
              if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/register"
          className="font-mono text-[10px] font-bold tracking-[0.14em] uppercase no-underline bg-acid text-black border-none py-2 px-5.5 cursor-pointer transition-colors duration-200 hover:bg-white"
        >
          Регистрация &rarr;
        </Link>
      </div>
    </nav>
  );
}
