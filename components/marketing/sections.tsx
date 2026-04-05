import type { CTAConfig, SiteContent } from "@/content/site-content";

import { CaseStudiesDialogGrid } from "@/components/marketing/case-studies-dialog-grid";
import { FounderCarousel } from "@/components/marketing/founder-carousel";
import { HeroSectionV2 } from "@/components/marketing/hero-section-v2";
import { PainPointsSectionV2 } from "@/components/marketing/pain-points-section-v2";
import { LinkButton, SectionShell } from "@/components/marketing/primitives";
import { DeferredCalendlyInlineEmbed } from "@/components/ui/deferred-calendly-inline-embed";
import { ExperienceHero } from "@/components/ui/experience-hero";
import { ToolTypewriterBar } from "@/components/ui/tool-typewriter-bar";

type HeroSectionProps = {
  hero: SiteContent["hero"];
  cta: CTAConfig;
};

type PainPointsSectionProps = {
  painPoints: SiteContent["painPoints"];
  toolLabels: SiteContent["toolChips"];
};

type FounderSectionProps = {
  founder: SiteContent["founder"];
};

type CaseStudiesSectionProps = {
  caseStudies: SiteContent["caseStudies"];
};

type ProcessSectionProps = {
  process: SiteContent["process"];
};

type BookingSectionProps = {
  booking: SiteContent["booking"];
  cta: CTAConfig;
};

export function HeroSection({ hero, cta }: HeroSectionProps) {
  return <HeroSectionV2 />;
}

export function PainPointsSection({ painPoints, toolLabels }: PainPointsSectionProps) {
  return <PainPointsSectionV2 />;
}

export function FounderSection({ founder }: FounderSectionProps) {
  return (
    <section
      id="founder"
      className="relative z-10 px-5 pb-[4.5rem] sm:px-6 lg:px-8 lg:pb-24"
    >
      <div className="mx-auto max-w-6xl">
        <p className="section-label mb-5">
          {"// "}
          {founder.eyebrow}
        </p>
        <FounderCarousel profiles={founder.profiles} />
      </div>
    </section>
  );
}

