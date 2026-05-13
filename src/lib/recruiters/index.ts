import { jacksonRichards } from "./jackson-richards";
import { louisArmitage } from "./louis-armitage";
import type { Recruiter } from "./types";

export type { Recruiter } from "./types";
export type {
  RecruiterImage,
  RecruiterStat,
  RecruiterTestimonial,
  RecruiterHero,
  RecruiterIntro,
  RecruiterMissionSplit,
  RecruiterClosingQuote,
  RecruiterSocial,
  RecruiterDirectContact,
  RecruiterMetadata,
  RecruiterVideo,
} from "./types";

const recruiterRegistry: Record<string, Recruiter> = {
  [jacksonRichards.slug]: jacksonRichards,
  [louisArmitage.slug]: louisArmitage,
};

export function getRecruiter(slug: string): Recruiter | null {
  return recruiterRegistry[slug] ?? null;
}

export function getAllRecruiterSlugs(): string[] {
  return Object.keys(recruiterRegistry);
}

export function getPublicRecruiters(): Recruiter[] {
  return Object.values(recruiterRegistry).filter(
    (recruiter) => recruiter.visibility === "public",
  );
}
