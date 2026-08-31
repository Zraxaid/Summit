"use client";

import {
  BenefitsSection,
  FastFiveSection,
  FinalCtaSection,
  FounderSection,
  HeroSection,
  StatTriadSection,
  TestimonialCarousel,
} from "@/components/sections";
import { siteCopy } from "@/lib/copy";
import { homeData } from "@/lib/site-data";

// Trimmed from the full 6-item roster shared with the recruiter funnel pages:
// keeps the four strongest, cuts the two that overlap with the untouched
// Fast Five section below (training/mentorship is already covered there).
const landingBenefitItems = homeData.benefits.items.filter(
  (item) =>
    item !== "WEEKLY TRAININGS + LIVE WORKSHOPS" &&
    item !== "DIVERSIFIED LINE-UP WITH TRAININGS FOR EACH",
);

export function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />
      <StatTriadSection />

      <TestimonialCarousel
        items={homeData.testimonials}
        eyebrow={siteCopy.routes.home.sections.testimonialsPrimary.eyebrow}
      />

      <BenefitsSection items={landingBenefitItems} />

      <FastFiveSection />
      <FounderSection quote={homeData.closingQuote} />

      <FinalCtaSection />
    </div>
  );
}
