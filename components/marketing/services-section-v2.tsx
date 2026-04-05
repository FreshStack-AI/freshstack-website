const services = [
  {
    index: "01",
    title: "Sales Systems",
    description: "[PLACEHOLDER — one line describing what sales systems covers]",
    items: [
      "CRM setup & automation",
      "Lead scoring & routing",
      "Proposal generation",
      "Pipeline visibility",
      "Follow-up sequences",
    ],
  },
  {
    index: "02",
    title: "Operations & Reporting",
    description: "[PLACEHOLDER — one line describing what ops & reporting covers]",
    items: [
      "Client reporting automation",
      "Delivery workflow design",
      "Handoff standardisation",
      "KPI dashboards",
      "Capacity tracking",
    ],
  },
  {
    index: "03",
    title: "Infrastructure",
    description: "[PLACEHOLDER — one line describing what infrastructure covers]",
    items: [
      "AI agent deployment",
      "Tool stack integration",
      "Data pipeline setup",
      "Custom Claude integrations",
      "System documentation",
    ],
  },
];

export function ServicesSectionV2() {
  return (
    <section
      id="services"
      className="relative z-10 bg-[#0a0a0a] px-5 pb-0 pt-0 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-6xl">

        {/* Section header */}
        <div className="mb-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-label mb-5">
                <span className="mr-2 opacity-50">//</span>
                What we build
              </p>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#f5f0e8]">
                Three service buckets.<br />One operating model.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-[1.8] text-[#8e8e93] sm:text-right">
              [PLACEHOLDER — short framing line for the services section]
            </p>
          </div>
        </div>

        {/* Three-column service layout */}
        <div className="grid border-t border-[rgba(245,240,232,0.08)] lg:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`group py-10 lg:py-12 ${
                i < services.length - 1
                  ? "border-b border-[rgba(245,240,232,0.08)] lg:border-b-0 lg:border-r lg:pr-10"
                  : ""
              } ${i > 0 ? "lg:pl-10" : ""}`}
            >
              {/* Number + title */}
              <div className="mb-8">
                <p className="mb-4 font-mono text-[11px] font-normal uppercase tracking-[0.22em] text-[#c8c0b0]/50">
                  {service.index}
                </p>
                <h3 className="text-[1.6rem] font-bold leading-[1.1] tracking-[-0.025em] text-[#f5f0e8] sm:text-[1.75rem]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.75] text-[#8e8e93]">
                  {service.description}
                </p>
              </div>

              {/* Capability list */}
              <ul className="space-y-3">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-[#c8c0b0]/40" />
                    <span className="text-sm leading-[1.75] text-[#8e8e93]">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Hover accent line at bottom */}
              <div className="mt-10 h-px w-0 bg-[#f5f0e8]/20 transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
