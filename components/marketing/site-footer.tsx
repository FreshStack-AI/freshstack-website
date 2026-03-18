import type { CTAConfig, SiteContent } from "@/content/site-content";

import { BrandMark } from "@/components/marketing/primitives";

type SiteFooterProps = {
  brandName: SiteContent["brandName"];
  footer: SiteContent["footer"];
  links: SiteContent["navigation"]["links"];
  cta: CTAConfig;
};

export function SiteFooter({
  brandName,
  footer,
  links,
  cta,
}: SiteFooterProps) {
  return (
    <footer className="border-t border-[var(--color-border)] px-5 py-10 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl">
          <a
            href="#hero"
            className="brand-lockup wordmark text-[1.35rem] text-[var(--color-ink)] sm:text-[1.5rem]"
          >
            <BrandMark />
            <span>{brandName}</span>
          </a>
          <p className="mt-4 max-w-lg text-sm leading-7 text-[var(--color-muted)]">
            {footer.blurb}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="section-label">Navigate</p>
            <ul className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
              {links.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="transition-colors duration-150 hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-paper)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="section-label">{footer.contactLabel}</p>
            <div className="mt-4 space-y-3 text-sm text-[var(--color-muted)]">
              <p>
                <a
                  href={`mailto:${cta.contactEmail}`}
                  className="transition-colors duration-150 hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-paper)]"
                >
                  {cta.contactEmail}
                </a>
              </p>
              <p>{footer.legal}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
