import Image from "next/image";
import { siteContent } from "@/content/site-content";

const painIcons: Record<string, { src: string; alt: string }> = {
  Sales: { src: "/icons/chrome-dollar.png", alt: "Chrome dollar sign" },
  Delivery: { src: "/icons/chrome-paperclip.png", alt: "Chrome paperclip" },
  Reporting: { src: "/icons/chrome-stopwatch.png", alt: "Chrome stopwatch" },
  Operations: { src: "/icons/chrome-gear.png", alt: "Chrome gear" },
};

export function PainPointsSectionV2() {
  const { painPoints } = siteContent;

  return (
    <section
      id="pain-points"
      className="relative z-10 bg-[#0a0a0a] px-5 pb-24 pt-12 sm:px-8 lg:px-10 lg:pb-32 lg:pt-16"
    >
      {/* Section glow — positioned behind cards, not at top edge */}
      <div className="pointer-events-none absolute inset-x-0 top-[40%] h-[400px] bg-[radial-gradient(ellipse_60%_45%_at_center,rgba(200,192,176,0.05)_0%,rgba(200,192,176,0.02)_40%,transparent_70%)]" />

      {/* Brushed-metal texture — fades in from top to avoid hard edge */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(200,192,176,0.008) 2px, rgba(200,192,176,0.008) 3px)",
          maskImage: "linear-gradient(to bottom, transparent 5%, black 35%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 5%, black 35%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">

        {/* Section header */}
        <div className="mb-16 max-w-2xl">
          <p className="section-label mb-5">
            <span className="mr-2 opacity-50">//</span>
            {painPoints.eyebrow}
          </p>
          <h2 className="mb-6 text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#f5f0e8]">
            {painPoints.title}
          </h2>
        </div>

        {/* 2×2 glass card grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {painPoints.items.map((item) => {
            const icon = painIcons[item.title];
            return (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-[rgba(58,58,60,0.7)] p-8 backdrop-blur-[12px] transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[rgba(200,192,176,0.18)] sm:p-9"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(245,240,232,0.018), rgba(245,240,232,0.008)), rgba(20,20,22,0.9)",
                  boxShadow:
                    "inset 0 1px 0 rgba(245,240,232,0.02), 0 8px 32px rgba(0,0,0,0.3)",
                }}
              >
                {/* Inner glow on hover */}
                <div className="pointer-events-none absolute left-0 right-0 top-0 h-20 bg-[radial-gradient(ellipse_at_30%_0%,rgba(245,240,232,0.04),transparent_70%)] opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

                {/* Icon + title */}
                <div className="relative z-10 mb-4 flex items-center gap-4">
                  {icon && (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center">
                      <Image
                        src={icon.src}
                        alt={icon.alt}
                        width={48}
                        height={48}
                        className="h-full w-full object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-bold tracking-[-0.025em] text-[#f5f0e8] sm:text-2xl">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="relative z-10 text-sm leading-[1.8] text-[#8e8e93] sm:text-[0.9375rem]">
                  {item.description}
                </p>

                {/* Bottom accent line on hover */}
                <div className="absolute bottom-0 left-4 right-4 h-px bg-[linear-gradient(90deg,transparent,rgba(200,192,176,0.25),transparent)] opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
