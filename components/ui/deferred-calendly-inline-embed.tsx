"use client";

import type { ComponentType } from "react";
import { useEffect, useRef, useState } from "react";

import {
  ensureCalendlyScript,
  preconnectCalendly,
} from "@/components/ui/calendly-loader";
import { cn } from "@/lib/utils";

type DeferredCalendlyInlineEmbedProps = {
  url: string;
  className?: string;
  warmupTargetId?: string;
};

type CalendlyInlineEmbedComponent =
  ComponentType<DeferredCalendlyInlineEmbedProps>;

export function DeferredCalendlyInlineEmbed({
  url,
  className,
  warmupTargetId,
}: DeferredCalendlyInlineEmbedProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [CalendlyInlineEmbedComponent, setCalendlyInlineEmbedComponent] =
    useState<CalendlyInlineEmbedComponent | null>(null);

  useEffect(() => {
    preconnectCalendly();
  }, []);

  useEffect(() => {
    if (!warmupTargetId) {
      return;
    }

    const target = document.getElementById(warmupTargetId);
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        void ensureCalendlyScript().catch(() => {
          // Keep the shell in place if Calendly fails to load.
        });
        void import("@/components/ui/calendly-inline-embed");
        observer.disconnect();
      },
      { rootMargin: "0px 0px 55% 0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [warmupTargetId]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        void ensureCalendlyScript().catch(() => {
          // The embed component will keep the booking shell visible on failure.
        });
        const calendlyModule = await import("@/components/ui/calendly-inline-embed");
        setCalendlyInlineEmbedComponent(() => calendlyModule.CalendlyInlineEmbed);
        observer.disconnect();
      },
      { rootMargin: "360px 0px" },
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={hostRef} className={cn("calendly-inline-shell w-full", className)}>
      {CalendlyInlineEmbedComponent ? (
        <CalendlyInlineEmbedComponent url={url} className="h-full w-full" />
      ) : (
        <div className="flex min-h-[560px] w-full items-center justify-center rounded-[0.9rem] border border-white/8 bg-black/20 px-8 py-10">
          <div className="w-full max-w-sm text-center">
            <p className="section-label">Loading scheduler</p>
            <p className="mt-4 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
              The booking widget is warming up while you scroll so it is ready as
              you reach this section.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
