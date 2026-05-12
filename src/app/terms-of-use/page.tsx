import { LegalPage } from "@/components/legal-page";
import { siteCopy } from "@/lib/copy";
import { termsSections } from "@/lib/site-data";

export default function TermsPage() {
  return (
    <LegalPage
      title={siteCopy.routes.termsOfUse.title}
      intro={siteCopy.routes.termsOfUse.intro}
      sections={termsSections}
    />
  );
}
