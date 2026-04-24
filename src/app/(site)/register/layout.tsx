import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Регистрация",
  description:
    "Регистрирай се за RUSE AI HACK '26 — 48-часов AI хакатон в Русе, България. Вземи своя уникален хакерски билет. 26 април 2026.",
  openGraph: {
    title: "Регистрация | RUSE AI HACK '26",
    description: "Заеми своето място на първия AI хакатон в Русе. Безплатен вход, награди €5,750.",
    images: [{ url: "/api/og", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Регистрация | RUSE AI HACK '26",
    description: "Вземи билет за 48-часовия AI хакатон в Русе.",
    images: ["/api/og"],
  },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
