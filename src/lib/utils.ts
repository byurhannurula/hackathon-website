import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── UTILS ─────────────────────────────────────────────────────────────

export interface TicketData {
  name: string;
  handle: string;
  avatarUrl: string;
  ticketNum: number;
}

export function getGithubAvatarUrl(handle: string): string {
  if (!handle) return "";
  return `https://github.com/${handle.replace(/^@/, "")}.png`;
}

export function encryptTicket(d: TicketData): string {
  try {
    const payload = `vr2026:${d.handle.replace("@", "")}:${d.ticketNum}`;
    const bytes = new TextEncoder().encode(payload);
    let bin = "";
    bytes.forEach((b) => (bin += String.fromCharCode(b)));
    return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  } catch {
    return String(d.ticketNum);
  }
}

export function decryptTicket(token: string): TicketData | null {
  if (!token) return null;
  try {
    const bin = atob(token.replace(/-/g, "+").replace(/_/g, "/"));
    const parts = bin.split(":");
    if (parts[0] === "vr2026") {
      return {
        handle: "@" + parts[1],
        ticketNum: parseInt(parts[2]),
        name: parts[1].charAt(0).toUpperCase() + parts[1].slice(1),
        avatarUrl: `https://github.com/${parts[1]}.png`,
      };
    }
    return null;
  } catch {
    return null;
  }
}
