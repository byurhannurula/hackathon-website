import { createClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase client with the service-role key.
 * Bypasses RLS — use only in server-side API routes.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_PRIVATE_KEY;

  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_PRIVATE_KEY");
  }

  return createClient(url, key);
}
