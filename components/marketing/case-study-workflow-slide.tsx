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

  if (
    value.includes("wallet") ||
    value.includes("stablecoin") ||
    value.includes("payment")
  ) {
    return "wallet";
  }

  if (
    value.includes("invoice") ||
    value.includes("proposal") ||
    value.includes("record") ||
    value.includes("brief")
  ) {
    return "fileText";
  }

  if (
    value.includes("database") ||
    value.includes("data") ||
    value.includes("source of truth") ||
    value.includes("sync")
  ) {
    return "database";
  }

  if (
    value.includes("slack") ||
    value.includes("telegram") ||
    value.includes("alert") ||
    value.includes("notification")
  ) {
    return "bell";
  }

  if (
    value.includes("metric") ||
    value.includes("report") ||
    value.includes("performance") ||
    value.includes("visibility")
  ) {
    return "barChart3";
  }

  if (
    value.includes("client") ||
    value.includes("deal") ||
    value.includes("renewal") ||
    value.includes("upsell")
  ) {
    return "messageSquare";
  }

  if (kind === "step") {
    return "bot";
  }

  if (kind === "output") {
    return "sparkles";
  }

  return "layers3";
}

function summarizeOutcome(outcome: string) {
  const value = outcome.trim();
  const lower = value.toLowerCase();

  const moneyMatch = value.match(/^\$[\d.,]+[KMB]?/);
  if (moneyMatch) {
    return `${moneyMatch[0]} upside`;
  }

  const hourMatch = value.match(/^\d+\s+hours?/i);
  if (hourMatch) {
    return `${hourMatch[0]} saved`;
  }

  const percentMatch = value.match(/^\d+%/);
  if (percentMatch) {
    return `${percentMatch[0]} improvement`;
  }

  if (lower.includes("real-time")) {
    return "Real-time visibility";
  }

  if (lower.includes("shared workflow") || lower.includes("source of truth")) {
    return "Shared source of truth";
  }

  if (lower.includes("always-fresh")) {
    return "Always-fresh reporting";
  }

  if (lower.includes("zero client")) {
    return "Zero client chasing";
  }

  return value.split(/[.,]/)[0];
}

function WorkflowNode({
  label,
  kind,
}: {
  label: string;
  kind: "input" | "output";
}) {
  const iconName = getNodeIconName(label, kind);

  return (
    <div className="rounded-[1rem] border border-white/8 bg-white/[0.035] px-4 py-3.5">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-white/78">
          <IconGlyph
            name={iconName}
            className="h-4 w-4"
            strokeWidth={1.8}
          />
        </span>
        <span className="text-sm leading-6 text-[var(--color-ink)] sm:text-[0.96rem]">
          {label}
        </span>
      </div>
    </div>
  );
}

function WorkflowConnector({ mobile = false }: { mobile?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={
        mobile
          ? "flex items-center justify-center py-1 lg:hidden"
          : "hidden items-center justify-center lg:flex"
      }
    >
      <div className="relative flex items-center justify-center">
        <span
          className={
            mobile
              ? "h-8 w-px bg-gradient-to-b from-white/24 to-white/5"
              : "h-px w-16 bg-gradient-to-r from-white/24 to-white/5"
          }
        />
        <span
          className={
            mobile
              ? "absolute bottom-0 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/8 bg-black/45 text-white/68"
              : "absolute right-0 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/8 bg-black/45 text-white/68"
          }
        >
          <IconGlyph
            name={mobile ? "arrowDown" : "arrowRight"}
            className="h-3.5 w-3.5"
            strokeWidth={1.9}
          />
        </span>
      </div>
    </div>
  );
}

function ImpactStrip({ outcomes }: { outcomes: string[] }) {
  const highlights = outcomes.slice(0, 2).map(summarizeOutcome);

  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {highlights.map((item) => (
        <div
          key={item}
          className="rounded-[1rem] border border-white/8 bg-black/20 px-4 py-3"
        >
          <p className="section-label text-[11px]">Impact</p>
          <div className="mt-2 flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] text-white/80">
              <IconGlyph
                name="zap"
                className="h-4 w-4"
                strokeWidth={1.8}
              />
            </span>
            <p className="text-sm leading-6 text-[var(--color-ink)] sm:text-[0.95rem]">
              {item}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CaseStudyWorkflowSlide({
  study,
}: CaseStudyWorkflowSlideProps) {
  const { workflow, outcomes } = study;

  return (
    <div className="glass-panel overflow-hidden p-0">
      <div className="flex items-center justify-between gap-4 border-b border-white/6 px-5 py-4 sm:px-6">
        <p className="section-label">Workflow visual</p>
        <span className="rounded-full border border-white/8 bg-white/[0.035] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/62">
          What FreshStack built
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,0.84fr)_4rem_minmax(0,1.18fr)_4rem_minmax(0,0.84fr)] lg:items-center">
          <div className="space-y-3">
            <p className="section-label text-[11px]">Inputs</p>
            <div className="space-y-2.5">
              {workflow.inputs.map((item) => (
                <WorkflowNode key={item} label={item} kind="input" />
              ))}
            </div>
          </div>

          <WorkflowConnector />
          <WorkflowConnector mobile />

          <div className="relative overflow-hidden rounded-[1.25rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_30px_70px_rgba(0,0,0,0.28)] sm:p-6">
            <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/26 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white/[0.06] to-transparent" />

            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="section-label text-[11px]">FreshStack layer</p>
                <h4 className="mt-3 text-[1.7rem] font-bold tracking-[-0.04em] text-[var(--color-ink)] sm:text-[2.05rem]">
                  {workflow.automationLabel}
                </h4>
              </div>
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/25 text-white/80">
                <IconGlyph
                  name="bot"
                  className="h-5 w-5"
                  strokeWidth={1.9}
                />
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {workflow.automationSteps.map((step, index) => {
                const iconName = getNodeIconName(step, "step");

                return (
                  <div
                    key={step}
                    className="flex items-start gap-3 rounded-[1rem] border border-white/8 bg-black/22 px-4 py-3"
                  >
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.045] font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white/78">
                      0{index + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <IconGlyph
                          name={iconName}
                          className="h-3.5 w-3.5 shrink-0 text-white/60"
                          strokeWidth={1.8}
                        />
                        <span className="text-sm leading-6 text-[var(--color-ink)] sm:text-[0.96rem]">
                          {step}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <WorkflowConnector />
          <WorkflowConnector mobile />

          <div className="space-y-3">
            <p className="section-label text-[11px]">Outputs</p>
            <div className="space-y-2.5">
              {workflow.outputs.map((item) => (
                <WorkflowNode key={item} label={item} kind="output" />
              ))}
            </div>
          </div>
        </div>

        <ImpactStrip outcomes={outcomes} />
      </div>
    </div>
  );
}
