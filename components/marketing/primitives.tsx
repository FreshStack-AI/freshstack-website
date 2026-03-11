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
  variant?: "primary" | "secondary" | "ghost";
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
      className={classNames("px-5 py-20 sm:px-6 lg:px-8 lg:py-24", className)}
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="section-label">{eyebrow}</p>
          <h2 className="section-title mt-5 text-3xl text-balance text-[var(--color-ink)] sm:text-4xl lg:text-[3rem]">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--color-muted)] sm:text-lg">
            {description}
          </p>
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

export function LinkButton({
  href,
  children,
  variant = "primary",
  className,
}: LinkButtonProps) {
  const shared =
    "inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold tracking-[0.01em] transition duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]";

  const variants = {
    primary:
      "border-[var(--color-accent)] bg-[var(--color-accent)] text-white shadow-[0_18px_30px_rgba(15,92,84,0.18)] hover:bg-[var(--color-accent-strong)] hover:border-[var(--color-accent-strong)]",
    secondary:
      "border-[var(--color-border-strong)] bg-[rgba(255,255,255,0.45)] text-[var(--color-ink)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
    ghost:
      "border-transparent bg-transparent px-0 py-0 text-[var(--color-accent)] hover:text-[var(--color-accent-strong)] hover:translate-y-0",
  } satisfies Record<NonNullable<LinkButtonProps["variant"]>, string>;

  return (
    <a href={href} className={classNames(shared, variants[variant], className)}>
      {children}
    </a>
  );
}
