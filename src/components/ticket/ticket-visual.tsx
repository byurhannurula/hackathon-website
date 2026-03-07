"use client";

import { useRef, useState, useCallback } from "react";

import { AvatarCircle, GHIcon } from "@/components/ui";
import { type TicketData, siteConfig, cn } from "@/lib";
import { TicketSVG } from "./ticket-svg";

interface TicketVisualProps {
  data: TicketData | null;
  interactive?: boolean;
  onNodeRef?: (node: HTMLDivElement | null) => void;
}

export function TicketVisual({ data, interactive = false, onNodeRef }: TicketVisualProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const [hov, setHov] = useState(false);

  const name = data?.name || "Your Name";
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

  const onEnter = useCallback(() => setHov(true), []);
  const onLeave = useCallback(() => {
    setHov(false);
    setRot({ x: 0, y: 0 });
    setShine({ x: 50, y: 50 }); // reset for when shimmer is re-enabled
  }, []);
  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive || !cardRef.current) return;
      const r = cardRef.current.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      setRot({
        x: -(py - 0.5) * 10,
        y: (px - 0.5) * 10,
      });
      setShine({ x: px * 100, y: py * 100 });
    },
    [interactive]
  );

  return (
    <div
      ref={(node) => {
        (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        onNodeRef?.(node);
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
      className="relative w-[650px] max-w-[96vw] shrink-0"
      style={{
        aspectRatio: "720 / 320",
        transformStyle: "preserve-3d",
        transform: `perspective(1100px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
        transition: hov ? "transform 0.08s ease-out" : "transform 0.3s ease-out",
        filter: hov
          ? "drop-shadow(0 25px 50px rgba(0,0,0,0.7)) drop-shadow(0 0 30px rgba(200,255,0,0.06))"
          : "drop-shadow(0 16px 36px rgba(0,0,0,0.6))",
      }}
    >
      <TicketSVG shineX={shine.x} shineY={shine.y} hovering={hov} />

      {/* MAIN BODY */}
      <div className="absolute select-none top-12 bottom-12 left-14 right-[25%] flex flex-col justify-between">
        {/* TOP: avatar + name + handle */}
        <div className="flex items-center gap-4.5">
          {hasGithub && <AvatarCircle name={name} avatarUrl={avatarUrl} size={64} />}
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
              <div className="flex items-center gap-1.5 font-mono text-[clamp(10px,1.5vw,12px)] text-muted mt-1.5 tracking-[0.01em]">
                <GHIcon />
                {cleanHandle}
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM: brand | event info */}
        <div className="flex items-center gap-5">
          {/* Brand */}
          <div className="shrink-0">
            <div className="font-display text-[clamp(22px,3.8vw,34px)] leading-[0.95] tracking-[0.02em]">
              <span className="text-acid">{siteConfig.event.name.slice(0, 4)}</span>
              <span className="text-white"> {siteConfig.event.name.slice(4)}</span>
            </div>
            <div className="font-mono text-[clamp(7px,1vw,9px)] text-white/40 mt-1 tracking-[0.12em]">
              HACKATHON {siteConfig.event.year}
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-[40px] bg-white/12 shrink-0" />

          {/* Date + location */}
          <div className="min-w-0">
            <div className="font-body font-bold text-[clamp(12px,1.9vw,15px)] text-white leading-[1.2]">
              {siteConfig.event.date}
            </div>
            <div className="font-mono text-[clamp(9px,1.3vw,11px)] text-white/45 mt-0.5">
              {siteConfig.event.location.toUpperCase()}
            </div>
            <div className="font-mono text-[clamp(7px,1vw,9px)] text-white/30 mt-1.5 tracking-[0.06em]">
              by <span className="text-acid/70">{siteConfig.event.organizer}</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT STUB */}
      <div className="absolute top-[7%] bottom-[7%] left-[77%] right-0 flex items-center justify-center overflow-hidden">
        <div className="-rotate-90 flex items-baseline gap-2 whitespace-nowrap select-none">
          <span className="font-mono font-bold text-[clamp(18px,2.8vw,24px)] text-acid/80 tracking-[0.04em]">
            #
          </span>
          <span className="font-mono font-bold text-[clamp(20px,3.2vw,28px)] text-white tracking-[0.12em]">
            {numStr}
          </span>
        </div>
      </div>
    </div>
  );
}
