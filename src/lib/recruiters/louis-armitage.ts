import { summitLinks } from "@/lib/site-data";

import type { Recruiter } from "./types";

// Placeholder content for the upline page scaffold. Replace each field with
// Louis's real submission per the AUDIT.md section-6 content checklist.
export const louisArmitage: Recruiter = {
  slug: "louis-armitage",
  name: "Louis Armitage",
  role: "Regional Director",
  city: "Austin, TX",
  joinedYear: 2021,
  portrait: {
    src: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&w=1200&q=80",
    alt: "Portrait of Louis Armitage.",
  },
  teamPhoto: {
    src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
    alt: "Louis Armitage huddled with his Summit team after a strong week.",
  },
  hero: {
    eyebrow: "NOW HIRING",
    headline: "Run your business. Keep your nights.",
    subhead:
      "I'm onboarding a small cohort to my Austin team this quarter. If you're tired of trading hours for ceilings, let's talk about a real path.",
  },
  intro: {
    line: "Hi, I'm Louis. I'm hiring a handful of agents to my Austin team this quarter.",
    stats: [
      { value: "21", caption: "AGENTS ON MY TEAM" },
      { value: "$4.8M", caption: "TEAM PRODUCTION IN 2025" },
      { value: "5 YRS", caption: "AT SUMMIT" },
    ],
  },
  video: null,
  whySummitEssay:
    "I came to Summit from a captive carrier with a six-figure W-2 and a glass ceiling I could see from across the room. What I wanted was leverage — a system where the hours I put in compounded instead of capped. Five years later my team is bigger than the office I left, and we still onboard like every new agent is the first. Speed, structure, and a room of people who keep the bar high.",
  whySummitEmphasized: ["leverage", "compounded"],
  missionSplit: {
    headline: "Trade the ceiling for a system that compounds.",
    body: "I'll hand you a real desk, real leads, and a weekly cadence that turns repetition into income. The work is hard, but I'll never let you guess. You'll know exactly what good looks like by week two.",
  },
  testimonials: [
    {
      id: "ines",
      quote:
        "Louis treats every new agent like they're a future leader. I went from selling on weekends to running my own pod in nine months.",
      name: "INÉS DELGADO",
      role: "Agency Builder",
      portrait: {
        src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
        alt: "Portrait of Inés Delgado.",
      },
      joinedAt: "Feb 2024",
    },
    {
      id: "tobias",
      quote:
        "The training wheels stayed on exactly as long as I needed them. Louis pushes you the moment you're ready, not before.",
      name: "TOBIAS KENT",
      role: "Senior Producer",
      portrait: {
        src: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?auto=format&fit=crop&w=900&q=80",
        alt: "Portrait of Tobias Kent.",
      },
      joinedAt: "May 2024",
    },
    {
      id: "rae",
      quote:
        "I left a tech sales job for this. My income doubled in year one and I actually like the people I work with.",
      name: "RAE OKONKWO",
      role: "Field Leader",
      portrait: {
        src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80",
        alt: "Portrait of Rae Okonkwo.",
      },
      joinedAt: "Sep 2023",
    },
  ],
  social: {
    instagram: summitLinks.social.instagram,
    tiktok: summitLinks.social.tiktok,
    linkedin: summitLinks.social.linkedin,
  },
  directContact: {
    instagramDm: summitLinks.social.instagram,
    // calendly and smsHref intentionally absent until Louis supplies them.
  },
  closingQuote: {
    body: "If the system is honest, the work pays back exactly what you put in.",
    attribution: "— LOUIS ARMITAGE",
  },
  instagramPosts: [
    summitLinks.instagramPost,
    summitLinks.instagramPost,
    summitLinks.instagramPost,
    summitLinks.instagramPost,
    summitLinks.instagramPost,
    summitLinks.instagramPost,
  ],
  metadata: {
    title: "Louis Armitage — Summit Financial Recruiting",
    description:
      "Apply directly to Louis Armitage's Austin team at Summit Financial Recruiting. Mentorship, exclusive leads, and a faster path into wealth-building work.",
  },
  visibility: "public",
};
