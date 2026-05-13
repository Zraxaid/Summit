"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Reveal } from "@/components/motion";
import { homeData } from "@/lib/site-data";

const SUCCESS_RATIOS = [1, 0.84, 0.93, 0.72];

function DonutKpi({
  value,
  label,
  ratio,
  accent = false,
}: {
  value: string;
  label: string;
  ratio: number;
  accent?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <Reveal className="success-card" amount={0.3}>
      <div className={`donut-kpi${accent ? " accent" : ""}`}>
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
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      </div>
    </Reveal>
  );
}

export function SuccessStripSection() {
  return (
    <section className="success-strip">
      {homeData.successKpis.map((item, index) => (
        <DonutKpi
          key={item.label}
          value={item.value}
          label={item.label}
          ratio={SUCCESS_RATIOS[index] ?? 0.8}
          accent={index === 1}
        />
      ))}
    </section>
  );
}
