"use client";

import Link from "next/link";
import { useEffect, useEffectEvent, useRef, useState } from "react";

import { JoinTeamButton } from "@/components/site-shell";
import { homeData } from "@/lib/site-data";

function useCountUp(target: number) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        let start = 0;
        const step = Math.max(1, Math.round(target / 30));
        const interval = window.setInterval(() => {
          start += step;
          if (start >= target) {
            setValue(target);
            window.clearInterval(interval);
            return;
          }
          setValue(start);
        }, 30);

        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);

  return { ref, value };
}

function AnimatedStat({ value, unit, body }: (typeof homeData.stats)[number]) {
  const { ref, value: current } = useCountUp(value);

  return (
    <article className="stat-card">
      <p className="stat-value">
        <span ref={ref}>{current}</span>
        <span>{unit}</span>
      </p>
      <p>{body}</p>
    </article>
  );
}

function Marquee({ items, invert = false }: { items: string[]; invert?: boolean }) {
  return (
    <div className={`marquee${invert ? " invert" : ""}`}>
      <div className="marquee-track">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function Carousel({
  items,
  label,
}: {
  items: { quote: string; name: string; role?: string; url?: string }[];
  label: string;
}) {
  const [index, setIndex] = useState(0);
  const onAdvance = useEffectEvent(() => {
    setIndex((current) => (current + 1) % items.length);
  });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      return;
    }

    const timer = window.setInterval(() => onAdvance(), 5000);
    return () => window.clearInterval(timer);
  }, []);

  const current = items[index];

  return (
    <section className="carousel-block" aria-label={label}>
      <div className="carousel-card">
        <p className="eyebrow">Why People Choose Summit</p>
        <blockquote>{current.quote}</blockquote>
        <div className="carousel-meta">
          <div>
            <strong>{current.name}</strong>
            {current.role ? <span>{current.role}</span> : null}
          </div>
          {current.url ? (
            <a href={current.url} target="_blank" rel="noopener noreferrer">
              WATCH THE VIDEO &gt;
            </a>
          ) : null}
        </div>
      </div>
      <div className="carousel-controls">
        <button type="button" onClick={() => setIndex((index - 1 + items.length) % items.length)}>
          Previous
        </button>
        <button type="button" onClick={() => setIndex((index + 1) % items.length)}>
          Next
        </button>
      </div>
    </section>
  );
}

function PerformanceChart() {
  const points = "20,170 145,120 270,34";

  return (
    <div className="chart-card">
      <div className="chart-summary">
        {homeData.performance.kpis.map((kpi) => (
          <article key={kpi.label}>
            <span>{kpi.label}</span>
            <strong>{kpi.value}</strong>
          </article>
        ))}
      </div>
      <svg viewBox="0 0 300 180" className="chart-svg" aria-label="Growth chart">
        <line x1="20" y1="170" x2="280" y2="170" />
        <line x1="20" y1="20" x2="20" y2="170" />
        <polyline points={points} />
        <circle cx="20" cy="170" r="5" />
        <circle cx="145" cy="120" r="5" />
        <circle cx="270" cy="34" r="5" />
        <text x="20" y="178">
          2023
        </text>
        <text x="135" y="178">
          2024
        </text>
        <text x="255" y="178">
          2025
        </text>
      </svg>
    </div>
  );
}

export function HomePage() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">Recruiting System</p>
          <h1>{homeData.hero.headline}</h1>
          <p>
            A modern recruiting funnel for ambitious insurance agents who want
            mentorship, better leads, and a faster route to meaningful income.
          </p>
          <div className="hero-actions">
            <JoinTeamButton />
            <a href="#performance" className="hero-link">
              SEE THE GROWTH STORY
            </a>
          </div>
        </div>
      </section>

      <section className="stats-grid">
        {homeData.stats.map((stat) => (
          <AnimatedStat key={stat.body} {...stat} />
        ))}
      </section>

      <Marquee items={homeData.breakMarquee} />

      <section className="cta-band">
        <p>Average earnings in the first 3 months</p>
        <JoinTeamButton className="wide-cta" />
      </section>

      <section className="earnings-panel">
        <div>
          <p className="eyebrow">Production</p>
          <h2>Performance with purpose and velocity.</h2>
          <p>
            Summit combines one-on-one coaching, structured lead flow, and
            repeatable systems that help new agents gain traction quickly.
          </p>
        </div>
        <PerformanceChart />
      </section>

      <section className="mission-section">
        <p>
          We are building a high-accountability recruiting engine for people
          who want more than a job title. We want a community that learns
          faster, earns faster, and creates real momentum.
        </p>
        <JoinTeamButton variant="text">JOIN TODAY.</JoinTeamButton>
      </section>

      <Carousel items={homeData.testimonials} label="Primary testimonials" />

      <section className="switch-section">
        <div>
          <p className="eyebrow">Make the Switch</p>
          <h2>Agents with experience still come here for a better system.</h2>
          <p>{homeData.switcher.body}</p>
        </div>
        <div className="switch-stat">
          <strong>{homeData.switcher.value}</strong>
          <span>made the switch from another agency</span>
        </div>
      </section>

      <section className="benefits-section">
        <Marquee items={homeData.valueMarquee} invert />
        <div className="benefits-grid">
          {homeData.benefits.map((benefit) => (
            <article key={benefit}>
              <span aria-hidden="true">▲</span>
              <h2>{benefit}</h2>
            </article>
          ))}
        </div>
        <JoinTeamButton className="wide-cta" />
      </section>

      <section className="fast-five">
        <div className="section-heading">
          <p className="eyebrow">Our System</p>
          <h2>The Fast Five</h2>
        </div>
        <div className="step-grid">
          {homeData.fastFive.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
        <JoinTeamButton className="wide-cta light" variant="outline" />
      </section>

      <section id="performance" className="founder-section">
        <div>
          <p className="eyebrow">Meet the Founder</p>
          <h2>{homeData.founder.headline}</h2>
          <p>{homeData.founder.body}</p>
          <a href={homeData.founder.followUrl} target="_blank" rel="noopener noreferrer">
            FOLLOW JAY
          </a>
        </div>
      </section>

      <section className="success-strip">
        {homeData.successKpis.map((item) => (
          <article key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </article>
        ))}
      </section>

      <Carousel items={homeData.secondaryTestimonials} label="Secondary testimonials" />

      <section className="instagram-section">
        <div className="section-heading">
          <p className="eyebrow">Follow Jay</p>
          <h2>Culture, wins, and recruiting momentum in real time.</h2>
        </div>
        <div className="instagram-grid">
          {homeData.instagram.map((url, index) => (
            <a key={url} href={url} target="_blank" rel="noopener noreferrer">
              <span>Post {index + 1}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="partner-section">
        <div className="partner-diamond">
          <div>
            <p className="eyebrow">Partnership</p>
            <h2>{homeData.partnershipHeadline}</h2>
          </div>
        </div>
        <div className="partner-cloud">
          {homeData.partnerNames.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
        <JoinTeamButton className="wide-cta" />
      </section>

      <section className="closing-quote">
        <blockquote>{homeData.closingQuote.body}</blockquote>
        <p>{homeData.closingQuote.attribution}</p>
        <Link href="/privacy-policy">Read our privacy commitments</Link>
      </section>
    </div>
  );
}
