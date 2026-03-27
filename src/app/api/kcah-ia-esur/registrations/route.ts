import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

const PAGE_SIZE = 50;
const ALLOWED_SORT_COLUMNS = new Set([
  "created_at",
  "full_name",
  "ticket_number",
  "registration_status",
  "email",
]);
const MAX_SEARCH_LENGTH = 100;

export async function GET(req: NextRequest) {
  const rawSearch = req.nextUrl.searchParams.get("search") || "";
  const status = req.nextUrl.searchParams.get("status") || "";
  const rawSort = req.nextUrl.searchParams.get("sort") || "created_at";
  const rawOrder = req.nextUrl.searchParams.get("order") || "desc";
  const page = Math.max(1, parseInt(req.nextUrl.searchParams.get("page") || "1", 10));

  // Sanitize inputs
  const search = rawSearch.slice(0, MAX_SEARCH_LENGTH).replace(/[%_\\]/g, "");
  const sort = ALLOWED_SORT_COLUMNS.has(rawSort) ? rawSort : "created_at";
  const order = rawOrder === "asc" ? "asc" : "desc";

  const supabase = createAdminClient();

  // Build query with pagination
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("registrations")
    .select("*", { count: "exact" })
    .order(sort, { ascending: order === "asc" })
    .range(from, to);

  if (status && status !== "all") {
    query = query.eq("registration_status", status);
  }

  if (search) {
    query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Admin fetch error:", error.code);
    return NextResponse.json({ ok: false, error: "Failed to fetch" }, { status: 500 });
  }

  // Compute stats from full dataset (unfiltered, lightweight query)
  const { data: allData } = await supabase.from("registrations").select("registration_status");

  const stats = {
    total: allData?.length || 0,
    pending: allData?.filter((r) => r.registration_status === "pending").length || 0,
    approved: allData?.filter((r) => r.registration_status === "approved").length || 0,
    rejected: allData?.filter((r) => r.registration_status === "rejected").length || 0,
  };

  return NextResponse.json({
    ok: true,
    data: data || [],
    stats,
    pagination: {
      page,
      pageSize: PAGE_SIZE,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / PAGE_SIZE),
    },
  });
}
