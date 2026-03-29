import type { Sponsor, SponsorTier } from "@/lib/types";

// Tier labels — easy to rename later
export const SPONSOR_TIER_LABELS: Record<SponsorTier, string> = {
  organizer: "Организатори",
  gold: "Златни спонсори",
  silver: "Сребърни спонсори",
  bronze: "Бронзови спонсори",
};

// Sponsors with logos for the sponsors section
export const SPONSORS: Sponsor[] = [
  {
    name: "Dianel",
    logo: "",
    href: "https://www.dianel.com/index.php?lang=bg",
    tier: "gold",
  },
  {
    name: "Sirma",
    logo: "/sponsors/sirma-logo-light.svg",
    href: "https://sirma.com/",
    tier: "gold",
  },
  {
    name: "Avenga",
    logo: "/sponsors/avenga/avenga_logo_white_rgb.svg",
    href: "https://www.avenga.com/",
    tier: "silver",
  },
  {
    name: "GraphWise",
    logo: "/sponsors/graphwise/graphwise_white.svg",
    href: "https://graphwise.ai/",
    tier: "silver",
  },
  {
    name: "JetHost",
    logo: "/sponsors/jethost/jh_logo_horizontal_white.svg",
    href: "https://jethost.bg/",
    tier: "silver",
  },
  {
    name: "Reward Gateway",
    logo: "/sponsors/reward_gateway/reward_gateway_white.svg",
    href: "https://www.rewardgateway.com/",
    tier: "silver",
  },
  {
    name: "Ocean Investments",
    logo: "/sponsors/ocean_investments/oi_logo.svg",
    href: "https://www.ocean.investments/",
    tier: "silver",
  },
  {
    name: "Спонсор 4",
    logo: "",
    href: "#",
    tier: "silver",
  },
  {
    name: "Спонсор 5",
    logo: "",
    href: "#",
    tier: "silver",
  },
  {
    name: "Спонсор 6",
    logo: "",
    href: "#",
    tier: "silver",
  },
  // {
  //   name: "Спонсор 8",
  //   logo: "",
  //   href: "#",
  //   tier: "bronze",
  // },
  // {
  //   name: "Спонсор 9",
  //   logo: "",
  //   href: "#",
  //   tier: "bronze",
  // },
  // {
  //   name: "Спонсор 10",
  //   logo: "",
  //   href: "#",
  //   tier: "bronze",
  // },
  // {
  //   name: "Спонсор 11",
  //   logo: "",
  //   href: "#",
  //   tier: "bronze",
  // },
  // {
  //   name: "Спонсор 12",
  //   logo: "",
  //   href: "#",
  //   tier: "bronze",
  // },
  // {
  //   name: "Спонсор 13",
  //   logo: "",
  //   href: "#",
  //   tier: "bronze",
  // },
  // {
  //   name: "Спонсор 14",
  //   logo: "",
  //   href: "#",
  //   tier: "bronze",
  // },
  // {
  //   name: "Спонсор 15",
  //   logo: "",
  //   href: "#",
  //   tier: "bronze",
  // },
  // {
  //   name: "Спонсор 16",
  //   logo: "",
  //   href: "#",
  //   tier: "bronze",
  // },
  // {
  //   name: "Спонсор 17",
  //   logo: "",
  //   href: "#",
  //   tier: "bronze",
  // },
];

// Just names for ticker scroll
export const SPONSOR_NAMES = SPONSORS.map((s) => s.name);
