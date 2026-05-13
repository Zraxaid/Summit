"use client";

import { motion, useReducedMotion } from "framer-motion";

import { PhotoPanel, Reveal, easings } from "@/components/motion";
import { siteCopy } from "@/lib/copy";
import { homeData } from "@/lib/site-data";

export function FounderSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="founder-section">
      <Reveal className="founder-shell">
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.1, ease: easings.smoothOut }}
        >
          <PhotoPanel
            className="founder-photo"
            image={homeData.founder.image}
            alt={homeData.founder.imageAlt}
          />
        </motion.div>
        <div className="founder-copy">
          <p className="eyebrow">{homeData.founder.eyebrow}</p>
          <motion.h2
            initial={reduceMotion ? false : { x: 110, opacity: 0 }}
            whileInView={reduceMotion ? {} : { x: [110, -18, 0], opacity: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9, times: [0, 0.75, 1], ease: easings.expoOut }}
          >
            {homeData.founder.headline}
          </motion.h2>
          <p>{homeData.founder.body}</p>
          <a href={homeData.founder.followUrl} target="_blank" rel="noopener noreferrer">
            {siteCopy.routes.home.sections.founder.ctaLabel}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
