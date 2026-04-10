"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import CountUp from "react-countup";

import { CaseStudyWorkflowSlide } from "@/components/marketing/case-study-workflow-slide";
import type { CaseStudy } from "@/content/site-content";

function parseMetric(value: string): { prefix: string; end: number; suffix: string } | null {
  const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) return null;
  const end = parseFloat(match[2]);
  if (end === 0) return null;
  return { prefix: match[1], end, suffix: match[3] };
}

function MetricValue({ value }: { value: string }) {
  const parsed = parseMetric(value);
  if (!parsed) return <>{value}</>;
  return (
    <CountUp
      end={parsed.end}
      prefix={parsed.prefix}
      suffix={parsed.suffix}
      duration={1.6}
      enableScrollSpy
      scrollSpyOnce
    />
  );
}

type CaseStudiesDialogGridProps = {
  items: CaseStudy[];
};

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

function getFocusableElements(container: HTMLElement | null) {
  if (!container) {
    return [];
  }

  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter((element) => {
    const style = window.getComputedStyle(element);
    return style.display !== "none" && style.visibility !== "hidden";
  });
}

const CATEGORY_LABELS: Record<string, string> = {
  "cross-workspace-sync-creator-agency": "// Operations",
  "reporting-ops-service-biz": "// Sales",
  "finance-automation-agency": "// Finance",
};

