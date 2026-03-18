type MobileBookBarProps = {
  href: string;
  label: string;
};

export function MobileBookBar({ href, label }: MobileBookBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border)] bg-[color:rgba(248,247,244,0.98)] px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:hidden">
      <a
        href={href}
        className="inline-flex w-full items-center justify-center rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)] px-5 py-3.5 text-sm font-medium text-[var(--color-void)] transition-colors duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[var(--color-accent-strong)] hover:bg-[var(--color-accent-strong)] hover:text-[var(--color-white)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-paper)]"
      >
        {label}
      </a>
    </div>
  );
}
