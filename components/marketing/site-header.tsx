"use client";

import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import type { CTAConfig, SiteContent } from "@/content/site-content";

type SiteHeaderProps = {
  brandName: SiteContent["brandName"];
  links: SiteContent["navigation"]["links"];
  cta: CTAConfig;
};

export function SiteHeader({ brandName, links, cta }: SiteHeaderProps) {
  const [activeHref, setActiveHref] = useState(links[0]?.href ?? "#hero");
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);
  const pendingTargetRef = useRef<`#${string}` | null>(null);

  const getScrollOffset = () => {
    const rootStyles = getComputedStyle(document.documentElement);
    const rootFontSize = parseFloat(rootStyles.fontSize) || 16;
    const headerHeightValue = rootStyles.getPropertyValue("--header-height").trim();

    if (headerHeightValue.endsWith("rem")) {
      return parseFloat(headerHeightValue) * rootFontSize + rootFontSize;
    }

    if (headerHeightValue.endsWith("px")) {
      return parseFloat(headerHeightValue) + rootFontSize;
    }

    return 96;
  };

  useEffect(() => {
    if (typeof window === "undefined" || links.length === 0) {
      return;
    }

    const resolveActiveHref = () => {
      const offset = 140;

      if (pendingTargetRef.current) {
        const pendingSection = document.getElementById(
          pendingTargetRef.current.replace(/^#/, ""),
        );

        if (pendingSection) {
          const pendingTop = pendingSection.getBoundingClientRect().top - getScrollOffset();

          if (Math.abs(pendingTop) <= 24) {
            pendingTargetRef.current = null;
          } else {
            setActiveHref(pendingTargetRef.current);
            return;
          }
        } else {
          pendingTargetRef.current = null;
        }
      }

      let currentHref = links[0].href;

      for (const link of links) {
        const sectionId = link.href.replace(/^#/, "");
        const section = document.getElementById(sectionId);

        if (!section) {
          continue;
        }

        if (section.getBoundingClientRect().top - offset <= 0) {
          currentHref = link.href;
        }
      }

      setActiveHref(currentHref);
    };

    resolveActiveHref();
    window.addEventListener("scroll", resolveActiveHref, { passive: true });
    window.addEventListener("resize", resolveActiveHref);
    window.addEventListener("hashchange", resolveActiveHref);

    return () => {
      window.removeEventListener("scroll", resolveActiveHref);
      window.removeEventListener("resize", resolveActiveHref);
      window.removeEventListener("hashchange", resolveActiveHref);
    };
  }, [links]);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: `#${string}`) => {
    const section = document.getElementById(href.replace(/^#/, ""));

    if (!section) {
      return;
    }

    event.preventDefault();
    pendingTargetRef.current = href;
    setActiveHref(href);
    window.history.pushState(null, "", href);

    window.scrollTo({
      top: section.getBoundingClientRect().top + window.scrollY - getScrollOffset(),
      behavior: "smooth",
    });
  };

  useLayoutEffect(() => {
    const limelight = limelightRef.current;
    const activeIndex = links.findIndex((link) => link.href === activeHref);
    const activeItem = navItemRefs.current[activeIndex];

    if (!limelight || !activeItem) {
      return;
    }

    const nextLeft =
      activeItem.offsetLeft + activeItem.offsetWidth / 2 - limelight.offsetWidth / 2;

    limelight.style.left = `${nextLeft}px`;

    if (!isReady) {
      setTimeout(() => setIsReady(true), 50);
    }
  }, [activeHref, isReady, links]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(2,2,2,0.72)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:gap-6 sm:px-6 lg:px-8">
        <a
          href="#hero"
          className="inline-flex shrink-0 items-center"
        >
          <Image
            src="/freshstack-navbar-lockup-accent.png"
            alt={brandName}
            width={2192}
            height={500}
            className="h-auto w-[10.2rem] sm:w-[11.6rem] lg:w-[12.4rem]"
            priority
          />
        </a>

        <nav className="relative hidden h-12 items-end gap-6 pt-3 lg:flex">
          {links.map((item) => (
            <a
              key={item.href}
              ref={(element) => {
                navItemRefs.current[links.findIndex((link) => link.href === item.href)] = element;
              }}
              href={item.href}
              onClick={(event) => handleNavClick(event, item.href)}
              className={`relative z-20 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                activeHref === item.href ? "text-[var(--color-accent)]" : "text-white/45 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}

          <div
            ref={limelightRef}
            className={`pointer-events-none absolute top-0 z-10 h-[4px] w-11 rounded-full bg-[var(--color-accent)] shadow-[0_18px_16px_rgba(245,240,232,0.18)] ${
              isReady ? "transition-[left] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" : ""
            }`}
            style={{ left: "-999px" }}
          >
            <div className="absolute left-[-35%] top-[4px] h-10 w-[170%] bg-gradient-to-b from-[rgba(245,240,232,0.22)] to-transparent [clip-path:polygon(8%_100%,28%_0,72%_0,92%_100%)]" />
          </div>
        </nav>

        <div className="hidden shrink-0 sm:block">
          <a
            href={cta.bookSectionHref}
            className="group inline-flex items-center gap-3 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-accent)] px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#1c1c1e] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[var(--color-accent)] hover:bg-[var(--color-white)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <span className="pl-2 text-[#1c1c1e]">{cta.primaryLabel}</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(28,28,30,0.18)] bg-[rgba(28,28,30,0.92)]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-[var(--color-accent)]"
              >
                <path
                  d="M7 17L17 7M17 7H8M17 7V16"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>

      <nav className="border-t border-white/10 px-5 py-3 lg:hidden sm:px-6">
        <div className="mx-auto flex max-w-6xl gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white/55 transition-colors duration-150 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
