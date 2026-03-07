import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_PRIVATE_KEY;

  if (!url || !key) {
    return NextResponse.json({ count: null });
  }

  try {
    const supabase = createClient(url, key);

    const { count, error } = await supabase
      .from("registrations")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Count query error:", error.message);
      return NextResponse.json({ count: null });
    }

    return NextResponse.json(
      { count },
      { headers: { "Cache-Control": "s-maxage=30, stale-while-revalidate=60" } }
    );
  } catch (e) {
    console.error("Registration count error:", e);
    return NextResponse.json({ count: null });
  }
}
