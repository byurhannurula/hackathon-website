import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Oswald, JetBrains_Mono, Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib";
import { siteConfig } from "@/constants";
import { ScrollToTop } from "@/components/ui";
import { AnalyticsScript } from "@/components/analytics";
import { ConsoleGreeting } from "@/components/ui/console-greeting";
import { ClientExtras } from "@/components/ui/client-extras";

const oswald = Oswald({
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-bebas",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono-google",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif-google",
  display: "swap",
});

const manrope = Manrope({
  weight: ["500", "600", "700", "800"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-syne",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "RUSE AI HACK '26 — 48-часов AI Хакатон в Русе",
    template: "%s | RUSE AI HACK '26",
  },
  description:
    "RUSE AI HACK '26 е 48-часов AI хакатон в Русе, България. Създай работещо AI приложение, спечели награди на стойност €2,900 и се свържи с най-добрите разработчици. 24–26 април 2026.",
  keywords: [
    "хакатон",
    "hackathon",
    "AI",
    "Русе",
    "Ruse",
    "Bulgaria",
    "vibe coding",
    "StartupFactory",
    "изкуствен интелект",
    "програмиране",
    "2026",
  ],
  authors: [{ name: "StartupFactory" }],
  creator: "StartupFactory",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  openGraph: {
    type: "website",
    locale: "bg_BG",
    alternateLocale: "en_US",
    siteName: "RUSE AI HACK '26",
    title: "RUSE AI HACK '26 — 48-часов AI Хакатон в Русе",
    description:
      "48-часов AI хакатон в Русе, България. Реални продукти. AI-assisted всичко. 26 април 2026.",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "RUSE AI HACK '26 Хакатон",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RUSE AI HACK '26 — 48-часов AI Хакатон",
    description:
      "48-часов AI хакатон в Русе, България. Реални продукти, реални награди. 26 април 2026.",
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#feee04" />
        {/* JSON-LD Event structured data — all values from static siteConfig, no user input */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: `${siteConfig.event.name} ${siteConfig.event.year}`,
              description: siteConfig.event.longDescription,
              startDate: siteConfig.event.startDate,
              endDate: siteConfig.event.endDate,
              eventStatus: "https://schema.org/EventScheduled",
              eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
              location: {
                "@type": "Place",
                name: siteConfig.event.locationBG,
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Русе",
                  addressCountry: "BG",
                },
              },
              organizer: {
                "@type": "Organization",
                name: siteConfig.event.organizer,
                url: siteConfig.contact.organizerUrl,
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "BGN",
                availability: "https://schema.org/LimitedAvailability",
                url: `${siteConfig.url}/register`,
              },
              image: `${siteConfig.url}/api/og`,
              inLanguage: "bg",
            }),
          }}
        />
      </head>
      <body
        className={cn(
          oswald.variable,
          jetbrainsMono.variable,
          playfairDisplay.variable,
          manrope.variable
        )}
      >
        <ClientExtras />
        <ConsoleGreeting enabled={true} />
        {children}
        <ScrollToTop />
        <SpeedInsights />

        <AnalyticsScript />
      </body>
    </html>
  );
}
