"use client";

import { DirectionMarquee } from "@/components/motion";
import {
  BenefitsSection,
  ClosingQuoteSection,
  FastFiveSection,
  FinalCtaSection,
  FounderSection,
  HeroSection,
  InstagramRailSection,
  MissionEssaySection,
  MissionSplitSection,
  PartnershipSection,
  PerformanceDashboardSection,
  QuarterlyChartSection,
  StatTriadSection,
  SuccessStripSection,
  SwitcherSection,
  TestimonialCarousel,
} from "@/components/sections";
import { JoinTeamButton } from "@/components/site-shell";
import { siteCopy } from "@/lib/copy";
import { homeData } from "@/lib/site-data";

export function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />
      <StatTriadSection />

      <DirectionMarquee items={homeData.breakMarquee} />

      <section className="cta-band cta-band-dark">
        <p>{siteCopy.routes.home.sections.firstCtaBand.caption}</p>
        <JoinTeamButton className="wide-cta">
          {siteCopy.routes.home.sections.firstCtaBand.ctaLabel}
        </JoinTeamButton>
      </section>

      <QuarterlyChartSection />
      <MissionEssaySection />
      <MissionSplitSection />

      <TestimonialCarousel
        items={homeData.testimonials}
        eyebrow={siteCopy.routes.home.sections.testimonialsPrimary.eyebrow}
      />

      <SwitcherSection />
      <BenefitsSection />

      <DirectionMarquee items={homeData.valueMarquee} invert />

      <section className="cta-band">
        <JoinTeamButton className="wide-cta">
          {siteCopy.routes.home.sections.middleCtaBand.ctaLabel}
        </JoinTeamButton>
      </section>

      <FastFiveSection />
      <PerformanceDashboardSection />
      <FounderSection />
      <SuccessStripSection />

      <TestimonialCarousel
        items={homeData.secondaryTestimonials}
        eyebrow={siteCopy.routes.home.sections.testimonialsSecondary.eyebrow}
      />

      <InstagramRailSection />
      <PartnershipSection />
      <FinalCtaSection />
      <ClosingQuoteSection />
    </div>
  );
}
