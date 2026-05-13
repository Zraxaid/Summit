"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useEffectEvent, useState } from "react";

import { PhotoPanel, Reveal, easings } from "@/components/motion";
import type { Recruiter, RecruiterTestimonial } from "@/lib/recruiters";

const AUTO_ADVANCE_MS = 6000;

export function RecruiterTestimonialsSection({ recruiter }: { recruiter: Recruiter }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const items = recruiter.testimonials;
  const eyebrow = `WHY I JOINED ${recruiter.name.split(" ")[0].toUpperCase()}'S TEAM`;
  const onAdvance = useEffectEvent(() => {
    setIndex((current) => (current + 1) % items.length);
  });

  useEffect(() => {
    if (reduceMotion || isPaused || items.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => onAdvance(), AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [isPaused, items.length, reduceMotion]);

  if (items.length === 0) {
    return null;
  }

  const current: RecruiterTestimonial = items[index];

  return (
    <section
      className="carousel-section"
      aria-label={eyebrow}
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <Reveal className="carousel-shell">
        <div className="carousel-stack">
          <AnimatePresence mode="wait">
            <motion.article
              key={current.id}
              className="carousel-frame"
              aria-roledescription="slide"
              aria-label={`${current.name}, ${current.role}`}
              initial={
                reduceMotion ? false : { opacity: 0, rotateY: -20, rotateZ: -2, x: 48, scale: 0.96 }
              }
              animate={reduceMotion ? {} : { opacity: 1, rotateY: 0, rotateZ: 0, x: 0, scale: 1 }}
              exit={
                reduceMotion ? {} : { opacity: 0, rotateY: 20, rotateZ: 2, x: -48, scale: 0.94 }
              }
              transition={{ duration: 0.58, ease: easings.smoothOut }}
            >
              <div className="carousel-copy">
                <p className="eyebrow">{eyebrow}</p>
                <Quote size={28} />
                <blockquote>{current.quote}</blockquote>
                <div className="carousel-meta">
                  <div>
                    <strong>{current.name}</strong>
                    <span>{current.role}</span>
                  </div>
                  <span className="recruiter-testimonial-tag">
                    Recruited by {recruiter.name.split(" ")[0]} · joined {current.joinedAt}
                  </span>
                </div>
              </div>

              <PhotoPanel
                className="carousel-portrait"
                image={current.portrait.src}
                alt={current.portrait.alt}
              />
            </motion.article>
          </AnimatePresence>
        </div>

        {items.length > 1 ? (
          <>
            <button
              type="button"
              className="carousel-nav carousel-nav-prev"
              aria-label="Previous slide"
              onClick={() =>
                setIndex((currentIndex) => (currentIndex - 1 + items.length) % items.length)
              }
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              className="carousel-nav carousel-nav-next"
              aria-label="Next slide"
              onClick={() => setIndex((currentIndex) => (currentIndex + 1) % items.length)}
            >
              <ChevronRight size={22} />
            </button>
          </>
        ) : null}
      </Reveal>
    </section>
  );
}
