import { jacksonRichards } from "./jackson-richards";
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
