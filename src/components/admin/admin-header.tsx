"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib";

const NAV_ITEMS = [
  { href: "/kcah-ia-esur", label: "Регистрации" },
  { href: "/kcah-ia-esur/stats", label: "Статистика" },
  { href: "/kcah-ia-esur/teams", label: "Отбори" },
] as const;

interface AdminHeaderProps {
  onLogout: () => void;
  /** Optional extra controls rendered on the right side before logout */
  actions?: React.ReactNode;
}

export function AdminHeader({ onLogout, actions }: AdminHeaderProps) {
  const pathname = usePathname();

  return (
    <header className="border-b border-white/7 px-4 md:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/">
          <span className="font-display text-xl">
            <span className="text-acid">RUSE</span> AI HACK
          </span>
          <span className="font-mono text-[12px] text-white/40 ml-3 tracking-[0.14em]">ADMIN</span>
        </Link>
        <nav className="flex gap-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "font-mono text-[13px] tracking-[0.08em] px-3 py-1.5 transition-colors",
                  active ? "text-acid border-b-2 border-acid" : "text-white/50 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex items-center gap-5">
        {actions}
        <button
          onClick={onLogout}
          className="font-mono text-[13px] text-white/50 hover:text-white transition-colors cursor-pointer"
        >
          Изход
        </button>
      </div>
    </header>
  );
}
