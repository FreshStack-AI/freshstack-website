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
    <article className="glass-panel card-stagger overflow-hidden p-6 sm:p-8 lg:p-10">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {profiles.map((profile) => (
            <div key={profile.name} className="w-full shrink-0">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-center lg:gap-10">
                <div className="space-y-5">
                  <div className="inline-flex flex-col gap-2">
                    <h2 className="section-title text-[1.85rem] uppercase sm:text-[2.2rem]">
                      {profile.name}
                    </h2>
                    <span className="h-[3px] w-28 rounded-full bg-white/75" />
                  </div>

                  <p className="max-w-4xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
                    {profile.bio}
                  </p>
                </div>

                <div className="overflow-hidden rounded-[1.15rem] bg-black">
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

      <div className="mt-8 flex items-center justify-center gap-3">
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
                "h-2.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black",
                isActive
                  ? "w-8 bg-white"
                  : "w-2.5 bg-white/22 hover:bg-white/45",
              )}
            />
          );
        })}
      </div>
    </article>
  );
}
