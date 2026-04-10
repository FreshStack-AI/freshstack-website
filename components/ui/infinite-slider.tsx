import React from "react";

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  reverse?: boolean;
};

export function InfiniteSlider({
  children,
  gap = 42,
  speed = 60,
  speedOnHover = 20,
  reverse = false,
}: InfiniteSliderProps) {
  const duration = (100 / speed) * 30;
  const hoverDuration = (100 / speedOnHover) * 30;

  return (
    <div
      className="overflow-hidden"
      style={
        {
          "--slider-duration": `${duration}s`,
          "--slider-duration-hover": `${hoverDuration}s`,
        } as React.CSSProperties
      }
    >
      <div
        className="animate-slider flex w-max items-center"
        style={{
          gap: `${gap}px`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
