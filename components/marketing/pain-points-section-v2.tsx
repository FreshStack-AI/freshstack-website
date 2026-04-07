import { siteContent } from "@/content/site-content";

export function PainPointsSectionV2() {
  const { painPoints } = siteContent;

  return (
    <section
      id="pain-points"
      className="relative z-10 px-5 pb-24 pt-12 sm:px-8 lg:px-10 lg:pb-32 lg:pt-16"
    >
      {/* Section glow — positioned behind cards */}
      <div className="pointer-events-none absolute inset-x-0 top-[40%] h-[400px] bg-[radial-gradient(ellipse_60%_45%_at_center,rgba(200,192,176,0.05)_0%,rgba(200,192,176,0.02)_40%,transparent_70%)]" />

      {/* Brushed-metal texture — fades in from top */}
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
          <h2 className="section-title mb-5 text-3xl text-[var(--color-ink)] sm:text-4xl lg:text-[3rem]">
            {painPoints.title}
          </h2>
          {painPoints.description && (
            <p className="text-sm leading-[1.8] text-[#8e8e93] sm:text-base sm:leading-8">
              {painPoints.description}
            </p>
          )}
        </div>

        {/* 2×2 card grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {painPoints.items.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-xl border border-[rgba(80,80,85,0.6)] p-10 backdrop-blur-[12px] transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[rgba(160,160,170,0.25)] sm:p-11"
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

              {/* Diagonal light sweep on hover */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.03) 48%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 52%, transparent 70%)",
                }}
              />

              {/* Chrome gradient title */}
              <h3
                className="relative z-10 mb-3 text-[1.6rem] font-bold leading-[1.1] tracking-[-0.025em]"
                style={{
                  background:
                    "linear-gradient(135deg, #9a9a9a 0%, #d4d4d4 18%, #f0f0f0 32%, #a8a8a8 48%, #e0e0e0 62%, #b0b0b0 78%, #c8c8c8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 text-sm leading-[1.8] text-[#8e8e93] sm:text-[0.9375rem]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
