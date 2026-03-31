"use client";

import type { ComponentType } from "react";
import { useEffect, useState } from "react";

type GlowControllerComponent = ComponentType;

function requestWhenIdle(callback: () => void) {
  if ("requestIdleCallback" in globalThis) {
    const idleId = globalThis.requestIdleCallback(callback, { timeout: 1100 });
    return () => globalThis.cancelIdleCallback(idleId);
  }

  const timeoutId = globalThis.setTimeout(callback, 300);
  return () => globalThis.clearTimeout(timeoutId);
}

export function DeferredPanelGlowController() {
  const [GlowControllerComponent, setGlowControllerComponent] =
    useState<GlowControllerComponent | null>(null);

  useEffect(() => {
    const shouldLoad =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!shouldLoad) {
      return;
    }

    let isActive = true;

    const cancelIdle = requestWhenIdle(async () => {
      const glowModule = await import("@/components/ui/panel-glow-controller");
      if (!isActive) {
        return;
      }

      setGlowControllerComponent(() => glowModule.PanelGlowController);
    });

    return () => {
      isActive = false;
      cancelIdle();
    };
  }, []);

  return GlowControllerComponent ? <GlowControllerComponent /> : null;
}
