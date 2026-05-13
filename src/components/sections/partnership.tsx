"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { PhotoPanel, Reveal, easings } from "@/components/motion";
import { type PartnerLogoId, PartnerLogo } from "@/components/partner-logos";
import { siteCopy } from "@/lib/copy";
import { footerData, homeData } from "@/lib/site-data";

const MOBILE_BREAKPOINT = "(max-width: 768px)";

export function PartnershipSection() {
  const reduceMotion = useReducedMotion();
  const [isMobilePanel, setIsMobilePanel] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT);
    const sync = () => {
      setIsMobilePanel(mediaQuery.matches);
    };

    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  return (
    <section className="partner-section">
      <Reveal className="partner-shell">
        <motion.div
          className={`partner-diamond${isMobilePanel ? " partner-diamond-rect" : ""}`}
          style={isMobilePanel ? { clipPath: "none" } : undefined}
          initial={
            reduceMotion || isMobilePanel
              ? false
              : { clipPath: "polygon(50% 0%, 60% 10%, 60% 100%, 40% 100%, 40% 10%)" }
          }
          whileInView={
            reduceMotion || isMobilePanel
              ? {}
              : { clipPath: "polygon(50% 0%, 100% 22%, 100% 100%, 0% 100%, 0% 22%)" }
          }
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: easings.smoothOut }}
        >
          <PhotoPanel
            className="partner-diamond-photo"
            image={homeData.partnership.background}
            alt="Summit team in a dimly lit office celebrating a strong recruiting week."
          />
          <div className="partner-diamond-content">
            <p className="eyebrow">{siteCopy.routes.home.sections.partnership.eyebrow}</p>
            <h2>{homeData.partnership.headline}</h2>
            <div className="partner-logo-grid">
              {footerData.partners.map((partner, index) => (
                <motion.a
                  key={partner.id}
                  className="partner-logo-link"
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.95 }}
                  whileInView={reduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: 0.12 + index * 0.08, duration: 0.5 }}
                >
                  <PartnerLogo id={partner.id as PartnerLogoId} />
                </motion.a>
              ))}
            </div>
            <a
              href={homeData.founder.followUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link-cta"
            >
              {siteCopy.routes.home.sections.partnership.ctaLabel}
            </a>
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}
