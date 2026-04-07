"use client";

import { useState } from "react";
import Image from "next/image";

import type { SiteContent } from "@/content/site-content";
import { cn } from "@/lib/utils";

type FounderCarouselProps = {
  profiles: SiteContent["founder"]["profiles"];
};

export function FounderCarousel({ profiles }: FounderCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <article
      className="group relative overflow-hidden rounded-xl border border-[rgba(80,80,85,0.6)] p-6 backdrop-blur-[12px] sm:p-8 lg:p-10"
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

      <div className="relative z-10 overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {profiles.map((profile) => (
            <div key={profile.name} className="w-full shrink-0">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-center lg:gap-10">
                <div className="space-y-5">
                  <div className="inline-flex flex-col gap-2">
                    <h2
                      className="text-[1.85rem] font-bold uppercase tracking-[-0.02em] sm:text-[2.2rem]"
                      style={{
                        background:
                          "linear-gradient(135deg, #9a9a9a 0%, #d4d4d4 18%, #f0f0f0 32%, #a8a8a8 48%, #e0e0e0 62%, #b0b0b0 78%, #c8c8c8 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {profile.name}
                    </h2>
                    <span
                      className="h-[2px] w-28 rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(200,200,210,0.5), rgba(255,255,255,0.7), rgba(200,200,210,0.3))",
                      }}
                    />
                  </div>

                  <p className="max-w-4xl text-[0.9375rem] leading-[1.85] text-[#c8c0b0] sm:text-base sm:leading-8">
                    {profile.bio}
                  </p>
                </div>

                <div className="overflow-hidden rounded-lg">
                  <div className="relative aspect-[4/5]">
                    {profile.usePlaceholder || !profile.imageSrc ? (
                      <div className="flex h-full w-full items-center justify-center bg-black">
                        <span className="text-[2rem] font-light tracking-[-0.03em] text-white/90">
                          photo
                        </span>
                      </div>
                    ) : (
                      <>
                        <Image
                          src={profile.imageSrc}
                          alt={profile.imageAlt}
                          fill
                          sizes="(min-width: 1024px) 17rem, (min-width: 640px) 18rem, 100vw"
                          className="object-cover object-center grayscale"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="relative z-10 mt-8 flex items-center justify-center gap-3">
        {profiles.map((profile, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={profile.name}
              type="button"
              aria-label={`Show ${profile.name}`}
              aria-pressed={isActive}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                isActive
                  ? "w-8"
                  : "w-2 bg-white/20 hover:bg-white/40",
              )}
              style={
                isActive
                  ? {
                      background:
                        "linear-gradient(90deg, rgba(200,200,210,0.5), rgba(255,255,255,0.8), rgba(200,200,210,0.5))",
                    }
                  : undefined
              }
            />
          );
        })}
      </div>
    </article>
  );
}
