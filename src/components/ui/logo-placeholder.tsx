"use client";

import Image from "next/image";

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
  const src = compact ? "/images/summit-mark.png" : "/images/summit-logo.png";

  return (
    <div
      className={`logo-placeholder logo-placeholder-${variant}${compact ? " logo-placeholder-compact" : ""}${className ? ` ${className}` : ""}`}
      aria-label={label}
      role={label ? "img" : "presentation"}
    >
      <Image
        src={src}
        alt=""
        width={compact ? 256 : 800}
        height={compact ? 256 : 800}
        className="logo-placeholder-image"
        priority={false}
      />
    </div>
  );
}
