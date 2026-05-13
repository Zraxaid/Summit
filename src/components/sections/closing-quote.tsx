"use client";

import { motion, useReducedMotion } from "framer-motion";

import { PhotoPanel, Reveal, easings } from "@/components/motion";
import { homeData } from "@/lib/site-data";

export function ClosingQuoteSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="closing-quote-section">
      <Reveal className="closing-quote-shell">
        <PhotoPanel
          className="closing-quote-photo"
          image={homeData.closingQuote.image}
          alt={homeData.closingQuote.imageAlt}
        />
        <div className="closing-quote-copy">
          <motion.blockquote
            initial={reduceMotion ? false : { x: -34, opacity: 0 }}
            whileInView={reduceMotion ? {} : { x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.72, ease: easings.expoOut }}
          >
            <span>{homeData.closingQuote.opening}</span>{" "}
            <em>{homeData.closingQuote.middle}</em>{" "}
            <span>{homeData.closingQuote.closing}</span>
          </motion.blockquote>
          <p>{homeData.closingQuote.attribution}</p>
        </div>
      </Reveal>
    </section>
  );
}
