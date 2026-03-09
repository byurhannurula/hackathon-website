"use client";

import { CopyIcon } from "lucide-react";

import { XIcon, LIIcon, FBIcon, DLIcon, FormButton } from "@/components/ui";
import { cn, buildShareUrl, buildSocialShareUrls } from "@/lib";
import { useClipboard } from "@/hooks";

interface ShareButtonsProps {
  ticketId: string;
  downloading?: boolean;
  onDownload?: () => void;
}

export function ShareButtons({ ticketId, downloading, onDownload }: ShareButtonsProps) {
  const { copied, copy } = useClipboard();
  const shareUrl = buildShareUrl(ticketId);
  const socialUrls = buildSocialShareUrls(shareUrl);

  const shareOnSocial = (url: string) => {
    window.open(url, "_blank", "width=600,height=400");
  };

  return (
    <>
      <div className="font-mono text-[11px] tracking-[0.18em] text-white/40 uppercase">
        СПОДЕЛИ БИЛЕТА СИ
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        <FormButton variant="outline" size="sm" onClick={() => shareOnSocial(socialUrls.twitter)}>
          <XIcon />X (Twitter)
        </FormButton>
        <FormButton variant="outline" size="sm" onClick={() => shareOnSocial(socialUrls.linkedin)}>
          <LIIcon />
          LINKEDIN
        </FormButton>
        <FormButton variant="outline" size="sm" onClick={() => shareOnSocial(socialUrls.facebook)}>
          <FBIcon />
          FACEBOOK
        </FormButton>
        {onDownload && (
          <FormButton
            variant="outline"
            size="sm"
            onClick={onDownload}
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
          onClick={() => copy(shareUrl)}
          className={cn(copied && "text-acid! border-acid!")}
        >
          <CopyIcon className="size-4" />
          {copied ? "КОПИРАНО!" : "КОПИРАЙ ЛИНК"}
        </FormButton>
      </div>
    </>
  );
}
