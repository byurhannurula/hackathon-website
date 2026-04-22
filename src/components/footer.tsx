import Link from "next/link";
import { Instagram, Facebook, Mail, Linkedin } from "lucide-react";
import { siteConfig } from "@/constants";
import { FooterRegisterLink } from "@/components/footer-register-link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Left: branding + description */}
          <div className="max-w-[360px]">
            <Link href="/" className="no-underline flex items-baseline gap-1.5">
              <span className="font-display text-[20px] text-acid">RUSE</span>
              <span className="font-display text-[20px] text-white">AI HACK</span>
              <span className="font-mono text-[10px] text-white/50 ml-1">
                {siteConfig.event.year}
              </span>
            </Link>
            <p className="font-mono text-[11px] text-white/50 leading-[1.8] mt-3">
              {siteConfig.event.shortDescription}
            </p>
          </div>

          {/* Middle: links */}
          <div className="flex gap-12">
            <div>
              <div className="font-mono text-[10px] tracking-[0.18em] text-white/45 uppercase mb-3">
                Навигация
              </div>
              <div className="flex flex-col gap-2">
                {[
                  { label: "За нас", href: "/#about" },
                  { label: "Програма", href: "/#agenda" },
                  { label: "Награди", href: "/#prizes" },
                  { label: "Информация", href: "/info" },
                  { label: "Правила", href: "/rules" },
                  { label: "Галерия", href: "/showcase" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-mono text-[11px] text-white/45 no-underline hover:text-acid transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[0.18em] text-white/45 uppercase mb-3">
                Контакт
              </div>
              <div className="flex flex-col gap-2">
                <a
                  href={`mailto:${siteConfig.contact.sponsorEmail}`}
                  className="font-mono text-[11px] text-white/45 no-underline hover:text-acid transition-colors"
                >
                  {siteConfig.contact.sponsorEmail}
                </a>
                <FooterRegisterLink />
              </div>
            </div>
          </div>

          {/* Right: social */}
          <div>
            <div className="font-mono text-[10px] tracking-[0.18em] text-white/45 uppercase mb-3">
              Последвайте ни
            </div>
            <div className="flex gap-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-white/15 text-white/55 hover:border-acid/50 hover:text-acid transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-white/15 text-white/55 hover:border-acid/50 hover:text-acid transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-white/15 text-white/55 hover:border-acid/50 hover:text-acid transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${siteConfig.contact.sponsorEmail}`}
                className="w-9 h-9 flex items-center justify-center border border-white/15 text-white/55 hover:border-acid/50 hover:text-acid transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border px-6 py-4 md:px-12 flex justify-between items-center flex-wrap gap-3 max-w-[1100px] mx-auto">
        <span className="font-mono text-[10px] text-white/45 tracking-widest">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href={siteConfig.contact.organizerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/55 hover:text-teal no-underline"
          >
            {siteConfig.event.organizer}
          </a>{" "}
          &middot; {siteConfig.event.name} {siteConfig.event.year}. Всички права запазени.
        </span>
        <span className="font-mono text-[10px] text-white/50 tracking-widest">
          Разработено с много вайб от{" "}
          <a
            href="https://linkedin.com/in/byurhannurula"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/55 hover:text-teal no-underline"
          >
            @byurhannurula
          </a>
        </span>
      </div>

      {/* Large outlined text — bottom of page, gradient fade to bg */}
      <div className="hidden md:block relative overflow-hidden h-[clamp(100px,18vw,220px)]">
        {/* Gradient mask: visible at top, fades to bg at bottom */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, var(--color-card) 85%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-center select-none pointer-events-none">
          <span
            className="font-display font-bold text-[clamp(100px,18vw,220px)] leading-none tracking-tight whitespace-nowrap text-transparent"
            style={{
              WebkitTextStroke: "2px rgba(var(--acid-rgb), 0.5)",
            }}
          >
            {siteConfig.event.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
