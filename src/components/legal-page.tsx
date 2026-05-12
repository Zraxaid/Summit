import type { LegalSection } from "@/lib/site-data";
import { siteCopy } from "@/lib/copy";

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <div className="legal-page">
      <section className="legal-hero">
        <p className="eyebrow">{siteCopy.global.legal.eyebrow}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
      </section>
      <section className="legal-layout">
        <aside className="legal-toc">
          <h2>{siteCopy.global.legal.tocHeading}</h2>
          <nav aria-label={`${title} table of contents`}>
            {sections.map((section) => (
              <a key={section.slug} href={`#${section.slug}`}>
                {section.title}
              </a>
            ))}
          </nav>
        </aside>
        <div className="legal-sections">
          {sections.map((section) => (
            <section id={section.slug} key={section.slug} className="legal-card">
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
