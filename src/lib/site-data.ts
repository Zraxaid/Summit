export type LegalSection = {
  slug: string;
  title: string;
  body: string[];
};

const summitEmail = "hello@summitfinancialrecruiting.com";
const summitAddress = "Scottsdale, AZ and remote nationwide";
const summitPhone = "+1 (480) 550-8556";
const summitPhoneRaw = "+14805508556";

export const footerData = {
  address: summitAddress,
  email: summitEmail,
  phone: summitPhone,
  phoneRaw: summitPhoneRaw,
  social: [
    { id: "instagram", label: "Instagram", url: "https://www.instagram.com/nonstopfinancial/" },
    { id: "tiktok", label: "TikTok", url: "https://www.tiktok.com/@nonstopfinancial" },
    { id: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/nonstop-financial/" },
  ],
  partners: [
    { id: "americo", name: "AMERICO", url: "https://www.americo.com/" },
    {
      id: "national-life-group",
      name: "NATIONAL LIFE GROUP",
      url: "https://www.nationallife.com/",
    },
    { id: "fg", name: "F&G", url: "https://www.fglife.com/" },
    { id: "transamerica", name: "TRANSAMERICA", url: "https://www.transamerica.com/" },
    {
      id: "mutual-of-omaha",
      name: "MUTUAL OF OMAHA",
      url: "https://www.lifeinsurance-mutualofomaha.com/",
    },
    { id: "ethos", name: "ETHOS", url: "https://www.ethos.com/" },
  ],
};

export const homeData = {
  hero: {
    headline: "NOW EVERYONE CAN ACCESS A WORLD OF WEALTH",
    subhead:
      "A sharper recruiting system for ambitious agents who want better leads, stronger mentorship, and faster income growth.",
    heroPhotos: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  stats: [
    {
      value: 59,
      unit: "%",
      body: "OF AMERICANS HAVE LESS THAN $10K IN SAVINGS",
    },
    {
      value: 25,
      unit: "%",
      body: "LESS FULL-TIME EMPLOYMENT FOR YOUNG ADULTS THAN PRIOR GENERATIONS",
    },
    {
      value: 37,
      unit: "%",
      body: "OF YOUNG PEOPLE LIVE IN LOW-INCOME HOUSEHOLDS",
    },
  ],
  breakMarquee: ["BREAK THE CYCLE", "BREAK THE CYCLE", "BREAK THE CYCLE", "BREAK THE CYCLE"],
  quarterly: {
    caption: "AVERAGE EARNINGS IN 1ST 3 MONTHS",
    axisLabel: "PRODUCTION ($)",
    labels: ["JAN-MARCH", "APRIL-JUNE", "JULY-SEPT", "OCT-DEC"],
    values: [9, 24, 51, 91],
  },
  missionStatement:
    "We are here to level the playing field for hungry people who want a faster path into wealth-building work. Summit is built for momentum, not waiting.",
  missionSplit: {
    titlePrefix: "TAKE YOUR FINANCIAL LIFE",
    highlight: "OFF PAUSE",
    titleSuffix: "AND START GROWING YOUR INCOME AND CAREER IMMEDIATELY.",
    body:
      "A better system should feel visible: better coaching, real accountability, faster reps, and a room full of people who are already moving in the direction you want.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Summit team collaborating around a laptop during a strategy session.",
  },
  testimonials: [
    {
      quote:
        "The mentor, the environment, and the accountability changed how quickly I started believing I could really build something here.",
      name: "DAYETHAN NELSON",
      role: "Agent",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Portrait of an ambitious young insurance agent in a dark jacket.",
      videoUrl: "https://www.instagram.com/nonstopfinancial/",
    },
    {
      quote:
        "Now I feel like an actual business owner. The system keeps me focused on momentum instead of guesswork.",
      name: "KEVIN OLIVERO",
      role: "Senior Producer",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Portrait of a producer standing in a modern office hallway.",
      videoUrl: "https://www.instagram.com/nonstopfinancial/",
    },
    {
      quote:
        "The energy I am around every single day raises my standards. You can feel the pace the moment you walk into the room.",
      name: "ALEX RUIZ",
      role: "Recruiting Partner",
      image:
        "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Portrait of a recruiting partner smiling confidently.",
      videoUrl: "https://www.instagram.com/nonstopfinancial/",
    },
  ],
  switcher: {
    eyebrow: "MAKE THE SWITCH",
    title: "Agents with experience still come here for a better system.",
    body:
      "A huge share of the current team came from another agency because they wanted stronger support, cleaner operations, and more upside.",
    value: "43%",
    statLabel: "OF OUR CURRENT TEAM CAME TO SUMMIT WITH PRIOR AGENCY EXPERIENCE",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "A small team sharing ideas in a bright conference room.",
  },
  benefits: {
    eyebrow: "JUMP START YOUR CAREER",
    title: "What growth looks like when nothing stands in your way.",
    body:
      "Less friction, more rhythm, and a culture that keeps the work moving in the right direction.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Team members reviewing goals together on a couch.",
    items: [
      "CLOSE MORE DEALS EFFORTLESSLY",
      "WORK-LIFE BALANCE",
      "SET AND HIT YOUR OWN GOALS",
      "CHOOSE YOUR OWN HOURS",
      "MINIMAL PAPERWORK",
      "TEAM-DRIVEN INSPIRATION",
    ],
  },
  valueMarquee: [
    "TOP COMMISSIONS",
    "EXPERT TRAINING AND MENTORSHIP",
    "EARN MORE",
    "STOP CHASING OVER-CONTACTED PROSPECTS",
    "SYSTEMS AND OFFICE SUPPORT",
    "HIGH-CONVERTING PROSPECTS",
  ],
  fastFive: [
    {
      number: 1,
      title: "EXCLUSIVE LEADS",
      body: "Pre-qualified prospects provided directly to our agents so your early momentum starts strong.",
    },
    {
      number: 2,
      title: "EFFECTIVE TRAINING",
      body: "Personalized guidance from top performers who know how to compress your learning curve.",
    },
    {
      number: 3,
      title: "ONE-ON-ONE MENTORSHIP",
      body: "Weekly reviews and honest coaching from leadership that stays close to the work.",
    },
    {
      number: 4,
      title: "AUTOMATED TOOLS",
      body: "Simple automation saves time so you can focus on conversations, follow-up, and closing.",
    },
    {
      number: 5,
      title: "ONGOING SUPPORT",
      body: "A team full of go-getters keeps the standards high and the momentum visible.",
    },
  ],
  performance: {
    eyebrow: "PERFORMANCE WITH PURPOSE AND VELOCITY",
    title: "Proof that the system scales.",
    body:
      "The model is built to help new writers ramp fast while still producing real year-over-year growth.",
    kpis: [
      { label: "2025 TOTAL PRODUCTION", value: "$84,022,378" },
      { label: "2025 NEW WRITERS", value: "1,987" },
      { label: "2024 TOTAL PRODUCTION", value: "$22.8M" },
      { label: "2023 NEW WRITERS", value: "165" },
    ],
    writers: [165, 854, 1987],
    production: [8, 22.8, 84],
  },
  founder: {
    eyebrow: "MEET JAY MASKA",
    headline: "WEALTH GROWTH EXPERTISE AT THE SPEED OF REAL LIFE",
    body:
      "Jay built Summit with one objective: make it easier for driven people to find a real system, real mentorship, and real momentum. The standard is speed with structure, not speed without support.",
    followUrl: "https://www.instagram.com/nonstopfinancial/",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Black and white founder portrait looking toward the camera.",
  },
  successKpis: [
    { value: "300+", label: "GRADUATES OF OUR TRAINING PROGRAM" },
    { value: "$5,000,000", label: "FFL BONUSES PAID OUT EVERY MONTH" },
    { value: "$84 MILLION", label: "OF ISSUED PREMIUM IN 2025" },
    {
      value: "FASTEST GROWING",
      label: "WEALTH-GENERATING SOLUTION FOR 18-28 YEAR OLDS",
    },
  ],
  secondaryTestimonials: [
    {
      quote:
        "When the culture, training, and systems all line up, performance stops feeling accidental. That is the difference here.",
      name: "MIA CARTER",
      role: "Field Leader",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Portrait of a field leader smiling in a studio setting.",
      videoUrl: "https://www.instagram.com/nonstopfinancial/",
    },
    {
      quote:
        "This is what a real ramp looks like for hungry people: speed, clarity, support, and a room that expects more from you.",
      name: "JORDAN VALE",
      role: "Agency Builder",
      image:
        "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Portrait of an agency builder seated by a window.",
      videoUrl: "https://www.instagram.com/nonstopfinancial/",
    },
  ],
  instagram: [
    {
      title: "Forbes-style momentum moment",
      image:
        "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=900&q=80",
      url: "https://www.instagram.com/p/DH_Xv3SxEsU/",
    },
    {
      title: "Conference hallway energy",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80",
      url: "https://www.instagram.com/p/DT8hQuhEgan/",
    },
    {
      title: "Stage and audience",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80",
      url: "https://www.instagram.com/p/DTlWpHjEgME/",
    },
    {
      title: "24/7 building access energy",
      image:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80",
      url: "https://www.instagram.com/p/DTLI5qviGqm/",
    },
    {
      title: "Fast-moving team huddle",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
      url: "https://www.instagram.com/p/DSiqeoIkmpv/",
    },
    {
      title: "Leadership conversation",
      image:
        "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=900&q=80",
      url: "https://www.instagram.com/p/DSD6fCWEjnk/",
    },
    {
      title: "Field training and support",
      image:
        "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?auto=format&fit=crop&w=900&q=80",
      url: "https://www.instagram.com/p/DQ5SeL6khy_/",
    },
    {
      title: "After-hours celebration",
      image:
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80",
      url: "https://www.instagram.com/p/DQhyn0xkvA6/",
    },
    {
      title: "Conference floor victory lap",
      image:
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=80",
      url: "https://www.instagram.com/p/DQUsgQBkjk9/",
    },
  ],
  partnership: {
    headline: "RAISING LIFESTYLES AND INCOMES WITH THE HELP OF OUR PARTNERS",
    background:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80",
  },
  finalCta: {
    eyebrow: "READY TO MOVE?",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80",
  },
  closingQuote: {
    opening: "DON'T LET ANYONE TELL YOU THAT WAITING IS THE WHOLE STRATEGY.",
    middle: "BUILD MOMENTUM, LEARN QUICKLY,",
    closing: "AND KEEP MOVING.",
    attribution: "JAY MASKA, 2026",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Monochrome founder-style portrait beside the final quote.",
  },
};

function makeSection(title: string, body: string[]): LegalSection {
  return {
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    title,
    body,
  };
}

export const termsSections: LegalSection[] = [
  makeSection("Acceptance", [
    "By using Summit's website, you agree to these terms and any additional policies referenced here.",
    "If you do not agree, you should stop using the site and avoid submitting recruiting information through the application flow.",
  ]),
  makeSection("Use of the Website", [
    "The site is provided to share recruiting information, explain the opportunity, and collect interest from prospective agents.",
    "You may not use the site for unlawful, fraudulent, or disruptive purposes.",
  ]),
  makeSection("Eligibility", [
    "You represent that the information you submit is accurate and that you are legally able to pursue the opportunity described.",
  ]),
  makeSection("Business Opportunity and Enrollment", [
    "Submitting a form does not guarantee selection, appointment, licensing, or compensation.",
    "Any future relationship is subject to interviews, compliance review, licensing requirements, and separate written agreements.",
  ]),
  makeSection("User Submissions", [
    "You are responsible for the accuracy of the information you provide.",
    "Summit may use submitted information to contact you about recruiting, onboarding, licensing, and related communications.",
  ]),
  makeSection("SMS Text Messaging Terms and Conditions", [
    "If you provide a mobile number, Summit may send recruiting and follow-up text messages related to your inquiry.",
    "Message frequency varies depending on your activity and stage in the recruiting process.",
  ]),
  makeSection("Program Description", [
    "Texts may include reminders, introductions, scheduling information, and follow-up related to the opportunity.",
  ]),
  makeSection("Types of Messages", [
    "Messages may include conversational updates, scheduling notices, recruiting reminders, and support communications.",
  ]),
  makeSection("Message Frequency", [
    "Frequency depends on your engagement, though routine recruiting cadence should remain reasonable and limited to the recruiting context.",
  ]),
  makeSection("Costs and Data Rates", [
    "Message and data rates may apply according to your wireless carrier plan.",
  ]),
  makeSection("Opt-In and Consent", [
    "By submitting the form and checking the consent box, you confirm that you want to receive the communications described.",
  ]),
  makeSection("Opt-Out and Help", [
    "You can opt out of text messages at any time by replying STOP. Reply HELP for additional assistance where available.",
  ]),
  makeSection("Privacy", [
    "Personal information is handled according to the Privacy Policy, including recruiting-related communications and data handling practices.",
  ]),
  makeSection("Supported Carriers", [
    "Carrier participation may vary, and carriers are not responsible for delayed or undelivered messages.",
  ]),
  makeSection("SMS Program Disclaimer", [
    "Delivery is not guaranteed and may be affected by carrier availability, mobile device limitations, or network conditions.",
  ]),
  makeSection("Intellectual Property", [
    "Site content, branding, layout, and design materials belong to Summit or its licensors and may not be copied without permission.",
  ]),
  makeSection("Prohibited Activities", [
    "You may not attempt to interfere with the site, scrape data in bulk, reverse engineer protected systems, or misrepresent your identity.",
  ]),
  makeSection("Third-Party Links", [
    "The site may link to third-party services and partner sites. Summit is not responsible for their content or practices.",
  ]),
  makeSection("Disclaimer of Warranties", [
    "The site is provided as is and as available without warranties of any kind, whether express or implied.",
  ]),
  makeSection("Limitation of Liability", [
    "To the fullest extent allowed by law, Summit is not liable for indirect, incidental, or consequential damages arising from site use.",
  ]),
  makeSection("Indemnification", [
    "You agree to indemnify Summit against claims arising from your misuse of the site or violation of these terms.",
  ]),
  makeSection("Changes to These Terms", [
    "Summit may update these terms from time to time. Continued use after updates means you accept the revised terms.",
  ]),
  makeSection("Governing Law", [
    "These terms are governed by applicable Arizona law, without regard to conflict of law principles.",
  ]),
  makeSection("Contact Us", [
    `Questions about these terms can be sent to ${summitEmail} or mailed to Summit's recruiting office in Scottsdale, Arizona.`,
  ]),
];

export const privacySections: LegalSection[] = [
  makeSection("Overview", [
    "This policy explains how Summit collects, uses, stores, and shares personal information from site visitors and applicants.",
  ]),
  makeSection("Information We Collect", [
    "Summit collects information you submit directly, including contact details, location, birthday, licensing status, relocation preference, and optional notes.",
    "Basic analytics, device, and usage information may also be collected automatically to improve the site.",
  ]),
  makeSection("How We Use Your Information", [
    "We use your information to review recruiting interest, schedule follow-up, communicate about next steps, and improve recruiting operations.",
  ]),
  makeSection("SMS Text Messaging Data Sharing Policy", [
    "Mobile contact details are used to support recruiting conversations and operational follow-up. Summit does not sell SMS consent as standalone marketing inventory.",
  ]),
  makeSection("Your SMS Rights and Choices", [
    "You can stop recruiting text messages at any time by replying STOP and can request help where that option is provided.",
  ]),
  makeSection("SMS Message Frequency and Costs", [
    "Frequency depends on recruiting activity. Carrier message and data rates may apply.",
  ]),
  makeSection("SMS Consent", [
    "Consent is gathered through the application form and can be withdrawn later through available opt-out instructions.",
  ]),
  makeSection("Legal Bases for Processing", [
    "Where applicable, Summit processes information based on consent, legitimate interests, contractual preparation, or legal obligations.",
  ]),
  makeSection("How We Share Information", [
    "Information may be shared with service providers, recruiting operations partners, compliance teams, and vendors that support site delivery and communications.",
  ]),
  makeSection("Your Rights", [
    "Depending on your location, you may have rights to access, correct, delete, or restrict use of your information, and to request data portability.",
  ]),
  makeSection("Data Retention", [
    "Summit keeps information only as long as reasonably necessary for recruiting, compliance, recordkeeping, and operational needs.",
  ]),
  makeSection("Data Security", [
    "Reasonable administrative, technical, and organizational safeguards are used to protect personal information.",
  ]),
  makeSection("International Data Transfers", [
    "If information is transferred across borders, Summit will use appropriate safeguards that match the applicable legal requirements.",
  ]),
  makeSection("Children's Privacy", [
    "The site is not intended for children under 13, and Summit does not knowingly collect personal information from them.",
  ]),
  makeSection("Third-Party Links", [
    "Third-party websites are governed by their own privacy policies and Summit is not responsible for their practices.",
  ]),
  makeSection("Your Choices", [
    "You can request updates, unsubscribe from certain communications, or limit optional submissions at any time.",
  ]),
  makeSection("Changes to This Policy", [
    "Summit may update this policy from time to time. Material changes will be reflected on this page with an updated effective date.",
  ]),
  makeSection("Governing Law", [
    "This policy is interpreted under applicable Arizona law except where another privacy regime requires a different treatment.",
  ]),
  makeSection("Contact Us", [
    `For privacy requests or questions, contact ${summitEmail} or write to Summit's recruiting office in Scottsdale, Arizona.`,
  ]),
];
