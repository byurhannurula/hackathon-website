import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { IS_SHOWCASE_MODE } from "@/lib";
import { Gallery } from "@/components/views";

export const metadata: Metadata = {
  title: "Пълна Галерия | RUSE AI HACK '26",
  description: "Всички снимки от RUSE AI HACK '26 — 48-часов AI хакатон в Русе.",
  openGraph: {
    title: "Пълна Галерия | RUSE AI HACK '26",
    description: "Всички снимки от RUSE AI HACK '26 — 48-часов AI хакатон в Русе.",
  },
};

export default function GalleryPage() {
  if (!IS_SHOWCASE_MODE) notFound();
  return <Gallery />;
}
