import type { Sponsor, SponsorTier } from "@/lib/types";

// Tier labels — easy to rename later
export const SPONSOR_TIER_LABELS: Record<SponsorTier, string> = {
  general: "Генерален партньор",
  strategic: "Стратегически партньори",
  partner: "Партньори на събитието",
  supporter: "Подкрепящи партньори",
  media: "Медийни партньори",
};

// Sponsors with logos for the sponsors section
export const SPONSORS: Sponsor[] = [
  {
    name: "Reward Gateway",
    logo: "/sponsors/reward_gateway/reward_gateway_white.svg",
    href: "https://www.rewardgateway.com/",
    tier: "general",
  },
  {
    name: "Dianel",
    label: "Стратегически партньор",
    logo: "/sponsors/dianel.svg",
    href: "https://www.dianel.com/index.php?lang=bg",
    tier: "strategic",
  },
  {
    name: "Sirma",
    label: "AI партньор",
    logo: "/sponsors/sirma-logo-light.svg",
    href: "https://sirma.com/",
    tier: "strategic",
  },
  {
    name: "Avenga",
    logo: "/sponsors/avenga/avenga_logo_white_rgb.svg",
    href: "https://www.avenga.com/",
    tier: "partner",
  },
  {
    name: "GraphWise",
    logo: "/sponsors/graphwise/graphwise_white.svg",
    href: "https://graphwise.ai/",
    tier: "partner",
  },
  {
    name: "JetHost",
    logo: "/sponsors/jethost/jh_logo_horizontal_white.svg",
    href: "https://jethost.bg/",
    tier: "partner",
  },
  {
    name: "ReCheck",
    logo: "/sponsors/recheck-logo.svg",
    href: "https://recheck.io/",
    tier: "partner",
  },
  {
    name: "AI-EDIH",
    logo: "/sponsors/ai-edih.png",
    href: "https://ric-gabrovo.com/adi4smes/",
    tier: "supporter",
    invertLogo: true,
  },
  {
    name: "Ocean Investments",
    logo: "/sponsors/ocean_investments/oi_logo.svg",
    href: "https://www.ocean.investments/",
    tier: "supporter",
  },
  {
    name: "CheckPoint",
    logo: "/sponsors/cp-logo-text.svg",
    href: "https://checkpoint.pub/",
    tier: "supporter",
  },

  {
    name: "Utro",
    logo: "/sponsors/utro.png",
    href: "https://utroruse.com/",
    tier: "media",
    invertLogo: true,
  },
  {
    name: "Ruse On The Danube",
    logo: "/sponsors/ruse_on_the_danube_white.png",
    href: "https://www.instagram.com/ruse.on.the.danube/",
    tier: "media",
    logoScale: 1.35,
  },
];

// Just names for ticker scroll
export const SPONSOR_NAMES = SPONSORS.map((s) => s.name);
