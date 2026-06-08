"use client";

import { useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";

type TiltOptions = {
  /** Max rotation in degrees at the card edges. */
  max?: number;
  /** Spring stiffness for the settle. */
  stiffness?: number;
  damping?: number;
};

/**
 * Pointer-reactive 3D tilt + a radial glow that tracks the cursor.
 *
 * Spread the returned `handlers` and `style` onto a `motion.*` element.
 * The element also receives `--glow-x` / `--glow-y` custom properties so a
 * CSS `::after` highlight can follow the pointer. Honors prefers-reduced-motion
 * (returns inert handlers and no transform).
 */
export function useTilt({ max = 8, stiffness = 220, damping = 18 }: TiltOptions = {}) {
  const reduceMotion = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springX = useSpring(rx, { stiffness, damping });
  const springY = useSpring(ry, { stiffness, damping });
  const rotateX = useTransform(springX, (v) => `${v}deg`);
  const rotateY = useTransform(springY, (v) => `${v}deg`);

  if (reduceMotion) {
    return { handlers: {}, style: undefined as CSSProperties | undefined };
  }

  const handlers = {
    onPointerMove: (event: ReactPointerEvent<HTMLElement>) => {
      const el = event.currentTarget;
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      ry.set((px - 0.5) * 2 * max);
      rx.set((0.5 - py) * 2 * max);
      el.style.setProperty("--glow-x", `${px * 100}%`);
      el.style.setProperty("--glow-y", `${py * 100}%`);
    },
    onPointerLeave: () => {
      rx.set(0);
      ry.set(0);
    },
  };

  const style: CSSProperties = {
    rotateX,
    rotateY,
    transformPerspective: 800,
    transformStyle: "preserve-3d",
  } as unknown as CSSProperties;

  return { handlers, style };
}
