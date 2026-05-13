"use client";

import { motion, useReducedMotion } from "framer-motion";

import { PhotoPanel, Reveal, easings } from "@/components/motion";
import { JoinTeamButton } from "@/components/site-shell";
import type { Recruiter } from "@/lib/recruiters";

export function RecruiterMissionSplitSection({ recruiter }: { recruiter: Recruiter }) {
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
            image={recruiter.teamPhoto.src}
            alt={recruiter.teamPhoto.alt}
          />
        </motion.div>

        <div className="mission-split-copy">
          <p className="eyebrow">{recruiter.name}</p>
          <motion.h2
            initial={reduceMotion ? false : { x: 110, opacity: 0 }}
            whileInView={reduceMotion ? {} : { x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.9, ease: easings.expoOut }}
          >
            {recruiter.missionSplit.headline}
          </motion.h2>
          <p>{recruiter.missionSplit.body}</p>
          <JoinTeamButton variant="text" />
        </div>
      </Reveal>
    </section>
  );
}
