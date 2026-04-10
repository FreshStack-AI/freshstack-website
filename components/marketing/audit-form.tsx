"use client";

import { useState, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const WEBHOOK_URL = "https://kelano.app.n8n.cloud/webhook/audit-lead";

type QuestionType = "single" | "multi";

interface Answer {
  text: string;
  points?: number;
}

interface Question {
  id: string;
  label: string;
  type: QuestionType;
  scored: boolean;
  answers: Answer[];
}

const QUESTIONS: Question[] = [
  {
    id: "q1_ai_maturity",
    label:
      "How would you describe your business's use of AI and automation today?",
    type: "single",
    scored: true,
    answers: [
      {
        text: "Aware but stuck: We know it could help, but we don't know where to start",
        points: 4,
      },
      {
        text: "Using it individually: People use ChatGPT or similar, but it's not built into how we work",
        points: 3,
      },
      {
        text: "Partially automated: We've automated a few things, but there's more we could do",
        points: 2,
      },
      {
        text: "Well automated: Most repetitive work is handled. We're looking to go further",
        points: 1,
      },
    ],
  },
  {
    id: "q2_business_type",
    label: "What best describes your business?",
    type: "single",
    scored: false,
    answers: [
      { text: "Agency (marketing, creative, digital)" },
      { text: "Professional services (consulting, legal, accounting)" },
      { text: "SaaS / Tech company" },
      { text: "E-commerce / Retail" },
      { text: "Service business (trades, healthcare, hospitality)" },
      { text: "Other" },
    ],
  },
  {
    id: "q3_team_size",
    label: "How many people work in your business?",
    type: "single",
    scored: false,
    answers: [
      { text: "1 to 10" },
      { text: "11 to 25" },
      { text: "26 to 50" },
      { text: "51 to 100" },
      { text: "100+" },
    ],
  },
  {
    id: "q4_tech_stack",
    label: "Which best describes your current tools?",
    type: "single",
    scored: true,
    answers: [
      {
        text: "Legacy stack: Mostly desktop software, spreadsheets, or industry-specific legacy systems",
        points: 4,
      },
      {
        text: "Scattered: Honestly, it's scattered. Different people use different things",
        points: 4,
      },
      {
        text: "Mixed stack: A mix of cloud tools and some older software",
        points: 2,
      },
      {
        text: "Modern stack: Mostly cloud tools like Google Workspace, Slack, Notion, HubSpot",
        points: 1,
      },
    ],
  },
  {
    id: "q5_flexibility",
    label:
      "How flexible are you to adopt tools that may not currently be in your tech stack?",
    type: "single",
    scored: true,
    answers: [
      { text: "Very open: We'll use whatever works best", points: 4 },
      { text: "Somewhat open: But we have preferences", points: 3 },
      { text: "Cautious: We'd need a strong reason to switch", points: 2 },
      { text: "Locked in: We can't easily change tools", points: 1 },
    ],
  },
  {
    id: "q6_pain_points",
    label:
      "What do you think is slowing your business down the most? (select all that apply)",
    type: "multi",
    scored: false,
    answers: [
      { text: "Repetitive admin: Talented people stuck doing manual work" },
      {
        text: "Error risk: Manual steps leading to mistakes that cost money or trust",
      },
      {
        text: "Slow handoffs: Delays when work moves between people or teams",
      },
      {
        text: "Key-person bottlenecks: Too much depends on specific individuals",
      },
    ],
  },
  {
    id: "q7_revenue_leakage",
    label:
      "In the last 12 months, have you lost revenue because something fell through the cracks?",
    type: "single",
    scored: true,
    answers: [
      { text: "Yes, it's happened multiple times", points: 4 },
      { text: "Yes, at least once", points: 3 },
      { text: "Probably, but hard to quantify", points: 2 },
      { text: "No, our process catches everything", points: 1 },
    ],
  },
  {
    id: "q8_admin_hours",
    label:
      "How many hours per week does your team spend on repetitive admin tasks?",
    type: "single",
    scored: true,
    answers: [
      { text: "More than 10 hours", points: 4 },
      { text: "5 to 10 hours", points: 3 },
      { text: "2 to 5 hours", points: 2 },
      { text: "Less than 2 hours", points: 1 },
    ],
  },
  {
    id: "q9_budget",
    label:
      "If the right solution existed, what could you invest monthly in automation?",
    type: "single",
    scored: true,
    answers: [
      { text: "Over $10,000/month", points: 4 },
      { text: "$5,000 to $10,000/month", points: 3 },
      { text: "$2,000 to $5,000/month", points: 2 },
      { text: "Under $2,000/month", points: 1 },
      { text: "Not sure yet. Depends on the ROI", points: 2 },
    ],
  },
  {
    id: "q10_timeline",
    label: "When are you looking to solve this?",
    type: "single",
    scored: true,
    answers: [
      { text: "As soon as possible. It's urgent", points: 4 },
      { text: "Within the next 1 to 3 months", points: 3 },
      { text: "Sometime this year", points: 2 },
      { text: "Just exploring for now", points: 1 },
    ],
  },
];

const MAX_SCORE = 28;

interface Tier {
  label: string;
  headline: string;
  body: string;
  range: [number, number];
}

const TIERS: Tier[] = [
  {
    label: "High Opportunity",
    headline: "High Opportunity",
    body: "Your business has significant automation potential. You have clear pain points, urgency, and the willingness to invest. The ROI case is strong. Let's talk.",
    range: [21, 28],
  },
  {
    label: "Good Opportunity",
    headline: "Good Opportunity",
    body: "There's real opportunity here. A few targeted automations could free up meaningful time and reduce risk. Worth exploring.",
    range: [14, 20],
  },
  {
    label: "Some Opportunity",
    headline: "Some Opportunity",
    body: "You may benefit from automation in specific areas. The opportunity is there, but it may not be urgent. We can help you identify quick wins.",
    range: [10, 13],
  },
  {
    label: "Limited Opportunity",
    headline: "Limited Opportunity (for now)",
    body: "Your operations are already in good shape, or the timing isn't quite right. That's not a bad thing. When you're ready to level up, we're here.",
    range: [7, 9],
  },
];

function getTier(score: number): Tier {
  return (
    TIERS.find((t) => score >= t.range[0] && score <= t.range[1]) ??
    TIERS[TIERS.length - 1]
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

type Phase = "welcome" | "questions" | "results";

export function AuditForm({ bookingUrl }: { bookingUrl: string }) {
  const [phase, setPhase] = useState<Phase>("welcome");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [score, setScore] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [tier, setTier] = useState<Tier | null>(null);
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  /* Email gate */
  const handleEmailSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = email.trim();
      if (!trimmed) {
        setEmailError("Email is required");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        setEmailError("Enter a valid email address");
        return;
      }
      setEmailError("");
      setPhase("questions");
    },
    [email],
  );

  /* Single-select answer */
  const selectAnswer = useCallback(
    (answerText: string) => {
      const q = QUESTIONS[currentQ];
      setAnswers((prev) => ({ ...prev, [q.id]: answerText }));
      // Auto-advance after short delay for single-select
      if (q.type === "single") {
        setTimeout(() => {
          if (currentQ < QUESTIONS.length - 1) {
            setDirection("forward");
            setCurrentQ((c) => c + 1);
          } else {
            submitAudit({ ...answers, [q.id]: answerText });
          }
        }, 250);
      }
    },
    [currentQ, answers],
  );

  /* Multi-select toggle */
  const toggleMulti = useCallback(
    (answerText: string) => {
      const q = QUESTIONS[currentQ];
      setAnswers((prev) => {
        const current = (prev[q.id] as string[]) ?? [];
        const next = current.includes(answerText)
          ? current.filter((a) => a !== answerText)
          : [...current, answerText];
        return { ...prev, [q.id]: next };
      });
    },
    [currentQ],
  );

  /* Navigation */
  const goBack = useCallback(() => {
    if (currentQ > 0) {
      setDirection("back");
      setCurrentQ((c) => c - 1);
    }
  }, [currentQ]);

  const goNext = useCallback(() => {
    if (currentQ < QUESTIONS.length - 1) {
      setDirection("forward");
      setCurrentQ((c) => c + 1);
    } else {
      submitAudit(answers);
    }
  }, [currentQ, answers]);

  /* Submit & Score */
  const submitAudit = useCallback(
    (finalAnswers: Record<string, string | string[]>) => {
      let total = 0;
      for (const q of QUESTIONS) {
        if (!q.scored) continue;
        const selected = finalAnswers[q.id] as string | undefined;
        if (!selected) continue;
        const match = q.answers.find((a) => a.text === selected);
        if (match?.points) total += match.points;
      }

      const pct = Math.round((total / MAX_SCORE) * 100);
      const resultTier = getTier(total);

      setScore(total);
      setPercentage(pct);
      setTier(resultTier);
      setPhase("results");

      // Fire webhook (non-blocking)
      const payload = {
        email: email.trim(),
        score: total,
        percentage: pct,
        tier: resultTier.label,
        answers: finalAnswers,
        submitted_at: new Date().toISOString(),
      };

      fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {
        // Silently fail — don't block UX
      });
    },
    [email],
  );

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  /* Welcome Screen */
  if (phase === "welcome") {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4">
        <div className="mx-auto w-full max-w-2xl text-center">
          {/* Logo + wordmark */}
          <img
            src="/freshstack-navbar-logo-text.png"
            alt="FreshStack"
            className="mx-auto mb-8 h-8 w-auto"
          />
          <h1 className="font-heading mx-auto mb-3 text-[1.65rem] font-bold leading-tight tracking-tight text-[var(--color-ink)] sm:text-[2.75rem] sm:leading-[1.1]">
            AI &amp; Automation Readiness Audit
          </h1>
          <p className="mb-10 text-lg text-[var(--color-label)]">
            10 questions to know where your business stands.
          </p>

          <form
            onSubmit={handleEmailSubmit}
            className="mx-auto flex w-full max-w-sm flex-col gap-3"
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              className="h-12 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-center text-base text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent-strong)] focus:outline-none"
            />
            {emailError && (
              <p className="text-sm text-red-400">{emailError}</p>
            )}
            <button
              type="submit"
              className="h-12 w-full rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-accent)] font-mono text-[12px] font-bold uppercase tracking-[0.18em] text-[var(--color-paper)] transition-all duration-300 hover:opacity-90"
            >
              Start the audit
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* Results Screen */
  if (phase === "results" && tier) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4">
        <div className="w-full max-w-lg text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-muted)]">
            Your result
          </p>

          {/* Score circle */}
          <div className="relative mx-auto mb-8 flex h-36 w-36 items-center justify-center">
            <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 144 144">
              <circle
                cx="72" cy="72" r="64"
                fill="none"
                stroke="var(--color-border)"
                strokeWidth="4"
              />
              <circle
                cx="72" cy="72" r="64"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${(percentage / 100) * 402} 402`}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <span className="font-heading text-4xl font-bold text-[var(--color-ink)]">
              {percentage}%
            </span>
          </div>

          <h2 className="font-heading mb-4 text-3xl font-bold text-[var(--color-ink)] sm:text-4xl">
            {tier.headline}
          </h2>
          <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-[var(--color-label)]">
            {tier.body}
          </p>

          <div className="flex flex-col items-center gap-6">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-accent)] px-8 font-mono text-[12px] font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:opacity-90"
              style={{ color: "#0a0a0a" }}
            >
              Book a call
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <a
              href="/"
              className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
            >
              Back to website
            </a>
          </div>
        </div>
      </div>
    );
  }

  /* Questions Phase */
  const safeIndex = Math.min(currentQ, QUESTIONS.length - 1);
  const q = QUESTIONS[safeIndex];
  const selectedSingle = answers[q.id] as string | undefined;
  const selectedMulti = (answers[q.id] as string[] | undefined) ?? [];
  const canAdvanceMulti = q.type === "multi" && selectedMulti.length > 0;

  return (
    <div className="flex min-h-[80vh] flex-col px-4 pt-8">
      {/* Progress bar */}
      <div className="mx-auto w-full max-w-lg">
        <div className="mb-2 flex items-center justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={currentQ === 0}
            className="flex items-center gap-1 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)] disabled:invisible"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M19 12H5M12 19l-7-7 7-7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </button>
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--color-muted)]">
            {currentQ + 1} / {QUESTIONS.length}
          </span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface)]">
          <div
            className="h-full rounded-full bg-[var(--color-accent)] transition-all duration-500 ease-out"
            style={{
              width: `${((currentQ + 1) / QUESTIONS.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center py-10">
        <div
          key={currentQ}
          className={`animate-in fade-in duration-300 ${
            direction === "forward"
              ? "slide-in-from-right-4"
              : "slide-in-from-left-4"
          }`}
        >
          <h2 className="font-heading mb-8 text-lg font-bold leading-snug text-[var(--color-ink)] sm:text-xl">
            {q.label}
          </h2>

          <div className="flex flex-col gap-3">
            {q.answers.map((a) => {
              const isSelected =
                q.type === "single"
                  ? selectedSingle === a.text
                  : selectedMulti.includes(a.text);

              return (
                <button
                  key={a.text}
                  type="button"
                  onClick={() =>
                    q.type === "single"
                      ? selectAnswer(a.text)
                      : toggleMulti(a.text)
                  }
                  className={`group w-full rounded-xl border px-5 py-4 text-left text-[15px] leading-relaxed transition-all duration-200 ${
                    isSelected
                      ? "border-[var(--color-accent)] bg-[rgba(245,240,232,0.08)] text-[var(--color-ink)]"
                      : "border-[var(--color-border)] bg-transparent text-[var(--color-label)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-accent-tint)] hover:text-[var(--color-ink)]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {/* Selection indicator — always circular */}
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                        isSelected
                          ? "border-[var(--color-accent)] bg-[var(--color-accent)]"
                          : "border-[var(--color-border-strong)] bg-transparent"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M5 13l4 4L19 7"
                            stroke="var(--color-paper)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span>
                      {a.text.includes(": ") ? (
                        <>
                          <span className="font-semibold text-[var(--color-ink)]">
                            {a.text.split(": ")[0]}:
                          </span>{" "}
                          {a.text.split(": ").slice(1).join(": ")}
                        </>
                      ) : (
                        a.text
                      )}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Multi-select continue button */}
          {q.type === "multi" && (
            <button
              type="button"
              onClick={goNext}
              disabled={!canAdvanceMulti}
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-accent)] px-6 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-paper)] transition-all duration-300 hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continue
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
