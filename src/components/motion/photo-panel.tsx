"use client";

import Image from "next/image";

export type PhotoPanelProps = {
  image: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  children?: React.ReactNode;
};

export function PhotoPanel({
  image,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 750px) 100vw, 50vw",
  children,
}: PhotoPanelProps) {
  return (
    <div className={`photo-panel${className ? ` ${className}` : ""}`}>
      <Image
        src={image}
        alt={alt}
        fill
        className="photo-panel-image"
        sizes={sizes}
        priority={priority}
      />
      {children}
    </div>
  );
}
