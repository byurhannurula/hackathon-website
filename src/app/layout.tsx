import type { Metadata } from "next";
import { Bebas_Neue, Space_Mono, Instrument_Serif, Syne } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono-google",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-serif",
});

const syne = Syne({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: "Vibe Ruse Hackathon '26",
  description: "A 48-hour hackathon for builders in Ruse, Bulgaria.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${bebas.variable} ${spaceMono.variable} ${instrumentSerif.variable} ${syne.variable}`}>
        {children}
      </body>
    </html>
  );
}
