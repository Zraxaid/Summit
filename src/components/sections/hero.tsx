"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { Reveal, easings } from "@/components/motion";
import { JoinTeamButton } from "@/components/site-shell";
import { siteCopy } from "@/lib/copy";
import { homeData } from "@/lib/site-data";

const arrowTiles = [
  { top: "6%", left: "8%", width: 260, delay: 0.1, rotate: -22 },
  { top: "18%", right: "12%", width: 220, delay: 0.25, rotate: -18 },
  { top: "34%", left: "4%", width: 200, delay: 0.4, rotate: -26 },
  { top: "44%", right: "5%", width: 260, delay: 0.55, rotate: -16 },
  { top: "62%", left: "12%", width: 220, delay: 0.7, rotate: -20 },
  { top: "73%", right: "18%", width: 200, delay: 0.85, rotate: -18 },
  { top: "14%", left: "36%", width: 180, delay: 1, rotate: -14 },
  { top: "66%", left: "38%", width: 180, delay: 1.15, rotate: -12 },
];

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const backdropY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={heroRef} className="hero-section">
      <motion.div className="hero-backdrop" style={{ y: backdropY }}>
        {homeData.hero.heroPhotos.some(Boolean) ? (
          <div className="hero-collage" aria-hidden="true">
            {homeData.hero.heroPhotos.map((image, index) =>
              image ? (
                <motion.div
                  key={image}
                  className={`hero-collage-card hero-collage-card-${index + 1}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 48, scale: 0.92 }}
                  animate={reduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.18, duration: 1 }}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(max-width: 750px) 28vw, 16vw"
                    className="hero-collage-image"
                  />
                </motion.div>
              ) : null,
            )}
          </div>
        ) : null}

        {arrowTiles.map((arrow, index) => (
          <motion.div
            key={`${arrow.top}-${index}`}
            className="hero-arrow"
            style={{
              top: arrow.top,
              left: "left" in arrow ? arrow.left : undefined,
              right: "right" in arrow ? arrow.right : undefined,
              width: arrow.width,
              rotate: `${arrow.rotate}deg`,
            }}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.68, x: -28, y: 18 }}
            animate={reduceMotion ? {} : { opacity: 1, scale: 1, x: 0, y: 0 }}
            transition={{ duration: 1.05, delay: arrow.delay, ease: easings.smoothOut }}
          />
        ))}
      </motion.div>

      <div className="hero-content">
        <motion.div
          className="hero-mark"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.85, y: -12 }}
          animate={reduceMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: easings.smoothOut }}
        >
          <Image
            src="/images/summit-mark.png"
            alt=""
            width={400}
            height={392}
            className="hero-mark-image"
            priority
          />
        </motion.div>

        <div className="hero-copy">
          <Reveal className="hero-copy-block" amount={0.45}>
            <p className="eyebrow">{siteCopy.routes.home.sections.hero.eyebrow}</p>
            <motion.h1
              className="text-gradient"
              initial={reduceMotion ? false : { x: 72, opacity: 0 }}
              animate={reduceMotion ? {} : { x: 0, opacity: 1 }}
              transition={{ duration: 0.88, ease: easings.expoOut }}
            >
              {homeData.hero.headline}
            </motion.h1>
          </Reveal>
          <Reveal className="hero-subhead" amount={0.5} delay={0.12}>
            <p>{homeData.hero.subhead}</p>
          </Reveal>
          <Reveal className="hero-actions" amount={0.5} delay={0.2}>
            <JoinTeamButton />
            <a href="#performance" className="hero-ghost-link">
              <span>{siteCopy.routes.home.sections.hero.secondaryCtaLabel}</span>
              <MoveRight size={18} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
