import { LegalPage } from "@/components/legal-page";
import { termsSections } from "@/lib/site-data";

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      intro="These terms govern use of Summit's recruiting site, communications, and lead intake flow."
      sections={termsSections}
    />
  );
}
