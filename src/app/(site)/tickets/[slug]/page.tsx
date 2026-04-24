import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

import { type TicketData } from "@/lib";
import { siteConfig } from "@/constants";
import { TicketPage } from "@/components/views";

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

  const ev = siteConfig.event;
  const base = siteConfig.url;

  if (!data) {
    return {
      title: `${ev.name} ${ev.year} Билет`,
      description: `${ev.duration} AI хакатон в ${ev.locationBG}. Реални продукти, реални награди. ${ev.dateBG}.`,
    };
  }

  const ticketTitle = `${data.name} — ${ev.name} ${ev.year} Билет`;
  const ticketDescription = `${data.name} участва в ${ev.name} ${ev.year} — ${ev.duration} AI хакатон в ${ev.locationBG}. Вземи и ти своя билет!`;
  const ogImage = `${base}/api/og?id=${slug}`;

  return {
    title: ticketTitle,
    description: ticketDescription,
    openGraph: {
      type: "website",
      title: ticketTitle,
      description: ticketDescription,
      url: `${base}/tickets/${slug}`,
      siteName: `${ev.name} ${ev.year}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `Билет на ${data.name} за ${ev.name} ${ev.year}`,
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
