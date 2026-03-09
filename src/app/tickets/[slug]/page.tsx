import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

import { type TicketData } from "@/lib";
import { TicketPage } from "@/components/ticket-page";

export const revalidate = 10;

type Props = {
  params: Promise<{ slug: string }>;
};

async function fetchTicket(slug: string): Promise<(TicketData & { ticketId: string }) | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_PRIVATE_KEY;
  if (!url || !key || !slug) return null;

  try {
    const supabase = createClient(url, key);
    const { data, error } = await supabase
      .from("registrations")
      .select("full_name, github_handle, avatar_url, ticket_number, ticket_id")
      .eq("ticket_id", slug)
      .single();

    if (error || !data) return null;

    const handle = (data.github_handle || "").replace(/^@/, "");
    return {
      name: data.full_name,
      handle: handle ? `@${handle}` : "",
      avatarUrl: handle ? `https://github.com/${handle}.png` : data.avatar_url || "",
      ticketNum: data.ticket_number,
      ticketId: data.ticket_id,
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchTicket(slug);

  if (!data) {
    return {
      title: "RUSE AI HACK '26 Ticket",
      description:
        "48-часов AI хакатон в Русе, България. Реални продукти, реални награди. 26 април 2026.",
    };
  }

  const ticketTitle = `${data.name} — RUSE AI HACK '26 Ticket`;
  const ticketDescription = `${data.name} участва в RUSE AI HACK '26 — 48-часов AI хакатон в Русе, България. Вземи и ти своя билет!`;
  const ogImage = `/api/og?id=${slug}`;

  return {
    title: ticketTitle,
    description: ticketDescription,
    openGraph: {
      type: "website",
      title: ticketTitle,
      description: ticketDescription,
      url: `/tickets/${slug}`,
      siteName: "RUSE AI HACK '26",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `Билет на ${data.name} за RUSE AI HACK '26`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ticketTitle,
      description: ticketDescription,
      images: [ogImage],
    },
  };
}

export default async function TicketSlugPage({ params }: Props) {
  const { slug } = await params;
  const data = await fetchTicket(slug);

  if (!data) {
    redirect("/register");
  }

  return <TicketPage data={data} />;
}
