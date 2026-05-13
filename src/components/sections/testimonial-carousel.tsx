"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useEffectEvent, useState } from "react";

import { PhotoPanel, Reveal, easings } from "@/components/motion";
import { siteCopy } from "@/lib/copy";
import type { homeData } from "@/lib/site-data";

const AUTO_ADVANCE_MS = 6000;

export type TestimonialCarouselProps = {
  items: Array<(typeof homeData.testimonials)[number]>;
  eyebrow: string;
};

export function TestimonialCarousel({ items, eyebrow }: TestimonialCarouselProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const onAdvance = useEffectEvent(() => {
    setIndex((current) => (current + 1) % items.length);
  });

  useEffect(() => {
    if (reduceMotion || isPaused) {
      return;
    }

    const timer = window.setInterval(() => onAdvance(), AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [isPaused, reduceMotion]);

  const current = items[index];
  const next = items[(index + 1) % items.length];
  const afterNext = items[(index + 2) % items.length];

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
          <div
            className="carousel-stack-ghost carousel-stack-ghost-far"
            style={{ backgroundImage: `url(${afterNext.image})` }}
            aria-hidden="true"
          />
          <div
            className="carousel-stack-ghost carousel-stack-ghost-near"
            style={{ backgroundImage: `url(${next.image})` }}
            aria-hidden="true"
          />

          <AnimatePresence mode="wait">
            <motion.article
              key={current.name}
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
              <motion.div
                key={`swoosh-${current.name}`}
                className="carousel-swoosh"
                initial={reduceMotion ? false : { x: "-118%", opacity: 0 }}
                animate={reduceMotion ? {} : { x: "130%", opacity: [0, 0.45, 0] }}
                transition={{ duration: 0.82, ease: "easeInOut" }}
                aria-hidden="true"
              />

              <div className="carousel-copy">
                <p className="eyebrow">{eyebrow}</p>
                <Quote size={28} />
                <blockquote>{current.quote}</blockquote>
                <div className="carousel-meta">
                  <div>
                    <strong>{current.name}</strong>
                    <span>{current.role}</span>
                  </div>
                  <a href={current.videoUrl} target="_blank" rel="noopener noreferrer">
                    {siteCopy.routes.home.sections.testimonialsPrimary.watchLabel}
                  </a>
                </div>
              </div>

              <PhotoPanel
                className="carousel-portrait"
                image={current.image}
                alt={current.imageAlt}
              />
            </motion.article>
          </AnimatePresence>
        </div>

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
      </Reveal>
    </section>
  );
}
