import { summitLinks } from "@/lib/site-data";

import type { Recruiter } from "./types";

// Placeholder content for the upline page scaffold. Replace each field with
// Jackson's real submission per the AUDIT.md section-6 content checklist.
export const jacksonRichards: Recruiter = {
  slug: "jackson-richards",
  name: "Jackson Richards",
  role: "Senior Agency Builder",
  city: "Phoenix, AZ",
  joinedYear: 2022,
  portrait: {
    src: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=1200&q=80",
    alt: "Portrait of Jackson Richards.",
  },
  teamPhoto: {
    src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80",
    alt: "Jackson Richards with his Summit recruiting team.",
  },
  hero: {
    eyebrow: "RECRUITING NOW",
    headline: "Build your insurance career with me.",
    subhead:
      "I'm hiring agents for my Summit team this quarter. If you want a clearer path to wealth-building work, let's talk.",
  },
  intro: {
    line: "Hi, I'm Jackson. I'm hiring agents for my Summit team this quarter.",
    stats: [
      { value: "12", caption: "AGENTS ON MY TEAM" },
      { value: "$2.4M", caption: "TEAM PRODUCTION IN 2025" },
      { value: "3 YRS", caption: "AT SUMMIT" },
    ],
  },
  video: null,
  whySummitEssay:
    "I joined Summit because I wanted a system that actually rewarded the work. The leads were real, the mentorship was honest, and the team around me kept the bar high. Three years in, that hasn't changed. If you put the reps in, you get the reps back.",
  whySummitEmphasized: ["mentorship", "honest"],
  missionSplit: {
    headline: "Take your financial life off pause — and I'll show you how.",
    body: "I'll teach you exactly what I do day to day, hand you pre-qualified leads from day one, and stay close while you ramp. The work is hard but the path is clear, and you'll never have to guess what comes next.",
  },
  testimonials: [
    {
      id: "marcus",
      quote:
        "Jackson handed me a real system instead of a pitch. Six months in I was writing more than I did in my first full year anywhere else.",
      name: "MARCUS LEWIS",
      role: "Agent",
      portrait: {
        src: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=900&q=80",
        alt: "Portrait of Marcus Lewis.",
      },
      joinedAt: "Mar 2024",
    },
    {
      id: "priya",
      quote:
        "Jackson texts back the same day, every day. The coaching loop is what made me believe I could build something here.",
      name: "PRIYA SANCHEZ",
      role: "Agent",
      portrait: {
        src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80",
        alt: "Portrait of Priya Sanchez.",
      },
      joinedAt: "Aug 2024",
    },
    {
      id: "darius",
      quote:
        "I came in cold to insurance. Jackson's onboarding got me appointed and on the phone inside three weeks.",
      name: "DARIUS WALKER",
      role: "Field Leader",
      portrait: {
        src: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=900&q=80",
        alt: "Portrait of Darius Walker.",
      },
      joinedAt: "Jan 2024",
    },
  ],
  social: {
    instagram: summitLinks.social.instagram,
    tiktok: summitLinks.social.tiktok,
    linkedin: summitLinks.social.linkedin,
  },
  directContact: {
    instagramDm: summitLinks.social.instagram,
    // calendly and smsHref intentionally absent until Jackson supplies them.
  },
  closingQuote: {
    body: "Don't wait for the right time. Build it.",
    attribution: "— JACKSON RICHARDS",
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
    title: "Jackson Richards — Summit Financial Recruiting",
    description:
      "Apply directly to Jackson Richards's Summit team. Personal mentorship, exclusive leads, and a faster ramp into insurance recruiting.",
  },
  visibility: "public",
};
