"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { Reveal, easings, useAnimatedNumber } from "@/components/motion";
import type { Recruiter, RecruiterStat } from "@/lib/recruiters";

const TYPE_INTERVAL_MS = 32;

function Typewriter({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [revealed, setRevealed] = useState(0);
  const skipAnimation = reduceMotion || !inView;
  const displayed = skipAnimation ? text.length : revealed;

  useEffect(() => {
    if (skipAnimation) {
      return;
    }

    let cursor = 0;
    const id = window.setInterval(() => {
      cursor += 1;
      setRevealed(cursor);

      if (cursor >= text.length) {
        window.clearInterval(id);
      }
    }, TYPE_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [skipAnimation, text.length]);

  return (
    <span ref={ref} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, displayed)}</span>
      {displayed < text.length ? (
        <span aria-hidden="true" className="typewriter-cursor">
          |
        </span>
      ) : null}
    </span>
  );
}

function parseStat(stat: RecruiterStat) {
  const match = stat.value.match(/(-?\d+(?:\.\d+)?)([^\d]*)$/);

  if (!match) {
    return { numeric: null as number | null, suffix: stat.value, prefix: "" };
  }

  const numeric = Number.parseFloat(match[1]);
  const prefix = stat.value.slice(0, match.index ?? 0);
  return { numeric, suffix: match[2], prefix };
}

function DonutStat({ stat, ratio }: { stat: RecruiterStat; ratio: number }) {
  const { numeric, prefix, suffix } = parseStat(stat);
  const reduceMotion = useReducedMotion();
  const animated = useAnimatedNumber(numeric ?? 0, { duration: 1500, overshoot: 0.1 });

  const display = numeric === null
    ? stat.value
    : `${prefix}${
        numeric % 1 === 0
          ? Math.round(animated.value)
          : (animated.value as number).toFixed(1)
      }${suffix}`;

  return (
    <Reveal className="recruiter-stat-card" amount={0.4}>
      <div className="donut-kpi">
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="46" className="donut-track" />
          <motion.circle
            cx="60"
            cy="60"
            r="46"
            className="donut-progress"
            pathLength={ratio}
            initial={reduceMotion ? false : { pathLength: 0 }}
            whileInView={reduceMotion ? {} : { pathLength: ratio }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.15, ease: "easeOut" }}
          />
        </svg>
        <div>
          <strong ref={numeric === null ? undefined : animated.ref}>{display}</strong>
          <span>{stat.caption}</span>
        </div>
      </div>
    </Reveal>
  );
}

const DONUT_RATIOS = [0.78, 0.92, 0.6];

export function RecruiterIntroSection({ recruiter }: { recruiter: Recruiter }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="recruiter-intro-section">
      <Reveal className="recruiter-intro-shell">
        <motion.p
          className="recruiter-intro-line"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: easings.smoothOut }}
        >
          <Typewriter text={recruiter.intro.line} />
        </motion.p>

        <div className="recruiter-intro-stats">
          {recruiter.intro.stats.map((stat, index) => (
            <DonutStat key={stat.caption} stat={stat} ratio={DONUT_RATIOS[index] ?? 0.75} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
