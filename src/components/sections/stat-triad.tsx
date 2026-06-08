"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Reveal, easings, useAnimatedNumber, useTilt } from "@/components/motion";
import { homeData } from "@/lib/site-data";

function AnimatedStat({ value, unit, body }: (typeof homeData.stats)[number]) {
  const reduceMotion = useReducedMotion();
  const { ref, value: current, done } = useAnimatedNumber(value, {
    duration: 1500,
    overshoot: 0.18,
  });
  const { handlers, style } = useTilt({ max: 6 });

  return (
    <motion.div
      className="stat-card tilt-card"
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: easings.smoothOut }}
      style={style}
      {...handlers}
    >
      <p className="stat-value">
        <span ref={ref} aria-live="polite" aria-label={`${value}${unit}`}>
          {Math.round(current)}
        </span>
        <span>{unit}</span>
        <motion.span
          className="stat-snap-arrow"
          initial={false}
          animate={done ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.7, y: 8 }}
          transition={{ duration: 0.28 }}
          aria-hidden="true"
        >
          <ArrowUpRight size={28} strokeWidth={2.5} />
        </motion.span>
      </p>
      <p>{body}</p>
    </motion.div>
  );
}

export function StatTriadSection() {
  return (
    <section className="stat-section">
      <div className="stat-backdrop" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <Reveal className="stat-grid">
        {homeData.stats.map((stat) => (
          <AnimatedStat key={stat.body} {...stat} />
        ))}
      </Reveal>
    </section>
  );
}
