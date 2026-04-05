import type { CTAConfig, SiteContent } from "@/content/site-content";

import { CaseStudiesDialogGrid } from "@/components/marketing/case-studies-dialog-grid";
import { FounderCarousel } from "@/components/marketing/founder-carousel";
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
  return (
    <ExperienceHero
      displayLines={hero.displayLines}
      description={hero.description}
      ctaLabel={cta.primaryLabel}
      ctaHref={cta.bookSectionHref}
    />
  );
}

export function PainPointsSection({ painPoints, toolLabels }: PainPointsSectionProps) {
  return (
    <SectionShell
      id="pain-points"
      eyebrow={painPoints.eyebrow}
      title={painPoints.title}
      description={painPoints.description}
    >
      <div className="grid gap-x-12 gap-y-2 md:grid-cols-2">
        {painPoints.items.map((item, index) => (
          <article
            key={item.title}
            className="card-stagger glass-panel p-6 sm:p-7"
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <p className="section-label">0{index + 1}</p>
            <h3 className="mt-4 text-2xl font-bold tracking-[-0.03em] text-[var(--color-ink)] sm:text-[1.75rem]">
              {item.title}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">
              {item.description}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-10 w-full px-2 py-2">
        <div className="relative px-3 py-3">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/14" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/14" />
          <ToolTypewriterBar labels={toolLabels} slotCount={6} />
        </div>
      </div>
    </SectionShell>
  );
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
    <SectionShell
      id="case-studies"
      eyebrow={caseStudies.eyebrow}
      title={caseStudies.title}
      description={caseStudies.description}
    >
      <CaseStudiesDialogGrid items={caseStudies.items} />
    </SectionShell>
  );
}

export function ProcessSection({ process }: ProcessSectionProps) {
  return (
    <SectionShell
      id="process"
      eyebrow={process.eyebrow}
      title={process.title}
      description={process.description}
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {process.steps.map((step, index) => (
          <article
            key={step.title}
            className="glass-panel card-stagger p-6"
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <p className="section-label">0{index + 1}</p>
            <h3 className="mt-5 text-2xl font-bold tracking-[-0.03em] text-[var(--color-ink)]">
              {step.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
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
        <div className="glass-panel p-6 sm:p-7">
          <p className="section-label">What to expect</p>
          <ul className="mt-6 space-y-4 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
            {booking.checklist.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-[1.1rem] border border-white/8 bg-white/4 p-5">
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

        <div className="glass-panel hidden p-6 md:block">
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
