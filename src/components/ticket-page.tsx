"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { type TicketData } from "@/lib";
import { siteConfig } from "@/constants";
import { useTicketDownload } from "@/hooks";
import { TicketVisual } from "@/components/ticket";
import { useAnalytics } from "@/components/analytics";
import { ShareButtons } from "@/components/share-buttons";
import { ConfettiBurst } from "@/components/ui/confetti-burst";

interface TicketPageProps {
  data: TicketData | null;
}

export function TicketPage({ data }: TicketPageProps) {
  const { trackEvent } = useAnalytics();
  const [isOwner, setIsOwner] = useState<boolean | null>(null);
  const { nodeRef, downloading, download } = useTicketDownload(data?.ticketNum);

  const name = data?.name || "Участник";
  const firstName = name.split(" ")[0];

  useEffect(() => {
    window.scrollTo(0, 0);
    const myTicket = sessionStorage.getItem("myTicketNum");
    const owner = !!(myTicket && data?.ticketNum && String(data.ticketNum) === myTicket);
    setIsOwner(owner);
    trackEvent("ticket_page_view", {
      type: owner ? "owner" : "shared",
      ticketNum: data?.ticketNum || 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.ticketNum]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    >
      {/* Confetti — only on first visit right after registration */}
      {isOwner && sessionStorage.getItem("confetti_fired") !== "1" && (
        <ConfettiBurst enabled onFired={() => sessionStorage.setItem("confetti_fired", "1")} />
      )}

      {/* Background glow behind ticket */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vw] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(200,255,0,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Header text above ticket */}
      {isOwner !== null && (
        <div className="relative z-1 text-center mb-10 animate-reveal-up">
          <div className="font-mono text-[11px] tracking-[0.2em] text-acid/70 uppercase mb-4">
            &#10022; {isOwner ? "БИЛЕТЪТ Е ПОТВЪРДЕН" : "БИЛЕТ"} &#10022;
          </div>
          <h1 className="font-display text-[clamp(28px,7vw,52px)] leading-[0.9] text-white">
            {isOwner ? (
              <>
                ВЪТРЕ СИ, <span className="text-acid">{firstName.toUpperCase()}</span>
              </>
            ) : (
              <>
                БИЛЕТ НА <span className="text-acid">{name}</span>
              </>
            )}
          </h1>
          {!isOwner && (
            <p className="font-mono text-sm text-white/60 mt-4 leading-relaxed">
              Присъедини се към {name} на {siteConfig.event.dateBG}
            </p>
          )}
        </div>
      )}

      <div className="relative z-1">
        <TicketVisual
          data={data}
          interactive={true}
          onNodeRef={(node) => {
            nodeRef.current = node;
          }}
        />
      </div>

      {/* Share Actions / Viewer CTA */}
      <div
        className="mt-14 flex flex-col items-center gap-6 relative z-1"
        style={{ animation: "revealUp 0.6s 0.2s both ease-out" }}
      >
        {isOwner && data?.ticketId ? (
          <ShareButtons ticketId={data.ticketId} downloading={downloading} onDownload={download} />
        ) : (
          <Link
            href="/register"
            className="font-display text-lg tracking-[0.08em] bg-acid text-black border-none py-4 px-11 no-underline cursor-pointer transition-all duration-200 hover:bg-white hover:-translate-y-0.5"
          >
            ВЗЕМИ БИЛЕТ &rarr;
          </Link>
        )}
      </div>

      {/* Back link at bottom */}
      <Link
        href="/"
        className="relative z-1 mt-12 font-mono text-[11px] tracking-[0.14em] text-white/30 no-underline transition-colors duration-200 hover:text-white/60"
      >
        ← Към Началото
      </Link>
    </div>
  );
}
