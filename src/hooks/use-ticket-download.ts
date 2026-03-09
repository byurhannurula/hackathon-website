"use client";

import { useCallback, useRef, useState } from "react";
import { toPng } from "html-to-image";

import { siteConfig } from "@/constants";
import { fetchAvatarAsBase64 } from "@/lib";

export function useTicketDownload(ticketNum?: number) {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const [downloading, setDownloading] = useState(false);

  const download = useCallback(async () => {
    if (!nodeRef.current || downloading) return;
    setDownloading(true);
    try {
      const el = nodeRef.current;
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
      link.download = `${siteConfig.event.name.toLowerCase().replace(/\s+/g, "-")}-ticket-${ticketNum || "000000"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to download ticket:", err);
    } finally {
      setDownloading(false);
    }
  }, [ticketNum, downloading]);

  return { nodeRef, downloading, download };
}
