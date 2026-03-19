import type { CTAConfig, SiteContent } from "@/content/site-content";
import Image from "next/image";

import { CaseStudiesDialogGrid } from "@/components/marketing/case-studies-dialog-grid";
import { LinkButton, SectionShell } from "@/components/marketing/primitives";
import { ServicesExpandRail } from "@/components/marketing/services-expand-rail";
import { ExperienceHero } from "@/components/ui/experience-hero";
import { ToolIconCloud } from "@/components/ui/tool-icon-cloud";
import { cn } from "@/lib/utils";

type HeroSectionProps = {
  hero: SiteContent["hero"];
  cta: CTAConfig;
  toolLabels: SiteContent["services"]["toolChips"];
};

type PainPointsSectionProps = {
  painPoints: SiteContent["painPoints"];
};

type ServicesSectionProps = {
  services: SiteContent["services"];
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

export function HeroSection({ hero, cta, toolLabels }: HeroSectionProps) {
  return (
    <ExperienceHero
      eyebrow={hero.eyebrow}
      displayLines={hero.displayLines}
      description={hero.description}
      proof={hero.proof}
      ctaLabel={cta.primaryLabel}
      ctaHref={cta.bookSectionHref}
      supportTitle={hero.supportTitle}
      supportItems={hero.supportItems}
      toolLabels={toolLabels}
    />
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
        <article className="glass-panel card-stagger p-6 sm:p-8 lg:p-10">
          <div className="space-y-8 sm:space-y-10">
            {founder.profiles.map((profile, index) => {
              const isReverse = index % 2 === 1;

              return (
                <div
                  key={profile.name}
                  className={cn(
                    "grid gap-6 lg:items-center lg:gap-10",
                    isReverse
                      ? "lg:grid-cols-[17rem_minmax(0,1fr)]"
                      : "lg:grid-cols-[minmax(0,1fr)_17rem]",
                    index > 0 && "border-t border-white/8 pt-8 sm:pt-10",
                  )}
                >
                  <div
                    className={cn(
                      "space-y-5",
                      isReverse && "lg:order-2 lg:text-right",
                    )}
                  >
                    <div className={cn("inline-flex flex-col gap-2", isReverse && "lg:items-end")}>
                      <h2 className="section-title text-[1.85rem] uppercase sm:text-[2.2rem]">
                        {profile.name}
                      </h2>
                      <span className="h-[3px] w-28 rounded-full bg-white/75" />
                    </div>

                    <p
                      className={cn(
                        "max-w-4xl text-base leading-8 text-[var(--color-muted)] sm:text-lg",
                        isReverse && "lg:ml-auto",
                      )}
                    >
                      {profile.bio}
                    </p>
                  </div>

                  <div
                    className={cn(
                      "overflow-hidden rounded-[1.15rem] bg-black",
                      isReverse ? "lg:order-1" : "lg:order-2",
                    )}
                  >
                    <div className="relative aspect-[4/5]">
                      {profile.usePlaceholder || !profile.imageSrc ? (
                        <div className="flex h-full w-full items-center justify-center bg-black">
                          <span className="text-[2rem] font-light tracking-[-0.03em] text-white/90">
                            photo
                          </span>
                        </div>
                      ) : (
                        <>
                          <Image
                            src={profile.imageSrc}
                            alt={profile.imageAlt}
                            fill
                            sizes="(min-width: 1024px) 17rem, (min-width: 640px) 18rem, 100vw"
                            className="object-cover object-center grayscale"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      </div>
    </section>
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
      <ServicesExpandRail cards={services.cards} />

      <div className="mt-10 border-t border-[var(--color-border)] pt-5">
        <div className="flex flex-col gap-4">
          <p className="section-label">Tool stack</p>
          <div className="grid items-start gap-5 md:grid-cols-[minmax(0,1.08fr)_minmax(20rem,28rem)]">
            <div className="glass-panel p-5 sm:p-6">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {services.toolChips.map((chip) => (
                <span
                  key={chip}
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/10 bg-white/6 px-4 py-2 text-center font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white"
                >
                  {chip}
                </span>
              ))}
              </div>
            </div>

            <div className="glass-panel self-start overflow-hidden p-3 sm:p-4 md:aspect-square">
              <div className="flex h-full min-h-[22rem] items-center justify-center sm:min-h-[24rem]">
                <ToolIconCloud labels={services.toolChips} />
              </div>
            </div>
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

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <SectionShell
      id="about"
      eyebrow={about.eyebrow}
      title={about.title}
      description={about.description}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] lg:gap-10">
        <div className="glass-panel p-6 sm:p-7">
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
              className="glass-panel card-stagger p-6"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <p className="section-label">Reason 0{index + 1}</p>
              <h3 className="mt-4 text-2xl font-bold tracking-[-0.03em] text-[var(--color-ink)]">
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
            className="detail-toggle card-stagger glass-panel py-6 px-6 sm:px-7"
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
          <div className="mt-5 flex min-h-[42rem] flex-col justify-between rounded-[1rem] border border-white/8 bg-black/35 p-8">
            <div>
              <h3 className="max-w-xl text-3xl font-bold tracking-[-0.02em] text-[var(--color-ink)]">
                Book a focused working session with FreshStack.
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                The desktop experience now opens Calendly directly instead of
                embedding it inline, which keeps the page faster, cleaner in the
                console, and more reliable for keyboard users.
              </p>
            </div>

            <div className="space-y-5">
              <div className="rounded-xl border border-white/8 bg-white/4 p-5">
                <p className="section-label">What happens next</p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                  Choose a time in Calendly, then continue the conversation over
                  email if there is any prep work needed beforehand.
                </p>
              </div>

              {cta.hasLiveBookingUrl ? (
                <LinkButton href={cta.bookingUrl} className="w-full" variant="secondary">
                  {booking.mobileLabel}
                </LinkButton>
              ) : (
                <div className="rounded-[1rem] border border-dashed border-white/18 p-5 text-sm leading-7 text-[var(--color-muted)]">
                  Add `NEXT_PUBLIC_CALENDLY_URL` to enable the desktop booking
                  button.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
