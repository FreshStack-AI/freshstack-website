import React from "react";

import { DeferredToolIconCloud } from "@/components/ui/deferred-tool-icon-cloud";

type ExperienceHeroProps = {
  displayLines: string[];
  description: string;
  proof: string;
  ctaLabel: string;
  ctaHref: string;
  supportTitle: string;
  supportItems: string[];
  toolLabels: string[];
};

export function ExperienceHero({
  displayLines,
  description,
  proof,
  ctaLabel,
  ctaHref,
  supportTitle,
  supportItems,
  toolLabels,
}: ExperienceHeroProps) {
  const heroCard = {
    id: "001",
    title: supportTitle,
    val: supportItems[0] ?? proof,
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-transparent selection:bg-white selection:text-black"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(255,255,255,0.08),transparent_18%),radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.04),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,rgba(2,2,2,0),#020202)]" />
      </div>

      <div className="relative z-10 flex min-h-screen w-full flex-col gap-8 px-8 pb-6 pt-[0.8125rem] md:flex-row md:items-stretch md:px-14 md:pb-12 md:pt-[2.125rem] lg:px-20 lg:pb-16 lg:pt-[3.5rem]">
        <div className="reveal-up flex min-w-0 flex-1 flex-col pb-8 md:pb-6">
          <div className="max-w-5xl pr-4 lg:-translate-y-8 lg:pr-12">
            <h1 className="text-[clamp(3.5rem,9.5vw,11.5rem)] leading-[0.87] font-black uppercase tracking-tighter text-white">
              {displayLines.map((line, index) => (
                <React.Fragment key={line}>
                  <span className={index === 1 ? "hero-outline-line text-outline" : undefined}>
                    {line}
                  </span>
                  {index < displayLines.length - 1 ? <br /> : null}
                </React.Fragment>
              ))}
            </h1>
            <p className="section-label mt-6 max-w-md normal-case leading-[1.9] font-medium tracking-[0.22em]">
              {description}
            </p>
            <a
              href={ctaHref}
              className="group mt-4 flex w-fit items-center gap-6 sm:mt-5 lg:mt-6"
            >
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-white/15 transition-all duration-300 ease-[var(--ease-standard)] group-hover:bg-white group-active:translate-y-px">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-white transition-colors duration-300 group-hover:stroke-black"
                >
                  <path
                    d="M7 17L17 7M17 7H8M17 7V16"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                {ctaLabel}
              </span>
            </a>
          </div>
        </div>

        <div className="z-20 flex w-full flex-shrink-0 flex-col gap-4 md:w-80 md:self-start md:justify-start lg:w-[28rem] xl:w-[32rem]">
          <div className="command-cell glass-panel block p-6 opacity-100 sm:p-7 lg:hidden">
            <span className="mb-3 block font-mono text-[9px] uppercase tracking-widest text-white/25">
              {heroCard.id}
              {" // "}
              {heroCard.title}
            </span>
            <div className="mt-4 space-y-3">
              <h4 className="text-lg font-semibold tracking-tight text-white">{heroCard.val}</h4>
              <ul className="space-y-2 text-sm leading-6 text-white/55">
                {supportItems.slice(0, 3).map((supportItem) => (
                  <li key={supportItem}>{supportItem}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="hidden min-h-[22rem] w-full items-center justify-center lg:flex xl:min-h-[25rem]">
            <DeferredToolIconCloud
              labels={toolLabels}
              textFallbackVariant="plain"
              className="h-[22rem] w-full xl:h-[25rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
