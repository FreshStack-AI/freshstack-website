import type { ReactNode } from "react";

type SectionShellProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "accent" | "secondary" | "ghost";
  className?: string;
};

function classNames(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  className,
  children,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={classNames("relative z-10 px-5 py-[4.5rem] sm:px-6 lg:px-8 lg:py-24", className)}
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-[54rem]">
          <p className="section-label">
            {"// "}
            {eyebrow}
          </p>
          <h2 className="section-title mt-5 max-w-5xl text-3xl text-balance text-[var(--color-ink)] sm:text-4xl lg:text-[4.25rem]">
            {title}
          </h2>
          {description ? (
            <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>
        <div className="mt-10 lg:mt-12">{children}</div>
      </div>
    </section>
  );
}

export function BrandMark({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={classNames("brand-mark", className)}>
      {Array.from({ length: 6 }, (_, index) => (
        <span key={index} className="brand-mark-cell" />
      ))}
    </span>
  );
}

export function LinkButton({
  href,
  children,
  variant = "primary",
  className,
}: LinkButtonProps) {
  const shared =
    "inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black";

  const variants = {
    primary:
      "border-white/12 bg-white text-black hover:bg-white/90",
    accent:
      "border-white/12 bg-white text-black hover:bg-white/90",
    secondary:
      "border-white/12 bg-white/5 text-white hover:bg-white hover:text-black",
    ghost:
      "border-transparent bg-transparent px-0 py-0 text-white/75 hover:text-white",
  } satisfies Record<NonNullable<LinkButtonProps["variant"]>, string>;

  return (
    <a href={href} className={classNames(shared, variants[variant], className)}>
      {children}
    </a>
  );
}
