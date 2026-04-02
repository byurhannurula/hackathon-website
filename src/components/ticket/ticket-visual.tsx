"use client";

import { useRef, useEffect } from "react";
import Tilt from "vanilla-tilt";

import { AvatarCircle, GHIcon } from "@/components/ui";
import { type TicketData, cn } from "@/lib";
import { siteConfig } from "@/constants";
import { TicketSVG } from "./ticket-svg";
import { TicketSVGMobile } from "./ticket-svg-mobile";

interface TicketVisualProps {
  data: TicketData | null;
  interactive?: boolean;
  onNodeRef?: (node: HTMLDivElement | null) => void;
  exporting?: boolean;
}

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("rounded bg-white/6 animate-[skeleton_1.8s_ease-in-out_infinite]", className)}
    />
  );
}

export function TicketVisual({
  data,
  interactive = false,
  onNodeRef,
  exporting = false,
}: TicketVisualProps) {
  const ticketRef = useRef<HTMLDivElement>(null);

  const loading = !data;
  const name = data?.name || "Участник";
  const handle = data?.handle || "";
  const avatarUrl = data?.avatarUrl || "";
  const ticketNum = data?.ticketNum || null;

  const cleanHandle = handle.replace(/^@/, "");
  const hasGithub = cleanHandle.length > 0;
  const numStr = ticketNum ? String(ticketNum).padStart(6, "0") : "000000";

  const nameFontSize =
    name.length > 20
      ? "text-[clamp(11px,1.8vw,15px)]"
      : name.length > 14
        ? "text-[clamp(13px,2.2vw,18px)]"
        : "text-[clamp(15px,2.6vw,21px)]";

  useEffect(() => {
    if (interactive && ticketRef.current && !window.matchMedia("(pointer: coarse)").matches) {
      Tilt.init(ticketRef.current, {
        glare: true,
        max: 5,
        "max-glare": 0.16,
        "full-page-listening": true,
      });
    }

    return () => {
      const element = ticketRef.current as HTMLDivElement & {
        vanillaTilt?: { destroy: () => void };
      };
      if (element?.vanillaTilt) {
        element.vanillaTilt.destroy();
      }
    };
  }, [interactive]);

  /* ════════════════════════════════════════════════════
     DESKTOP TICKET (horizontal, ≥768px or exporting)
     ════════════════════════════════════════════════════ */
  const desktopTicket = (
    <div
      ref={(node) => {
        ticketRef.current = node;
        onNodeRef?.(node);
      }}
      className={cn(
        "relative w-[650px] max-w-[96vw] shrink-0 overflow-hidden rounded-[22px] ",
        exporting ? "block" : "hidden md:block"
      )}
      style={{
        aspectRatio: "720 / 320",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Circular overlays to hide glare at left/right cutouts */}
      <div
        className="absolute w-[72px] h-[58px] bg-[#0A0E06] rounded-full z-100 pointer-events-none"
        style={{
          top: "50%",
          left: "-7%",
          transform: "translateZ(0) translateY(-50%)",
        }}
      />
      <div
        className="absolute w-[72px] h-[58px] bg-[#0A0E06] rounded-full z-100 pointer-events-none"
        style={{
          top: "50%",
          left: "96%",
          transform: "translateZ(0) translateY(-50%)",
        }}
      />

      <TicketSVG />

      {/* MAIN BODY */}
      <div className="absolute select-none top-6 bottom-6 left-6 right-[25%] md:top-12 md:bottom-12 md:left-14 flex flex-col justify-between">
        {!loading ? (
          <>
            {/* TOP: avatar + name + handle */}
            <div className="flex items-center gap-2.5 md:gap-4.5">
              <div className="shrink-0 *:w-10! *:h-10! md:*:w-16! md:*:h-16!">
                <AvatarCircle name={name} avatarUrl={avatarUrl} size={64} />
              </div>
              <div className="overflow-hidden min-w-0">
                <div
                  className={cn(
                    "font-body font-extrabold leading-[1.1] text-white whitespace-nowrap overflow-hidden text-ellipsis -tracking-[0.02em]",
                    nameFontSize
                  )}
                >
                  {name}
                </div>
                {hasGithub && (
                  <div className="flex items-center gap-1.5 font-mono text-[clamp(8px,1.5vw,12px)] text-muted mt-1 md:mt-1.5 tracking-[0.01em]">
                    <GHIcon />
                    {cleanHandle}
                  </div>
                )}
              </div>
            </div>

            {/* BOTTOM: brand | event info */}
            <div className="flex items-center gap-3 md:gap-5">
              <div className="shrink-0">
                <div className="font-display text-[clamp(16px,3.8vw,34px)] leading-[0.95] tracking-[0.02em]">
                  <span className="text-acid">{siteConfig.event.name.slice(0, 4)}</span>
                  <span className="text-white"> {siteConfig.event.name.slice(4)}</span>
                </div>
                <div className="font-mono text-[clamp(6px,1vw,9px)] text-white/40 mt-0.5 md:mt-1 tracking-[0.12em]">
                  HACKATHON {siteConfig.event.year}
                </div>
              </div>
              <div className="w-px h-[28px] md:h-[40px] bg-white/12 shrink-0" />
              <div className="min-w-0">
                <div className="font-body font-bold text-[clamp(10px,1.9vw,15px)] text-white leading-[1.2]">
                  {siteConfig.event.date}
                </div>
                <div className="font-mono text-[clamp(7px,1.3vw,11px)] text-white/45 mt-0.5">
                  {siteConfig.event.location.toUpperCase()}
                </div>
                <div className="font-mono text-[clamp(6px,1vw,9px)] text-white/30 mt-1 md:mt-1.5 tracking-[0.06em]">
                  by <span className="text-acid/70">{siteConfig.event.organizer}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-4">
              <Skeleton className="w-16 h-16 rounded-full shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="space-y-2">
                <Skeleton className="h-8 w-28" />
                <Skeleton className="h-2.5 w-20" />
              </div>
              <div className="w-px h-10 bg-white/5" />
              <div className="space-y-1.5">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-2.5 w-20" />
                <Skeleton className="h-2 w-16" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* RIGHT STUB */}
      <div className="absolute top-[7%] bottom-[7%] left-[77%] right-0 flex items-center justify-center overflow-hidden">
        {!loading ? (
          <div className="-rotate-90 flex items-baseline gap-2 whitespace-nowrap select-none">
            <span className="font-mono font-bold text-[clamp(18px,2.8vw,24px)] text-acid/80 tracking-[0.04em]">
              #
            </span>
            <span className="font-mono font-bold text-[clamp(20px,3.2vw,28px)] text-white tracking-[0.12em]">
              {numStr}
            </span>
          </div>
        ) : (
          <div className="-rotate-90">
            <Skeleton className="h-6 w-28" />
          </div>
        )}
      </div>
    </div>
  );

  /* ════════════════════════════════════════════════════
     MOBILE TICKET (vertical, <768px)
     No overlay circles needed — Tilt is disabled on touch.
     Content ends above notch zone (bottom-[34%]) to avoid
     text clipping behind the notch indent.
     ════════════════════════════════════════════════════ */
  const mobileTicket = (
    <div
      className={cn(
        "relative w-[330px] max-w-[90vw] shrink-0 overflow-hidden rounded-[22px]",
        exporting ? "hidden" : "block md:hidden"
      )}
      style={{ aspectRatio: "330 / 480" }}
    >
      <TicketSVGMobile />

      {/* MAIN CONTENT — above the notch zone */}
      <div className="absolute select-none top-[7%] left-[10%] right-[10%] bottom-[22%] flex flex-col">
        {!loading ? (
          <>
            {/* Avatar + name + handle */}
            <div className="flex items-center gap-3">
              <div className="shrink-0 *:w-13! *:h-13!">
                <AvatarCircle name={name} avatarUrl={avatarUrl} size={52} />
              </div>
              <div className="overflow-hidden min-w-0">
                <div
                  className={cn(
                    "font-body font-extrabold leading-[1.1] text-white whitespace-nowrap overflow-hidden text-ellipsis -tracking-[0.02em]",
                    name.length > 20
                      ? "text-[14px]"
                      : name.length > 14
                        ? "text-[16px]"
                        : "text-[18px]"
                  )}
                >
                  {name}
                </div>
                {hasGithub && (
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted mt-1 tracking-[0.01em]">
                    <GHIcon />
                    {cleanHandle}
                  </div>
                )}
              </div>
            </div>

            {/* Event title */}
            <div className="mt-[10%]">
              <div className="font-display text-[38px] leading-[0.95] tracking-[0.02em]">
                <span className="text-acid">{siteConfig.event.name.slice(0, 4)}</span>
                <span className="text-white"> {siteConfig.event.name.slice(4)}</span>
              </div>
              <div className="font-mono text-[9px] text-white/40 mt-1 tracking-[0.12em]">
                HACKATHON {siteConfig.event.year}
              </div>
            </div>

            {/* Date + location + organizer */}
            <div className="mt-[7%]">
              <div className="font-body font-bold text-[15px] text-white leading-[1.2]">
                {siteConfig.event.date}
              </div>
              <div className="font-mono text-[10px] text-white/45 mt-0.5">
                {siteConfig.event.location.toUpperCase()}
              </div>
              <div className="font-mono text-[9px] text-white/30 mt-1.5 tracking-[0.06em]">
                by <span className="text-acid/70">{siteConfig.event.organizer}</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <Skeleton className="w-13 h-13 rounded-full shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4.5 w-28" />
                <Skeleton className="h-3 w-18" />
              </div>
            </div>
            <div className="mt-[10%] space-y-2">
              <Skeleton className="h-9 w-40" />
              <Skeleton className="h-2.5 w-24" />
            </div>
            <div className="mt-[7%] space-y-1.5">
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="h-2.5 w-20" />
            </div>
          </>
        )}
      </div>

      {/* BOTTOM STUB — ticket number (below separator, 20.8% of height) */}
      <div className="absolute bottom-0 left-0 right-0 h-[20%] flex items-center justify-center">
        {!loading ? (
          <div className="flex items-baseline gap-2 whitespace-nowrap select-none">
            <span className="font-mono font-bold text-[22px] text-acid/80 tracking-[0.04em]">
              #
            </span>
            <span className="font-mono font-bold text-[26px] text-white tracking-[0.12em]">
              {numStr}
            </span>
          </div>
        ) : (
          <Skeleton className="h-7 w-32" />
        )}
      </div>
    </div>
  );

  return (
    <>
      {desktopTicket}
      {mobileTicket}
    </>
  );
}
