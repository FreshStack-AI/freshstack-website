"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type ToolTypewriterBarProps = {
  labels: string[];
  className?: string;
};

const SLOT_COUNT = 4;
const CYCLE_DELAY_MS = 2000;
const DELETE_STEP_MS = 32;
const TYPE_STEP_MS = 38;

type EditingState = {
  slot: number;
  text: string;
};

export function ToolTypewriterBar({ labels, className }: ToolTypewriterBarProps) {
  const visibleLabels = useMemo(() => {
    if (labels.length === 0) {
      return Array.from({ length: SLOT_COUNT }, () => "");
    }

    return Array.from({ length: SLOT_COUNT }, (_, index) => labels[index % labels.length]);
  }, [labels]);

  const [slots, setSlots] = useState(() => visibleLabels);
  const [editing, setEditing] = useState<EditingState | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const slotsRef = useRef(visibleLabels);
  const nextToolIndexRef = useRef(visibleLabels.length % Math.max(labels.length, 1));

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (labels.length <= 1) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let slotCursor = 0;

    const reserveNextLabel = () => {
      let attempts = 0;
      let nextLabel = labels[nextToolIndexRef.current % labels.length];

      while (nextLabel === slotsRef.current[slotCursor] && attempts < labels.length) {
        nextToolIndexRef.current += 1;
        nextLabel = labels[nextToolIndexRef.current % labels.length];
        attempts += 1;
      }

      nextToolIndexRef.current += 1;
      return nextLabel;
    };

    const scheduleNext = () => {
      timeoutId = setTimeout(() => {
        const slotIndex = slotCursor % SLOT_COUNT;
        slotCursor += 1;

        const currentLabel = slotsRef.current[slotIndex] ?? "";
        const nextLabel = reserveNextLabel();

        if (reduceMotion) {
          setSlots((previous) => {
            const updated = [...previous];
            updated[slotIndex] = nextLabel;
            slotsRef.current = updated;
            return updated;
          });
          setEditing(null);
          scheduleNext();
          return;
        }

        let deleteCount = currentLabel.length;

        const deleteStep = () => {
          if (deleteCount === 0) {
            typeStep(1);
            return;
          }

          deleteCount -= 1;
          setEditing({ slot: slotIndex, text: currentLabel.slice(0, deleteCount) });
          timeoutId = setTimeout(deleteStep, DELETE_STEP_MS);
        };

        const typeStep = (count: number) => {
          const nextText = nextLabel.slice(0, count);
          setEditing({ slot: slotIndex, text: nextText });

          if (count >= nextLabel.length) {
            setSlots((previous) => {
              const updated = [...previous];
              updated[slotIndex] = nextLabel;
              slotsRef.current = updated;
              return updated;
            });
            setEditing(null);
            scheduleNext();
            return;
          }

          timeoutId = setTimeout(() => typeStep(count + 1), TYPE_STEP_MS);
        };

        deleteStep();
      }, CYCLE_DELAY_MS);
    };

    scheduleNext();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [labels, reduceMotion]);

  return (
    <div className={cn("flex w-full items-center gap-2", className)}>
      <span className="shrink-0 pr-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-white/48 sm:text-[10px]">
        Tools:
      </span>
      <div
        className="min-w-0 flex-1"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div className="grid w-full grid-cols-4 items-center gap-1 sm:gap-1.5">
          {slots.map((label, index) => {
            const activeText = editing?.slot === index ? editing.text : label;

            return (
              <span
                key={index}
                className="inline-flex h-9 min-w-0 items-center justify-center px-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-white/72 sm:text-[10px]"
              >
                <span className="truncate">{activeText || "\u00A0"}</span>
                {editing?.slot === index ? (
                  <span className="ml-0.5 inline-block h-3.5 w-px shrink-0 bg-white/70 align-middle" />
                ) : null}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
