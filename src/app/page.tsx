"use client";

import { useRouter } from "next/navigation";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Ticker } from "@/components/ticker";
import {
  HeroSection,
  OrganizerSection,
  AgendaSection,
  PrizesSection,
  SponsorsSection,
  FaqSection,
  JurySection,
  CTASection,
  AboutSection,
} from "@/components/sections";

export default function Page() {
  const router = useRouter();

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <div className="bg-bg">
      <Nav onRegister={handleRegister} />
      <HeroSection onRegister={handleRegister} />
      <OrganizerSection />
      <AboutSection />
      <SponsorsSection />
      <AgendaSection />
      <Ticker dir={-1} />
      <JurySection />
      <PrizesSection />
      <FaqSection />
      <CTASection onRegister={handleRegister} />
      <Footer />
    </div>
  );
}
