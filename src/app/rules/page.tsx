import type { Metadata } from "next";
import { RulesPageContent } from "@/components/rules-page-content";

export const metadata: Metadata = {
  title: "Правила & Условия",
  description:
    "Правила за участие, кодекс на поведение, интелектуална собственост и условия за RUSE AI HACK '26.",
  openGraph: {
    title: "Правила & Условия | RUSE AI HACK '26",
    description: "Подробни правила и условия за 48-часовия AI хакатон в Русе.",
    images: [{ url: "/api/og", width: 1200, height: 630 }],
  },
};

export default function RulesPage() {
  return <RulesPageContent />;
}
