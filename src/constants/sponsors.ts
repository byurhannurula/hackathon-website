import type { Sponsor } from "@/lib/types";

// Sponsors with logos for the sponsors section
export const SPONSORS: Sponsor[] = [
  { name: "Спонсор 1", logo: "/assets/sponsors/recheck-logo.svg" },
  { name: "Спонсор 2", logo: "/assets/sponsors/recheck-logo.svg" },
  { name: "Спонсор 3", logo: "/assets/sponsors/recheck-logo.svg" },
  { name: "Спонсор 4", logo: "/assets/sponsors/recheck-logo.svg" },
  { name: "Спонсор 5", logo: "/assets/sponsors/recheck-logo.svg" },
  { name: "Спонсор 6", logo: "/assets/sponsors/recheck-logo.svg" },
  { name: "Спонсор 7", logo: "/assets/sponsors/recheck-logo.svg" },
  { name: "Спонсор 8", logo: "/assets/sponsors/recheck-logo.svg" },
  { name: "Спонсор 9", logo: "/assets/sponsors/recheck-logo.svg" },
  { name: "Спонсор 10", logo: "/assets/sponsors/recheck-logo.svg" },
  { name: "Спонсор 11", logo: "/assets/sponsors/recheck-logo.svg" },
  { name: "Спонсор 12", logo: "/assets/sponsors/recheck-logo.svg" },
];

// Just names for ticker scroll
export const SPONSOR_NAMES = SPONSORS.map((s) => s.name);
