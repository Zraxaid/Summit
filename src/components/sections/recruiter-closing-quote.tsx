"use client";

import { motion, useReducedMotion } from "framer-motion";

import { PhotoPanel, Reveal, easings } from "@/components/motion";
import type { Recruiter } from "@/lib/recruiters";

export function RecruiterClosingQuoteSection({ recruiter }: { recruiter: Recruiter }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="closing-quote-section">
      <Reveal className="closing-quote-shell">
        <PhotoPanel
          className="closing-quote-photo"
          image={recruiter.portrait.src}
          alt={recruiter.portrait.alt}
        />
        <div className="closing-quote-copy">
          <motion.blockquote
            initial={reduceMotion ? false : { x: -34, opacity: 0 }}
            whileInView={reduceMotion ? {} : { x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.72, ease: easings.expoOut }}
          >
            <span>{recruiter.closingQuote.body}</span>
          </motion.blockquote>
          <p>{recruiter.closingQuote.attribution}</p>
        </div>
      </Reveal>
    </section>
  );
}
