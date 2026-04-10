import Image from "next/image";
import type { CTAConfig, SiteContent } from "@/content/site-content";

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
    <footer className="relative z-10 border-t border-white/10 px-5 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Top row: logo + tagline | nav links | contact */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Logo + tagline */}
          <div className="shrink-0">
            <a href="#hero" className="inline-flex items-center">
              <Image
                src="/freshstack-navbar-logo-text.png"
                alt={brandName}
                width={2192}
                height={500}
                className="h-auto w-[13rem] sm:w-[14.5rem]"
              />
            </a>
            <p className="mt-2 text-[13px] tracking-wide text-[#8e8e93]">
              Your AI &amp; Automation Partner
            </p>
          </div>

          {/* Nav links — horizontal */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white/45 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/audit"
              className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white/45 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Free Audit
            </a>
          </nav>

          {/* Contact */}
          <div className="shrink-0 text-right max-lg:text-left max-lg:mt-2">
            <a
              href={`mailto:${cta.contactEmail}`}
              className="inline-flex items-center gap-2 text-sm text-white/55 transition-colors duration-150 hover:text-white"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {cta.contactEmail}
            </a>
          </div>
        </div>

        {/* Bottom row: legal */}
        <div className="mt-6 border-t border-white/6 pt-5">
          <p className="text-[11px] leading-5 text-[#8e8e93]/50">
            {footer.legal}
          </p>
        </div>
      </div>
    </footer>
  );
}
