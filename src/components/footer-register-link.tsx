"use client";

import Link from "next/link";
import { useRegistrationOpen } from "@/hooks";

export function FooterRegisterLink() {
  const regOpen = useRegistrationOpen();
  if (!regOpen) return null;

  return (
    <Link
      href="/register"
      className="font-mono text-[11px] text-acid/70 no-underline hover:text-acid transition-colors"
    >
      Регистрация →
    </Link>
  );
}
