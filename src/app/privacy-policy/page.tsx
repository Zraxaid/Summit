import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { siteCopy } from "@/lib/copy";
import { privacySections } from "@/lib/site-data";

export const metadata: Metadata = {
  title: siteCopy.routes.privacyPolicy.title,
  description: siteCopy.routes.privacyPolicy.intro,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title={siteCopy.routes.privacyPolicy.title}
      intro={siteCopy.routes.privacyPolicy.intro}
      sections={privacySections}
    />
  );
}
