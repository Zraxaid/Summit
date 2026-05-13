"use client";

import { motion, useReducedMotion } from "framer-motion";

import { PhotoPanel, Reveal, easings } from "@/components/motion";
import { JoinTeamButton } from "@/components/site-shell";
import { siteCopy } from "@/lib/copy";
import { homeData } from "@/lib/site-data";

export function MissionSplitSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="mission-split-section">
      <Reveal className="mission-split" amount={0.3}>
        <motion.div
          className="mission-split-photo-shell"
          initial={{ clipPath: "polygon(18% 14%, 58% 0%, 86% 34%, 68% 100%, 0% 84%, 0% 32%)" }}
          whileInView={{ clipPath: "polygon(7% 0%, 100% 0%, 100% 100%, 26% 100%, 0% 76%, 0% 17%)" }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 1.1, ease: easings.smoothOut }}
        >
          <PhotoPanel
            className="mission-split-photo"
            image={homeData.missionSplit.image}
            alt={homeData.missionSplit.imageAlt}
          />
        </motion.div>

        <div className="mission-split-copy">
          <p className="eyebrow">{siteCopy.routes.home.sections.missionSplit.eyebrow}</p>
          <motion.h2
            initial={reduceMotion ? false : { x: 110, opacity: 0 }}
            whileInView={reduceMotion ? {} : { x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.9, ease: easings.expoOut }}
          >
            {homeData.missionSplit.titlePrefix}{" "}
            <span>{homeData.missionSplit.highlight}</span>{" "}
            {homeData.missionSplit.titleSuffix}
          </motion.h2>
          <p>{homeData.missionSplit.body}</p>
          <JoinTeamButton variant="text">
            {siteCopy.routes.home.sections.missionSplit.ctaLabel}
          </JoinTeamButton>
        </div>
      </Reveal>
    </section>
  );
}
