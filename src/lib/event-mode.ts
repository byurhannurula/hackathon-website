/**
 * Site mode — swaps the root landing page and toggles showcase visibility.
 * Controlled by NEXT_PUBLIC_EVENT_MODE (inlined at build time).
 *
 * - "event"    (default): root renders the event landing. /showcase and /showcase/gallery 404.
 * - "showcase":           root renders the showcase. /showcase and /showcase/gallery also accessible.
 *
 * Flip by setting NEXT_PUBLIC_EVENT_MODE=showcase on the deployment and rebuilding.
 */

export type EventMode = "event" | "showcase";

export const EVENT_MODE: EventMode =
  process.env.NEXT_PUBLIC_EVENT_MODE === "showcase" ? "showcase" : "event";

export const IS_SHOWCASE_MODE = EVENT_MODE === "showcase";
