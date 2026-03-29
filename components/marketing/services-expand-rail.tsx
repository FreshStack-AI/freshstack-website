"use client";

import { useState } from "react";

import type { ServiceCard } from "@/content/site-content";
import { cn } from "@/lib/utils";

type ServicesExpandRailProps = {
  cards: ServiceCard[];
};

const DETAIL_FRAMES = [
  "Clarify the operating model before more people or more tools get layered on top of the chaos.",
  "Make context move cleanly between teams so the next person does not have to reconstruct the work.",
  "Create reporting that leadership and clients can both trust without weekly manual rescue missions.",
  "Use AI where it improves throughput and quality, not where it simply adds more output to review.",
  "Document the stack and automation logic so the operating layer becomes durable instead of fragile.",
];

export function ServicesExpandRail({
  cards,
}: ServicesExpandRailProps) {
  const [activeIndex, setActiveIndex] = useState(() =>
    cards.length > 1 ? 1 : 0,
  );

  if (cards.length === 0) {
    return null;
  }

  const activeCard = cards[activeIndex] ?? cards[0];
  return (
    <>
      <div className="grid gap-5 lg:hidden">
        {cards.map((card, index) => (
          <article
            key={card.title}
            className="card-stagger glass-panel p-6 sm:p-7"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <p className="section-label">Service 0{index + 1}</p>
            <h3 className="mt-4 text-[1.85rem] font-semibold tracking-[-0.045em] text-[var(--color-ink)]">
              {card.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
              {card.description}
            </p>
          </article>
        ))}
      </div>

      <div className="hidden lg:grid lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-5">
        <div className="glass-panel p-3">
          <div className="space-y-2">
            {cards.map((card, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={card.title}
                  type="button"
                  aria-pressed={isActive}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "w-full rounded-[0.95rem] border px-4 py-4 text-left transition-[background-color,border-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                    isActive
                      ? "border-[rgba(201,168,106,0.24)] bg-[rgba(201,168,106,0.08)] text-[var(--color-ink)]"
                      : "border-transparent bg-transparent text-[var(--color-muted)] hover:border-white/8 hover:bg-white/[0.02]",
                  )}
                >
                  <p className="section-label">0{index + 1}</p>
                  <p className="mt-3 text-base font-semibold tracking-[-0.03em]">
                    {card.collapsedTitle}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <article className="glass-panel flex min-h-[26rem] flex-col overflow-hidden p-7">
          <div className="flex-1">
            <div>
              <p className="section-label">Active scope</p>
              <h3 className="mt-4 max-w-[14ch] text-[2.85rem] font-semibold leading-[0.94] tracking-[-0.06em] text-[var(--color-ink)]">
                {activeCard.title}
              </h3>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--color-muted)]">
                {activeCard.description}
              </p>
            </div>
          </div>

          <div className="mt-auto grid gap-3 pt-6 md:grid-cols-2">
            <div className="rounded-[1.15rem] border border-white/8 bg-white/[0.03] p-4">
              <p className="section-label">What it fixes</p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-ink)]">
                {DETAIL_FRAMES[activeIndex] || DETAIL_FRAMES[0]}
              </p>
            </div>

            <div className="rounded-[1.15rem] border border-white/8 bg-white/[0.03] p-4">
              <p className="section-label">Why it matters</p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-ink)]">
                {activeCard.whyItMatters ||
                  DETAIL_FRAMES[activeIndex] ||
                  DETAIL_FRAMES[0]}
              </p>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
