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
      className={classNames("px-5 py-16 sm:px-6 lg:px-8 lg:py-24", className)}
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-[54rem]">
          <p className="section-label">{eyebrow}</p>
          <h2 className="section-title mt-5 max-w-5xl text-3xl text-balance text-[var(--color-ink)] sm:text-4xl lg:text-[3.85rem]">
            {title}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
            {description}
          </p>
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
  variant = "accent",
  className,
}: LinkButtonProps) {
  const shared =
    "inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3.5 text-sm font-medium tracking-[-0.02em] transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-paper)]";

  const variants = {
    primary:
      "border-[var(--color-void)] bg-[var(--color-void)] text-[var(--color-white)] hover:bg-[var(--color-obsidian)] hover:border-[var(--color-obsidian)]",
    accent:
      "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-void)] hover:border-[var(--color-accent-strong)] hover:bg-[var(--color-accent-strong)] hover:text-[var(--color-white)]",
    secondary:
      "border-[var(--color-border-strong)] bg-[var(--color-white)] text-[var(--color-ink)] hover:border-[var(--color-void)]",
    ghost:
      "border-transparent bg-transparent px-0 py-0 text-[var(--color-accent)] hover:text-[var(--color-accent-strong)]",
  } satisfies Record<NonNullable<LinkButtonProps["variant"]>, string>;

  return (
    <a href={href} className={classNames(shared, variants[variant], className)}>
      {children}
    </a>
  );
}
