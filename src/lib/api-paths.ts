const BASE = "/api/kcah-ia-esur";

export const ADMIN_API = {
  auth: `${BASE}/auth`,
  registrations: (params?: string) =>
    params ? `${BASE}/registrations?${params}` : `${BASE}/registrations`,
  registration: (id: string) => `${BASE}/registrations/${id}`,
  registrationToggle: `${BASE}/registration-toggle`,
  sendEmail: `${BASE}/send-email`,
  broadcastEmail: `${BASE}/broadcast-email`,
  stats: `${BASE}/stats`,
  teams: `${BASE}/teams`,
  analytics: (ticketId: string) => `${BASE}/analytics/${ticketId}`,
  exportCsv: `${BASE}/export-csv`,
} as const;
