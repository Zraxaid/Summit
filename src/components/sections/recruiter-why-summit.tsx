"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useMemo, useRef, useState } from "react";

import { clamp } from "@/components/motion";
import type { Recruiter } from "@/lib/recruiters";

const PROGRESS_FLOOR = 0.18;
const ACCELERATE_PIVOT = 0.72;
const FADE_GAIN = 8.5;
const FADE_BIAS = 0.08;
const EMPHASIS_BASE_ALPHA = 0.4;
const EMPHASIS_GAIN = 0.6;

function stripPunctuation(word: string) {
  return word.replace(/[.,!?;:]+$/g, "").toLowerCase();
}

export function RecruiterWhySummitSection({ recruiter }: { recruiter: Recruiter }) {
  const essayRef = useRef<HTMLElement>(null);
  const words = useMemo(() => recruiter.whySummitEssay.split(" "), [recruiter.whySummitEssay]);
  const emphasized = useMemo(
    () =>
      new Set(
        (recruiter.whySummitEmphasized ?? []).map((phrase) => phrase.toLowerCase()),
      ),
    [recruiter.whySummitEmphasized],
  );
  const { scrollYProgress } = useScroll({
    target: essayRef,
    offset: ["start 80%", "center center"],
  });
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setProgress(value);
  });

  return (
    <section ref={essayRef} className="mission-essay-section recruiter-why-summit-section">
      <div className="mission-essay">
        <p>
          {words.map((word, index) => {
            const threshold = index / words.length;
            const acceleratedProgress = clamp(progress / ACCELERATE_PIVOT, 0, 1);
            const opacity = clamp(
              (acceleratedProgress - threshold + FADE_BIAS) * FADE_GAIN,
              PROGRESS_FLOOR,
              1,
            );
            const emphasis = emphasized.has(stripPunctuation(word));

            return (
              <span
                key={`${word}-${index}`}
                style={{
                  opacity,
                  color: emphasis
                    ? `color-mix(in srgb, var(--accent) ${(EMPHASIS_BASE_ALPHA + opacity * EMPHASIS_GAIN) * 100}%, transparent)`
                    : undefined,
                }}
              >
                {word}{" "}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
