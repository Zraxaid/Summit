"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  MoveRight,
  Quote,
} from "lucide-react";
import { useEffect, useEffectEvent, useMemo, useRef, useState } from "react";

import { PartnerLogo } from "@/components/partner-logos";
import { JoinTeamButton } from "@/components/site-shell";
import { footerData, homeData } from "@/lib/site-data";

const arrowTiles = [
  { top: "6%", left: "8%", width: 260, delay: 0.1, rotate: -22 },
  { top: "18%", right: "12%", width: 220, delay: 0.25, rotate: -18 },
  { top: "34%", left: "4%", width: 200, delay: 0.4, rotate: -26 },
  { top: "44%", right: "5%", width: 260, delay: 0.55, rotate: -16 },
  { top: "62%", left: "12%", width: 220, delay: 0.7, rotate: -20 },
  { top: "73%", right: "18%", width: 200, delay: 0.85, rotate: -18 },
  { top: "14%", left: "36%", width: 180, delay: 1, rotate: -14 },
  { top: "66%", left: "38%", width: 180, delay: 1.15, rotate: -12 },
];

const heroParticles = [
  { x: -110, y: -65, delay: 0.4 },
  { x: -84, y: 28, delay: 0.5 },
  { x: -34, y: -34, delay: 0.6 },
  { x: -22, y: 42, delay: 0.72 },
  { x: 18, y: -54, delay: 0.84 },
  { x: 46, y: 50, delay: 0.96 },
  { x: 86, y: -26, delay: 1.08 },
  { x: 110, y: 18, delay: 1.2 },
  { x: 76, y: 66, delay: 1.32 },
  { x: -72, y: 74, delay: 1.44 },
];

function linePath(values: number[], width: number, height: number, padding = 28) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const usableWidth = width - padding * 2;
  const usableHeight = height - padding * 2;

  return values
    .map((value, index) => {
      const x = padding + (usableWidth / (values.length - 1)) * index;
      const y =
        padding + usableHeight - ((value - min) / Math.max(max - min, 1)) * usableHeight;

      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
}

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

        const startTime = performance.now();
        const duration = 1200;

        const tick = (currentTime: number) => {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          setValue(Math.round(target * progress));

          if (progress < 1) {
            window.requestAnimationFrame(tick);
          }
        };

        window.requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.45 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);

  return { ref, value };
}

