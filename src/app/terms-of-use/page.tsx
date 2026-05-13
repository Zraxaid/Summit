import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { siteCopy } from "@/lib/copy";
import { termsSections } from "@/lib/site-data";

export const metadata: Metadata = {
  title: siteCopy.routes.termsOfUse.title,
  description: siteCopy.routes.termsOfUse.intro,
  alternates: { canonical: "/terms-of-use" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title={siteCopy.routes.termsOfUse.title}
      intro={siteCopy.routes.termsOfUse.intro}
      sections={termsSections}
    />
  );
}
