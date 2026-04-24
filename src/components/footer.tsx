"use client";

import { Instagram, Facebook, Mail, Linkedin } from "lucide-react";

import { Link } from "@/components/ui";
import { siteConfig } from "@/constants";
import { IS_SHOWCASE_MODE } from "@/lib";
import { useRegistrationOpen } from "@/hooks";

const socialIconCls =
  "w-9 h-9 flex items-center justify-center border border-white/15 text-white/55 hover:border-acid/50 hover:text-acid transition-all";
const navLinkCls = "text-white/45";

const EVENT_SECTION_LINKS = [
  { label: "За нас", href: "/#about" },
  { label: "Спонсори", href: "/#sponsors" },
  { label: "Програма", href: "/#agenda" },
  { label: "Награди", href: "/#prizes" },
  { label: "FAQ", href: "/#faq" },
];

const SHOWCASE_SECTION_LINKS = [
  { label: "Галерия", href: "/showcase/gallery" },
  { label: "Победители", href: "/showcase#winners" },
  { label: "Спонсори", href: "/showcase#sponsors" },
];

export function Footer() {
  const regOpen = useRegistrationOpen();

  const sectionLinks = IS_SHOWCASE_MODE ? SHOWCASE_SECTION_LINKS : EVENT_SECTION_LINKS;

  const pageLinks = [
    { label: "Информация", href: "/info" },
    { label: "Правила", href: "/rules" },
    ...(regOpen && !IS_SHOWCASE_MODE ? [{ label: "Регистрация", href: "/register" }] : []),
  ];

  const showRegisterLink = regOpen && !IS_SHOWCASE_MODE;

  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Left: branding + description + socials */}
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
            <div className="flex gap-3 mt-4">
              <Link
                href={siteConfig.social.instagram}
                className={socialIconCls}
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link
                href={siteConfig.social.facebook}
                className={socialIconCls}
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </Link>
              <Link
                href={siteConfig.social.linkedin}
                className={socialIconCls}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link
                href={`mailto:${siteConfig.contact.sponsorEmail}`}
                className={socialIconCls}
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Navigation columns */}
          <div className="flex gap-12">
            {/* Sections */}
            <div>
              <div className="font-mono text-[10px] tracking-[0.18em] text-white/45 uppercase mb-3">
                Секции
              </div>
              <div className="flex flex-col gap-2">
                {sectionLinks.map((link) => (
                  <Link key={link.href} href={link.href} size="sm" className={navLinkCls}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Pages */}
            <div>
              <div className="font-mono text-[10px] tracking-[0.18em] text-white/45 uppercase mb-3">
                Страници
              </div>
              <div className="flex flex-col gap-2">
                {pageLinks.map((link) => (
                  <Link key={link.href} href={link.href} size="sm" className={navLinkCls}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="font-mono text-[10px] tracking-[0.18em] text-white/45 uppercase mb-3">
                Контакт
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href={`mailto:${siteConfig.contact.sponsorEmail}`}
                  size="sm"
                  className={navLinkCls}
                >
                  {siteConfig.contact.sponsorEmail}
                </Link>
                {showRegisterLink && (
                  <Link href="/register" size="sm" className="text-acid/70">
                    Регистрация →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border px-6 py-4 md:px-12 flex justify-between items-center flex-wrap gap-3 max-w-[1100px] mx-auto">
        <span className="font-mono text-[10px] text-white/45 tracking-widest">
          &copy; {new Date().getFullYear()}{" "}
          <Link href={siteConfig.contact.organizerUrl} className="text-white/55 hover:text-teal">
            {siteConfig.event.organizer}
          </Link>{" "}
          &middot; {siteConfig.event.name} {siteConfig.event.year}. Всички права запазени.
        </span>
        <span className="font-mono text-[10px] text-white/50 tracking-widest">
          Разработено с много вайб от{" "}
          <Link
            href="https://linkedin.com/in/byurhannurula"
            className="text-white/55 hover:text-teal"
          >
            @byurhannurula
          </Link>
        </span>
      </div>

      {/* Large outlined text — bottom of page, gradient fade to bg */}
      <div className="hidden md:block relative overflow-hidden h-[clamp(100px,18vw,220px)]">
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
