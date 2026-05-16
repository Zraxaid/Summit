"use client";

import Image from "next/image";

import { LogoPlaceholder } from "@/components/ui/logo-placeholder";

export type PhotoPanelProps = {
  image: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  children?: React.ReactNode;
  placeholderVariant?: "dark" | "light";
};

export function PhotoPanel({
  image,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 750px) 100vw, 50vw",
  children,
  placeholderVariant = "dark",
}: PhotoPanelProps) {
  return (
    <div className={`photo-panel${className ? ` ${className}` : ""}`}>
      {image ? (
        <Image
          src={image}
          alt={alt}
          fill
          className="photo-panel-image"
          sizes={sizes}
          priority={priority}
        />
      ) : (
        <LogoPlaceholder variant={placeholderVariant} label={alt || "Summit"} />
      )}
      {children}
    </div>
  );
}
