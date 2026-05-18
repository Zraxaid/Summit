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
    { id: "american-home-life", name: "AMERICAN HOME LIFE", url: "https://www.ahlic.com/" },
    { id: "american-amicable", name: "AMERICAN AMICABLE", url: "https://www.americanamicable.com/" },
    {
      id: "mutual-of-omaha",
      name: "MUTUAL OF OMAHA",
      url: "https://www.mutualofomaha.com/",
    },
    {
      id: "royal-neighbors-of-america",
      name: "ROYAL NEIGHBORS OF AMERICA",
      url: "https://www.royalneighbors.org/",
    },
    { id: "foresters", name: "FORESTERS", url: "https://www.foresters.com/" },
    {
      id: "american-general-life",
      name: "AMERICAN GENERAL LIFE",
      url: "https://www.aig.com/",
    },
    { id: "transamerica", name: "TRANSAMERICA", url: "https://www.transamerica.com/" },
    { id: "fg", name: "F&G", url: "https://www.fglife.com/" },
    { id: "baltimore-life", name: "BALTIMORE LIFE", url: "https://www.baltlife.com/" },
    {
      id: "liberty-bankers",
      name: "LIBERTY BANKERS",
      url: "https://www.libertybankerslife.com/",
    },
    { id: "combined", name: "COMBINED", url: "https://www.combinedinsurance.com/" },
    { id: "instabrain", name: "INSTABRAIN", url: "#" },
    { id: "corebridge", name: "COREBRIDGE", url: "https://www.corebridgefinancial.com/" },
    { id: "ethos", name: "ETHOS", url: "https://www.ethos.com/" },
    {
      id: "national-life-group",
      name: "NATIONAL LIFE GROUP",
      url: "https://www.nationallife.com/",
    },
  ],
};

const homeSections = siteCopy.routes.home.sections;

// --------------------------------------------------------------------------
// Image asset URLs. All photography is intentionally blank for now — every
// surface renders the branded LogoPlaceholder while we wait for real Summit
// imagery. Drop a URL into any field and the placeholder is replaced with
// next/image.
// --------------------------------------------------------------------------
const photos = {
  hero: ["", "", ""] as readonly string[],
  missionSplit: "",
  switcher: "",
  benefits: "",
  founder: "",
  partnership: "",
  finalCta: "",
  closingQuote: "",
  testimonials: {
    dayethan: "",
    kevin: "",
    alex: "",
    mia: "",
    jordan: "",
  },
  instagramCards: ["", "", "", "", "", "", "", "", ""] as readonly string[],
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
    "These terms are governed by applicable Florida law, without regard to conflict of law principles.",
  ]),
  makeSection("Contact Us", [
    `Questions about these terms can be sent to ${summitEmail} or mailed to Summit's recruiting office in Miami, Florida.`,
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
    "This policy is interpreted under applicable Florida law except where another privacy regime requires a different treatment.",
  ]),
  makeSection("Contact Us", [
    `For privacy requests or questions, contact ${summitEmail} or write to Summit's recruiting office in Miami, Florida.`,
  ]),
];
