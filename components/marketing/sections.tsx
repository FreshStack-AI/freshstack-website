import type { CTAConfig, SiteContent } from "@/content/site-content";

import { CaseStudiesDialogGrid } from "@/components/marketing/case-studies-dialog-grid";
import { ChecklistEmailCapture } from "@/components/marketing/checklist-email-capture";
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
      className="relative z-10 px-5 pb-24 pt-0 sm:px-8 lg:px-10 lg:pb-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <p className="section-label mb-5">
            <span className="mr-2 opacity-50">//</span>
            {founder.eyebrow}
          </p>
          <h2 className="section-title mb-5 text-3xl text-[var(--color-ink)] sm:text-4xl lg:text-[3rem]">
            You get the founders, every time.
          </h2>
          <p className="max-w-3xl text-sm leading-[1.8] text-[#8e8e93] sm:text-base sm:leading-8">
            FreshStack is based in the UAE, one of the fastest-moving regions in the world for technology adoption. Our clients operate in an environment that expects speed, scale, and modern infrastructure.
          </p>
        </div>
        <FounderCarousel profiles={founder.profiles} />

        {/* Accreditations */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <span className="font-mono text-[10px] font-normal uppercase tracking-[0.2em] text-[#c8c0b0]/40">
            <span className="mr-1.5 opacity-50">//</span>
            Certified in
          </span>
          {["n8n", "Make", "Claude AI"].map((cert, i) => (
            <span key={cert} className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#8e8e93]">
              {cert}{i < 2 && <span className="ml-2 text-[#c8c0b0]/30">·</span>}
            </span>
          ))}
        </div>
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
      className="relative z-10 px-5 pb-24 pt-0 sm:px-8 lg:px-10 lg:pb-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16">
          <p className="section-label mb-5">
            <span className="mr-2 opacity-50">//</span>
            {caseStudies.eyebrow}
          </p>
          <h2 className="section-title mb-5 text-3xl text-[var(--color-ink)] sm:text-4xl lg:text-[3rem]">
            {caseStudies.title}
          </h2>
          {caseStudies.description && (
            <p className="max-w-xl text-sm leading-[1.8] text-[#8e8e93] sm:text-base sm:leading-8">
              {caseStudies.description}
            </p>
          )}
        </div>

        <CaseStudiesDialogGrid items={caseStudies.items} />

        {/* CTA — email capture */}
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="text-base leading-relaxed text-[#8e8e93] sm:text-lg">
            Not ready to talk yet? Get our 5-minute ops audit checklist.
          </p>
          <p className="text-sm text-[#6e6e73]">
            Find the bottleneck before we do.
          </p>
          <ChecklistEmailCapture />
        </div>
      </div>
    </section>
  );
}

