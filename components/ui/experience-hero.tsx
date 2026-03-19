"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

import { ToolIconCloud } from "@/components/ui/tool-icon-cloud";

type ExperienceHeroProps = {
  eyebrow: string;
  displayLines: string[];
  description: string;
  proof: string;
  ctaLabel: string;
  ctaHref: string;
  supportTitle: string;
  supportItems: string[];
  toolLabels: string[];
};

export function ExperienceHero({
  eyebrow,
  displayLines,
  description,
  proof,
  ctaLabel,
  ctaHref,
  supportTitle,
  supportItems,
  toolLabels,
}: ExperienceHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!reduceMotion) {
        gsap.fromTo(
          revealRef.current,
          { filter: "blur(24px)", opacity: 0, y: 24 },
          {
            filter: "blur(0px)",
            opacity: 1,
            y: 0,
            duration: 1.7,
            ease: "expo.out",
          },
        );

        gsap.from(".command-cell", {
          x: 42,
          opacity: 0,
          stagger: 0.08,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.45,
          clearProps: "all",
        });
      }

      const handleMouseMove = (event: MouseEvent) => {
        if (reduceMotion || !ctaRef.current) {
          return;
        }

        const rect = ctaRef.current.getBoundingClientRect();
        const dist = Math.hypot(
          event.clientX - (rect.left + rect.width / 2),
          event.clientY - (rect.top + rect.height / 2),
        );

        if (dist < 150) {
          gsap.to(ctaRef.current, {
            x: (event.clientX - (rect.left + rect.width / 2)) * 0.35,
            y: (event.clientY - (rect.top + rect.height / 2)) * 0.35,
            duration: 0.5,
            overwrite: true,
          });
        } else {
          gsap.to(ctaRef.current, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "expo.out",
            overwrite: true,
          });
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const heroCard = {
    id: "001",
    title: supportTitle,
    val: supportItems[0] ?? proof,
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-transparent selection:bg-white selection:text-black"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(255,255,255,0.08),transparent_18%),radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.04),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,rgba(2,2,2,0),#020202)]" />
      </div>

      <div
        ref={revealRef}
        className="relative z-10 flex min-h-screen w-full flex-col gap-10 p-8 md:flex-row md:items-stretch md:p-14 lg:p-20"
      >
        <div className="flex min-w-0 flex-1 flex-col justify-between pb-12 md:pb-8">
          <div className="max-w-5xl pr-4 lg:-translate-y-8 lg:pr-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-white/40">
              {"// "}
              {eyebrow}
            </p>
            <h1 className="mt-6 text-[clamp(3.5rem,9.5vw,11.5rem)] leading-[0.87] font-black uppercase tracking-tighter text-white">
              {displayLines.map((line, index) => (
                <React.Fragment key={line}>
                  <span className={index === 1 ? "hero-outline-line text-outline" : undefined}>
                    {line}
                  </span>
                  {index < displayLines.length - 1 ? <br /> : null}
                </React.Fragment>
              ))}
            </h1>
            <p className="mt-8 max-w-md font-mono text-[11px] leading-relaxed tracking-[0.35em] text-white/40">
              {description}
            </p>
          </div>

          <a
            ref={ctaRef}
            href={ctaHref}
            className="group flex w-fit items-center gap-6 lg:-translate-y-20"
          >
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-white/15 transition-all duration-500 group-hover:bg-white">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-white transition-colors duration-500 group-hover:stroke-black"
              >
                <path
                  d="M7 17L17 7M17 7H8M17 7V16"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              {ctaLabel}
            </span>
          </a>
        </div>

        <div className="z-20 flex w-full flex-shrink-0 flex-col gap-4 md:w-80 md:self-start md:justify-start lg:w-[28rem] xl:w-[32rem]">
          <div className="command-cell glass-panel block p-6 opacity-100 sm:p-7 lg:hidden">
            <span className="mb-3 block font-mono text-[9px] uppercase tracking-widest text-white/25">
              {heroCard.id}
              {" // "}
              {heroCard.title}
            </span>
            <div className="mt-4 space-y-3">
              <h4 className="text-lg font-semibold tracking-tight text-white">{heroCard.val}</h4>
              <ul className="space-y-2 text-sm leading-6 text-white/55">
                {supportItems.slice(0, 3).map((supportItem) => (
                  <li key={supportItem}>{supportItem}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="hidden min-h-[22rem] w-full items-center justify-center lg:flex xl:min-h-[25rem]">
            <ToolIconCloud
              labels={toolLabels}
              textFallbackVariant="plain"
              className="h-[22rem] w-full xl:h-[25rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
