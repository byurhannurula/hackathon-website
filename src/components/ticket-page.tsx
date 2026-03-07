"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { toPng } from "html-to-image";
import Link from "next/link";

import { TicketVisual } from "@/components/ticket";
import { useAnalytics } from "@/components/analytics";
import { XIcon, LIIcon, FBIcon, DLIcon, FormButton } from "@/components/ui";
import { type TicketData, encryptTicket, cn, siteConfig, fetchAvatarAsBase64 } from "@/lib";

interface TicketPageProps {
  data: TicketData | null;
}

export function TicketPage({ data }: TicketPageProps) {
  const { trackEvent } = useAnalytics();
  const [copied, setCopied] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const ticketNodeRef = useRef<HTMLDivElement | null>(null);

  const name = data?.name || "Attendee";
  const firstName = name.split(" ")[0].toUpperCase();

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

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/tickets?t=${encryptTicket(data!)}`
      : "";

  const shareDescription = `${siteConfig.event.name} ${siteConfig.event.year} \u2014 ${siteConfig.event.duration} AI Hackathon in ${siteConfig.event.location}`;

  const doCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shr = (url: string) => window.open(url, "_blank", "width=600,height=400");

  const handleDownload = useCallback(async () => {
    if (!ticketNodeRef.current || downloading) return;
    setDownloading(true);
    try {
      const el = ticketNodeRef.current;
      const prev = el.style.cssText;
      el.style.transform = "none";
      el.style.filter = "drop-shadow(0 20px 44px rgba(0,0,0,0.8))";

      // Pre-fetch avatar as base64 to avoid CORS issues with html-to-image
      const imgs = el.querySelectorAll("img");
      const originalSrcs: string[] = [];
      for (const img of imgs) {
        originalSrcs.push(img.src);
        if (img.src && !img.src.startsWith("data:")) {
          const b64 = await fetchAvatarAsBase64(img.src);
          if (b64) img.src = b64;
        }
      }

      let dataUrl = "";
      for (let i = 0; i < 3; i++) {
        dataUrl = await toPng(el, {
          backgroundColor: "#050505",
          pixelRatio: 2,
          cacheBust: true,
          includeQueryParams: true,
        });
      }

      // Restore original srcs
      imgs.forEach((img, i) => {
        img.src = originalSrcs[i];
      });
      el.style.cssText = prev;

      const link = document.createElement("a");
      link.download = `${siteConfig.event.name.toLowerCase().replace(/\s+/g, "-")}-ticket-${data?.ticketNum || "000000"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to download ticket:", err);
    } finally {
      setDownloading(false);
    }
  }, [data?.ticketNum, downloading]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    >
      {/* Background glow behind ticket */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vw] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(200,255,0,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Header text above ticket */}
      <div className="relative z-1 text-center mb-10 animate-reveal-up">
        <div className="font-mono text-[11px] tracking-[0.2em] text-acid/70 uppercase mb-4">
          &#10022; {isOwner ? "БИЛЕТЪТ Е ПОТВЪРДЕН" : "БИЛЕТ"} &#10022;
        </div>
        <h1 className="font-display text-[clamp(40px,7vw,52px)] leading-[0.9] text-white">
          {isOwner ? (
            <>
              ВЪТРЕ СИ, <span className="text-acid">{firstName}</span>
            </>
          ) : (
            <>
              <span className="text-acid">{firstName}</span> — БИЛЕТ
            </>
          )}
        </h1>
        <div className="font-mono text-[10px] tracking-[0.18em] text-white/30 uppercase mt-5">
          {isOwner ? "ЗАДРЪЖ КУРСОРА НАД БИЛЕТА ЗА ИНТЕРАКЦИЯ" : "ВЗЕМИ СВОЯ БИЛЕТ ЗА ХАКАТОНА"}
        </div>
      </div>

      <div className="relative z-1">
        <TicketVisual
          data={data}
          interactive={true}
          onNodeRef={(node) => {
            ticketNodeRef.current = node;
          }}
        />
      </div>

      {/* Share Actions / Viewer CTA */}
      <div
        className="mt-14 flex flex-col items-center gap-6 relative z-1"
        style={{ animation: "revealUp 0.6s 0.2s both ease-out" }}
      >
        {isOwner ? (
          <>
            <div className="font-mono text-[11px] tracking-[0.18em] text-white/40 uppercase">
              СПОДЕЛИ БИЛЕТА СИ
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              <FormButton
                variant="outline"
                size="sm"
                onClick={() =>
                  shr(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      `Участвам в Ruse AI Hack '26! Присъедини се. ✦\n\n${shareDescription}`
                    )}&url=${encodeURIComponent(shareUrl)}`
                  )
                }
              >
                <XIcon />X
              </FormButton>
              <FormButton
                variant="outline"
                size="sm"
                onClick={() =>
                  shr(
                    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
                  )
                }
              >
                <LIIcon />
                LINKEDIN
              </FormButton>
              <FormButton
                variant="outline"
                size="sm"
                onClick={() =>
                  shr(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(`Участвам в Ruse AI Hack '26! Присъедини се. ✦ ${shareDescription}`)}`
                  )
                }
              >
                <FBIcon />
                FACEBOOK
              </FormButton>
              <FormButton
                variant="outline"
                size="sm"
                onClick={handleDownload}
                disabled={downloading}
                className={cn(downloading && "opacity-50 cursor-wait")}
              >
                <DLIcon />
                СВАЛИ
              </FormButton>
              <FormButton
                variant="outline"
                size="sm"
                onClick={doCopy}
                className={cn(copied && "text-acid! border-acid!")}
              >
                {copied ? "КОПИРАНО!" : "КОПИРАЙ ЛИНК"}
              </FormButton>
            </div>
          </>
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
