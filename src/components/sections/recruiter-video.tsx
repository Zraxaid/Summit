"use client";

import { Play } from "lucide-react";

import { Reveal } from "@/components/motion";
import type { Recruiter } from "@/lib/recruiters";

export function RecruiterVideoSection({ recruiter }: { recruiter: Recruiter }) {
  if (!recruiter.video) {
    return null;
  }

  const { url, poster } = recruiter.video;

  return (
    <section className="recruiter-video-section">
      <Reveal className="recruiter-video-shell" amount={0.35}>
        <div className="recruiter-video-frame">
          {poster ? (
            // Use an <a> wrapper so the section degrades cleanly without
            // forcing autoplay or an oEmbed roundtrip.
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="recruiter-video-cover"
              style={{ backgroundImage: `url(${poster})` }}
              aria-label={`Watch ${recruiter.name}'s intro video`}
            >
              <span className="recruiter-video-play" aria-hidden="true">
                <Play size={26} fill="currentColor" strokeWidth={0} />
              </span>
              <span className="recruiter-video-caption">Watch the 60-second intro</span>
            </a>
          ) : (
            <iframe
              src={url}
              title={`${recruiter.name} intro video`}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="recruiter-video-iframe"
            />
          )}
        </div>
      </Reveal>
    </section>
  );
}
