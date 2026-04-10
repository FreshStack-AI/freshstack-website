"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  Database,
  FileText,
  Layers3,
  MessageSquare,
  Sparkles,
  Wallet,
  Zap,
} from "lucide-react";

import type { CaseStudy } from "@/content/site-content";

type CaseStudyWorkflowSlideProps = {
  study: Pick<CaseStudy, "workflow" | "outcomes">;
};

const ICON_MAP = {
  arrowDown: ArrowDown,
  arrowRight: ArrowRight,
  barChart3: BarChart3,
  bell: Bell,
  bot: Bot,
  database: Database,
  fileText: FileText,
  layers3: Layers3,
  messageSquare: MessageSquare,
  sparkles: Sparkles,
  wallet: Wallet,
  zap: Zap,
} as const;

type IconName = keyof typeof ICON_MAP;

function IconGlyph({
  name,
  className,
  strokeWidth,
}: {
  name: IconName;
  className: string;
  strokeWidth: number;
}) {
  const Icon = ICON_MAP[name];
  return <Icon className={className} strokeWidth={strokeWidth} />;
}

function getNodeIconName(
  label: string,
  kind: "input" | "step" | "output",
): IconName {
  const value = label.toLowerCase();

  if (value.includes("wallet") || value.includes("stablecoin") || value.includes("payment")) return "wallet";
  if (value.includes("invoice") || value.includes("proposal") || value.includes("record") || value.includes("brief")) return "fileText";
  if (value.includes("database") || value.includes("data") || value.includes("source of truth") || value.includes("sync")) return "database";
  if (value.includes("slack") || value.includes("telegram") || value.includes("alert") || value.includes("notification")) return "bell";
  if (value.includes("metric") || value.includes("report") || value.includes("performance") || value.includes("visibility")) return "barChart3";
  if (value.includes("client") || value.includes("deal") || value.includes("renewal") || value.includes("upsell")) return "messageSquare";
  if (kind === "step") return "bot";
  if (kind === "output") return "sparkles";
  return "layers3";
}

function summarizeOutcome(outcome: string) {
  const value = outcome.trim();
  const lower = value.toLowerCase();

  const moneyMatch = value.match(/^\$[\d.,]+[KMB]?/);
  if (moneyMatch) return `${moneyMatch[0]} upside`;
  const hourMatch = value.match(/^\d+\s+hours?/i);
  if (hourMatch) return `${hourMatch[0]} saved`;
  const percentMatch = value.match(/^\d+%/);
  if (percentMatch) {
    if (lower.includes("accuracy")) return `${percentMatch[0]} data accuracy`;
    return `${percentMatch[0]} improvement`;
  }
  if (lower.includes("real-time")) return "Real-time visibility";
  if (lower.includes("shared workflow") || lower.includes("source of truth")) return "Shared source of truth";
  if (lower.includes("always-fresh")) return "Always-fresh reporting";
  if (lower.includes("zero client")) return "Zero client chasing";
  return value.split(/[.,]/)[0];
}

/* ── Compact node (smaller padding, inline icon) ── */
function WorkflowNode({
  label,
  kind,
}: {
  label: string;
  kind: "input" | "output";
}) {
  const iconName = getNodeIconName(label, kind);

  return (
    <div className="rounded-[0.7rem] border border-white/8 bg-white/[0.035] px-3 py-2.5">
      <div className="flex items-center gap-2.5">
        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-white/70">
          <IconGlyph name={iconName} className="h-3.5 w-3.5" strokeWidth={1.8} />
        </span>
        <span className="text-[0.82rem] leading-5 text-[var(--color-ink)]">
          {label}
        </span>
      </div>
    </div>
  );
}

/* ── Arrow connector with glow trail ── */
function WorkflowConnector({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={
        mobile
          ? "flex items-center justify-center py-1 lg:hidden"
          : "hidden items-center justify-center self-start pt-8 lg:flex"
      }
    >
      {mobile ? (
        <svg width="6" height="36" viewBox="0 0 6 36" fill="none" aria-hidden="true">
          <line x1="3" y1="0" x2="3" y2="28" stroke="#c8c0b0" strokeWidth="1.5" />
          <path d="M0.5 27L3 35L5.5 27" fill="#c8c0b0" />
        </svg>
      ) : (
        <svg width="48" height="14" viewBox="0 0 48 14" fill="none" aria-hidden="true">
          <line x1="0" y1="7" x2="40" y2="7" stroke="#c8c0b0" strokeWidth="1.5" />
          <path d="M39 3L47 7L39 11" fill="#c8c0b0" />
        </svg>
      )}
    </div>
  );
}

