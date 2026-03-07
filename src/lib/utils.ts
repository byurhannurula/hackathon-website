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

/**
 * Fetch an image URL and return it as a base64 data URL.
 * Used to avoid CORS issues when html-to-image captures the ticket.
 */
export async function fetchAvatarAsBase64(url: string): Promise<string> {
  if (!url) return "";
  try {
    // Proxy through our API route to avoid CORS/redirect issues
    // (GitHub avatar URLs 302-redirect to avatars.githubusercontent.com)
    const proxyUrl = `/api/avatar?url=${encodeURIComponent(url)}`;
    const res = await fetch(proxyUrl);
    if (!res.ok) return "";
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve("");
      reader.readAsDataURL(blob);
    });
  } catch {
    return "";
  }
}

export function encryptTicket(d: TicketData): string {
  try {
    const handle = d.handle.replace("@", "");
    const payload = `vr2026:${handle}:${d.ticketNum}:${d.name}`;
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
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const decoded = new TextDecoder().decode(bytes);
    const parts = decoded.split(":");
    if (parts[0] === "vr2026") {
      const handle = parts[1];
      const ticketNum = parseInt(parts[2]);
      // Name is everything after the third colon (supports names with colons)
      const name = parts.slice(3).join(":") || handle.charAt(0).toUpperCase() + handle.slice(1);
      return {
        handle: "@" + handle,
        ticketNum,
        name,
        avatarUrl: `https://github.com/${handle}.png`,
      };
    }
    return null;
  } catch {
    return null;
  }
}
