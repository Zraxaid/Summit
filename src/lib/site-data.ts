export type LegalSection = {
  slug: string;
  title: string;
  body: string[];
};

export const footerData = {
  address: "7720 North Dobson Rd, Scottsdale, AZ 85256",
  email: "team@nonstopfinancial.com",
  phone: "+1 (480) 550-8556",
  phoneRaw: "+14805508556",
  social: [
    { label: "Instagram", short: "IG", url: "https://www.instagram.com/nonstopfinancial/" },
    { label: "TikTok", short: "TT", url: "https://www.tiktok.com/@nonstopfinancial" },
    { label: "LinkedIn", short: "IN", url: "https://www.linkedin.com/company/nonstop-financial/" },
  ],
  partners: [
    { name: "AMERICO", url: "https://www.americo.com/" },
    { name: "NATIONAL LIFE GROUP", url: "https://www.nationallife.com/" },
    { name: "F&G", url: "https://www.fglife.com/" },
    { name: "TRANSAMERICA", url: "https://www.transamerica.com/" },
    { name: "MUTUAL OF OMAHA", url: "https://www.lifeinsurance-mutualofomaha.com/" },
    { name: "ETHOS", url: "https://www.ethos.com/" },
  ],
};

export const homeData = {
  hero: {
    headline: "Now everyone can access a world of wealth.",
  },
  stats: [
    { value: 59, unit: "%", body: "of Americans have less than $10K in savings." },
    { value: 25, unit: "%", body: "fewer full-time jobs are available to young adults than in prior generations." },
    { value: 37, unit: "%", body: "of young people live in low-income households." },
  ],
  breakMarquee: ["BREAK THE CYCLE", "START BUILDING MOMENTUM", "ACCESS BETTER LEADS", "JOIN THE TEAM"],
  valueMarquee: [
    "TOP COMMISSIONS",
    "EXPERT TRAINING",
    "BETTER LEADS",
    "OFFICE SUPPORT",
    "HIGH-CONVERTING PROSPECTS",
  ],
  testimonials: [
    {
      quote: "The environment, coaching, and accountability pushed me from uncertainty into real ownership.",
      name: "DAYETHAN NELSON",
      role: "Agent",
    },
    {
      quote: "Summit made me feel like I was finally building something that belonged to me.",
      name: "KEVIN OLIVERO",
      role: "Senior Producer",
    },
    {
      quote: "The daily energy around me keeps my standards high and my results moving.",
      name: "ALEX RUIZ",
      role: "Recruiting Partner",
    },
  ],
  secondaryTestimonials: [
    {
      quote: "When the culture, training, and systems all line up, performance stops feeling accidental.",
      name: "MIA CARTER",
      role: "Field Leader",
    },
    {
      quote: "This is what a real ramp for hungry people looks like: speed, clarity, and support.",
      name: "JORDAN VALE",
      role: "Agency Builder",
    },
  ],
  switcher: {
    value: "43%",
    body: "A large share of the current team came from other agencies because they wanted cleaner systems, stronger support, and more upside.",
  },
  benefits: [
    "Close more deals with less friction",
    "Build your own work-life rhythm",
    "Set and hit your own income goals",
    "Choose your own hours",
    "Spend less time on paperwork",
    "Grow inside a team-driven culture",
  ],
  fastFive: [
    {
      number: 1,
      title: "Exclusive Leads",
      body: "Pre-qualified prospects get agents into real conversations without wasting their early momentum.",
    },
    {
      number: 2,
      title: "Effective Training",
      body: "Structured coaching helps new recruits learn the playbook quickly and confidently.",
    },
    {
      number: 3,
      title: "One-on-One Mentorship",
      body: "Leadership stays close to the work with practical reviews, feedback, and field insight.",
    },
    {
      number: 4,
      title: "Automated Tools",
      body: "Simple workflows reduce administrative drag so producers can focus on activity that matters.",
    },
    {
      number: 5,
      title: "Ongoing Support",
      body: "A high-accountability team keeps standards high and makes consistency easier to sustain.",
    },
  ],
  performance: {
    kpis: [
      { label: "2025 Total Production", value: "$84,022,378" },
      { label: "2025 New Writers", value: "1,987" },
    ],
  },
  founder: {
    headline: "Wealth growth expertise at the speed of real life.",
    body: "Jay Maska built this model to help ambitious people move faster. The goal is not more noise. The goal is more traction, stronger training, and a career path that rewards action.",
    followUrl: "https://www.instagram.com/nonstopfinancial/",
  },
  successKpis: [
    { value: "300+", label: "graduates of the training program" },
    { value: "$5M", label: "bonuses paid every month across the network" },
    { value: "$84M", label: "issued premium in 2025" },
    { value: "Fastest Growing", label: "wealth-building path for 18-28 year olds" },
  ],
  instagram: [
    "https://www.instagram.com/p/DH_Xv3SxEsU/",
    "https://www.instagram.com/p/DT8hQuhEgan/",
    "https://www.instagram.com/p/DTlWpHjEgME/",
    "https://www.instagram.com/p/DTLI5qviGqm/",
    "https://www.instagram.com/p/DSiqeoIkmpv/",
    "https://www.instagram.com/p/DSD6fCWEjnk/",
    "https://www.instagram.com/p/DQ5SeL6khy_/",
    "https://www.instagram.com/p/DQhyn0xkvA6/",
    "https://www.instagram.com/p/DQUsgQBkjk9/",
  ],
  partnerNames: ["AMERICO", "NATIONAL LIFE GROUP", "F&G", "TRANSAMERICA", "MUTUAL OF OMAHA", "ETHOS"],
  partnershipHeadline: "Raising lifestyles and incomes with the help of our partners.",
  closingQuote: {
    body: "Don't let anyone convince you that waiting is the whole strategy. Build momentum, learn quickly, and keep moving.",
    attribution: "- Jay Maska, 2026",
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
    "Questions about these terms can be sent to team@nonstopfinancial.com or mailed to the Scottsdale office listed on this site.",
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
    "For privacy requests or questions, contact team@nonstopfinancial.com or write to the Scottsdale office listed in the footer.",
  ]),
];
