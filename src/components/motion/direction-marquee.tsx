"use client";

import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { clamp, wrap } from "./math";

export type DirectionMarqueeProps = {
  items: readonly string[];
  invert?: boolean;
};

export function DirectionMarquee({ items, invert = false }: DirectionMarqueeProps) {
  const reduceMotion = useReducedMotion();
  const rowRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const lastScrollRef = useRef(0);
  const boostRef = useRef(0);
  const directionRef = useRef(1);
  const [rowWidth, setRowWidth] = useState(0);

  useEffect(() => {
    const node = rowRef.current;

    if (!node) {
      return;
    }

    const measure = () => {
      const nextWidth = node.getBoundingClientRect().width;
      setRowWidth(nextWidth);
      x.set(-nextWidth);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [x]);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || !rowWidth) {
      return;
    }

    const currentScroll = window.scrollY;
    const deltaScroll = currentScroll - lastScrollRef.current;
    lastScrollRef.current = currentScroll;
    boostRef.current = boostRef.current * 0.88 + clamp(deltaScroll, -38, 38) * 0.12;

    if (Math.abs(deltaScroll) > 0.1) {
      directionRef.current = deltaScroll > 0 ? 1 : -1;
    }

    const speed = 32 + Math.min(Math.abs(boostRef.current) * 2.6, 76);
    const next = wrap(x.get() + directionRef.current * speed * (delta / 1000), -rowWidth * 2, 0);
    x.set(next);
  });

  return (
    <div className={`marquee-band${invert ? " invert" : ""}`}>
      {reduceMotion ? (
        <div className="marquee-static">
          {items.map((item, index) => (
            <span key={`${item}-${index}`}>
              <b>{item}</b>
              <i aria-hidden="true" />
            </span>
          ))}
        </div>
      ) : (
        <motion.div className="marquee-track-live" style={{ x }}>
          {[0, 1, 2].map((copy) => (
            <div key={copy} className="marquee-group" ref={copy === 1 ? rowRef : undefined}>
              {items.map((item, index) => (
                <span key={`${copy}-${item}-${index}`}>
                  <b>{item}</b>
                  <i aria-hidden="true" />
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
