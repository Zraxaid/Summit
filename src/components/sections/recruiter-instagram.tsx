"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";

import { Reveal } from "@/components/motion";
import { siteCopy } from "@/lib/copy";
import type { Recruiter } from "@/lib/recruiters";
import { homeData } from "@/lib/site-data";

// Until each recruiter sends their own carousel images, fall back to the
// shared homeData.instagram artwork. The URLs are recruiter-specific.
export function RecruiterInstagramSection({ recruiter }: { recruiter: Recruiter }) {
  const reduceMotion = useReducedMotion();
  const cards = recruiter.instagramPosts.map((url, index) => ({
    url,
    image: homeData.instagram[index % homeData.instagram.length].image,
    title: homeData.instagram[index % homeData.instagram.length].title,
  }));
  const firstName = recruiter.name.split(" ")[0];

  return (
    <section className="instagram-section">
      <Reveal className="section-intro">
        <p className="eyebrow">FOLLOW {firstName.toUpperCase()}</p>
        <h2>{siteCopy.routes.home.sections.instagram.headline}</h2>
      </Reveal>

      <div className="instagram-rail">
        <div className="instagram-track" style={reduceMotion ? { animation: "none" } : undefined}>
          {[...cards, ...(reduceMotion ? [] : cards)].map((card, index) => (
            <a
              key={`${card.url}-${index}`}
              className={`instagram-card instagram-card-${index % 5}`}
              href={card.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="instagram-card-photo">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 750px) 70vw, (max-width: 1100px) 40vw, 18rem"
                  className="instagram-card-image"
                />
              </div>
              <div className="instagram-card-copy">
                <span>{siteCopy.routes.home.sections.instagram.platformLabel}</span>
                <strong>{card.title}</strong>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
