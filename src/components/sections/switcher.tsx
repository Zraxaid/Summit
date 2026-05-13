"use client";

import { motion, useReducedMotion } from "framer-motion";

import { PhotoPanel, Reveal, easings, useAnimatedNumber } from "@/components/motion";
import { homeData } from "@/lib/site-data";

function SwitcherStat() {
  const target = 43;
  const ratio = target / 100;
  const reduceMotion = useReducedMotion();
  const { ref, value } = useAnimatedNumber(target, {
    duration: 1500,
    overshoot: 0.12,
  });

  return (
    <div className="switcher-stat">
      <div className="switcher-donut">
        <svg viewBox="0 0 160 160" aria-hidden="true">
          <circle cx="80" cy="80" r="58" className="donut-track" />
          <motion.circle
            cx="80"
            cy="80"
            r="58"
            className="donut-progress"
            pathLength={ratio}
            initial={reduceMotion ? false : { pathLength: 0 }}
            whileInView={reduceMotion ? {} : { pathLength: ratio }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>
        <div className="switcher-donut-copy">
          <strong ref={ref}>{Math.round(value)}%</strong>
          <span>{homeData.switcher.statLabel}</span>
        </div>
      </div>
    </div>
  );
}

export function SwitcherSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="switcher-section">
      <Reveal className="switcher-shell">
        <PhotoPanel
          className="switcher-photo"
          image={homeData.switcher.image}
          alt={homeData.switcher.imageAlt}
        />

        <div className="switcher-copy">
          <p className="eyebrow">{homeData.switcher.eyebrow}</p>
          <motion.h2
            initial={reduceMotion ? false : { x: -42, opacity: 0 }}
            whileInView={reduceMotion ? {} : { x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: easings.expoOut }}
          >
            {homeData.switcher.title}
          </motion.h2>
          <p>{homeData.switcher.body}</p>
          <SwitcherStat />
        </div>
      </Reveal>
    </section>
  );
}
