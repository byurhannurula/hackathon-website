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
