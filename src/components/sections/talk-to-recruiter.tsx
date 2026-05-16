"use client";

import Image from "next/image";

import { Reveal } from "@/components/motion";
import { JoinTeamButton } from "@/components/site-shell";
import { LogoPlaceholder } from "@/components/ui/logo-placeholder";
import type { Recruiter } from "@/lib/recruiters";

export function TalkToRecruiterSection({ recruiter }: { recruiter: Recruiter }) {
  const firstName = recruiter.name.split(" ")[0];
  const hasCalendly = Boolean(recruiter.directContact.calendly);
  const hasInstagram = Boolean(recruiter.directContact.instagramDm);

  return (
    <section className="talk-to-recruiter-section">
      <Reveal className="talk-to-recruiter-shell" amount={0.35}>
        <div className="talk-to-recruiter-photo">
          {recruiter.portrait.src ? (
            <Image
              src={recruiter.portrait.src}
              alt={recruiter.portrait.alt}
              fill
              sizes="(max-width: 750px) 100vw, 40vw"
              className="talk-to-recruiter-image"
            />
          ) : (
            <LogoPlaceholder label={recruiter.name} />
          )}
        </div>

        <div className="talk-to-recruiter-copy">
          <p className="eyebrow">Talk to {firstName} directly</p>
          <h2>Three ways to reach me. Pick whichever feels right.</h2>
          <p>
            Quickest path to a real conversation. Apply formally, grab time on my calendar, or
            send me a DM — I respond inside the same day.
          </p>

          <div className="talk-to-recruiter-actions">
            <JoinTeamButton className="talk-to-recruiter-primary" />
            {hasCalendly ? (
              <a
                className="button-outline talk-to-recruiter-secondary"
                href={recruiter.directContact.calendly}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a 15-min call
              </a>
            ) : null}
            {hasInstagram ? (
              <a
                className="button-outline talk-to-recruiter-secondary"
                href={recruiter.directContact.instagramDm}
                target="_blank"
                rel="noopener noreferrer"
              >
                DM me on Instagram
              </a>
            ) : null}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
