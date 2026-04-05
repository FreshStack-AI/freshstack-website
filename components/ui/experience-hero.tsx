import React from "react";

import { DeferredWebglBackground } from "@/components/ui/deferred-webgl-background";

type ExperienceHeroProps = {
  displayLines: string[];
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export function ExperienceHero({
  displayLines,
  description,
  ctaLabel,
  ctaHref,
}: ExperienceHeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-transparent selection:bg-white selection:text-black"
    >
      <DeferredWebglBackground className="absolute inset-0" />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(245,240,232,0.07),transparent_20%),radial-gradient(circle_at_20%_18%,rgba(200,192,176,0.05),transparent_26%),linear-gradient(180deg,rgba(245,240,232,0.02),rgba(245,240,232,0))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,rgba(2,2,2,0),#020202)]" />
      </div>

      <div className="relative z-10 flex min-h-screen w-full items-end px-8 pb-8 pt-[1.75rem] md:px-14 md:pb-12 md:pt-[2.5rem] lg:px-20 lg:pb-16 lg:pt-[3.75rem]">
        <div className="reveal-up flex min-w-0 flex-1 flex-col pb-6 md:pb-8">
          <div className="max-w-[60rem]">
            <h1 className="text-[clamp(3.5rem,9.5vw,11.5rem)] leading-[0.87] font-black uppercase tracking-tighter text-[var(--color-ink)]">
              {displayLines.map((line, index) => (
                <React.Fragment key={line}>
                  <span className={index === 1 ? "hero-outline-line text-outline" : undefined}>
                    {line}
                  </span>
                  {index < displayLines.length - 1 ? <br /> : null}
                </React.Fragment>
              ))}
            </h1>
            <p className="section-label mt-7 max-w-md normal-case leading-[1.9] tracking-[0.22em]">
              {description}
            </p>
            <a
              href={ctaHref}
              className="group mt-5 flex w-fit items-center gap-5 sm:mt-6"
            >
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-[color:rgba(200,192,176,0.2)] transition-all duration-300 ease-[var(--ease-standard)] group-hover:bg-[var(--color-accent)] group-active:translate-y-px">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-[var(--color-ink)] transition-colors duration-300 group-hover:stroke-[var(--color-void)]"
                >
                  <path
                    d="M7 17L17 7M17 7H8M17 7V16"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-ink)]">
                {ctaLabel}
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
