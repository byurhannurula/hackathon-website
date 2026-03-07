import type { Metadata } from "next";
import { InfoPageContent } from "@/components/info-page-content";

export const metadata: Metadata = {
  title: "Информация за хакатона",
  description:
    "Подробна информация за RUSE AI HACK '26 — правила, формат, изисквания, критерии за оценяване и полезни ресурси за участниците.",
  openGraph: {
    title: "Информация | RUSE AI HACK '26",
    description: "Всичко, което трябва да знаете за 48-часовия AI хакатон в Русе.",
    images: [{ url: "/api/og", width: 1200, height: 630 }],
  },
};

export default function InfoPage() {
  return <InfoPageContent />;
}
