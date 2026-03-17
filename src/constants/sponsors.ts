import type { Sponsor, SponsorTier } from "@/lib/types";

// Tier labels — easy to rename later
export const SPONSOR_TIER_LABELS: Record<SponsorTier, string> = {
  gold: "Златни спонсори",
  silver: "Сребърни спонсори",
  bronze: "Бронзови спонсори",
};

// Sponsors with logos for the sponsors section
export const SPONSORS: Sponsor[] = [
  {
    name: "Спонсор 1",
    logo: "",
    href: "#",
    tier: "gold",
  },
  {
    name: "Спонсор 2",
    logo: "",
    href: "#",
    tier: "gold",
  },
  {
    name: "Спонсор 3",
    logo: "",
    href: "#",
    tier: "gold",
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
  {
    name: "Спонсор 7",
    logo: "",
    href: "#",
    tier: "silver",
  },
  {
    name: "Спонсор 8",
    logo: "",
    href: "#",
    tier: "bronze",
  },
  {
    name: "Спонсор 9",
    logo: "",
    href: "#",
    tier: "bronze",
  },
  {
    name: "Спонсор 10",
    logo: "",
    href: "#",
    tier: "bronze",
  },
  {
    name: "Спонсор 11",
    logo: "",
    href: "#",
    tier: "bronze",
  },
  {
    name: "Спонсор 12",
    logo: "",
    href: "#",
    tier: "bronze",
  },
  {
    name: "Спонсор 13",
    logo: "",
    href: "#",
    tier: "bronze",
  },
  {
    name: "Спонсор 14",
    logo: "",
    href: "#",
    tier: "bronze",
  },
  {
    name: "Спонсор 15",
    logo: "",
    href: "#",
    tier: "bronze",
  },
  {
    name: "Спонсор 16",
    logo: "",
    href: "#",
    tier: "bronze",
  },
  {
    name: "Спонсор 17",
    logo: "",
    href: "#",
    tier: "bronze",
  },
];

// Just names for ticker scroll
export const SPONSOR_NAMES = SPONSORS.map((s) => s.name);
