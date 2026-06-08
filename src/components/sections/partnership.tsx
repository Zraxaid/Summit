"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { PhotoPanel, Reveal, useTilt } from "@/components/motion";
import { type PartnerLogoId, PartnerLogo } from "@/components/partner-logos";
import { siteCopy } from "@/lib/copy";
import { footerData, homeData } from "@/lib/site-data";

const MOBILE_BREAKPOINT = "(max-width: 768px)";

function PartnerLink({
  partner,
  index,
}: {
  partner: (typeof footerData.partners)[number];
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const { handlers, style } = useTilt({ max: 10 });

  return (
    <motion.a
      className="partner-logo-link tilt-card"
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.95 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: 0.06 + index * 0.04, duration: 0.45 }}
      style={style}
      {...handlers}
    >
      <PartnerLogo id={partner.id as PartnerLogoId} />
    </motion.a>
  );
}

export function PartnershipSection() {
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
        <div className={`partner-diamond${isMobilePanel ? " partner-diamond-rect" : ""}`}>
          <PhotoPanel
            className="partner-diamond-photo"
            image={homeData.partnership.background}
            alt={homeData.partnership.imageAlt}
          />
          <div className="partner-diamond-content">
            <p className="eyebrow">{siteCopy.routes.home.sections.partnership.eyebrow}</p>
            <h2>{homeData.partnership.headline}</h2>
            <div className="partner-logo-grid">
              {footerData.partners.map((partner, index) => (
                <PartnerLink key={partner.id} partner={partner} index={index} />
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
        </div>
      </Reveal>
    </section>
  );
}
