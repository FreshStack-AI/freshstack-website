"use client";

import type { ComponentType } from "react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type DeferredToolIconCloudProps = {
  labels: string[];
  className?: string;
  textFallbackVariant?: "pill" | "plain";
};

type ToolIconCloudComponent = ComponentType<DeferredToolIconCloudProps>;

export function DeferredToolIconCloud({
  labels,
  className,
  textFallbackVariant = "pill",
}: DeferredToolIconCloudProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ToolIconCloudComponent, setToolIconCloudComponent] =
    useState<ToolIconCloudComponent | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) {
      return;
    }

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        const toolCloudModule = await import("@/components/ui/tool-icon-cloud");
        setToolIconCloudComponent(() => toolCloudModule.ToolIconCloud);
        observer.disconnect();
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={hostRef}
      className={cn("relative flex h-full w-full items-center justify-center", className)}
    >
      {ToolIconCloudComponent ? (
        <ToolIconCloudComponent
          labels={labels}
          className="h-full w-full"
          textFallbackVariant={textFallbackVariant}
        />
      ) : (
        <div className="pointer-events-none flex h-full w-full flex-wrap content-center items-center justify-center gap-x-5 gap-y-4 px-10 text-center">
          {labels.slice(0, 12).map((label) => (
            <span
              key={label}
              className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-white/32"
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
