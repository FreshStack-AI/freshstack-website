import type { CTAConfig, SiteContent } from "@/content/site-content";

import { BrandMark, LinkButton, SectionShell } from "@/components/marketing/primitives";

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
    <section id="hero" className="px-5 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,24rem)] lg:gap-12">
          <div className="reveal-up">
            <p className="section-label">{hero.eyebrow}</p>
            <h1 className="section-title mt-6 max-w-4xl text-5xl leading-[0.96] text-balance text-[var(--color-ink)] sm:text-6xl lg:text-[4.9rem]">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--color-muted)] sm:text-[1.35rem] sm:leading-9">
              {hero.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href={cta.bookSectionHref}>{cta.primaryLabel}</LinkButton>
              <LinkButton href={cta.processHref} variant="secondary">
                {cta.secondaryLabel}
              </LinkButton>
            </div>

            <div className="mt-10 max-w-2xl border-l-4 border-[var(--color-accent)] pl-4">
              <p className="text-sm leading-7 text-[var(--color-ink)] sm:text-base">
                {hero.proof}
              </p>
            </div>
          </div>

          <div className="reveal-up lg:pt-2" style={{ animationDelay: "120ms" }}>
            <div className="surface-card border-t-4 border-[var(--color-accent)] p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <BrandMark />
                <p className="text-sm font-medium text-[var(--color-accent)]">FreshStack</p>
              </div>
              <p className="section-label mt-5">{hero.supportTitle}</p>
              <div className="mt-6 space-y-0">
                {hero.supportItems.map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-4 border-t border-[var(--color-border)] py-4 first:border-t-0 first:pt-0 last:pb-0"
                  >
                    <span className="w-8 shrink-0 text-sm font-medium text-[var(--color-accent)]">
                      0{index + 1}
                    </span>
                    <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
      <div className="grid gap-x-12 md:grid-cols-2">
        {painPoints.items.map((item, index) => (
          <article
            key={item.title}
            className="card-stagger border-t border-[var(--color-border)] py-6"
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <p className="text-sm font-medium text-[var(--color-accent)]">0{index + 1}</p>
            <h3 className="mt-4 text-2xl font-bold tracking-[-0.02em] text-[var(--color-ink)] sm:text-[1.75rem]">
              {item.title}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">
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
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {services.cards.map((card, index) => (
          <article
            key={card.title}
            className="surface-card-dark card-stagger flex h-full flex-col p-6"
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <p className="text-sm font-medium text-[var(--color-accent)]">Service</p>
            <h3 className="mt-5 text-2xl font-bold tracking-[-0.02em] text-[var(--color-white)]">
              {card.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-[color:rgba(255,255,255,0.72)] sm:text-base">
              {card.description}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-10 border-t border-[var(--color-border)] pt-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <p className="section-label">Tool stack</p>
          <div className="flex max-w-3xl flex-wrap gap-3 text-sm text-[var(--color-muted)] sm:text-base">
            {services.toolChips.map((chip, index) => (
              <span
                key={chip}
                className={
                  index === 0
                    ? "inline-flex rounded-full border border-[rgba(249,115,22,0.18)] bg-[var(--color-accent-tint)] px-3 py-1.5"
                    : "inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-white)] px-3 py-1.5"
                }
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
      <div className="surface-card-muted border-l-4 border-l-[var(--color-accent)] p-5 sm:p-6">
        <p className="max-w-3xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">
          {caseStudies.disclaimer}
        </p>
      </div>

      <div className="mt-8 grid gap-5 xl:grid-cols-3">
        {caseStudies.items.map((study, index) => (
          <article
            key={study.id}
            className="surface-card card-stagger flex h-full flex-col border-t-4 border-[var(--color-accent)] p-6 sm:p-7"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[var(--color-accent)]">
                  {study.clientType}
                </p>
                <h3 className="mt-4 text-2xl font-bold tracking-[-0.02em] text-[var(--color-ink)]">
                  {study.title}
                </h3>
              </div>

              {study.logoLabel ? (
                <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-medium text-[var(--color-muted)]">
                  {study.logoLabel}
                </span>
              ) : null}
            </div>

            <div className="mt-6 space-y-6 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
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
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-sm bg-[var(--color-accent)]" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {study.quote ? (
              <blockquote className="mt-6 border-l-2 border-[var(--color-accent)] pl-4 text-sm italic leading-7 text-[var(--color-ink)]">
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
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {process.steps.map((step, index) => (
          <article
            key={step.title}
            className="surface-card card-stagger p-6"
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <p className="text-sm font-medium text-[var(--color-accent)]">0{index + 1}</p>
            <h3 className="mt-5 text-2xl font-bold tracking-[-0.02em] text-[var(--color-ink)]">
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

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <SectionShell
      id="about"
      eyebrow={about.eyebrow}
      title={about.title}
      description={about.description}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] lg:gap-10">
        <div className="surface-card p-6 sm:p-7">
          <div className="space-y-5 text-base leading-8 text-[var(--color-muted)] sm:text-lg">
            {about.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={index === 0 ? "max-w-3xl text-[var(--color-ink)]" : "max-w-3xl"}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {about.credibilityPoints.map((point, index) => (
            <article
              key={point.title}
              className="surface-card card-stagger border-t-4 border-[var(--color-accent)] p-6"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <p className="text-sm font-medium text-[var(--color-accent)]">Reason 0{index + 1}</p>
              <h3 className="mt-4 text-2xl font-bold tracking-[-0.02em] text-[var(--color-ink)]">
                {point.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
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
      <div className="grid gap-0">
        {faq.items.map((item, index) => (
          <details
            key={item.question}
            className="detail-toggle card-stagger border-t border-[var(--color-border)] py-6"
            style={{ animationDelay: `${index * 55}ms` }}
          >
            <summary className="cursor-pointer pr-10 text-left text-xl font-bold tracking-[-0.02em] text-[var(--color-ink)] focus-visible:outline-none sm:text-[1.55rem]">
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
      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.78fr)_minmax(22rem,1.22fr)]">
        <div className="surface-card border-t-4 border-[var(--color-accent)] p-6 sm:p-7">
          <p className="section-label">What to expect</p>
          <ul className="mt-6 space-y-4 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
            {booking.checklist.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-sm bg-[var(--color-accent)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-accent-tint)] p-5">
            <p className="section-label">{booking.fallbackLabel}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
              Reach FreshStack directly at{" "}
              <a
                href={`mailto:${cta.contactEmail}`}
                className="font-medium text-[var(--color-ink)] underline decoration-[var(--color-border-strong)] underline-offset-4"
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
              <div className="rounded-[1rem] border border-dashed border-[var(--color-border-strong)] p-5 text-sm leading-7 text-[var(--color-muted)]">
                Add `NEXT_PUBLIC_CALENDLY_URL` to enable the mobile external
                booking button.
              </div>
            )}
          </div>
        </div>

        <div className="surface-card hidden min-h-[44rem] overflow-hidden border-t-4 border-[var(--color-accent)] p-2 md:block">
          {cta.bookingEmbedUrl ? (
            <iframe
              title={booking.desktopLabel}
              src={cta.bookingEmbedUrl}
              className="h-full min-h-[42rem] w-full rounded-[1rem] border-0 bg-[var(--color-white)]"
            />
          ) : (
            <div className="flex h-full min-h-[42rem] flex-col justify-between rounded-[1rem] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-white)] p-8">
              <div>
                <p className="section-label">Calendly not configured yet</p>
                <h3 className="mt-5 max-w-xl text-3xl font-bold tracking-[-0.02em] text-[var(--color-ink)]">
                  Add a live booking URL to enable the desktop embed.
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                  Set `NEXT_PUBLIC_CALENDLY_URL` at build time. The section is
                  already wired to render the embed on desktop and the external
                  button on mobile once the URL is present.
                </p>
              </div>

              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-white)] p-5">
                <p className="section-label">Configured fallback</p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                  Until then, direct outreach can go through{" "}
                  <a
                    href={`mailto:${cta.contactEmail}`}
                    className="font-medium text-[var(--color-ink)] underline decoration-[var(--color-border-strong)] underline-offset-4"
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
