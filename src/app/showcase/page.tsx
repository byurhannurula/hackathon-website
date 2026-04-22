import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { IS_SHOWCASE_MODE } from "@/lib";
import { ShowcasePageContent } from "@/components/showcase-page-content";

export const metadata: Metadata = {
  title: "След Събитието | RUSE AI HACK '26",
  description:
    "Разгледайте моментите от RUSE AI HACK '26 — снимки, видео и акценти от 48-часовия AI хакатон в Русе.",
  openGraph: {
    title: "След Събитието | RUSE AI HACK '26",
    description:
      "Разгледайте моментите от RUSE AI HACK '26 — снимки, видео и акценти от 48-часовия AI хакатон в Русе.",
  },
};

export default function ShowcasePage() {
  if (!IS_SHOWCASE_MODE) notFound();
  return <ShowcasePageContent />;
}
