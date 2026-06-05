import { type CSSProperties } from "react";

export function Halftone({
  className = "",
  color = "var(--ink)",
  size = 10,
  opacity = 0.5,
  style,
}: {
  className?: string;
  color?: string;
  size?: number;
  opacity?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none ${className}`}
      style={{
        opacity,
        backgroundImage: `radial-gradient(${color} 1px, transparent 1.4px)`,
        backgroundSize: `${size}px ${size}px`,
        ...style,
      }}
    />
  );
}

export function DiagonalStripes({
  className = "",
  color = "var(--ink)",
  gap = 10,
  thickness = 2,
  opacity = 1,
}: {
  className?: string;
  color?: string;
  gap?: number;
  thickness?: number;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none ${className}`}
      style={{
        opacity,
        backgroundImage: `repeating-linear-gradient(45deg, ${color} 0 ${thickness}px, transparent ${thickness}px ${gap}px)`,
      }}
    />
  );
}

export function Grain({ className = "", opacity = 0.08 }: { className?: string; opacity?: number }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 mix-blend-multiply ${className}`}
      style={{
        opacity,
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='220' height='220' filter='url(%23n)' opacity='0.9'/></svg>\")",
      }}
    />
  );
}
