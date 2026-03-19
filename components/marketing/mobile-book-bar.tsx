type MobileBookBarProps = {
  href: string;
  label: string;
};

export function MobileBookBar({ href, label }: MobileBookBarProps) {
  return (
    <div
      data-mobile-book-bar
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[rgba(2,2,2,0.78)] px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden"
    >
      <a
        href={href}
        className="inline-flex w-full items-center justify-center rounded-full border border-white/12 bg-white px-5 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        {label}
      </a>
    </div>
  );
}
