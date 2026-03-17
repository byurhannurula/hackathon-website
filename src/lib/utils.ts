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
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");
  return `${baseUrl}/tickets/${ticketId}`;
}

/**
 * Build social share URLs for a ticket.
 */
export function buildSocialShareUrls(shareUrl: string) {
  const tweetText = `🚀 Участвам в RUSE AI HACK '26 — 48-часов AI хакатон в Русе! Вземи и ти билет 👇`;
  return {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
  };
}
