"use client";

import { CopyIcon } from "lucide-react";

import { XIcon, LIIcon, FBIcon, DLIcon, FormButton } from "@/components/ui";
import { cn, buildShareUrl, buildSocialShareUrls } from "@/lib";
import { useClipboard } from "@/hooks";
import { useAnalytics } from "@/components/analytics";

interface ShareButtonsProps {
  ticketId: string;
  downloading?: boolean;
  onDownload?: () => void;
}

export function ShareButtons({ ticketId, downloading, onDownload }: ShareButtonsProps) {
  const { copied, copy } = useClipboard();
  const { trackEvent } = useAnalytics();
  const shareUrl = buildShareUrl(ticketId);
  const socialUrls = buildSocialShareUrls(shareUrl);

  const shareOnSocial = (platform: string, url: string) => {
    trackEvent("ticket_share", { platform, ticketId });
    window.open(url, "_blank", "width=600,height=400");
  };

  return (
    <>
      <div className="font-mono text-[11px] tracking-[0.18em] text-white/40 uppercase">
        СПОДЕЛИ БИЛЕТА СИ
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        <FormButton
          variant="outline"
          size="sm"
          onClick={() => shareOnSocial("twitter", socialUrls.twitter)}
        >
          <XIcon />X (Twitter)
        </FormButton>
        <FormButton
          variant="outline"
          size="sm"
          onClick={() => shareOnSocial("linkedin", socialUrls.linkedin)}
        >
          <LIIcon />
          LINKEDIN
        </FormButton>
        <FormButton
          variant="outline"
          size="sm"
          onClick={() => shareOnSocial("facebook", socialUrls.facebook)}
        >
          <FBIcon />
          FACEBOOK
        </FormButton>
        {onDownload && (
          <FormButton
            variant="outline"
            size="sm"
            onClick={() => {
              trackEvent("ticket_download", { ticketId });
              onDownload();
            }}
            disabled={downloading}
            className={cn(downloading && "opacity-50 cursor-wait")}
          >
            <DLIcon />
            СВАЛИ
          </FormButton>
        )}
        <FormButton
          variant="outline"
          size="sm"
          onClick={() => {
            trackEvent("ticket_share", { platform: "copy_link", ticketId });
            copy(shareUrl);
          }}
          className={cn("relative overflow-hidden", copied && "text-acid! border-acid!")}
        >
          {/* Scan flash on copy */}
          {copied && (
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(var(--acid-rgb),0.15) 50%, transparent 100%)",
                animation: "scanFlash 0.4s ease-out forwards",
              }}
            />
          )}
          <CopyIcon className="size-4" />
          {copied ? "КОПИРАНО!" : "КОПИРАЙ ЛИНК"}
        </FormButton>
      </div>
    </>
  );
}
