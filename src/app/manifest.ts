import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RUSE AI HACK '26 — 48-часов AI Хакатон",
    short_name: "RUSE AI HACK",
    description:
      "48-часов AI хакатон в Русе, България. Създай работещо AI приложение, спечели награди и се свържи с най-добрите разработчици.",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#feee04",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
