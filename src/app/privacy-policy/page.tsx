import { LegalPage } from "@/components/legal-page";
import { privacySections } from "@/lib/site-data";

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This policy explains what information Summit collects, why it is used, and how visitors can exercise their privacy rights."
      sections={privacySections}
    />
  );
}