function Reveal({
  children,
  className,
  amount = 0.2,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function PhotoPanel({
  image,
  alt,
  className,
  children,
}: {
  image: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`photo-panel${className ? ` ${className}` : ""}`}
      role="img"
      aria-label={alt}
      style={{ backgroundImage: `url(${image})` }}
    >
      {children}
    </div>
  );
}

function AnimatedStat({ value, unit, body }: (typeof homeData.stats)[number]) {
  const { ref, value: current } = useCountUp(value);

  return (
    <Reveal className="stat-card">
      <p className="stat-value">
        <span ref={ref}>{current}</span>
        <span>{unit}</span>
      </p>
      <p>{body}</p>
    </Reveal>
  );
}

function MarqueeBand({
  items,
  invert = false,
}: {
  items: string[];
  invert?: boolean;
}) {
  return (
    <div className={`marquee-band${invert ? " invert" : ""}`}>
      <div className="marquee-track">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const backdropY = useTransform(scrollYProgress, [0, 1], [0, 96]);

  return (
    <section ref={heroRef} className="hero-section">
      <motion.div className="hero-backdrop" style={{ y: backdropY }}>
        <div className="hero-collage" aria-hidden="true">
          {homeData.hero.heroPhotos.map((image, index) => (
            <motion.div
              key={image}
              className={`hero-collage-card hero-collage-card-${index + 1}`}
              style={{ backgroundImage: `url(${image})` }}
              initial={reduceMotion ? false : { opacity: 0, y: 36 }}
              animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.18, duration: 0.85 }}
            />
          ))}
        </div>

        {arrowTiles.map((arrow, index) => (
          <motion.div
            key={`${arrow.top}-${index}`}
            className="hero-arrow"
            style={{
              top: arrow.top,
              left: "left" in arrow ? arrow.left : undefined,
              right: "right" in arrow ? arrow.right : undefined,
              width: arrow.width,
              rotate: `${arrow.rotate}deg`,
            }}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.72, x: -20 }}
            animate={reduceMotion ? {} : { opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: arrow.delay }}
          />
        ))}
      </motion.div>

      <div className="hero-content">
        <motion.div
          className="hero-mark"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={reduceMotion ? {} : { opacity: 1, scale: 1 }}
          transition={{ duration: 1.05, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <svg viewBox="0 0 240 160" aria-hidden="true">
            <motion.path
              d="M42 116 100 36l56 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={reduceMotion ? {} : { pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.35 }}
            />
            <motion.path
              d="M76 116h52"
              fill="none"
              stroke="currentColor"
              strokeWidth="14"
              strokeLinecap="round"
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={reduceMotion ? {} : { pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.78 }}
            />
            {heroParticles.map((particle, index) => (
              <motion.circle
                key={`${particle.x}-${index}`}
                cx="66"
                cy="80"
                r="4"
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, x: particle.x, y: particle.y, scale: 0.3 }
                }
                animate={reduceMotion ? {} : { opacity: [0, 0.9, 0], x: 0, y: 0, scale: 1 }}
                transition={{ duration: 1.3, delay: particle.delay }}
              />
            ))}
          </svg>
        </motion.div>

        <Reveal className="hero-copy" amount={0.35}>
          <h1>{homeData.hero.headline}</h1>
          <p>{homeData.hero.subhead}</p>
          <div className="hero-actions">
            <JoinTeamButton />
            <a href="#performance" className="hero-ghost-link">
              <span>SEE THE GROWTH STORY</span>
              <MoveRight size={18} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function QuarterlyChart() {
  const reduceMotion = useReducedMotion();
  const path = useMemo(
    () => linePath(homeData.quarterly.values, 560, 280, 32),
    [],
  );

  return (
    <section className="quarterly-section">
      <Reveal className="section-intro">
        <p className="eyebrow">{homeData.quarterly.caption}</p>
        <h2>Early proof that the system moves.</h2>
      </Reveal>
      <Reveal className="quarterly-chart-shell" amount={0.4}>
        <div className="quarterly-axis-label">{homeData.quarterly.axisLabel}</div>
        <svg viewBox="0 0 560 280" className="quarterly-chart" aria-label="Quarterly growth chart">
          <line x1="32" y1="240" x2="528" y2="240" />
          <line x1="32" y1="24" x2="32" y2="240" />
          <motion.path
            d={path}
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0.3 }}
            whileInView={reduceMotion ? {} : { pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
          {homeData.quarterly.values.map((value, index) => {
            const x = 32 + ((560 - 64) / (homeData.quarterly.values.length - 1)) * index;
            const y = 240 - ((value - 9) / (91 - 9)) * (240 - 32);

            return (
              <g key={homeData.quarterly.labels[index]}>
                <circle cx={x} cy={y} r="5" />
                <text x={x} y="266" textAnchor="middle">
                  {homeData.quarterly.labels[index]}
                </text>
                <text x={x} y={y - 12} textAnchor="middle">
                  ${value}k
                </text>
              </g>
            );
          })}
        </svg>
      </Reveal>
    </section>
  );
}

