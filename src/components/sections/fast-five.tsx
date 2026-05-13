"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { type CSSProperties, useRef, useState } from "react";

import { clamp, easings } from "@/components/motion";
import { JoinTeamButton } from "@/components/site-shell";
import { siteCopy } from "@/lib/copy";
import { homeData } from "@/lib/site-data";

const STEP_TOP_BASE = 6.5;
const STEP_TOP_STEP = 0.7;
const STEP_FADED_OPACITY = 0.16;
const STEP_FADED_SCALE = 0.96;

export function FastFiveSection() {
  const reduceMotion = useReducedMotion();
  const shellRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: shellRef,
    offset: ["start start", "end end"],
  });
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setProgress(value);
  });

  const visibleSteps = reduceMotion
    ? homeData.fastFive.length
    : Math.max(1, Math.ceil(progress * homeData.fastFive.length));

  return (
    <section ref={shellRef} className="fast-five-section fast-five-pinned">
      <div className="fast-five-scroll-space">
        <div className="fast-five-shell fast-five-sticky">
          <div className="fast-five-arrow" aria-hidden="true" />
          <div className="section-intro centered">
            <p className="eyebrow">{siteCopy.routes.home.sections.fastFive.eyebrow}</p>
            <h2>{siteCopy.routes.home.sections.fastFive.headline}</h2>
          </div>

          <div className="process-timeline" aria-hidden="true">
            <span style={{ transform: `scaleY(${reduceMotion ? 1 : progress})` }} />
          </div>

          <div className="process-grid process-grid-pinned">
            {homeData.fastFive.map((step, index) => {
              const stepProgress = reduceMotion
                ? 1
                : clamp(progress * homeData.fastFive.length - index + 0.28, 0, 1);

              return (
                <motion.article
                  key={step.number}
                  className="process-stack-card"
                  style={
                    {
                      top: `${STEP_TOP_BASE + index * STEP_TOP_STEP}rem`,
                      zIndex: 20 + index,
                    } as CSSProperties
                  }
                  initial={false}
                  animate={{
                    opacity: index < visibleSteps ? 1 : STEP_FADED_OPACITY,
                    y: reduceMotion ? 0 : (1 - stepProgress) * 36,
                    scale: index < visibleSteps ? 1 : STEP_FADED_SCALE,
                  }}
                  transition={{ duration: 0.42, ease: easings.smoothOut }}
                >
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </motion.article>
              );
            })}
          </div>

          <div className="process-cta">
            <JoinTeamButton variant="outline">
              {siteCopy.routes.home.sections.fastFive.ctaLabel}
            </JoinTeamButton>
          </div>
        </div>
      </div>
    </section>
  );
}
