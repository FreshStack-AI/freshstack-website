"use client";

import { useState } from "react";

import type { ServiceCard } from "@/content/site-content";
import { cn } from "@/lib/utils";

type ServicesExpandRailProps = {
  cards: ServiceCard[];
};

export function ServicesExpandRail({ cards }: ServicesExpandRailProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (cards.length === 0) {
    return null;
  }

  const gridTemplateColumns = cards
    .map((_, index) =>
      index === activeIndex ? "minmax(0, 2.7fr)" : "minmax(4.75rem, 0.7fr)",
    )
    .join(" ");

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 lg:hidden">
        {cards.map((card, index) => (
          <article
            key={card.title}
            className="card-stagger glass-panel flex h-full flex-col p-6"
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <p className="section-label">Service</p>
            <h3 className="mt-5 text-2xl font-bold tracking-[-0.03em] text-[var(--color-white)]">
              {card.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
              {card.description}
            </p>
          </article>
        ))}
      </div>

      <div className="hidden lg:block">
        <div
          className="grid min-h-[26.5rem] gap-3 transition-[grid-template-columns] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ gridTemplateColumns }}
        >
          {cards.map((card, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={card.title}
                type="button"
                aria-pressed={isActive}
                aria-label={card.title}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "card-stagger glass-panel group relative h-full overflow-hidden text-left",
                  "transition-[border-color,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                  isActive
                    ? "border-white/20 bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_30px_90px_rgba(0,0,0,0.52)]"
                    : "border-white/8 bg-white/[0.03]",
                )}
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_42%)] opacity-70" />

                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute z-[2] font-mono text-[14px] font-bold uppercase tracking-[0.18em] text-white/72",
                    "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                    isActive
                      ? "left-6 top-6 translate-x-0 translate-y-0 opacity-0"
                      : "left-1/2 top-20 -translate-x-1/2 opacity-100 [text-orientation:upright] [writing-mode:vertical-rl]",
                  )}
                >
                  {card.collapsedTitle}
                </span>

                <div className="relative z-[3] flex h-full flex-col p-6">
                  <div
                    className={cn(
                      "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                      isActive
                        ? "translate-y-0 opacity-100 delay-75"
                        : "translate-y-4 opacity-0",
                    )}
                  >
                    <p className="section-label">Service</p>
                    <h3 className="mt-4 max-w-[13rem] text-[2.15rem] font-bold leading-[1.02] tracking-[-0.05em] text-[var(--color-white)] xl:max-w-[14rem]">
                      {card.title}
                    </h3>
                  </div>

                  <div className="mt-auto">
                    <p
                      className={cn(
                        "max-w-[16rem] overflow-hidden text-[1rem] leading-7 text-[var(--color-muted)]",
                        "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                        isActive
                          ? "max-h-52 translate-y-0 opacity-100 delay-100"
                          : "max-h-0 translate-y-6 opacity-0",
                      )}
                    >
                      {card.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