function TestimonialCarousel({
  items,
  eyebrow,
}: {
  items: Array<(typeof homeData.testimonials)[number]>;
  eyebrow: string;
}) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const onAdvance = useEffectEvent(() => {
    setIndex((current) => (current + 1) % items.length);
  });

  useEffect(() => {
    if (reduceMotion || isPaused) {
      return;
    }

    const timer = window.setInterval(() => onAdvance(), 6000);
    return () => window.clearInterval(timer);
  }, [isPaused, reduceMotion]);

  const current = items[index];

  return (
    <section
      className="carousel-section"
      aria-label={eyebrow}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <Reveal className="carousel-shell">
        <AnimatePresence mode="wait">
          <motion.article
            key={current.name}
            className="carousel-frame"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
            exit={reduceMotion ? {} : { opacity: 0, y: -18 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              key={`swoosh-${current.name}`}
              className="carousel-swoosh"
              initial={reduceMotion ? false : { x: "-110%", opacity: 0 }}
              animate={reduceMotion ? {} : { x: "110%", opacity: [0, 0.32, 0] }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              aria-hidden="true"
            />

            <div className="carousel-copy">
              <p className="eyebrow">{eyebrow}</p>
              <Quote size={28} />
              <blockquote>{current.quote}</blockquote>
              <div className="carousel-meta">
                <div>
                  <strong>{current.name}</strong>
                  <span>{current.role}</span>
                </div>
                <a href={current.videoUrl} target="_blank" rel="noopener noreferrer">
                  WATCH THE VIDEO &gt;
                </a>
              </div>
            </div>

            <PhotoPanel
              className="carousel-portrait"
              image={current.image}
              alt={current.imageAlt}
            />
          </motion.article>
        </AnimatePresence>

        <button
          type="button"
          className="carousel-nav carousel-nav-prev"
          aria-label="Previous slide"
          onClick={() => setIndex((currentIndex) => (currentIndex - 1 + items.length) % items.length)}
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          className="carousel-nav carousel-nav-next"
          aria-label="Next slide"
          onClick={() => setIndex((currentIndex) => (currentIndex + 1) % items.length)}
        >
          <ChevronRight size={22} />
        </button>
      </Reveal>
    </section>
  );
}

function PerformanceDashboard() {
  const reduceMotion = useReducedMotion();
  const writersPath = useMemo(() => linePath(homeData.performance.writers, 620, 320, 48), []);
  const productionPath = useMemo(
    () => linePath(homeData.performance.production, 620, 320, 48),
    [],
  );

  return (
    <section id="performance" className="performance-section">
      <Reveal className="section-intro">
        <p className="eyebrow">{homeData.performance.eyebrow}</p>
        <h2>{homeData.performance.title}</h2>
        <p>{homeData.performance.body}</p>
      </Reveal>

      <Reveal className="performance-shell" amount={0.35}>
        <div className="performance-kpis">
          {homeData.performance.kpis.map((kpi) => (
            <article key={kpi.label} className="performance-kpi">
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
            </article>
          ))}
        </div>

        <svg viewBox="0 0 620 320" className="performance-chart" aria-label="Performance dashboard chart">
          <line x1="48" y1="268" x2="572" y2="268" />
          <line x1="48" y1="42" x2="48" y2="268" />

          <motion.path
            d={productionPath}
            className="performance-line performance-line-production"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0.3 }}
            whileInView={reduceMotion ? {} : { pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
          <motion.path
            d={writersPath}
            className="performance-line performance-line-writers"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0.3 }}
            whileInView={reduceMotion ? {} : { pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 1.15, ease: "easeOut", delay: 0.15 }}
          />

          {["2023", "2024", "2025"].map((label, index) => {
            const x = 48 + ((620 - 96) / 2) * index;
            const yWriters =
              48 +
              (320 - 96) -
              ((homeData.performance.writers[index] - 165) / (1987 - 165)) * (320 - 96);
            const yProduction =
              48 +
              (320 - 96) -
              ((homeData.performance.production[index] - 8) / (84 - 8)) * (320 - 96);

            return (
              <g key={label}>
                <circle cx={x} cy={yProduction} r="5" className="performance-point performance-point-production" />
                <circle cx={x} cy={yWriters} r="5" className="performance-point performance-point-writers" />
                <text x={x} y="292" textAnchor="middle">
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
      </Reveal>

      <Reveal className="outline-band">
        <p>JOIN ONE OF THE FASTEST GROWING AGENCIES IN THE NATION.</p>
        <JoinTeamButton variant="outline">JOIN THE TEAM</JoinTeamButton>
      </Reveal>
    </section>
  );
}

function InstagramRail() {
  return (
    <section className="instagram-section">
      <Reveal className="section-intro">
        <p className="eyebrow">FOLLOW JAY</p>
        <h2>Culture, wins, and recruiting momentum in real time.</h2>
      </Reveal>

      <div className="instagram-rail">
        <div className="instagram-track">
          {[...homeData.instagram, ...homeData.instagram].map((card, index) => (
            <a
              key={`${card.url}-${index}`}
              className="instagram-card"
              href={card.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="instagram-card-photo"
                role="img"
                aria-label={card.title}
                style={{ backgroundImage: `url(${card.image})` }}
              />
              <div className="instagram-card-copy">
                <span>INSTAGRAM</span>
                <strong>{card.title}</strong>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnershipSection() {
  return (
    <section className="partner-section">
      <Reveal className="partner-shell">
        <div className="partner-diamond">
          <PhotoPanel
            className="partner-diamond-photo"
            image={homeData.partnership.background}
            alt="Summit team in a dimly lit office celebrating a strong recruiting week."
          />
          <div className="partner-diamond-content">
            <p className="eyebrow">PARTNERSHIP</p>
            <h2>{homeData.partnership.headline}</h2>
            <div className="partner-logo-grid">
              {footerData.partners.map((partner) => (
                <a
                  key={partner.id}
                  className="partner-logo-link"
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PartnerLogo
                    id={
                      partner.id as
                        | "americo"
                        | "national-life-group"
                        | "fg"
                        | "transamerica"
                        | "mutual-of-omaha"
                        | "ethos"
                    }
                  />
                </a>
              ))}
            </div>
            <a
              href={homeData.founder.followUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link-cta"
            >
              WATCH VIDEOS &gt;
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />

      <section className="stat-section">
        <div className="stat-backdrop" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <Reveal className="stat-grid">
          {homeData.stats.map((stat) => (
            <AnimatedStat key={stat.body} {...stat} />
          ))}
        </Reveal>
      </section>

      <MarqueeBand items={homeData.breakMarquee} />

      <section className="cta-band cta-band-dark">
        <p>{homeData.quarterly.caption}</p>
        <JoinTeamButton className="wide-cta">JOIN THE TEAM</JoinTeamButton>
      </section>

      <QuarterlyChart />

      <section className="mission-essay-section">
        <Reveal className="mission-essay">
          <p>{homeData.missionStatement}</p>
        </Reveal>
      </section>

      <section className="mission-split-section">
        <Reveal className="mission-split" amount={0.3}>
          <PhotoPanel
            className="mission-split-photo"
            image={homeData.missionSplit.image}
            alt={homeData.missionSplit.imageAlt}
          />

          <div className="mission-split-copy">
            <p className="eyebrow">TAKE YOUR FINANCIAL LIFE</p>
            <h2>
              {homeData.missionSplit.titlePrefix}{" "}
              <span>{homeData.missionSplit.highlight}</span>{" "}
              {homeData.missionSplit.titleSuffix}
            </h2>
            <p>{homeData.missionSplit.body}</p>
            <JoinTeamButton variant="text">JOIN TODAY.</JoinTeamButton>
          </div>
        </Reveal>
      </section>

      <TestimonialCarousel
        items={homeData.testimonials}
        eyebrow="WHY I CHOSE SUMMIT"
      />

      <section className="switcher-section">
        <Reveal className="switcher-shell">
          <PhotoPanel
            className="switcher-photo"
            image={homeData.switcher.image}
            alt={homeData.switcher.imageAlt}
          />

          <div className="switcher-copy">
            <p className="eyebrow">{homeData.switcher.eyebrow}</p>
            <h2>{homeData.switcher.title}</h2>
            <p>{homeData.switcher.body}</p>
            <div className="switcher-stat">
              <strong>{homeData.switcher.value}</strong>
              <span>{homeData.switcher.statLabel}</span>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="benefits-section">
        <Reveal className="benefits-shell">
          <PhotoPanel
            className="benefits-photo"
            image={homeData.benefits.image}
            alt={homeData.benefits.imageAlt}
          />
          <div className="benefits-copy">
            <p className="eyebrow">{homeData.benefits.eyebrow}</p>
            <h2>{homeData.benefits.title}</h2>
            <p>{homeData.benefits.body}</p>
            <div className="benefit-grid">
              {homeData.benefits.items.map((benefit) => (
                <article key={benefit}>
                  <span aria-hidden="true" />
                  <h3>{benefit}</h3>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <MarqueeBand items={homeData.valueMarquee} invert />

      <section className="cta-band">
        <JoinTeamButton className="wide-cta">JOIN THE TEAM</JoinTeamButton>
      </section>

      <section className="fast-five-section">
        <Reveal className="fast-five-shell">
          <div className="fast-five-arrow" aria-hidden="true" />
          <div className="section-intro centered">
            <p className="eyebrow">OUR SYSTEM: THE FAST FIVE</p>
            <h2>Five ways we accelerate new writers.</h2>
          </div>

          <div className="process-grid">
            {homeData.fastFive.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>

          <div className="process-cta">
            <JoinTeamButton variant="outline">JOIN THE TEAM</JoinTeamButton>
          </div>
        </Reveal>
      </section>

      <PerformanceDashboard />

      <section className="founder-section">
        <Reveal className="founder-shell">
          <PhotoPanel
            className="founder-photo"
            image={homeData.founder.image}
            alt={homeData.founder.imageAlt}
          />
          <div className="founder-copy">
            <p className="eyebrow">{homeData.founder.eyebrow}</p>
            <h2>{homeData.founder.headline}</h2>
            <p>{homeData.founder.body}</p>
            <a href={homeData.founder.followUrl} target="_blank" rel="noopener noreferrer">
              FOLLOW JAY
            </a>
          </div>
        </Reveal>
      </section>

      <section className="success-strip">
        {homeData.successKpis.map((item) => (
          <Reveal key={item.label} className="success-card" amount={0.3}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </Reveal>
        ))}
      </section>

      <TestimonialCarousel
        items={homeData.secondaryTestimonials}
        eyebrow="WHY I STAYED"
      />

      <InstagramRail />

      <PartnershipSection />

      <section className="final-cta-section">
        <Reveal className="final-cta-shell">
          <PhotoPanel
            className="final-cta-photo"
            image={homeData.finalCta.image}
            alt="Summit team gathered around a table preparing for a recruiting event."
          >
            <div className="final-cta-overlay">
              <p className="eyebrow">{homeData.finalCta.eyebrow}</p>
              <h2>JOIN THE TEAM</h2>
              <JoinTeamButton>JOIN THE TEAM</JoinTeamButton>
            </div>
          </PhotoPanel>
        </Reveal>
      </section>

      <section className="closing-quote-section">
        <Reveal className="closing-quote-shell">
          <PhotoPanel
            className="closing-quote-photo"
            image={homeData.closingQuote.image}
            alt={homeData.closingQuote.imageAlt}
          />
          <div className="closing-quote-copy">
            <blockquote>
              <span>{homeData.closingQuote.opening}</span>{" "}
              <em>{homeData.closingQuote.middle}</em>{" "}
              <span>{homeData.closingQuote.closing}</span>
            </blockquote>
            <p>{homeData.closingQuote.attribution}</p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