export function ProcessSection({ process }: ProcessSectionProps) {
  return (
    <section
      id="process"
      className="relative z-10 px-5 pb-24 pt-0 sm:px-8 lg:px-10 lg:pb-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16">
          <p className="section-label mb-5">
            <span className="mr-2 opacity-50">//</span>
            {process.eyebrow}
          </p>
          <h2 className="section-title mb-5 text-3xl text-[var(--color-ink)] sm:text-4xl lg:text-[3rem]">
            {process.title}
          </h2>
          <p className="max-w-3xl text-sm leading-[1.8] text-[#8e8e93] sm:text-base sm:leading-8">
            Every engagement follows the same four steps. No surprises, no open-ended timelines.
            <br />
            You know what happens next at every stage.
          </p>
        </div>

        {/* Desktop timeline */}
        <div className="hidden lg:block">
          {/* Steps above the line (01, 03) */}
          <div className="grid grid-cols-4">
            {process.steps.map((step, i) =>
              i % 2 === 0 ? (
                <div key={step.title} className="pb-10 pr-8">
                  <p
                    className="mb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[#c8c0b0]"
                  >
                    0{i + 1}
                  </p>
                  <h3
                    className="font-[family-name:var(--font-space-grotesk),ui-sans-serif] text-[26px] font-bold leading-[1.15] tracking-[-0.025em] text-[#f5f0e8]"
                  >
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

          {/* The line with dots and arrow */}
          <div className="relative flex items-center">
            <div
              className="h-px w-full"
              style={{
                background:
                  "linear-gradient(90deg, rgba(200,192,176,0.1), rgba(200,192,176,0.25), rgba(200,192,176,0.15))",
              }}
            />
            {/* Filled arrow at right end */}
            <svg
              width="12"
              height="14"
              viewBox="0 0 12 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
              aria-hidden="true"
            >
              <path
                d="M1 1L11 7L1 13V1Z"
                fill="#c8c0b0"
                stroke="#c8c0b0"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            {/* Dots — first dot larger and accent colour */}
            {process.steps.map((_, i) => (
              <div
                key={i}
                className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 top-1/2 rounded-full ${
                  i === 0
                    ? "h-3.5 w-3.5 bg-[#f5f0e8] shadow-[0_0_8px_rgba(245,240,232,0.3)]"
                    : "h-2.5 w-2.5 border border-[rgba(200,192,176,0.3)] bg-[#8e8e93]/50"
                }`}
                style={{ left: `${(i / process.steps.length) * 100}%` }}
              />
            ))}
          </div>

          {/* Steps below the line (02, 04) */}
          <div className="grid grid-cols-4">
            {process.steps.map((step, i) =>
              i % 2 === 1 ? (
                <div
                  key={step.title}
                  className="rounded-lg pt-10 pr-8 pb-6 pl-4"
                  style={{ background: "rgba(28,28,30,0.5)" }}
                >
                  <p
                    className="mb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[#c8c0b0]"
                  >
                    0{i + 1}
                  </p>
                  <h3
                    className="font-[family-name:var(--font-space-grotesk),ui-sans-serif] text-[26px] font-bold leading-[1.15] tracking-[-0.025em] text-[#f5f0e8]"
                  >
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
                <div
                  className={`mt-1.5 shrink-0 rounded-full ${
                    i === 0
                      ? "h-3.5 w-3.5 bg-[#f5f0e8] shadow-[0_0_8px_rgba(245,240,232,0.3)]"
                      : "h-2.5 w-2.5 border border-[rgba(200,192,176,0.3)] bg-[#8e8e93]/50"
                  }`}
                />
                {i < process.steps.length - 1 && (
                  <div
                    className="mt-1 w-px flex-1"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(200,192,176,0.2), rgba(200,192,176,0.08))",
                    }}
                  />
                )}
              </div>
              <div className="pb-10">
                <p
                  className="mb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-[#c8c0b0]"
                >
                  0{i + 1}
                </p>
                <h3
                  className="font-[family-name:var(--font-space-grotesk),ui-sans-serif] text-[26px] font-bold leading-[1.15] tracking-[-0.025em] text-[#f5f0e8]"
                >
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.75] text-[#8e8e93]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing statement */}
        <div className="mt-16">
          <div
            className="h-px w-full mb-8"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(200,200,210,0.2), transparent)",
            }}
          />
          <p className="text-center text-sm leading-[1.8] text-[#8e8e93]">
            Every engagement starts with a fixed setup fee. Every system we build is covered by a monthly retainer. No open-ended billing. No surprises.
          </p>
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
        <div
          className="group relative overflow-hidden rounded-xl border border-[rgba(80,80,85,0.6)] p-7 backdrop-blur-[12px] self-start sm:p-8"
          style={{
            background:
              "linear-gradient(135deg, rgba(200,200,210,0.03) 0%, transparent 40%, rgba(200,200,210,0.02) 70%, transparent 100%), linear-gradient(180deg, rgba(245,240,232,0.02), rgba(245,240,232,0.005)), rgba(20,20,22,0.92)",
            boxShadow:
              "inset 0 1px 0 rgba(245,240,232,0.025), 0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          {/* Left chrome accent bar */}
          <div
            className="pointer-events-none absolute bottom-6 left-0 top-6 w-[2px]"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(200,200,210,0.3), rgba(255,255,255,0.5), rgba(200,200,210,0.3), transparent)",
            }}
          />

          {/* Diagonal light sweep */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.02) 48%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.02) 52%, transparent 70%)",
            }}
          />

          <div className="relative z-10">
            <p className="section-label">What to expect</p>
            <div className="mt-5 space-y-1 text-sm leading-7 text-[#8e8e93] sm:text-base">
              <p>30 minutes.</p>
              <p>No preparation needed from you.</p>
              <p>You&apos;ll leave knowing what to fix first.</p>
            </div>

            <p className="mt-6 text-[13px] leading-6 text-[#6e6e73]">
              Prefer email?{" "}
              <a
                href={`mailto:${cta.contactEmail}`}
                className="text-[#8e8e93] underline decoration-white/20 underline-offset-4 hover:text-[var(--color-ink)]"
              >
                {cta.contactEmail}
              </a>
              {" "}— we reply within one business day.
            </p>

            <div className="mt-6 md:hidden">
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
        </div>

        <div
          className="relative hidden overflow-hidden rounded-xl border border-[rgba(80,80,85,0.6)] p-6 backdrop-blur-[12px] md:block"
          style={{
            background:
              "linear-gradient(135deg, rgba(200,200,210,0.03) 0%, transparent 40%, rgba(200,200,210,0.02) 70%, transparent 100%), linear-gradient(180deg, rgba(245,240,232,0.02), rgba(245,240,232,0.005)), rgba(20,20,22,0.92)",
            boxShadow:
              "inset 0 1px 0 rgba(245,240,232,0.025), 0 8px 32px rgba(0,0,0,0.3)",
          }}
        >
          <div className="overflow-hidden rounded-[1rem] border border-white/8 bg-black/35 p-2">
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
