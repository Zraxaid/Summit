import { siteCopy } from "@/lib/copy";

export type LegalSection = {
  slug: string;
  title: string;
  body: string[];
};

const summitEmail = siteCopy.global.footer.emailLabel;
const summitAddress = siteCopy.global.footer.address;
const summitPhone = siteCopy.global.footer.phoneLabel;
const summitPhoneRaw = "+18052313858";

// Real Summit URLs. Update here and every CTA picks them up.
const SUMMIT_HOME = "https://www.summitfinancialrecruiting.com/";
const summitSocial = {
  instagram: "https://www.instagram.com/summitimpactgroup/",
  tiktok: SUMMIT_HOME,
  linkedin: SUMMIT_HOME,
};

export const summitLinks = {
  social: summitSocial,
  founderProfile: "https://www.instagram.com/deanz4syth/",
  testimonialVideo: summitSocial.instagram,
  instagramPost: summitSocial.instagram,
} as const;

export const footerData = {
  address: summitAddress,
  email: summitEmail,
  phone: summitPhone,
  phoneRaw: summitPhoneRaw,
  social: [
    { id: "instagram", label: "Instagram", url: summitSocial.instagram },
    { id: "tiktok", label: "TikTok", url: summitSocial.tiktok },
    { id: "linkedin", label: "LinkedIn", url: summitSocial.linkedin },
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

const homeSections = siteCopy.routes.home.sections;

// --------------------------------------------------------------------------
// Image asset URLs. These remote placeholders are Unsplash stand-ins and
// should be replaced with licensed Summit-owned photography during the next
// content pass. Each surface lists its sole asset here so swapping is a
// one-line edit.
// --------------------------------------------------------------------------
const photos = {
  hero: [
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
  ],
  missionSplit:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
  switcher:
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
  benefits:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
  founder:
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1400&q=80",
  partnership:
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=80",
  finalCta:
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80",
  closingQuote:
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
  testimonials: {
    dayethan:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    kevin:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
    alex:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80",
    mia:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    jordan:
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=900&q=80",
  },
  instagramCards: [
    "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=80",
  ],
} as const;

const testimonialImageById = photos.testimonials;
type TestimonialImageId = keyof typeof testimonialImageById;

type TestimonialCopy = {
  id: string;
  quote: string;
  name: string;
  role: string;
  imageAlt: string;
};

export type Testimonial = TestimonialCopy & {
  image: string;
  videoUrl: string;
};

function joinTestimonials(items: readonly TestimonialCopy[]): Testimonial[] {
  return items.map((item) => ({
    ...item,
    image: testimonialImageById[item.id as TestimonialImageId],
    videoUrl: summitLinks.testimonialVideo,
  }));
}

export const homeData = {
  hero: {
    headline: homeSections.hero.headline,
    subhead: homeSections.hero.subhead,
    heroPhotos: photos.hero,
  },
  stats: homeSections.statTriad.stats.map((stat) => ({
    value: Number.parseInt(stat.value, 10),
    unit: stat.value.replace(/[0-9.]/g, ""),
    body: stat.caption,
  })),
  breakMarquee: homeSections.breakMarquee.phrases,
  quarterly: {
    caption: homeSections.quarterlyChart.eyebrow,
    axisLabel: homeSections.quarterlyChart.axisLabel,
    labels: homeSections.quarterlyChart.xAxisLabels,
    values: [9, 24, 51, 91],
  },
  missionStatement: homeSections.missionEssay.body,
  missionEmphasized: homeSections.missionEssay.emphasizedPhrases,
  missionSplit: {
    titlePrefix: homeSections.missionSplit.titlePrefix,
    highlight: homeSections.missionSplit.highlight,
    titleSuffix: homeSections.missionSplit.titleSuffix,
    body: homeSections.missionSplit.body,
    image: photos.missionSplit,
    imageAlt: "Summit team collaborating around a laptop during a strategy session.",
  },
  testimonials: joinTestimonials(homeSections.testimonialsPrimary.items),
  switcher: {
    eyebrow: homeSections.switcher.eyebrow,
    title: homeSections.switcher.headline,
    body: homeSections.switcher.body,
    value: homeSections.switcher.statValue,
    statLabel: homeSections.switcher.statCaption,
    image: photos.switcher,
    imageAlt: homeSections.switcher.imageAlt,
  },
  benefits: {
    eyebrow: homeSections.benefits.eyebrow,
    title: homeSections.benefits.headline,
    body: homeSections.benefits.body,
    image: photos.benefits,
    imageAlt: homeSections.benefits.imageAlt,
    items: [...homeSections.benefits.items],
  },
  valueMarquee: [...homeSections.valueMarquee.phrases],
  fastFive: homeSections.fastFive.steps,
  performance: {
    eyebrow: homeSections.performance.eyebrow,
    title: homeSections.performance.headline,
    body: homeSections.performance.body,
    kpis: homeSections.performance.kpis,
    writers: [165, 854, 1987],
    production: [8, 22.8, 84],
  },
  founder: {
    eyebrow: homeSections.founder.eyebrow,
    headline: homeSections.founder.headline,
    body: homeSections.founder.body,
    followUrl: summitLinks.founderProfile,
    image: photos.founder,
    imageAlt: homeSections.founder.imageAlt,
  },
  successKpis: homeSections.successStrip.items.map((item) => ({
    value: item.value,
    label: item.caption,
  })),
  secondaryTestimonials: joinTestimonials(homeSections.testimonialsSecondary.items),
  instagram: homeSections.instagram.cards.map((title, index) => ({
    title,
    image: photos.instagramCards[index],
    url: summitLinks.instagramPost,
  })),
  partnership: {
    headline: homeSections.partnership.headline,
    background: photos.partnership,
    imageAlt: homeSections.partnership.imageAlt,
  },
  finalCta: {
    eyebrow: homeSections.finalCta.eyebrow,
    image: photos.finalCta,
    imageAlt: homeSections.finalCta.imageAlt,
  },
  closingQuote: {
    opening: homeSections.closingQuote.opening,
    middle: homeSections.closingQuote.middle,
    closing: homeSections.closingQuote.closing,
    attribution: homeSections.closingQuote.attribution,
    image: photos.closingQuote,
    imageAlt: homeSections.closingQuote.imageAlt,
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
