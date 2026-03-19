"use client";

import React, {
  useCallback,
  cloneElement,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Cloud, type ICloud, renderSimpleIcon } from "react-icon-cloud";

import { getToolIcon } from "@/lib/tool-icons";
import { cn } from "@/lib/utils";

type ToolIconCloudProps = {
  labels: string[];
  className?: string;
  textFallbackVariant?: "pill" | "plain";
};

type TagCanvasInstance = {
  SetSpeed?: (speed: [number, number]) => void;
  decel: number;
  initial: [number, number] | null;
  maxSpeed: number;
  minSpeed: number;
  mx: number;
  my: number;
  pitch: number;
  yaw: number;
};

const sharedCloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.12, -0.08],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.006,
    minSpeed: 0,
    decel: 0.985,
  },
};

const customCloudIconAssets: Record<string, string> = {
  openclaw: "/openclaw-pixel-lobster.svg",
  slack: "/slack.svg",
};

const cloudLabelsToExclude = new Set(["codex", "openai api"]);
const idleCloudVector: [number, number] = [0.12, -0.08];
const activeCloudMaxSpeed = 0.04;
const activeCloudMinSpeed = 0.012;
const activeCloudDecel = 0.92;
const idleCloudMaxSpeed = 0.006;
const idleCloudMinSpeed = 0;
const idleCloudDecel = 0.985;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function applyActiveCloudMode(instance: TagCanvasInstance) {
  instance.maxSpeed = activeCloudMaxSpeed;
  instance.minSpeed = activeCloudMinSpeed;
  instance.decel = activeCloudDecel;
}

function applyIdleCloudMode(instance: TagCanvasInstance) {
  const previousMaxSpeed =
    typeof instance.maxSpeed === "number" && instance.maxSpeed > 0
      ? instance.maxSpeed
      : activeCloudMaxSpeed;

  let nextYaw = instance.yaw / previousMaxSpeed;
  let nextPitch = instance.pitch / previousMaxSpeed;

  if (!Number.isFinite(nextYaw) || !Number.isFinite(nextPitch)) {
    [nextYaw, nextPitch] = idleCloudVector;
  }

  if (Math.abs(nextYaw) + Math.abs(nextPitch) < 0.04) {
    [nextYaw, nextPitch] = idleCloudVector;
  }

  nextYaw = clamp(nextYaw, -0.18, 0.18);
  nextPitch = clamp(nextPitch, -0.18, 0.18);

  instance.maxSpeed = idleCloudMaxSpeed;
  instance.minSpeed = idleCloudMinSpeed;
  instance.decel = idleCloudDecel;
  instance.mx = -1;
  instance.my = -1;

  if (typeof instance.SetSpeed === "function") {
    instance.SetSpeed([nextYaw, nextPitch]);
    return;
  }

  instance.initial = [nextYaw, nextPitch];
  instance.yaw = nextYaw * idleCloudMaxSpeed;
  instance.pitch = nextPitch * idleCloudMaxSpeed;
}

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) {
    return () => {};
  }

  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);

  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function renderTextTag(
  label: string,
  variant: NonNullable<ToolIconCloudProps["textFallbackVariant"]>,
) {
  return (
    <a
      key={label}
      href={undefined}
      title={label}
      onClick={(event) => event.preventDefault()}
      className={cn(
        "inline-flex items-center justify-center font-mono text-[11px] font-bold uppercase tracking-[0.24em]",
        variant === "pill"
          ? "rounded-full border border-white/12 bg-white/4 px-4 py-2 text-white/76"
          : "px-2 py-1 text-white/60",
      )}
    >
      {label}
    </a>
  );
}

function renderCustomImageTag(label: string, src: string) {
  return (
    <a
      key={label}
      href={undefined}
      title={label}
      onClick={(event) => event.preventDefault()}
      className="inline-flex items-center justify-center"
    >
      {/* react-icon-cloud expects a plain img child here; next/image can break the canvas capture. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        width={42}
        height={42}
        className="h-[42px] w-[42px] object-contain"
      />
    </a>
  );
}

export function ToolIconCloud({
  labels,
  className,
  textFallbackVariant = "pill",
}: ToolIconCloudProps) {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );
  const hostRef = useRef<HTMLDivElement>(null);
  const cloudId = `tool-icon-cloud-${useId().replace(/:/g, "")}`;
  const [cloudReady, setCloudReady] = useState(false);
  const [cloudVersion, setCloudVersion] = useState(0);

  const cloudLabels = useMemo(
    () =>
      labels.filter(
        (label) => !cloudLabelsToExclude.has(label.trim().toLowerCase()),
      ),
    [labels],
  );

  const renderedItems = useMemo(
    () =>
      cloudLabels.map((label) => {
        const icon = getToolIcon(label);
        const customAsset = customCloudIconAssets[label.toLowerCase()];

        if (customAsset) {
          return renderCustomImageTag(label, customAsset);
        }

        if (!icon) {
          return renderTextTag(label, textFallbackVariant);
        }

        const iconNode = renderSimpleIcon({
          icon: { ...icon, hex: "ffffff" },
          bgHex: "#020202",
          fallbackHex: "#ffffff",
          minContrastRatio: 21,
          size: 42,
          aProps: {
            href: undefined,
            target: undefined,
            rel: undefined,
            title: label,
            onClick: (event) => event.preventDefault(),
          },
        });

        return cloneElement(iconNode, { key: label });
      }),
    [cloudLabels, textFallbackVariant],
  );

  const getCloudInstance = useCallback(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const tagCanvas = (
      window as Window & {
        TagCanvas?: { tc?: Record<string, TagCanvasInstance> };
      }
    ).TagCanvas;

    return tagCanvas?.tc?.[`canvas-${cloudId}`] ?? null;
  }, [cloudId]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const host = hostRef.current;
    if (!host) {
      return;
    }

    let frame = 0;
    let timeout = 0;

    const startCloud = () => {
      const rect = host.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) {
        return;
      }

      setCloudReady(true);
      setCloudVersion((current) => current + 1);
    };

    const scheduleStart = () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);

      frame = window.requestAnimationFrame(() => {
        timeout = window.setTimeout(startCloud, 60);
      });
    };

    scheduleStart();

    const resizeObserver = new ResizeObserver(() => {
      scheduleStart();
    });

    resizeObserver.observe(host);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        scheduleStart();
      }
    };

    window.addEventListener("resize", scheduleStart);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleStart);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || !cloudReady) {
      return;
    }

    const instance = getCloudInstance();
    if (!instance) {
      return;
    }

    applyIdleCloudMode(instance);
  }, [cloudReady, cloudVersion, getCloudInstance, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          "flex min-h-[14rem] flex-wrap items-center justify-center gap-5 p-4 sm:min-h-[16rem] sm:gap-6",
          className,
        )}
      >
        {renderedItems}
      </div>
    );
  }

  return (
    <div
      ref={hostRef}
      className={cn(
        "tool-icon-cloud h-[18rem] w-full sm:h-[20rem] lg:h-[22rem]",
        className,
      )}
      onPointerEnter={() => {
        const instance = getCloudInstance();
        if (!instance) {
          return;
        }

        applyActiveCloudMode(instance);
      }}
      onPointerLeave={() => {
        const instance = getCloudInstance();
        if (!instance) {
          return;
        }

        applyIdleCloudMode(instance);
      }}
    >
      {cloudReady ? (
        <Cloud key={cloudVersion} id={cloudId} {...sharedCloudProps}>
          <>{renderedItems}</>
        </Cloud>
      ) : null}
    </div>
  );
}
