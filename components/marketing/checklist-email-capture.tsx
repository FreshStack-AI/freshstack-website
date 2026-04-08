"use client";

import { useState } from "react";

export function ChecklistEmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("sending");

    // TODO: wire up to actual email service (e.g. Notion, Mailchimp, or API route)
    // For now, simulate a short delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <p className="text-sm font-medium text-[var(--color-ink)]">
        Check your inbox — it&apos;s on the way.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md items-center gap-2">
      <input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-10 flex-1 rounded-full border border-[rgba(80,80,85,0.6)] bg-[rgba(20,20,22,0.92)] px-4 text-sm text-[var(--color-ink)] placeholder:text-[#6e6e73] focus:border-[rgba(160,160,170,0.5)] focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-accent)] px-5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-300 hover:bg-[var(--color-white)] disabled:opacity-60"
        style={{ color: "#1c1c1e" }}
      >
        {status === "sending" ? "Sending…" : "Send it"}
        {status !== "sending" && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </form>
  );
}
