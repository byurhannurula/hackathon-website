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
    date: "26 APRIL 2026",
    duration: "48H",
    location: "Ruse, Bulgaria",
    organizer: "StartupFactory",
    organizerSubtitle: "Ruse Innovation Hub · Building founders since 2018",
    prizesPool: "€5,750",
    buildersCount: "100+",

    // Derived fields
    get fullDate() {
      return `${this.date} · ${this.location.split(",")[0].toUpperCase()}, BG`;
    },
    get durationLabel() {
      return `${this.duration} HACKATHON`;
    },

    // Descriptions
    shortDescription:
      "Ruse AI Hack — App in a Snap е 48-часов AI хакатон, посветен на създаването на реални, работещи приложения с помощта на изкуствен интелект.",
    longDescription:
      "Ruse AI Hack — App in a Snap е 48-часов AI хакатон, посветен на създаването на реални, работещи приложения с помощта на изкуствен интелект.",
  },

  social: {
    instagram: "https://www.instagram.com/startup._.factory/",
    facebook: "https://www.facebook.com/factorystartup",
  },

  contact: {
    sponsorEmail: "info@startupfactory.bg",
    organizerUrl: "https://startupfactory.bg",
  },
} as const;

export type SiteConfig = typeof siteConfig;
