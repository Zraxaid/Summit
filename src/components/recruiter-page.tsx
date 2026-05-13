"use client";

import { DirectionMarquee } from "@/components/motion";
import {
  BenefitsSection,
  FastFiveSection,
  FounderSection,
  PartnershipSection,
  PerformanceDashboardSection,
  QuarterlyChartSection,
  StatTriadSection,
  SuccessStripSection,
  SwitcherSection,
  TestimonialCarousel,
} from "@/components/sections";
import { RecruiterClosingQuoteSection } from "@/components/sections/recruiter-closing-quote";
import { RecruiterHero } from "@/components/sections/recruiter-hero";
import { RecruiterInstagramSection } from "@/components/sections/recruiter-instagram";
import { RecruiterIntroSection } from "@/components/sections/recruiter-intro";
import { RecruiterMissionSplitSection } from "@/components/sections/recruiter-mission-split";
import { RecruiterTestimonialsSection } from "@/components/sections/recruiter-testimonials";
import { RecruiterVideoSection } from "@/components/sections/recruiter-video";
import { RecruiterWhySummitSection } from "@/components/sections/recruiter-why-summit";
import { TalkToRecruiterSection } from "@/components/sections/talk-to-recruiter";
import { JoinTeamButton } from "@/components/site-shell";
import { siteCopy } from "@/lib/copy";
import type { Recruiter } from "@/lib/recruiters";
import { homeData } from "@/lib/site-data";

export function RecruiterPage({ recruiter }: { recruiter: Recruiter }) {
  return (
    <div className="home-page recruiter-page">
      <RecruiterHero recruiter={recruiter} />
      <RecruiterIntroSection recruiter={recruiter} />
      <RecruiterVideoSection recruiter={recruiter} />
      <StatTriadSection />

      <DirectionMarquee items={homeData.breakMarquee} />

      <section className="cta-band cta-band-dark">
        <p>{siteCopy.routes.home.sections.firstCtaBand.caption}</p>
        <JoinTeamButton className="wide-cta" />
      </section>

      <QuarterlyChartSection />
      <RecruiterWhySummitSection recruiter={recruiter} />
      <RecruiterMissionSplitSection recruiter={recruiter} />
      <RecruiterTestimonialsSection recruiter={recruiter} />
      <SwitcherSection />
      <BenefitsSection />

      <DirectionMarquee items={homeData.valueMarquee} invert />

      <section className="cta-band">
        <JoinTeamButton className="wide-cta" />
      </section>

      <FastFiveSection />
      <PerformanceDashboardSection />
      <FounderSection />
      <SuccessStripSection />

      <TestimonialCarousel
        items={homeData.secondaryTestimonials}
        eyebrow={siteCopy.routes.home.sections.testimonialsSecondary.eyebrow}
      />

      <RecruiterInstagramSection recruiter={recruiter} />
      <PartnershipSection />
      <TalkToRecruiterSection recruiter={recruiter} />
      <RecruiterClosingQuoteSection recruiter={recruiter} />
    </div>
  );
}
