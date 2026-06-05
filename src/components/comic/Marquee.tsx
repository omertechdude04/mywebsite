import type { ReactNode } from "react";

export function Marquee({
  children,
  className = "",
  speed = 30,
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  reverse?: boolean;
}) {
  return (
    <div className={`group flex overflow-hidden ${className}`}>
      <div
        className="flex shrink-0 items-center gap-10 whitespace-nowrap pr-10"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {children}
      </div>
      <div
        aria-hidden
        className="flex shrink-0 items-center gap-10 whitespace-nowrap pr-10"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {children}
      </div>
    </div>
  );
}
