"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

import { Reveal } from "@/components/motion";
import { siteCopy } from "@/lib/copy";
import { linePath } from "@/lib/format";
import { homeData } from "@/lib/site-data";

const CHART_WIDTH = 560;
const CHART_HEIGHT = 280;
const PADDING = 32;
const Y_MIN = 9;
const Y_MAX = 91;

export function QuarterlyChartSection() {
  const reduceMotion = useReducedMotion();
  const path = useMemo(
    () => linePath(homeData.quarterly.values, CHART_WIDTH, CHART_HEIGHT, PADDING),
    [],
  );

  return (
    <section className="quarterly-section">
      <Reveal className="section-intro">
        <p className="eyebrow">{homeData.quarterly.caption}</p>
        <h2>{siteCopy.routes.home.sections.quarterlyChart.headline}</h2>
      </Reveal>
      <Reveal className="quarterly-chart-shell" amount={0.4}>
        <div className="quarterly-axis-header">
          <div className="quarterly-axis-label">{homeData.quarterly.axisLabel}</div>
          <div className="quarterly-y-values" aria-hidden="true">
            {siteCopy.routes.home.sections.quarterlyChart.yAxisValues.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          className="quarterly-chart"
          aria-label="Quarterly growth chart"
        >
          <line x1={PADDING} y1={CHART_HEIGHT - 40} x2={CHART_WIDTH - PADDING} y2={CHART_HEIGHT - 40} />
          <line x1={PADDING} y1={24} x2={PADDING} y2={CHART_HEIGHT - 40} />
          <motion.path
            d={path}
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0.2 }}
            whileInView={reduceMotion ? {} : { pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 1.55, ease: "easeOut" }}
          />
          {homeData.quarterly.values.map((value, index) => {
            const x =
              PADDING + ((CHART_WIDTH - PADDING * 2) / (homeData.quarterly.values.length - 1)) * index;
            const y =
              CHART_HEIGHT - 40 - ((value - Y_MIN) / (Y_MAX - Y_MIN)) * (CHART_HEIGHT - 40 - PADDING);

            return (
              <g key={homeData.quarterly.labels[index]}>
                <motion.circle
                  cx={x}
                  cy={y}
                  r="5"
                  initial={reduceMotion ? false : { scale: 0 }}
                  whileInView={reduceMotion ? {} : { scale: 1 }}
                  viewport={{ once: true, amount: 0.55 }}
                  transition={{ delay: 0.25 + index * 0.12, duration: 0.3 }}
                />
                <text x={x} y={CHART_HEIGHT - 14} textAnchor="middle">
                  {homeData.quarterly.labels[index]}
                </text>
                <text x={x} y={y - 12} textAnchor="middle">
                  ${value}k
                </text>
              </g>
            );
          })}
        </svg>
      </Reveal>
    </section>
  );
}
