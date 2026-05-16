"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import { Reveal, easings } from "@/components/motion";
import { JoinTeamButton } from "@/components/site-shell";
import { LogoPlaceholder } from "@/components/ui/logo-placeholder";
import type { Recruiter } from "@/lib/recruiters";

export function RecruiterHero({ recruiter }: { recruiter: Recruiter }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero-section recruiter-hero-section">
      <div className="recruiter-hero-grid">
        <motion.div
          className="recruiter-hero-portrait"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
          animate={reduceMotion ? {} : { opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: easings.smoothOut }}
        >
          {recruiter.portrait.src ? (
            <Image
              src={recruiter.portrait.src}
              alt={recruiter.portrait.alt}
              fill
              priority
              sizes="(max-width: 750px) 100vw, 50vw"
              className="recruiter-hero-portrait-image"
            />
          ) : (
            <LogoPlaceholder label={recruiter.name} />
          )}
        </motion.div>

        <div className="recruiter-hero-copy">
          <Reveal className="hero-copy-block" amount={0.45}>
            <p className="eyebrow">{recruiter.hero.eyebrow}</p>
            <motion.h1
              initial={reduceMotion ? false : { x: 72, opacity: 0 }}
              animate={reduceMotion ? {} : { x: 0, opacity: 1 }}
              transition={{ duration: 0.88, ease: easings.expoOut }}
            >
              {recruiter.hero.headline}
            </motion.h1>
          </Reveal>
          <Reveal className="hero-subhead" amount={0.5} delay={0.12}>
            <p>{recruiter.hero.subhead}</p>
          </Reveal>
          <Reveal className="hero-actions" amount={0.5} delay={0.2}>
            <JoinTeamButton />
          </Reveal>
          <Reveal className="recruiter-hero-byline" amount={0.5} delay={0.28}>
            <span>
              <strong>{recruiter.name}</strong>
              <span aria-hidden="true"> · </span>
              <span>{recruiter.role}</span>
              {recruiter.city ? (
                <>
                  <span aria-hidden="true"> · </span>
                  <span>{recruiter.city}</span>
                </>
              ) : null}
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