export function CaseStudiesDialogGrid({
  items,
}: CaseStudiesDialogGridProps) {
  const [activeStudy, setActiveStudy] = useState<CaseStudy | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const closeDialog = useCallback(() => {
    setActiveStudy(null);
  }, []);

  useEffect(() => {
    if (!activeStudy) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousCaseStudyOpen = document.body.dataset.caseStudyOpen;

    const focusDialog = () => {
      const [firstFocusable] = getFocusableElements(dialogRef.current);
      (firstFocusable ?? dialogRef.current)?.focus();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDialog();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const dialog = dialogRef.current;
      const focusableElements = getFocusableElements(dialog);

      if (!dialog) {
        return;
      }

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (!activeElement || !dialog.contains(activeElement)) {
        event.preventDefault();
        (event.shiftKey ? lastFocusable : firstFocusable).focus();
        return;
      }

      if (!event.shiftKey && activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }

      if (event.shiftKey && activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.body.dataset.caseStudyOpen = "true";

    const focusFrame = window.requestAnimationFrame(focusDialog);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      if (previousCaseStudyOpen) {
        document.body.dataset.caseStudyOpen = previousCaseStudyOpen;
      } else {
        delete document.body.dataset.caseStudyOpen;
      }

      document.removeEventListener("keydown", handleKeyDown);
      window.requestAnimationFrame(() => {
        triggerRef.current?.focus();
      });
    };
  }, [activeStudy, closeDialog]);

  const modalContent =
        activeStudy && typeof document !== "undefined"
      ? createPortal(
          <div
            className="fixed inset-0 z-[120] bg-[rgba(0,0,0,0.96)] p-3 backdrop-blur-md sm:p-4 lg:p-6"
            onClick={closeDialog}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={`case-study-title-${activeStudy.id}`}
              ref={dialogRef}
              tabIndex={-1}
              className="relative mx-auto flex h-full w-full max-w-[90rem] flex-col overflow-hidden border border-white/10 bg-[#0c0c0c] shadow-[0_40px_120px_rgba(0,0,0,0.65)] outline-none"
              onClick={(event) => event.stopPropagation()}
            >
              {/* Header bar: label + pills + close */}
              <div className="flex items-center gap-2.5 border-b border-white/6 px-5 py-1.5 sm:px-8 lg:px-12">
                <p className="section-label shrink-0">{"// "}Case studies</p>
                <div className="flex flex-wrap items-center gap-1.5 overflow-hidden">
                  <span className="rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#c8c0b0]">
                    {activeStudy.clientType}
                  </span>
                  {activeStudy.serviceTags.map((tag) => (
                    <span
                      key={tag}
                      className="hidden rounded-full border border-white/12 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-white/50 sm:inline-flex"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={closeDialog}
                  className="ml-auto inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/12 bg-[rgba(18,18,18,0.92)] text-white transition-colors duration-300 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  aria-label="Close case study"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 6L18 18M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="case-study-modal-scroll min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-5 pb-5 pt-2 sm:px-8 sm:pb-8 sm:pt-2 lg:px-12 lg:pb-10 lg:pt-3">
                {/* Title + Metrics — single row on desktop */}
                <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
                  <h3
                    id={`case-study-title-${activeStudy.id}`}
                    className="section-title shrink-0 text-2xl sm:text-3xl lg:text-[2.6rem]"
                  >
                    {activeStudy.title}
                  </h3>

                  <div className="flex gap-6 sm:gap-8 lg:gap-10">
                    {activeStudy.cardMetrics.map((metric) => (
                      <div key={metric.label} className="text-right">
                        <p
                          className="text-[1.6rem] font-bold tracking-[-0.04em] sm:text-[2rem]"
                          style={{
                            background:
                              "linear-gradient(135deg, #b0b0b0 0%, #e0e0e0 40%, #f5f5f5 60%, #c0c0c0 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          <MetricValue value={metric.value} />
                        </p>
                        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8e8e93]/60">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chrome divider */}
                <div
                  className="mt-6 h-px w-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(200,200,210,0.25), rgba(255,255,255,0.4), rgba(200,200,210,0.25), transparent)",
                  }}
                />

                {/* Challenge → Solution → Workflow → Impact → Quote */}
                <div className="mt-6 space-y-8">
                  <div>
                    <p className="section-label">The Problem</p>
                    <p className="mt-3 max-w-5xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
                      {activeStudy.challenge}
                    </p>
                  </div>

                  <div>
                    <p className="section-label">What We Built</p>
                    <p className="mt-3 max-w-5xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
                      {activeStudy.intervention}
                    </p>
                  </div>

                  <div>
                    <CaseStudyWorkflowSlide study={activeStudy} />
                  </div>

                  <div>
                    <p className="section-label">Impact</p>
                    <ul className="mt-4 space-y-4">
                      {activeStudy.outcomes.map((outcome) => (
                        <li
                          key={outcome}
                          className="flex gap-4 text-base leading-8 text-[var(--color-muted)] sm:text-lg"
                        >
                          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {activeStudy.quote ? (
                    <blockquote className="border-l border-white/15 pl-5 text-base italic leading-8 text-[var(--color-ink)] sm:text-lg">
                      {activeStudy.quote}
                    </blockquote>
                  ) : null}

                  {/* CTA */}
                  <div className="pt-2 pb-6">
                    <a
                      href="#book-a-call"
                      onClick={closeDialog}
                      className="inline-flex h-12 items-center gap-3 rounded-full bg-[#f5f0e8] px-8 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white hover:shadow-[0_0_32px_rgba(245,240,232,0.2)]"
                      style={{ color: "#0a0a0a" }}
                    >
                      Let&apos;s Talk
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                        <path d="M1 5.5H10M10 5.5L6 1.5M10 5.5L6 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-3">
        {items.map((study, index) => (
          <button
            key={study.id}
            type="button"
            onClick={(event) => {
              triggerRef.current = event.currentTarget;
              setActiveStudy(study);
            }}
            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-[rgba(80,80,85,0.6)] p-7 text-left backdrop-blur-[12px] transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[rgba(160,160,170,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:p-8"
            style={{
              animationDelay: `${index * 90}ms`,
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

            {/* Category right-aligned, client type on new line */}
            <div className="relative z-10">
              <p className="text-right font-mono text-[10px] font-normal uppercase tracking-[0.2em] text-[#c8c0b0]/50">
                {CATEGORY_LABELS[study.id] || `// ${study.automationType}`}
              </p>
              <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#8e8e93]">
                {study.clientType}
              </p>
            </div>

            {/* Title + Description */}
            <div className="relative z-10 mt-6 flex flex-1 flex-col">
              <h3
                className="text-[1.2rem] font-bold leading-[1.35] tracking-[-0.02em] sm:text-[1.3rem] text-[#f5f0e8]"
              >
                {study.title}
              </h3>
              {study.cardDescription && (
                <p className="mt-3 text-[0.9rem] leading-[1.7] text-[#8e8e93]">
                  {study.cardDescription}
                </p>
              )}
            </div>

            {/* Bottom section — pinned to bottom */}
            <div className="relative z-10 mt-auto pt-5">
              {/* Chrome divider */}
              <div
                className="mb-5 h-px w-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(200,200,210,0.25), rgba(255,255,255,0.4), rgba(200,200,210,0.25), transparent)",
                }}
              />

              {/* Metrics */}
              <div className="flex justify-between">
                {study.cardMetrics.slice(0, 2).map((metric, mi) => (
                  <div
                    key={`${study.id}-${metric.value}-${metric.label}`}
                    className="text-center"
                  >
                    <p
                      className="text-[1.35rem] font-bold tracking-[-0.03em] sm:text-[1.5rem]"
                      style={{
                        background:
                          "linear-gradient(135deg, #b0b0b0 0%, #e0e0e0 40%, #f5f5f5 60%, #c0c0c0 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      <MetricValue value={metric.value} />
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8e8e93]/50">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* View case study */}
              <div className="mt-7 flex items-center justify-end gap-3">
                <span className="text-[13px] font-medium text-[#c8c0b0]/50 transition-colors duration-300 group-hover:text-[#c8c0b0]">
                  See more details
                </span>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(100,100,110,0.4)] text-[#c8c0b0]/40 transition-all duration-300 group-hover:border-[rgba(160,160,170,0.4)] group-hover:text-[#f5f0e8]"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(40,40,45,0.8) 0%, rgba(25,25,28,0.8) 50%, rgba(40,40,45,0.8) 100%)",
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M7 17L17 7M17 7H8M17 7V16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {modalContent}
    </>
  );
}
