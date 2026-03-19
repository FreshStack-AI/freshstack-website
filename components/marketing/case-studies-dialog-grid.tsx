"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { CaseStudyWorkflowSlide } from "@/components/marketing/case-study-workflow-slide";
import type { CaseStudy } from "@/content/site-content";

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
              className="relative mx-auto flex h-full w-full max-w-[90rem] flex-col overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#0c0c0c] shadow-[0_40px_120px_rgba(0,0,0,0.65)] outline-none"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/6 px-5 py-3 sm:px-8 lg:px-12">
                <p className="section-label">{"// "}Case studies</p>
                <button
                  type="button"
                  onClick={closeDialog}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-[rgba(18,18,18,0.92)] text-white transition-colors duration-300 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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

              <div className="case-study-modal-scroll min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-5 pb-5 pt-5 sm:px-8 sm:pb-8 sm:pt-6 lg:px-12 lg:pb-10 lg:pt-8">
                <p className="max-w-5xl text-lg leading-8 text-[var(--color-ink)] sm:text-[1.4rem] sm:leading-9">
                  {activeStudy.summary}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {activeStudy.serviceTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/12 px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white/78"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3
                  id={`case-study-title-${activeStudy.id}`}
                  className="section-title mt-8 text-3xl sm:text-4xl lg:text-[4rem]"
                >
                  {activeStudy.title}
                </h3>

                <p className="mt-3 text-base text-[var(--color-muted)] sm:text-lg">
                  {activeStudy.clientType}
                </p>

                <div className="mt-8">
                  <CaseStudyWorkflowSlide study={activeStudy} />
                </div>

                <div className="mt-10 space-y-8 pb-10">
                  <div>
                    <p className="section-label">Challenge</p>
                    <p className="mt-3 max-w-5xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
                      {activeStudy.challenge}
                    </p>
                  </div>

                  <div>
                    <p className="section-label">Solution</p>
                    <p className="mt-3 max-w-5xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
                      {activeStudy.intervention}
                    </p>
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
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div className="grid gap-5 xl:grid-cols-3">
        {items.map((study, index) => (
          <button
            key={study.id}
            type="button"
            onClick={(event) => {
              triggerRef.current = event.currentTarget;
              setActiveStudy(study);
            }}
            className="glass-panel card-stagger group flex h-full flex-col justify-between p-6 text-left transition-[border-color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-white/18 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:p-7"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <div className="flex min-h-[15.5rem] flex-col">
              <div className="min-h-[3.7rem]">
                <p className="section-label max-w-[16rem] leading-[1.5]">
                  {study.clientType}
                </p>
              </div>
              <h3 className="mt-5 text-[1.9rem] font-bold tracking-[-0.045em] text-[var(--color-ink)] sm:text-[2.1rem]">
                {study.title}
              </h3>
              <p className="mt-3 max-w-[18rem] text-sm leading-6 text-[var(--color-muted)]">
                {study.automationType}
              </p>
            </div>

            <div className="mt-10 flex items-center justify-between gap-4">
              <span className="text-sm text-[var(--color-muted)]">
                View case study
              </span>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-white transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M7 17L17 7M17 7H8M17 7V16"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </button>
        ))}
      </div>

      {modalContent}
    </>
  );
}
