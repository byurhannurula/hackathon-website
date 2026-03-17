import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 0;

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_PRIVATE_KEY;

  if (!url || !key) {
    return NextResponse.json({ count: 0 }, { status: 200 });
  }

  try {
    const supabase = createClient(url, key);
    const { data, error } = await supabase.rpc("get_registration_count");

    if (error) {
      console.error("Count RPC error:", error);
      return NextResponse.json({ count: 0 }, { status: 200 });
    }

    return NextResponse.json(
      { count: data ?? 0 },
      {
        status: 200,
        headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" },
      }
    );
  } catch (err) {
    console.error("Count fetch error:", err);
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
}
