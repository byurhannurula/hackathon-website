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
  MediaPartnersSection,
} from "@/components/sections";

export default function Page() {
  const videoId = process.env.NEXT_PUBLIC_VIDEO_ID;

  return (
    <div className="bg-bg">
      <Nav />
      <HeroSection />
      <OrganizerSection />
      <AboutSection />
      {videoId && <VideoSection videoId={videoId} />}
      <SponsorsSection />
      <AgendaSection />
      <Ticker dir={-1} />
      <JurySection />
      <PrizesSection />
      <MediaPartnersSection />
      <FaqSection />
      <CTASection />
      <Footer />
    </div>
  );
}
