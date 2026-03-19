"use client";

import { useCallback, useEffect, useRef } from "react";
import Script from "next/script";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        resize?: boolean;
      }) => void;
    };
  }
}

type CalendlyInlineEmbedProps = {
  url: string;
};

export function CalendlyInlineEmbed({ url }: CalendlyInlineEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const initWidget = useCallback(() => {
    const container = containerRef.current;
    if (!container || !window.Calendly) {
      return;
    }

    container.innerHTML = "";

    window.Calendly.initInlineWidget({
      url,
      parentElement: container,
      resize: true,
    });
  }, [url]);

  useEffect(() => {
    initWidget();

    const container = containerRef.current;
    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [initWidget]);

  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onReady={initWidget}
      />
      <div ref={containerRef} className="calendly-inline-shell w-full" />
    </>
  );
}
