import type { CTAConfig, SiteContent } from "@/content/site-content";

import { BrandMark, LinkButton } from "@/components/marketing/primitives";

type SiteHeaderProps = {
  brandName: SiteContent["brandName"];
  links: SiteContent["navigation"]["links"];
  cta: CTAConfig;
};

export function SiteHeader({ brandName, links, cta }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[color:rgba(248,247,244,0.96)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:gap-6 sm:px-6 lg:px-8">
        <a
          href="#hero"
          className="brand-lockup wordmark text-[1.3rem] text-[var(--color-ink)] sm:text-[1.45rem]"
        >
          <BrandMark />
          <span>{brandName}</span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--color-muted)] transition-colors duration-150 hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-paper)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 sm:block">
          <LinkButton href={cta.bookSectionHref}>{cta.primaryLabel}</LinkButton>
        </div>
      </div>

      <nav className="border-t border-[var(--color-border)] px-5 py-3 lg:hidden sm:px-6">
        <div className="mx-auto flex max-w-6xl gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-[var(--color-border)] bg-[var(--color-white)] px-4 py-2 text-sm font-medium text-[var(--color-muted)] transition-colors duration-150 hover:border-[var(--color-accent)] hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-paper)]"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
