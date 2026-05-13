"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { clamp, easeOutBack, easeOutCubic } from "./math";

export type AnimatedNumberOptions = {
  duration?: number;
  overshoot?: number;
  amount?: number;
};

export function useAnimatedNumber(
  target: number,
  { duration = 1400, overshoot = 0, amount = 0.55 }: AnimatedNumberOptions = {},
) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount });
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduceMotion || !isInView || done) {
      return;
    }

    let frame = 0;
    const overshootTarget = target * (1 + overshoot);
    const start = performance.now();

    const tick = (currentTime: number) => {
      const progress = clamp((currentTime - start) / duration, 0, 1);
      const nextValue =
        progress < 0.82
          ? overshoot > 0
            ? overshootTarget * easeOutCubic(progress / 0.82)
            : target * easeOutCubic(progress)
          : overshoot > 0
            ? overshootTarget - (overshootTarget - target) * easeOutBack((progress - 0.82) / 0.18)
            : target;

      setValue(nextValue);

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      } else {
        setValue(target);
        setDone(true);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [done, duration, isInView, overshoot, reduceMotion, target]);

  return {
    ref,
    value: reduceMotion ? target : value,
    done: reduceMotion ? true : done,
  };
}
