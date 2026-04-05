import { siteContent } from "@/content/site-content";

export function PainPointsSectionV2() {
  const { painPoints } = siteContent;

  return (
    <section
      id="pain-points"
      className="relative z-10 bg-[#0a0a0a] px-5 pb-24 pt-12 sm:px-8 lg:px-10 lg:pb-32 lg:pt-16"
    >
      <div className="mx-auto max-w-6xl">

        {/* Section header */}
        <div className="mb-16 max-w-2xl">
          <p className="section-label mb-5">
            <span className="mr-2 opacity-50">//</span>
            {painPoints.eyebrow}
          </p>
          <h2 className="mb-6 text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#f5f0e8]">
            {painPoints.title}
          </h2>
          <p className="text-base leading-[1.8] text-[#8e8e93]">
            [PLACEHOLDER — intro paragraph describing the cost of manual operations on agency growth]
          </p>
        </div>

        {/* 4-block grid */}
        <div className="grid gap-px border border-[rgba(245,240,232,0.08)] bg-[rgba(245,240,232,0.08)] sm:grid-cols-2">
          {painPoints.items.map((item, index) => (
            <div
              key={item.title}
              className="group relative bg-[#0a0a0a] p-8 transition-colors duration-300 hover:bg-[#111111] sm:p-10"
            >
              {/* Number */}
              <p className="mb-6 font-mono text-[11px] font-normal uppercase tracking-[0.22em] text-[#c8c0b0]/50">
                0{index + 1}
              </p>

              {/* Title */}
              <h3 className="mb-4 text-2xl font-bold tracking-[-0.025em] text-[#f5f0e8] sm:text-[1.6rem]">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-[1.8] text-[#8e8e93] sm:text-[0.9375rem]">
                {item.description}
              </p>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#f5f0e8]/30 transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
