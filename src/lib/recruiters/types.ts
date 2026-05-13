export type RecruiterImage = {
  src: string;
  alt: string;
};

export type RecruiterStat = {
  value: string;
  caption: string;
};

export type RecruiterTestimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  portrait: RecruiterImage;
  joinedAt: string;
};

export type RecruiterVideo = {
  url: string;
  poster?: string;
};

export type RecruiterMissionSplit = {
  headline: string;
  body: string;
};

export type RecruiterHero = {
  eyebrow: string;
  headline: string;
  subhead: string;
};

export type RecruiterIntro = {
  line: string;
  stats: [RecruiterStat, RecruiterStat, RecruiterStat];
};

export type RecruiterClosingQuote = {
  body: string;
  attribution: string;
};

export type RecruiterSocial = {
  instagram?: string;
  tiktok?: string;
  linkedin?: string;
};

export type RecruiterDirectContact = {
  calendly?: string;
  instagramDm?: string;
  smsHref?: string;
};

export type RecruiterMetadata = {
  title: string;
  description: string;
};

export type Recruiter = {
  slug: string;
  name: string;
  role: string;
  city?: string;
  joinedYear: number;
  portrait: RecruiterImage;
  teamPhoto: RecruiterImage;
  hero: RecruiterHero;
  intro: RecruiterIntro;
  video: RecruiterVideo | null;
  whySummitEssay: string;
  whySummitEmphasized?: readonly string[];
  missionSplit: RecruiterMissionSplit;
  testimonials: RecruiterTestimonial[];
  social: RecruiterSocial;
  directContact: RecruiterDirectContact;
  closingQuote: RecruiterClosingQuote;
  instagramPosts: string[];
  metadata: RecruiterMetadata;
  visibility: "public" | "private";
};
