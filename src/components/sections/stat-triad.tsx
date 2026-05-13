"use client";

import { motion } from "framer-motion";

import { Reveal, useAnimatedNumber } from "@/components/motion";
import { homeData } from "@/lib/site-data";

function AnimatedStat({ value, unit, body }: (typeof homeData.stats)[number]) {
  const { ref, value: current, done } = useAnimatedNumber(value, {
    duration: 1500,
    overshoot: 0.18,
  });

  return (
    <Reveal className="stat-card">
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
          ↗
        </motion.span>
      </p>
      <p>{body}</p>
    </Reveal>
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
