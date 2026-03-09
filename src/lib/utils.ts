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
  ticketId?: string;
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

/**
 * Build the full share URL for a ticket.
 */
export function buildShareUrl(ticketId: string): string {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}/tickets/${ticketId}`;
}

/**
 * Build social share URLs for a ticket.
 */
export function buildSocialShareUrls(shareUrl: string) {
  return {
    // Twitter/X is the only platform that supports custom text via URL params
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `Участвам в Ruse AI Hack '26! Присъедини се ✦`
    )}&url=${encodeURIComponent(shareUrl)}`,
    // LinkedIn & Facebook read og:title, og:description, og:image from the page — no text params supported
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
  };
}