export function CaseStudiesSection({
  caseStudies,
}: CaseStudiesSectionProps) {
  return (
    <section
      id="case-studies"
      className="relative z-10 bg-[#0a0a0a] px-5 pb-24 pt-0 sm:px-8 lg:px-10 lg:pb-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-label mb-5">
                <span className="mr-2 opacity-50">//</span>
                {caseStudies.eyebrow}
              </p>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#f5f0e8]">
                {caseStudies.title}
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-[1.8] text-[#8e8e93] sm:text-right">
              Three builds. Three different problems. The same outcome — less manual work, more leverage.
            </p>
          </div>
        </div>

        <CaseStudiesDialogGrid items={caseStudies.items} />
      </div>
    </section>
  );
}

export function ProcessSection({ process }: ProcessSectionProps) {
  const above = process.steps.filter((_, i) => i % 2 === 0); // 1, 3
  const below = process.steps.filter((_, i) => i % 2 === 1); // 2, 4

  return (
    <section
      id="process"
      className="relative z-10 bg-[#0a0a0a] px-5 pb-24 pt-0 sm:px-8 lg:px-10 lg:pb-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16">
          <p className="section-label mb-5">
            <span className="mr-2 opacity-50">//</span>
            {process.eyebrow}
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#f5f0e8]">
            {process.title}
          </h2>
        </div>

        {/* Desktop timeline */}
        <div className="hidden lg:block">
          {/* Steps above the line (01, 03) */}
          <div className="grid grid-cols-4">
            {process.steps.map((step, i) =>
              i % 2 === 0 ? (
                <div key={step.title} className="pb-10 pr-8">
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#c8c0b0]/50">
                    0{i + 1}
                  </p>
                  <h3 className="text-xl font-bold tracking-[-0.025em] text-[#f5f0e8]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.75] text-[#8e8e93]">
                    {step.description}
                  </p>
                </div>
              ) : (
                <div key={step.title} />
              )
            )}
          </div>

          {/* The line with dots */}
          <div className="relative flex items-center">
            <div className="h-px w-full bg-[rgba(245,240,232,0.15)]" />
            {/* Arrow at right end */}
            <svg
              width="8"
              height="10"
              viewBox="0 0 8 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
              aria-hidden="true"
            >
              <path
                d="M1 1L7 5L1 9"
                stroke="rgba(245,240,232,0.4)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {/* Dots aligned with left edge of each column */}
            {process.steps.map((_, i) => (
              <div
                key={i}
                className="absolute z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 top-1/2 rounded-full border border-[rgba(245,240,232,0.2)] bg-[#f5f0e8]/70"
                style={{ left: `${(i / process.steps.length) * 100}%` }}
              />
            ))}
          </div>

          {/* Steps below the line (02, 04) */}
          <div className="grid grid-cols-4">
            {process.steps.map((step, i) =>
              i % 2 === 1 ? (
                <div key={step.title} className="pt-10 pr-8">
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#c8c0b0]/50">
                    0{i + 1}
                  </p>
                  <h3 className="text-xl font-bold tracking-[-0.025em] text-[#f5f0e8]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.75] text-[#8e8e93]">
                    {step.description}
                  </p>
                </div>
              ) : (
                <div key={step.title} />
              )
            )}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="space-y-0 lg:hidden">
          {process.steps.map((step, i) => (
            <div key={step.title} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border border-[rgba(245,240,232,0.2)] bg-[#f5f0e8]/70" />
                {i < process.steps.length - 1 && (
                  <div className="mt-1 w-px flex-1 bg-[rgba(245,240,232,0.15)]" />
                )}
              </div>
              <div className="pb-10">
                <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#c8c0b0]/50">
                  0{i + 1}
                </p>
                <h3 className="text-xl font-bold tracking-[-0.025em] text-[#f5f0e8]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.75] text-[#8e8e93]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BookingSection({ booking, cta }: BookingSectionProps) {
  return (
    <SectionShell
      id="book-a-call"
      eyebrow={booking.eyebrow}
      title={booking.title}
      description={booking.description}
      className="pb-28 md:pb-24"
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.78fr)_minmax(22rem,1.22fr)]">
        <div className="glass-panel p-6 sm:p-7" style={{ borderRadius: 0 }}>
          <p className="section-label">What to expect</p>
          <ul className="mt-6 space-y-4 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
            {booking.checklist.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <p className="section-label">{booking.fallbackLabel}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
              Reach FreshStack directly at{" "}
              <a
                href={`mailto:${cta.contactEmail}`}
                className="font-medium text-[var(--color-ink)] underline decoration-white/25 underline-offset-4"
              >
                {cta.contactEmail}
              </a>
              .
            </p>
          </div>

          <div className="mt-8 md:hidden">
            {cta.hasLiveBookingUrl ? (
              <LinkButton href={cta.bookingUrl} className="w-full" variant="secondary">
                {cta.primaryLabel}
              </LinkButton>
            ) : (
              <div className="rounded-[1rem] border border-dashed border-white/18 p-5 text-sm leading-7 text-[var(--color-muted)]">
                Add `NEXT_PUBLIC_CALENDLY_URL` to enable the mobile external
                booking button.
              </div>
            )}
          </div>
        </div>

        <div className="glass-panel hidden p-6 md:block" style={{ borderRadius: 0 }}>
          <p className="section-label text-center">{booking.desktopLabel}</p>
          <div className="mt-5 overflow-hidden rounded-[1rem] border border-white/8 bg-black/35 p-2">
            {cta.bookingEmbedUrl ? (
              <DeferredCalendlyInlineEmbed
                url={cta.bookingEmbedUrl}
                className="rounded-[0.9rem]"
                warmupTargetId="process"
              />
            ) : (
              <div className="rounded-[1rem] border border-dashed border-white/18 p-5 text-sm leading-7 text-[var(--color-muted)]">
                Add `NEXT_PUBLIC_CALENDLY_URL` to enable the desktop booking
                embed.
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
