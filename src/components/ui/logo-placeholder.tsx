"use client";

type LogoPlaceholderProps = {
  className?: string;
  variant?: "dark" | "light";
  label?: string;
  /** When true the wordmark is omitted (use on small surfaces like Instagram cards). */
  compact?: boolean;
};

export function LogoPlaceholder({
  className,
  variant = "dark",
  label,
  compact = false,
}: LogoPlaceholderProps) {
  return (
    <div
      className={`logo-placeholder logo-placeholder-${variant}${compact ? " logo-placeholder-compact" : ""}${className ? ` ${className}` : ""}`}
      aria-label={label ? `${label} (image pending)` : undefined}
      role={label ? "img" : "presentation"}
    >
      <span className="logo-placeholder-mark" aria-hidden="true">
        <svg viewBox="0 0 100 100">
          <path
            d="M28 74 L50 26 L72 74"
            stroke="currentColor"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M42 82 L58 82"
            stroke="currentColor"
            strokeWidth="9"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </span>
      {compact ? null : <span className="logo-placeholder-wordmark" aria-hidden="true">SUMMIT</span>}
    </div>
  );
}
