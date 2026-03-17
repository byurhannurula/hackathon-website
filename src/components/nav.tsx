"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib";
import { siteConfig } from "@/constants";

interface NavProps {
  onRegister?: () => void;
}

export function Nav({}: NavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { key: "about", label: "За нас", href: "/#about" },
    { key: "sponsors", label: "Спонсори", href: "/#sponsors" },
    { key: "agenda", label: "Програма", href: "/#agenda" },
    { key: "jury", label: "Жури", href: "/#jury" },
    { key: "prizes", label: "Награди", href: "/#prizes" },
    { key: "faq", label: "Въпроси", href: "/#faq" },
    { key: "info", label: "Инфо", href: "/info" },
    { key: "rules", label: "Правила", href: "/rules" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, key: string) => {
    if (href.startsWith("/#")) {
      const el = document.getElementById(key);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
        setMobileMenuOpen(false);
      }
    } else {
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-200 h-[60px] flex items-center justify-between px-6 md:px-12 transition-all duration-300",
        "bg-bg/94 backdrop-blur-xl border-b border-border"
      )}
    >
      <Link href="/" className="no-underline flex items-baseline gap-1.5">
        <span className="font-display text-[22px] text-acid">RUSE</span>
        <span className="font-display text-[22px] text-white">AI HACK</span>
        <span className="font-mono text-[11px] text-white/45 ml-1">{siteConfig.event.year}</span>
      </Link>

      <div className="hidden lg:flex gap-7 items-center">
        {navItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className="font-mono text-[10px] tracking-[0.14em] text-white/35 cursor-pointer uppercase transition-colors duration-200 hover:text-acid no-underline"
            onClick={(e) => handleNavClick(e, item.href, item.key)}
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/register"
          className="font-mono text-[10px] font-bold tracking-[0.14em] uppercase no-underline bg-acid text-black border-none py-2 px-[22px] cursor-pointer transition-colors duration-200 hover:bg-white"
        >
          Регистрация &rarr;
        </Link>
      </div>

      <button
        onClick={() => setMobileMenuOpen((prev) => !prev)}
        className="lg:hidden p-2 text-white/70 hover:text-acid transition-colors"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {mobileMenuOpen && (
        <div
          className="fixed inset-x-0 top-[60px] h-[calc(100dvh-60px)] z-199 bg-black/95 backdrop-blur-xl lg:hidden overflow-y-auto animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="min-h-full flex flex-col items-center px-6 pt-8 pb-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center gap-6 w-full max-w-sm animate-reveal-up">
              {navItems.map((item, i) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="font-mono text-sm tracking-[0.14em] text-white/70 uppercase transition-colors duration-200 hover:text-acid no-underline animate-reveal-up"
                  style={{ animationDelay: `${i * 40}ms` }}
                  onClick={(e) => handleNavClick(e, item.href, item.key)}
                >
                  {item.label}
                </Link>
              ))}

              <div
                className="mt-4 text-center font-mono text-[11px] tracking-[0.18em] text-acid uppercase leading-relaxed animate-reveal-up"
                style={{ animationDelay: "260ms" }}
              >
                {siteConfig.event.dateBG} · {siteConfig.event.locationBG} ·{" "}
                {siteConfig.event.duration.toLowerCase()} хакатон
              </div>

              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-6 inline-flex items-center justify-center font-mono text-sm font-bold tracking-[0.14em] uppercase no-underline bg-acid text-black py-3 px-8 transition-colors duration-200 hover:bg-white animate-reveal-up"
                style={{ animationDelay: "320ms" }}
              >
                Регистрация &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
