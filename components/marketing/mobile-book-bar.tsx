type MobileBookBarProps = {
  href: string;
  label: string;
};

export function MobileBookBar({ href, label }: MobileBookBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border)] bg-[color:rgba(246,240,229,0.94)] px-4 py-3 shadow-[0_-18px_40px_rgba(24,33,30,0.08)] backdrop-blur md:hidden">
      <a
        href={href}
        className="inline-flex w-full items-center justify-center rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[var(--color-accent-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
      >
        {label}
      </a>
    </div>
  );
}
