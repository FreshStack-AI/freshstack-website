"use client";

import { useEffect } from "react";

const GLOW_PROXIMITY = 140;
const INACTIVE_ZONE = 0.68;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function updatePanelGlow(
  panel: HTMLElement,
  pointerX: number,
  pointerY: number,
) {
  const rect = panel.getBoundingClientRect();

  if (
    rect.bottom < -GLOW_PROXIMITY ||
    rect.top > window.innerHeight + GLOW_PROXIMITY
  ) {
    panel.style.setProperty("--glow-active", "0");
    return;
  }

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const distanceFromCenter = Math.hypot(pointerX - centerX, pointerY - centerY);
  const inactiveRadius = 0.5 * Math.min(rect.width, rect.height) * INACTIVE_ZONE;

  if (distanceFromCenter < inactiveRadius) {
    panel.style.setProperty("--glow-active", "0");
    return;
  }

  const isActive =
    pointerX > rect.left - GLOW_PROXIMITY &&
    pointerX < rect.right + GLOW_PROXIMITY &&
    pointerY > rect.top - GLOW_PROXIMITY &&
    pointerY < rect.bottom + GLOW_PROXIMITY;

  panel.style.setProperty("--glow-active", isActive ? "1" : "0");

  if (!isActive) {
    return;
  }

  const angle =
    (Math.atan2(pointerY - centerY, pointerX - centerX) * 180) / Math.PI + 90;

  panel.style.setProperty("--glow-angle", angle.toFixed(2));
  panel.style.setProperty(
    "--glow-x",
    `${clamp(((pointerX - rect.left) / rect.width) * 100, 0, 100)}%`,
  );
  panel.style.setProperty(
    "--glow-y",
    `${clamp(((pointerY - rect.top) / rect.height) * 100, 0, 100)}%`,
  );
}

export function PanelGlowController() {
  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!canHover.matches || reduceMotion.matches) {
      return;
    }

    let panels: HTMLElement[] = [];

    const refreshPanels = () => {
      panels = Array.from(
        document.querySelectorAll<HTMLElement>("main .glass-panel"),
      ).filter((panel) => !panel.closest("#hero"));

      panels.forEach((panel) => panel.setAttribute("data-panel-glow", "true"));
    };

    refreshPanels();

    let frame = 0;
    let lastPointerX = window.innerWidth / 2;
    let lastPointerY = window.innerHeight / 2;

    const render = () => {
      frame = 0;
      panels.forEach((panel) =>
        updatePanelGlow(panel, lastPointerX, lastPointerY),
      );
    };

    const schedule = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(render);
    };

    const clearGlow = () => {
      panels.forEach((panel) => panel.style.setProperty("--glow-active", "0"));
    };

    const handlePointerMove = (event: PointerEvent) => {
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
      schedule();
    };

    const handleViewportChange = () => {
      refreshPanels();
      schedule();
    };

    const mutationObserver = new MutationObserver(() => {
      refreshPanels();
      schedule();
    });

    mutationObserver.observe(document.querySelector("main") ?? document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleViewportChange, { passive: true });
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("blur", clearGlow);
    document.body.addEventListener("pointerleave", clearGlow);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleViewportChange);
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("blur", clearGlow);
      document.body.removeEventListener("pointerleave", clearGlow);
      mutationObserver.disconnect();

      panels.forEach((panel) => {
        panel.removeAttribute("data-panel-glow");
        panel.style.removeProperty("--glow-active");
        panel.style.removeProperty("--glow-angle");
        panel.style.removeProperty("--glow-x");
        panel.style.removeProperty("--glow-y");
      });
    };
  }, []);

  return null;
}
