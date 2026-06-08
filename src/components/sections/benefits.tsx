"use client";

import { motion, useReducedMotion } from "framer-motion";

import { PhotoPanel, Reveal, easings, useTilt } from "@/components/motion";
import { homeData } from "@/lib/site-data";

function BenefitCard({ benefit, index }: { benefit: string; index: number }) {
  const reduceMotion = useReducedMotion();
  const { handlers, style } = useTilt({ max: 7 });

  return (
    <motion.article
      className="tilt-card"
      initial={reduceMotion ? false : { opacity: 0, x: index % 2 === 0 ? -28 : 28, y: 18 }}
      whileInView={reduceMotion ? {} : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      style={style}
      {...handlers}
    >
      <span aria-hidden="true" />
      <h3>{benefit}</h3>
    </motion.article>
  );
}

export function BenefitsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="benefits-section">
      <Reveal className="benefits-shell">
        <PhotoPanel
          className="benefits-photo"
          image={homeData.benefits.image}
          alt={homeData.benefits.imageAlt}
        />
        <div className="benefits-copy">
          <p className="eyebrow">{homeData.benefits.eyebrow}</p>
          <motion.h2
            initial={reduceMotion ? false : { x: 36, opacity: 0 }}
            whileInView={reduceMotion ? {} : { x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: easings.expoOut }}
          >
            {homeData.benefits.title}
          </motion.h2>
          <p>{homeData.benefits.body}</p>
          <div className="benefit-grid">
            {homeData.benefits.items.map((benefit, index) => (
              <BenefitCard key={benefit} benefit={benefit} index={index} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
