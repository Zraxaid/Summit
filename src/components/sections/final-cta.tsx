"use client";

import { PhotoPanel, Reveal } from "@/components/motion";
import { JoinTeamButton } from "@/components/site-shell";
import { siteCopy } from "@/lib/copy";
import { homeData } from "@/lib/site-data";

export function FinalCtaSection() {
  return (
    <section className="final-cta-section">
      <Reveal className="final-cta-shell">
        <PhotoPanel
          className="final-cta-photo"
          image={homeData.finalCta.image}
          alt={homeData.finalCta.imageAlt}
        >
          <div className="final-cta-overlay">
            <p className="eyebrow">{homeData.finalCta.eyebrow}</p>
            <h2>{siteCopy.routes.home.sections.finalCta.headline}</h2>
            <JoinTeamButton>{siteCopy.routes.home.sections.finalCta.ctaLabel}</JoinTeamButton>
            <small>{siteCopy.routes.home.sections.finalCta.helper}</small>
          </div>
        </PhotoPanel>
      </Reveal>
    </section>
  );
}
