import { createAdminClient } from "./supabase-admin";

/**
 * Registration open/closed status — persisted in Supabase `site_settings`.
 *
 * Falls back to the REGISTRATION_OPEN env var if the DB read fails
 * or the table doesn't exist yet.
 */

function envDefault(): boolean {
  return process.env.REGISTRATION_OPEN !== "false";
}

export async function isRegistrationOpen(): Promise<boolean> {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "registration_open")
      .single();

    if (data?.value !== undefined) {
      return data.value === "true";
    }
  } catch {
    // DB not available or table missing — fall back to env
  }
  return envDefault();
}

export async function setRegistrationOpen(open: boolean): Promise<void> {
  try {
    const supabase = createAdminClient();
    await supabase.from("site_settings").upsert({
      key: "registration_open",
      value: String(open),
      updated_at: new Date().toISOString(),
    });
  } catch (e) {
    console.error("Failed to persist registration_open:", e);
  }
}
