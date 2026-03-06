import { TicketPage } from "@/components/TicketPage";
import { decryptTicket } from "@/lib/utils";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const t = (await searchParams).t as string;
  const data = decryptTicket(t);

  if (!data) {
    return {
      title: "VIBERUSE '26 Ticket",
      description: "Claim your spot at the world's first AI-assisted hackathon in Ruse, Bulgaria.",
    };
  }

  return {
    title: `${data.name}'s VIBERUSE '26 Ticket`,
    description: `Claim your spot at the world's first AI-assisted hackathon in Ruse, Bulgaria.`,
    openGraph: {
      images: [
        {
          url: `/api/og?t=${t}`,
          width: 1200,
          height: 630,
          alt: `${data.name}'s Ticket`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.name}'s VIBERUSE '26 Ticket`,
      description: `Claim your spot at the world's first AI-assisted hackathon in Ruse, Bulgaria.`,
      images: [`/api/og?t=${t}`],
    },
  };
}

export default async function Tickets({ searchParams }: Props) {
  const t = (await searchParams).t as string;
  const data = decryptTicket(t);

  if (!data) {
    redirect("/register");
  }

  // We still need a client component for some logic in TicketPage 
  // but we can pass data directly.
  return <TicketPage data={data} />;
}
