"use client";

import Script from "next/script";

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, unknown>) => void;
    };
  }
}

const umamiTrackingId = process.env.NEXT_PUBLIC_UMAMI_TRACKING_ID as string;

export function AnalyticsScript() {
  return (
    <Script
      async
      type="text/javascript"
      data-auto-track="true"
      strategy="afterInteractive"
      data-website-id={umamiTrackingId}
      src="https://cloud.umami.is/script.js"
    />
  );
}

export function useAnalytics() {
  const trackEvent = (event: string, data?: Record<string, unknown>) => {
    if (typeof window === "undefined" || !window.umami) {
      return;
    }

    window.umami.track(event, {
      props: data,
    });
  };

  return {
    trackEvent,
  };
}