/* ── Compact impact pill ── */
function CompactImpact({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-[0.6rem] bg-[#f5f0e8]/75 px-3 py-2">
      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0a0a0a]/8 text-[#0a0a0a]/60">
        <IconGlyph name="zap" className="h-2.5 w-2.5" strokeWidth={2} />
      </span>
      <p className="text-[0.75rem] font-bold leading-4 text-[#0a0a0a]/80">{text}</p>
    </div>
  );
}

/* ── Mobile impact strip ── */
function ImpactStrip({ outcomes }: { outcomes: string[] }) {
  const highlights = outcomes.slice(0, 2).map(summarizeOutcome);

  return (
    <div className="mt-4 grid gap-2 sm:grid-cols-2">
      {highlights.map((item) => (
        <div
          key={item}
          className="rounded-[0.7rem] border border-white/8 bg-black/20 px-3 py-2.5"
        >
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-white/80">
              <IconGlyph name="zap" className="h-3 w-3" strokeWidth={1.8} />
            </span>
            <p className="text-[0.8rem] leading-5 text-[var(--color-ink)]">
              {item}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Main workflow slide ── */
export function CaseStudyWorkflowSlide({
  study,
}: CaseStudyWorkflowSlideProps) {
  const { workflow, outcomes } = study;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="glass-panel overflow-hidden p-0">
      <div className="p-4 sm:p-5">
        <div className="grid gap-2.5 lg:grid-cols-[minmax(0,0.84fr)_3.5rem_minmax(0,1.18fr)_3.5rem_minmax(0,0.84fr)] lg:items-stretch">

          {/* ── Left column: Inputs + Impact ── */}
          <div
            className={`flex flex-col gap-2 lg:justify-between transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 lg:-translate-x-6"
            }`}
          >
            <div className="space-y-2">
              <p className="section-label text-[10px]">Inputs</p>
              {workflow.inputs.map((item) => (
                <WorkflowNode key={item} label={item} kind="input" />
              ))}
            </div>
            <div className="hidden lg:block">
              <CompactImpact text={summarizeOutcome(outcomes[0])} />
            </div>
          </div>

          {/* ── Left arrow ── */}
          <div
            className={`transition-all duration-500 delay-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <WorkflowConnector />
          </div>
          <WorkflowConnector mobile />

          {/* ── Center: FreshStack engine ── */}
          <div
            className={`relative overflow-hidden rounded-[1rem] p-4 sm:p-5 transition-all duration-700 delay-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{
              background: "linear-gradient(180deg, rgba(245,240,232,0.07) 0%, rgba(245,240,232,0.02) 100%)",
              border: "1px solid rgba(245,240,232,0.12)",
              boxShadow: "inset 0 1px 0 rgba(245,240,232,0.06), 0 30px 70px rgba(0,0,0,0.28), 0 0 40px rgba(245,240,232,0.03)",
            }}
          >
            {/* Top glow line — warm accent */}
            <div
              className="pointer-events-none absolute inset-x-8 top-0 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(245,240,232,0.3), rgba(245,240,232,0.5), rgba(245,240,232,0.3), transparent)",
              }}
            />
            {/* Subtle warm side glow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[rgba(245,240,232,0.04)] to-transparent" />

            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="section-label text-[10px]">FreshStack layer</p>
                <h4 className="mt-2 text-[1.4rem] font-bold tracking-[-0.04em] text-[var(--color-ink)] sm:text-[1.7rem]">
                  {workflow.automationLabel}
                </h4>
              </div>
              <span
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#c8c0b0]/80"
                style={{
                  background: "rgba(245,240,232,0.06)",
                  border: "1px solid rgba(245,240,232,0.1)",
                }}
              >
                <IconGlyph name="bot" className="h-4 w-4" strokeWidth={1.9} />
              </span>
            </div>

            {/* Steps */}
            <div className="relative mt-4">
              <div className="space-y-2">
                {workflow.automationSteps.map((step, index) => {
                  const iconName = getNodeIconName(step, "step");

                  return (
                    <div
                      key={step}
                      className="relative flex items-start gap-2.5 rounded-[0.7rem] border border-white/8 bg-black/22 px-3 py-2.5"
                    >
                      <span
                        className="relative z-10 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[9px] font-bold uppercase tracking-[0.14em]"
                        style={{
                          background: "rgba(245,240,232,0.06)",
                          border: "1px solid rgba(245,240,232,0.12)",
                          color: "rgba(245,240,232,0.7)",
                        }}
                      >
                        0{index + 1}
                      </span>
                      <div className="flex items-center gap-1.5 min-w-0 pt-0.5">
                        <IconGlyph
                          name={iconName}
                          className="h-3 w-3 shrink-0 text-white/50"
                          strokeWidth={1.8}
                        />
                        <span className="text-[0.82rem] leading-5 text-[var(--color-ink)]">
                          {step}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right arrow ── */}
          <div
            className={`transition-all duration-500 delay-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <WorkflowConnector />
          </div>
          <WorkflowConnector mobile />

          {/* ── Right column: Outputs + Impact ── */}
          <div
            className={`flex flex-col gap-2 lg:justify-between transition-all duration-700 delay-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 lg:translate-x-6"
            }`}
          >
            <div className="space-y-2">
              <p className="section-label text-[10px]">Outputs</p>
              {workflow.outputs.map((item) => (
                <WorkflowNode key={item} label={item} kind="output" />
              ))}
            </div>
            <div className="hidden lg:block">
              <CompactImpact text={summarizeOutcome(outcomes[1])} />
            </div>
          </div>
        </div>

        {/* Mobile-only impact strip */}
        <div className="lg:hidden">
          <ImpactStrip outcomes={outcomes} />
        </div>
      </div>
    </div>
  );
}
