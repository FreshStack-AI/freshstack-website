"use client";

import { useEffect, useRef } from "react";

export function HeroSectionV2() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 0.75;
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="h-full w-full object-cover"
          style={{
            filter: "grayscale(1) brightness(0.75)",
            opacity: 0.55,
          }}
        >
          <source src="/media/loophero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark layered overlays */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[#0a0a0a]/35" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/25" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 py-28 text-center sm:px-6 lg:px-8">

        {/* Eyebrow */}
        <p
          className="hero-fade-up section-label mb-8 inline-block"
          style={{ animationDelay: "0ms" }}
        >
          <span className="mr-2 opacity-50">//</span>
          AI-POWERED AUTOMATION AGENCY
        </p>

        {/* Headline */}
        <h1
          className="hero-fade-up mx-auto mb-7 max-w-4xl text-[clamp(2.6rem,6.5vw,4.75rem)] font-bold leading-[1.04] tracking-[-0.035em] text-[#f5f0e8]"
          style={{ animationDelay: "90ms" }}
        >
          We build the systems<br />
          You keep the{" "}
          <span className="text-[#c8c0b0]">leverage.</span>
        </h1>

        {/* Subheadline */}
        <p
          className="hero-fade-up mx-auto mb-12 max-w-2xl text-base leading-[1.8] text-[#8e8e93] sm:text-[1.0625rem]"
          style={{ animationDelay: "170ms" }}
        >
          Your team focuses on work that grows the business. We automate everything else.
        </p>

        {/* CTA */}
        <div
          className="hero-fade-up flex items-center justify-center"
          style={{ animationDelay: "250ms" }}
        >
          <a
            href="#case-studies"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-[rgba(245,240,232,0.16)] px-8 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#f5f0e8]/60 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[rgba(245,240,232,0.35)] hover:text-[#f5f0e8]"
          >
            See our work
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
              <path d="M2 9L9 2M9 2H2.5M9 2V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom section fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[4] h-28 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

      {/* Scroll indicator */}
      <div
        className="hero-fade-up absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        style={{ animationDelay: "520ms" }}
      >
        <div className="flex h-9 w-[1.2rem] items-start justify-center rounded-full border border-[#f5f0e8]/18 pt-1.5">
          <div className="hero-scroll-dot h-1.5 w-0.5 rounded-full bg-[#c8c0b0]/50" />
        </div>
      </div>
    </section>
  );
}
