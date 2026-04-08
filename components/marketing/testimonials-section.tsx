import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";

type Testimonial = {
  quote: string;
  name: string;
  role: ReactNode;
  avatarSrc?: string;
  isPlaceholder?: boolean;
};

/* eslint-disable react/jsx-key */
const testimonials: Testimonial[] = [
  // Column 1
  {
    quote:
      "FreshStack been a huge unlock and a great resource for us. Highly recommend.",
    name: "Tom Glasgow",
    role: (<>COO at <a href="https://x.com/wayfinderHQ" target="_blank" rel="noopener noreferrer" className="underline decoration-white/25 underline-offset-2 hover:decoration-white/50 transition-colors">WayfinderHQ</a></>),
    avatarSrc: "/tom-testimonial.jpg",
  },
  {
    quote: "[Awaiting testimonial]",
    name: "Declan",
    role: (<>Co-Founder at <a href="https://r3ach.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-white/25 underline-offset-2 hover:decoration-white/50 transition-colors">R3ACH NTWRK</a></>),
    avatarSrc: "/declan-testimonial.png",
    isPlaceholder: true,
  },
  {
    quote: "[PLACEHOLDER — client quote here.]",
    name: "[Client Name]",
    role: "[Title, Company]",
    isPlaceholder: true,
  },
  // Column 2
  {
    quote:
      "You've gone above and beyond on everything you ship and it all pretty much works right out the gate too, which is nice because I'm used to working with devs where they send me something and it's like, oh yeah, this is broken, this doesn't work. And I don't really run into that with you. Anytime I request feature adds, they always come through. You guys have been super quick to resolve anything. You are on top of your game. Probably some of the best automation engineers I've ever worked with.",
    name: "Garett Graham",
    role: "Finance Director",
    avatarSrc: "/garett-testimonial.png",
  },
  {
    quote: "[PLACEHOLDER — client quote here.]",
    name: "[Client Name]",
    role: "[Title, Company]",
    isPlaceholder: true,
  },
  {
    quote: "[PLACEHOLDER — client quote here.]",
    name: "[Client Name]",
    role: "[Title, Company]",
    isPlaceholder: true,
  },
  // Column 3
  {
    quote: "[PLACEHOLDER — client quote here.]",
    name: "[Client Name]",
    role: "[Title, Company]",
    isPlaceholder: true,
  },
  {
    quote: "[PLACEHOLDER — client quote here.]",
    name: "[Client Name]",
    role: "[Title, Company]",
    isPlaceholder: true,
  },
  {
    quote: "[PLACEHOLDER — client quote here.]",
    name: "[Client Name]",
    role: "[Title, Company]",
    isPlaceholder: true,
  },
];

const COLUMNS = [
  testimonials.slice(0, 3),
  testimonials.slice(3, 6),
  testimonials.slice(6, 9),
];

const COLUMN_DURATIONS = ["17.6s", "22.4s", "15.2s"];

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <li
      className="group rounded-3xl border border-[rgba(245,240,232,0.1)] bg-[#111111] p-7 shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(245,240,232,0.2)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
      aria-hidden={index >= 3 ? "true" : undefined}
    >
      <blockquote className="m-0 p-0">
        <p
          className={`text-[0.975rem] leading-[1.8] tracking-[-0.01em] ${
            testimonial.isPlaceholder
              ? "italic text-[#8e8e93]/35"
              : "text-[#c8c0b0]"
          }`}
        >
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        <footer className="mt-6 flex items-center gap-3">
          {testimonial.avatarSrc ? (
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-[rgba(245,240,232,0.12)] transition-all duration-300 group-hover:ring-[rgba(245,240,232,0.28)]">
              <Image
                src={testimonial.avatarSrc}
                alt={`Photo of ${testimonial.name}`}
                fill
                className="object-cover grayscale"
              />
            </div>
          ) : (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(245,240,232,0.08)] bg-[rgba(245,240,232,0.03)] ring-2 ring-[rgba(245,240,232,0.05)]">
              <span className="font-mono text-[10px] text-[#c8c0b0]/25">—</span>
            </div>
          )}
          <div className="flex flex-col">
            <cite
              className={`not-italic text-sm font-semibold leading-5 tracking-[-0.015em] ${
                testimonial.isPlaceholder
                  ? "text-[#8e8e93]/35"
                  : "text-[#f5f0e8]"
              }`}
            >
              {testimonial.name}
            </cite>
            <span
              className={`mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] leading-5 ${
                testimonial.isPlaceholder
                  ? "text-[#8e8e93]/25"
                  : "text-[#c8c0b0]/55"
              }`}
            >
              {testimonial.role}
            </span>
          </div>
        </footer>
      </blockquote>
    </li>
  );
}

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative z-10 px-5 pb-24 pt-0 sm:px-8 lg:px-10 lg:pb-32"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-14">
          <p className="section-label mb-5">
            <span className="mr-2 opacity-50">//</span>
            Testimonials
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#f5f0e8]">
            Straight from the people
            <br className="hidden sm:block" /> we work with.
          </h2>
        </div>

        {/* Scrolling columns */}
        <div
          className="relative grid gap-4 overflow-hidden sm:grid-cols-3"
          style={{
            maxHeight: "27rem",
            maskImage:
              "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
          }}
        >
          {COLUMNS.map((col, colIndex) => (
            <div key={colIndex} className="overflow-hidden">
              {/* Doubled for seamless loop */}
              <ul
                className="animate-scroll-up flex flex-col gap-4"
                style={{ "--scroll-duration": COLUMN_DURATIONS[colIndex] } as CSSProperties}
              >
                {[...col, ...col].map((t, i) => (
                  <TestimonialCard key={`col${colIndex}-${i}`} testimonial={t} index={i} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
