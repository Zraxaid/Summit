import { LegalPage } from "@/components/legal-page";
import { siteCopy } from "@/lib/copy";
import { privacySections } from "@/lib/site-data";

export default function PrivacyPage() {
  return (
    <LegalPage
      title={siteCopy.routes.privacyPolicy.title}
      intro={siteCopy.routes.privacyPolicy.intro}
      sections={privacySections}
    />
  );
}
