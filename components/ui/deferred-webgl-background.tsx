"use client";

import type { ComponentType } from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type DeferredWebglBackgroundProps = {
  className?: string;
};

type BackgroundComponent = ComponentType<DeferredWebglBackgroundProps>;

function requestWhenIdle(callback: () => void) {
  if ("requestIdleCallback" in globalThis) {
    const idleId = globalThis.requestIdleCallback(callback, { timeout: 900 });
    return () => globalThis.cancelIdleCallback(idleId);
  }

  const timeoutId = globalThis.setTimeout(callback, 240);
  return () => globalThis.clearTimeout(timeoutId);
}

export function DeferredWebglBackground({
  className,
}: DeferredWebglBackgroundProps) {
  const [BackgroundComponent, setBackgroundComponent] =
    useState<BackgroundComponent | null>(null);

  useEffect(() => {
    const shouldLoad =
      window.matchMedia("(min-width: 1024px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!shouldLoad) {
      return;
    }

    let isActive = true;

    const cancelIdle = requestWhenIdle(async () => {
      const backgroundModule = await import("@/components/ui/site-webgl-background");
      if (!isActive) {
        return;
      }

      setBackgroundComponent(() => backgroundModule.SiteWebglBackground);
    });

    return () => {
      isActive = false;
      cancelIdle();
    };
  }, []);

  return BackgroundComponent ? (
    <BackgroundComponent className={cn("fixed inset-0", className)} />
  ) : null;
}
