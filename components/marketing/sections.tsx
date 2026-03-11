import type { CTAConfig, SiteContent } from "@/content/site-content";

import { LinkButton, SectionShell } from "@/components/marketing/primitives";

type HeroSectionProps = {
  hero: SiteContent["hero"];
  cta: CTAConfig;
};

type PainPointsSectionProps = {
  painPoints: SiteContent["painPoints"];
};

type ServicesSectionProps = {
  services: SiteContent["services"];
};

type CaseStudiesSectionProps = {
  caseStudies: SiteContent["caseStudies"];
};

type ProcessSectionProps = {
  process: SiteContent["process"];
};

type AboutSectionProps = {
  about: SiteContent["about"];
};

type FAQSectionProps = {
  faq: SiteContent["faq"];
};

type BookingSectionProps = {
  booking: SiteContent["booking"];
  cta: CTAConfig;
};

export function HeroSection({ hero, cta }: HeroSectionProps) {
  return (
    <section id="hero" className="px-5 pb-16 pt-14 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.9fr)] lg:items-end">
        <div className="reveal-up">
          <p className="section-label">{hero.eyebrow}</p>
          <h1 className="section-title mt-6 max-w-4xl text-5xl leading-[0.95] text-balance text-[var(--color-ink)] sm:text-6xl lg:text-[5.2rem]">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-muted)] sm:text-xl">
            {hero.description}
          </p>
          <p className="mt-6 max-w-xl border-l-2 border-[var(--color-accent)] pl-4 text-sm leading-6 text-[var(--color-ink)] sm:text-base">
            {hero.proof}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <LinkButton href={cta.bookSectionHref}>{cta.primaryLabel}</LinkButton>
            <LinkButton href={cta.processHref} variant="secondary">
              {cta.secondaryLabel}
            </LinkButton>
          </div>
        </div>

        <div
          className="surface-card reveal-up p-6 sm:p-8"
          style={{ animationDelay: "120ms" }}
        >
          <p className="section-label">Operator Lens</p>
          <h2 className="font-heading mt-5 text-2xl text-[var(--color-ink)]">
            {hero.supportTitle}
          </h2>
          <ul className="mt-6 space-y-4">
            {hero.supportItems.map((item, index) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-6 text-[var(--color-muted)] sm:text-base"
              >
                <span className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[rgba(255,255,255,0.5)] text-xs font-semibold text-[var(--color-accent)]">
                  0{index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function PainPointsSection({ painPoints }: PainPointsSectionProps) {
  return (
    <SectionShell
      id="pain-points"
      eyebrow={painPoints.eyebrow}
      title={painPoints.title}
      description={painPoints.description}
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {painPoints.items.map((item, index) => (
          <article
            key={item.title}
            className="surface-card card-stagger p-6"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <p className="section-label">0{index + 1}</p>
            <h3 className="font-heading mt-5 text-2xl text-[var(--color-ink)]">
              {item.title}
            </h3>
            <p className="mt-4 text-sm leading-6 text-[var(--color-muted)] sm:text-base">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <SectionShell
      id="services"
      eyebrow={services.eyebrow}
      title={services.title}
      description={services.description}
    >
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {services.cards.map((card, index) => (
          <article
            key={card.title}
            className="surface-card card-stagger flex h-full flex-col p-6"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <p className="section-label">Service 0{index + 1}</p>
            <h3 className="font-heading mt-5 text-2xl text-[var(--color-ink)]">
              {card.title}
            </h3>
            <p className="mt-4 text-sm leading-6 text-[var(--color-muted)] sm:text-base">
              {card.description}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-8 surface-card px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <p className="section-label">Tool Strip</p>
          <div className="flex flex-wrap gap-2">
            {services.toolChips.map((chip) => (
              <span
                key={chip}
                className="inline-flex rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.46)] px-3 py-2 text-sm text-[var(--color-muted)]"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
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
      <div className="surface-card p-5 sm:p-6">
        <p className="text-sm leading-6 text-[var(--color-muted)]">
          {caseStudies.disclaimer}
        </p>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        {caseStudies.items.map((study, index) => (
          <article
            key={study.id}
            className="surface-card card-stagger flex h-full flex-col p-6"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-label">{study.clientType}</p>
                <h3 className="font-heading mt-4 text-2xl text-[var(--color-ink)]">
                  {study.title}
                </h3>
              </div>

              {study.logoLabel ? (
                <span className="rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.42)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  {study.logoLabel}
                </span>
              ) : null}
            </div>

            <div className="mt-6 space-y-5 text-sm leading-6 text-[var(--color-muted)]">
              <div>
                <p className="section-label">Challenge</p>
                <p className="mt-2">{study.challenge}</p>
              </div>
              <div>
                <p className="section-label">Intervention</p>
                <p className="mt-2">{study.intervention}</p>
              </div>
              <div>
                <p className="section-label">Outcomes</p>
                <ul className="mt-3 space-y-3">
                  {study.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {study.quote ? (
              <blockquote className="mt-6 border-l border-[var(--color-border-strong)] pl-4 text-sm italic leading-6 text-[var(--color-ink)]">
                {study.quote}
              </blockquote>
            ) : null}
          </article>
        ))}
      </div>
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
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {process.steps.map((step, index) => (
          <article
            key={step.title}
            className="surface-card card-stagger flex h-full flex-col p-6"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--color-border-strong)] bg-[rgba(255,255,255,0.55)] font-heading text-lg text-[var(--color-accent)]">
              0{index + 1}
            </div>
            <h3 className="font-heading mt-6 text-2xl text-[var(--color-ink)]">
              {step.title}
            </h3>
            <p className="mt-4 text-sm leading-6 text-[var(--color-muted)] sm:text-base">
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <SectionShell
      id="about"
      eyebrow={about.eyebrow}
      title={about.title}
      description={about.description}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)]">
        <div className="surface-card p-6 sm:p-8">
          <div className="space-y-5 text-base leading-7 text-[var(--color-muted)]">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {about.credibilityPoints.map((point, index) => (
            <article
              key={point.title}
              className="surface-card card-stagger p-6"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <p className="section-label">Reason 0{index + 1}</p>
              <h3 className="font-heading mt-5 text-2xl text-[var(--color-ink)]">
                {point.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-[var(--color-muted)] sm:text-base">
                {point.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

export function FAQSection({ faq }: FAQSectionProps) {
  return (
    <SectionShell
      id="faq"
      eyebrow={faq.eyebrow}
      title={faq.title}
      description={faq.description}
    >
      <div className="grid gap-4">
        {faq.items.map((item, index) => (
          <details
            key={item.question}
            className="detail-toggle surface-card card-stagger p-6"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <summary className="cursor-pointer pr-10 text-left font-heading text-xl text-[var(--color-ink)] focus-visible:outline-none">
              {item.question}
            </summary>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">
              {item.answer}
            </p>
          </details>
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
      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.85fr)_minmax(22rem,1.15fr)]">
        <div className="surface-card flex h-full flex-col p-6 sm:p-8">
          <p className="section-label">What to expect</p>
          <ul className="mt-6 space-y-4 text-sm leading-6 text-[var(--color-muted)] sm:text-base">
            {booking.checklist.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-3xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.44)] p-5">
            <p className="section-label">{booking.fallbackLabel}</p>
            <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
              Reach FrehStack directly at{" "}
              <a
                href={`mailto:${cta.contactEmail}`}
                className="font-semibold text-[var(--color-ink)] underline decoration-[var(--color-accent)] underline-offset-4"
              >
                {cta.contactEmail}
              </a>
              .
            </p>
          </div>

          <div className="mt-8 md:hidden">
            {cta.hasLiveBookingUrl ? (
              <LinkButton href={cta.bookingUrl} className="w-full">
                {cta.primaryLabel}
              </LinkButton>
            ) : (
              <div className="rounded-3xl border border-dashed border-[var(--color-border-strong)] bg-[rgba(255,255,255,0.35)] p-5 text-sm leading-6 text-[var(--color-muted)]">
                Add `NEXT_PUBLIC_CALENDLY_URL` to enable the mobile external
                booking button.
              </div>
            )}
          </div>
        </div>

        <div className="surface-card hidden min-h-[44rem] overflow-hidden p-2 md:block">
          {cta.bookingEmbedUrl ? (
            <iframe
              title={booking.desktopLabel}
              src={cta.bookingEmbedUrl}
              className="h-full min-h-[42rem] w-full rounded-[1.4rem] border-0 bg-white"
            />
          ) : (
            <div className="flex h-full min-h-[42rem] flex-col justify-between rounded-[1.4rem] border border-dashed border-[var(--color-border-strong)] bg-[rgba(255,255,255,0.45)] p-8">
              <div>
                <p className="section-label">Calendly not configured yet</p>
                <h3 className="font-heading mt-5 text-3xl text-[var(--color-ink)]">
                  Add a live booking URL to enable the desktop embed.
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                  Set `NEXT_PUBLIC_CALENDLY_URL` at build time. The section is
                  already wired to render the embed on desktop and the external
                  button on mobile once the URL is present.
                </p>
              </div>

              <div className="rounded-3xl border border-[var(--color-border)] bg-[rgba(255,255,255,0.5)] p-5">
                <p className="section-label">Configured fallback</p>
                <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                  Until then, direct outreach can go through{" "}
                  <a
                    href={`mailto:${cta.contactEmail}`}
                    className="font-semibold text-[var(--color-ink)] underline decoration-[var(--color-accent)] underline-offset-4"
                  >
                    {cta.contactEmail}
                  </a>
                  .
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
