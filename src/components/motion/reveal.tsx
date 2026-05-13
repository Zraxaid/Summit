"use client";

import { motion, useReducedMotion } from "framer-motion";

import { easings } from "./math";

export type RevealProps = {
  children: React.ReactNode;
  className?: string;
  amount?: number;
  delay?: number;
};

export function Reveal({ children, className, amount = 0.25, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, delay, ease: easings.smoothOut }}
    >
      {children}
    </motion.div>
  );
}
