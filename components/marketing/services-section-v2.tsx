"use client";

import { useState } from "react";

type Service = {
  index: string;
  title: string;
  description: string;
  pills: string[];
};

const services: Service[] = [
  {
    index: "// 01",
    title: "Sales & Pipeline",
    description:
      "Your deals move through the pipeline without manual chasing. The handoff from won to working starts itself. Nothing falls through the gap.",
    pills: [
      "CRM Setup & Automation",
      "Deal Stage Notifications",
      "Pipeline Visibility Dashboard",
      "Sales-to-Ops Handoff",
    ],
  },
  {
    index: "// 02",
    title: "Client Onboarding",
    description:
      "The moment a client signs, the process starts without you. Every step triggered, tracked, and completed\u2026 before the first call.",
    pills: [
      "Contract-Triggered Onboarding",
      "Automated Welcome Sequences",
      "Folder & Access Provisioning",
      "Onboarding Progress Tracking",
    ],
  },
  {
    index: "// 03",
    title: "Finance Operations",
    description:
      "Your invoices go out on time. Late payments get flagged automatically. And your books close without anyone touching a spreadsheet.",
    pills: [
      "Automated Invoice Generation",
      "Payment Notification Systems",
      "Overdue Payment Alerts",
      "Invoice Logging from Slack or Email",
      "Financial Reconciliation",
    ],
  },
  {
    index: "// 04",
    title: "Reporting & Visibility",
    description:
      "The numbers are ready before you need them. No pulling data, no building slides. Just the answer, waiting in your inbox.",
    pills: [
      "Automated KPI Dashboards",
      "Scheduled Performance Reports",
      "Multi-Source Data Consolidation",
      "Client-Facing Report Delivery",
    ],
  },
];

export function ServicesSectionV2() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);

  function handleSelect(i: number) {
    if (i === active) return;
    setFading(true);
    setTimeout(() => {
      setActive(i);
      setFading(false);
    }, 200);
  }

  const current = services[active];

  return (
    <section
      id="services"
      className="relative z-10 px-5 pb-24 pt-12 sm:px-8 lg:px-10 lg:pb-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16">
          <p className="section-label mb-5">
            <span className="mr-2 opacity-50">//</span>
            Built for this
          </p>
          <h2 className="section-title mb-5 text-3xl text-[var(--color-ink)] sm:text-4xl lg:text-[3rem]">
            Systems that run themselves.
          </h2>
          <p className="max-w-3xl text-sm leading-[1.8] text-[#8e8e93] sm:text-base sm:leading-8">
            Four operational areas. Each one a place where manual work is quietly draining your time,<br className="hidden lg:block" /> your margin, and your team&apos;s attention. We&apos;ve built the fix for all of them.
          </p>
        </div>

        {/* Option D — Left index + detail panel */}
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          {/* Left nav */}
          <div className="flex shrink-0 flex-row flex-wrap gap-2 lg:w-[240px] lg:flex-col lg:gap-1 lg:pt-2">
            {services.map((s, i) => (
              <button
                key={s.title}
                onClick={() => handleSelect(i)}
                className={`relative rounded-xl border px-5 py-4 text-left font-[family-name:var(--font-space-grotesk),ui-sans-serif] text-[0.9375rem] font-semibold transition-all duration-300 lg:text-base ${
                  i === active
                    ? "border-[rgba(80,80,85,0.4)] bg-[rgba(200,200,210,0.04)]"
                    : "border-transparent text-[#6e6e73] hover:text-[#a0a0a5]"
                }`}
              >
                {/* Left chrome accent bar */}
                {i === active && (
                  <span
                    className="absolute bottom-3.5 left-0 top-3.5 w-[2px]"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent, rgba(200,200,210,0.3), rgba(255,255,255,0.5), rgba(200,200,210,0.3), transparent)",
                    }}
                  />
                )}
                <span
                  className={i === active ? "" : ""}
                  style={
                    i === active
                      ? {
                          background:
                            "linear-gradient(135deg, #9a9a9a 0%, #d4d4d4 18%, #f0f0f0 32%, #a8a8a8 48%, #e0e0e0 62%, #b0b0b0 78%, #c8c8c8 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }
                      : undefined
                  }
                >
                  {s.title}
                </span>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div
            className="relative flex-1 overflow-hidden rounded-xl border border-[rgba(80,80,85,0.6)]"
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
            {/* Diagonal light sweep */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.02) 48%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.02) 52%, transparent 70%)",
              }}
            />

            {/* Content */}
            <div
              className={`relative z-10 p-8 transition-all duration-200 sm:p-10 ${
                fading
                  ? "translate-y-1.5 opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              <p className="mb-4 font-mono text-[10px] font-normal uppercase tracking-[0.2em] text-[#c8c0b0]/40">
                {current.index}
              </p>
              <h3
                className="mb-4 text-[1.8rem] font-bold leading-[1.1] tracking-[-0.025em]"
                style={{
                  background:
                    "linear-gradient(135deg, #9a9a9a 0%, #d4d4d4 18%, #f0f0f0 32%, #a8a8a8 48%, #e0e0e0 62%, #b0b0b0 78%, #c8c8c8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {current.title}
              </h3>
              <p className="mb-7 max-w-[560px] text-[0.9375rem] leading-[1.85] text-[#c8c0b0]">
                {current.description}
              </p>

              {/* Pill boxes */}
              <div className="flex flex-wrap gap-2.5">
                {current.pills.map((pill) => (
                  <span
                    key={pill}
                    className="inline-flex items-center rounded-full border border-[rgba(100,100,110,0.4)] px-[18px] py-2 font-[family-name:var(--font-space-grotesk),ui-sans-serif] text-[13px] font-medium text-[#f5f0e8] transition-all duration-300 hover:border-[rgba(160,160,170,0.35)]"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(40,40,45,0.95) 0%, rgba(25,25,28,0.95) 40%, rgba(45,45,50,0.9) 70%, rgba(30,30,33,0.95) 100%)",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 6px rgba(0,0,0,0.3)",
                    }}
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
