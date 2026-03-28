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
  VideoSection,
} from "@/components/sections";

export default function Page() {
  return (
    <div className="bg-bg">
      <Nav />
      <HeroSection />
      <OrganizerSection />
      <AboutSection />
      <VideoSection />
      <SponsorsSection />
      <AgendaSection />
      <Ticker dir={-1} />
      <JurySection />
      <PrizesSection />
      <FaqSection />
      <CTASection />
      <Footer />
    </div>
  );
}
