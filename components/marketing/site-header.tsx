import type { CTAConfig, SiteContent } from "@/content/site-content";

import { BrandMark } from "@/components/marketing/primitives";

type SiteHeaderProps = {
  brandName: SiteContent["brandName"];
  links: SiteContent["navigation"]["links"];
  cta: CTAConfig;
};

export function SiteHeader({ brandName, links, cta }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(2,2,2,0.72)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:gap-6 sm:px-6 lg:px-8">
        <a
          href="#hero"
          className="brand-lockup wordmark text-[1.3rem] text-white sm:text-[1.45rem]"
        >
          <BrandMark />
          <span>{brandName}</span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white/45 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 sm:block">
          <a
            href={cta.bookSectionHref}
            className="group inline-flex items-center gap-3 rounded-full border border-white/25 bg-black px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/40 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <span className="pl-2">{cta.primaryLabel}</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/4">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-white"
              >
                <path
                  d="M7 17L17 7M17 7H8M17 7V16"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>

      <nav className="border-t border-white/10 px-5 py-3 lg:hidden sm:px-6">
        <div className="mx-auto flex max-w-6xl gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white/55 transition-colors duration-150 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
