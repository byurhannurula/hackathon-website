import type { UserAnalytics } from "./types";

const UMAMI_BASE_URL = "https://api.umami.is/v1";
const WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_TRACKING_ID!;
const API_KEY = process.env.UMAMI_API_KEY!;

// Start date for event queries (site launch)
const START_AT = new Date("2025-01-01").getTime();

async function umamiGet<T>(path: string, params: Record<string, string>): Promise<T> {
  const url = new URL(`${UMAMI_BASE_URL}${path}`);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });

  if (!res.ok) {
    throw new Error(`Umami API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

async function getEventPropertyCounts(
  eventName: string,
  propertyName: string
): Promise<Array<{ value: string; total: number }>> {
  return umamiGet(`/websites/${WEBSITE_ID}/event-data/values`, {
    startAt: String(START_AT),
    endAt: String(Date.now()),
    event: eventName,
    propertyName,
  });
}

export async function getUserAnalytics(ticketId: string): Promise<UserAnalytics> {
  const [pageViews, shares, downloads, consoleSecrets, konamiCodes] = await Promise.all([
    getEventPropertyCounts("ticket_page_view", "props.ticketId"),
    getEventPropertyCounts("ticket_share", "props.ticketId"),
    getEventPropertyCounts("ticket_download", "props.ticketId"),
    getEventPropertyCounts("console_secret_found", "props.ticketId"),
    getEventPropertyCounts("konami_code_activated", "props.ticketId"),
  ]);

  return {
    pageViews: pageViews.find((r) => r.value === ticketId)?.total ?? 0,
    shares: shares.find((r) => r.value === ticketId)?.total ?? 0,
    downloads: downloads.find((r) => r.value === ticketId)?.total ?? 0,
    consoleSecret: (consoleSecrets.find((r) => r.value === ticketId)?.total ?? 0) > 0,
    konamiCode: (konamiCodes.find((r) => r.value === ticketId)?.total ?? 0) > 0,
  };
}
