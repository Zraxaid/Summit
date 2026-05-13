"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

import { Reveal, useAnimatedNumber } from "@/components/motion";
import { JoinTeamButton } from "@/components/site-shell";
import { siteCopy } from "@/lib/copy";
import {
  formatCompactCurrency,
  formatCurrency,
  formatWholeNumber,
  linePath,
} from "@/lib/format";
import { homeData } from "@/lib/site-data";

const CHART_WIDTH = 620;
const CHART_HEIGHT = 320;
const CHART_PAD = 48;

function AnimatedPerformanceKpi({
  label,
  target,
  formatter,
  accent = false,
}: {
  label: string;
  target: number;
  formatter: (value: number) => string;
  accent?: boolean;
}) {
  const { ref, value } = useAnimatedNumber(target, {
    duration: 2200,
    amount: 0.45,
  });

  return (
    <article className={`performance-kpi${accent ? " accent" : ""}`}>
      <span>{label}</span>
      <strong ref={ref}>{formatter(value)}</strong>
    </article>
  );
}

export function PerformanceDashboardSection() {
  const reduceMotion = useReducedMotion();
  const writersPath = useMemo(
    () => linePath(homeData.performance.writers, CHART_WIDTH, CHART_HEIGHT, CHART_PAD),
    [],
  );
  const productionPath = useMemo(
    () => linePath(homeData.performance.production, CHART_WIDTH, CHART_HEIGHT, CHART_PAD),
    [],
  );
  const pointTimings = [0.55, 0.9, 1.2];
  const yearLabels = ["2023", "2024", "2025"];
  const usableHeight = CHART_HEIGHT - CHART_PAD * 2;

  return (
    <section id="performance" className="performance-section">
      <Reveal className="section-intro">
        <p className="eyebrow">{homeData.performance.eyebrow}</p>
        <h2>{homeData.performance.title}</h2>
        <p>{homeData.performance.body}</p>
      </Reveal>

      <Reveal className="performance-shell" amount={0.35}>
        <div className="performance-kpis">
          <AnimatedPerformanceKpi
            label="2025 TOTAL PRODUCTION"
            target={84022378}
            formatter={formatCurrency}
            accent
          />
          <AnimatedPerformanceKpi
            label="2025 NEW WRITERS"
            target={1987}
            formatter={formatWholeNumber}
          />
          <AnimatedPerformanceKpi
            label="2024 TOTAL PRODUCTION"
            target={22800000}
            formatter={formatCompactCurrency}
          />
          <AnimatedPerformanceKpi
            label="2023 NEW WRITERS"
            target={165}
            formatter={formatWholeNumber}
          />
        </div>

        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          className="performance-chart"
          aria-label="Performance dashboard chart"
        >
          <line x1={CHART_PAD} y1={CHART_HEIGHT - 52} x2={CHART_WIDTH - CHART_PAD} y2={CHART_HEIGHT - 52} />
          <line x1={CHART_PAD} y1={42} x2={CHART_PAD} y2={CHART_HEIGHT - 52} />

          <motion.path
            d={productionPath}
            className="performance-line performance-line-production"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0.24 }}
            whileInView={reduceMotion ? {} : { pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
          />
          <motion.path
            d={writersPath}
            className="performance-line performance-line-writers"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0.24 }}
            whileInView={reduceMotion ? {} : { pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 2.05, ease: "easeOut", delay: 0.05 }}
          />

          {yearLabels.map((label, index) => {
            const x = CHART_PAD + ((CHART_WIDTH - CHART_PAD * 2) / (yearLabels.length - 1)) * index;
            const writers = homeData.performance.writers[index];
            const production = homeData.performance.production[index];
            const yWriters =
              CHART_PAD + usableHeight - ((writers - 165) / (1987 - 165)) * usableHeight;
            const yProduction =
              CHART_PAD + usableHeight - ((production - 8) / (84 - 8)) * usableHeight;

            return (
              <g key={label}>
                <motion.circle
                  cx={x}
                  cy={yProduction}
                  r="5"
                  className="performance-point performance-point-production"
                  initial={reduceMotion ? false : { scale: 0 }}
                  whileInView={reduceMotion ? {} : { scale: 1 }}
                  viewport={{ once: true, amount: 0.55 }}
                  transition={{ delay: pointTimings[index], duration: 0.3 }}
                />
                <motion.circle
                  cx={x}
                  cy={yWriters}
                  r="5"
                  className="performance-point performance-point-writers"
                  initial={reduceMotion ? false : { scale: 0 }}
                  whileInView={reduceMotion ? {} : { scale: 1 }}
                  viewport={{ once: true, amount: 0.55 }}
                  transition={{ delay: pointTimings[index] + 0.08, duration: 0.3 }}
                />
                <text x={x} y={CHART_HEIGHT - 28} textAnchor="middle">
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
      </Reveal>

      <Reveal className="outline-band">
        <p>{siteCopy.routes.home.sections.performance.outlineLabel}</p>
        <JoinTeamButton variant="outline">
          {siteCopy.routes.home.sections.performance.ctaLabel}
        </JoinTeamButton>
      </Reveal>
    </section>
  );
}
