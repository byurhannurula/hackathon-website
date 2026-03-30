/**
 * Central site configuration.
 * All event-specific values live here so they can be changed in one place.
 */

export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  event: {
    name: "RUSE AI HACK",
    tagline: "App in a Snap",
    year: "'26",
    date: "24–26 APRIL 2026",
    dateBG: "24–26 април 2026",
    duration: "48Ч",
    durationBG: "48 часа",
    location: "Ruse, Bulgaria",
    locationBG: "Русенски Университет",
    organizer: "Startup Factory",
    organizerSubtitle: "Ruse Innovation Hub · Building founders since 2018",
    prizesPool: "€2,900",
    participantsCount: "100+",
    free: "Безплатен вход",

    // Derived fields
    get fullDate() {
      return `${this.date} · ${this.location.split(",")[0].toUpperCase()}, BG`;
    },
    get fullDateBG() {
      return `${this.dateBG} · ${this.locationBG}`;
    },
    get durationLabel() {
      return `${this.duration} HACKATHON`;
    },
    get heroSubline() {
      return `${this.dateBG.toUpperCase()}  ·  ${this.duration} ХАКАТОН  ·  ${this.locationBG.toUpperCase()}`;
    },
    get ctaSubline() {
      return `${this.dateBG} · ${this.locationBG} · ${this.durationBG} · ${this.free}`;
    },

    // Descriptions
    shortDescription:
      "Включете се в състезание за разработка на приложения с AI и развийте умения за vibe coding",
    longDescription:
      "Ruse AI Hack — App in a Snap е 48-часов AI хакатон, посветен на създаването на реални, работещи приложения с помощта на изкуствен интелект.",
  },

  social: {
    instagram: "https://www.instagram.com/startup._.factory/",
    facebook: "https://www.facebook.com/factorystartup",
    linkedin: "https://www.linkedin.com/company/startup-factory-ngo-/",
  },

  contact: {
    sponsorEmail: "info@startupfactory.bg",
    organizerUrl: "https://startupfactory.bg",
  },
} as const;

export type SiteConfig = typeof siteConfig;
