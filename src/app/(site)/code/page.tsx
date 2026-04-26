import type { Metadata } from "next";
import { Code } from "@/components/views";

export const metadata: Metadata = {
  title: "Под капака",
  description:
    "Стекът, библиотеките, техниките и решенията зад RUSE AI HACK '26 — performance, анимации, backend логика и архитектура.",
  openGraph: {
    title: "Под капака | RUSE AI HACK '26",
    description:
      "Стекът и решенията зад RUSE AI HACK '26 — библиотеки, performance техники, анимации и архитектура.",
    images: [{ url: "/api/og", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Под капака | RUSE AI HACK '26",
    description:
      "Стекът и решенията зад RUSE AI HACK '26 — библиотеки, performance техники, анимации и архитектура.",
    images: ["/api/og"],
  },
};

export default function CodePage() {
  return <Code />;
}
