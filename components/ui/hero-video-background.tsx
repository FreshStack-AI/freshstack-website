import { cn } from "@/lib/utils";

type HeroVideoBackgroundProps = {
  className?: string;
};

export function HeroVideoBackground({ className }: HeroVideoBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none overflow-hidden bg-[#020202]", className)}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/media/hero-loop-poster.jpg')" }}
      />
      <video
        className="absolute inset-0 h-full w-full object-cover object-center opacity-90"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/media/hero-loop-poster.jpg"
      >
        <source src="/media/hero-loop.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
