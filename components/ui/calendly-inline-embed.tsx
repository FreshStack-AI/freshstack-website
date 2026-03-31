"use client";

import { useCallback, useEffect, useRef } from "react";

import { ensureCalendlyScript } from "@/components/ui/calendly-loader";
import { cn } from "@/lib/utils";

type CalendlyInlineEmbedProps = {
  url: string;
  className?: string;
};

export function CalendlyInlineEmbed({
  url,
  className,
}: CalendlyInlineEmbedProps) {
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
    let isActive = true;

    void ensureCalendlyScript()
      .then(() => {
        if (!isActive) {
          return;
        }

        initWidget();
      })
      .catch(() => {
        // Keep the booking shell visible if the third-party script fails.
      });

    const container = containerRef.current;
    return () => {
      isActive = false;
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [initWidget]);

  return <div ref={containerRef} className={cn("calendly-inline-shell w-full", className)} />;
}
