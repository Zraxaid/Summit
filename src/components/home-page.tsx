"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronLeft, ChevronRight, MoveRight, Quote } from "lucide-react";
import Image from "next/image";
import { type CSSProperties, useEffect, useEffectEvent, useMemo, useRef, useState } from "react";

import {
  DirectionMarquee,
  PhotoPanel,
  Reveal,
  clamp,
  easings,
  useAnimatedNumber,
} from "@/components/motion";
import { PartnerLogo } from "@/components/partner-logos";
import { JoinTeamButton } from "@/components/site-shell";
import { siteCopy } from "@/lib/copy";
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

const successRatios = [1, 0.84, 0.93, 0.72];

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

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCompactCurrency(value: number) {
  if (value === 0) {
    return "$0";
  }

  if (value >= 1_000_000) {
    const compactValue = value / 1_000_000;
    const rounded =
      compactValue % 1 === 0 ? compactValue.toFixed(0) : compactValue.toFixed(1);
    return `$${rounded}M`;
  }

  return formatCurrency(value);
}

function formatWholeNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);
}

function AnimatedStat({ value, unit, body }: (typeof homeData.stats)[number]) {
  const { ref, value: current, done } = useAnimatedNumber(value, {
    duration: 1500,
    overshoot: 0.18,
  });

  return (
    <Reveal className="stat-card">
      <p className="stat-value">
        <span ref={ref} aria-live="polite" aria-label={`${value}${unit}`}>
          {Math.round(current)}
        </span>
        <span>{unit}</span>
        <motion.span
          className="stat-snap-arrow"
          initial={false}
          animate={done ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.7, y: 8 }}
          transition={{ duration: 0.28 }}
          aria-hidden="true"
        >
          ↗
        </motion.span>
      </p>
      <p>{body}</p>
    </Reveal>
  );
}

function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const backdropY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={heroRef} className="hero-section">
      <motion.div className="hero-backdrop" style={{ y: backdropY }}>
        <div className="hero-collage" aria-hidden="true">
          {homeData.hero.heroPhotos.map((image, index) => (
            <motion.div
              key={image}
              className={`hero-collage-card hero-collage-card-${index + 1}`}
              initial={reduceMotion ? false : { opacity: 0, y: 48, scale: 0.92 }}
              animate={reduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.18, duration: 1 }}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="(max-width: 750px) 28vw, 16vw"
                className="hero-collage-image"
              />
            </motion.div>
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
            initial={reduceMotion ? false : { opacity: 0, scale: 0.68, x: -28, y: 18 }}
            animate={reduceMotion ? {} : { opacity: 1, scale: 1, x: 0, y: 0 }}
            transition={{ duration: 1.05, delay: arrow.delay, ease: easings.smoothOut }}
          />
        ))}
      </motion.div>

      <div className="hero-content">
        <motion.div
          className="hero-mark"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={reduceMotion ? {} : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: easings.smoothOut }}
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
              transition={{ duration: 1, delay: 0.25 }}
            />
            <motion.path
              d="M76 116h52"
              fill="none"
              stroke="currentColor"
              strokeWidth="14"
              strokeLinecap="round"
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={reduceMotion ? {} : { pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.58 }}
            />
          </svg>
        </motion.div>

        <div className="hero-copy">
          <Reveal className="hero-copy-block" amount={0.45}>
            <p className="eyebrow">{siteCopy.routes.home.sections.hero.eyebrow}</p>
            <motion.h1
              initial={reduceMotion ? false : { x: 72, opacity: 0 }}
              animate={reduceMotion ? {} : { x: [72, -14, 0], opacity: 1 }}
              transition={{ duration: 0.88, times: [0, 0.72, 1], ease: easings.expoOut }}
            >
              {homeData.hero.headline}
            </motion.h1>
          </Reveal>
          <Reveal className="hero-subhead" amount={0.5} delay={0.12}>
            <p>{homeData.hero.subhead}</p>
          </Reveal>
          <Reveal className="hero-actions" amount={0.5} delay={0.2}>
            <JoinTeamButton />
            <a href="#performance" className="hero-ghost-link">
              <span>{siteCopy.routes.home.sections.hero.secondaryCtaLabel}</span>
              <MoveRight size={18} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function QuarterlyChart() {
  const reduceMotion = useReducedMotion();
  const path = useMemo(() => linePath(homeData.quarterly.values, 560, 280, 32), []);

  return (
    <section className="quarterly-section">
      <Reveal className="section-intro">
        <p className="eyebrow">{homeData.quarterly.caption}</p>
        <h2>{siteCopy.routes.home.sections.quarterlyChart.headline}</h2>
      </Reveal>
      <Reveal className="quarterly-chart-shell" amount={0.4}>
        <div className="quarterly-axis-header">
          <div className="quarterly-axis-label">{homeData.quarterly.axisLabel}</div>
          <div className="quarterly-y-values" aria-hidden="true">
            {siteCopy.routes.home.sections.quarterlyChart.yAxisValues.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
        <svg viewBox="0 0 560 280" className="quarterly-chart" aria-label="Quarterly growth chart">
          <line x1="32" y1="240" x2="528" y2="240" />
          <line x1="32" y1="24" x2="32" y2="240" />
          <motion.path
            d={path}
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0.2 }}
            whileInView={reduceMotion ? {} : { pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 1.55, ease: "easeOut" }}
          />
          {homeData.quarterly.values.map((value, index) => {
            const x = 32 + ((560 - 64) / (homeData.quarterly.values.length - 1)) * index;
            const y = 240 - ((value - 9) / (91 - 9)) * (240 - 32);

            return (
              <g key={homeData.quarterly.labels[index]}>
                <motion.circle
                  cx={x}
                  cy={y}
                  r="5"
                  initial={reduceMotion ? false : { scale: 0 }}
                  whileInView={reduceMotion ? {} : { scale: 1 }}
                  viewport={{ once: true, amount: 0.55 }}
                  transition={{ delay: 0.25 + index * 0.12, duration: 0.3 }}
                />
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

function MissionEssay() {
  const essayRef = useRef<HTMLElement>(null);
  const words = useMemo(() => homeData.missionStatement.split(" "), []);
  const { scrollYProgress } = useScroll({
    target: essayRef,
    offset: ["start 80%", "center center"],
  });
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setProgress(value);
  });

  return (
    <section ref={essayRef} className="mission-essay-section">
      <div className="mission-essay">
        <p>
          {words.map((word, index) => {
            const threshold = index / words.length;
            const acceleratedProgress = clamp(progress / 0.72, 0, 1);
            const opacity = clamp((acceleratedProgress - threshold + 0.08) * 8.5, 0.18, 1);
            const emphasis = word.toUpperCase().includes("MOMENTUM");

            return (
              <span
                key={`${word}-${index}`}
                style={{
                  opacity,
                  color: emphasis
                    ? `rgba(255, 123, 28, ${0.4 + opacity * 0.6})`
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

function DonutKpi({
  value,
  label,
  ratio,
  accent = false,
}: {
  value: string;
  label: string;
  ratio: number;
  accent?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <Reveal className="success-card" amount={0.3}>
      <div className={`donut-kpi${accent ? " accent" : ""}`}>
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="46" className="donut-track" />
          <motion.circle
            cx="60"
            cy="60"
            r="46"
            className="donut-progress"
            pathLength={ratio}
            initial={reduceMotion ? false : { pathLength: 0 }}
            whileInView={reduceMotion ? {} : { pathLength: ratio }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.15, ease: "easeOut" }}
          />
        </svg>
        <div>
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      </div>
    </Reveal>
  );
}

function SwitcherStat() {
  const target = 43;
  const ratio = target / 100;
  const reduceMotion = useReducedMotion();
  const { ref, value } = useAnimatedNumber(target, {
    duration: 1500,
    overshoot: 0.12,
  });

  return (
    <div className="switcher-stat">
      <div className="switcher-donut">
        <svg viewBox="0 0 160 160" aria-hidden="true">
          <circle cx="80" cy="80" r="58" className="donut-track" />
          <motion.circle
            cx="80"
            cy="80"
            r="58"
            className="donut-progress"
            pathLength={ratio}
            initial={reduceMotion ? false : { pathLength: 0 }}
            whileInView={reduceMotion ? {} : { pathLength: ratio }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>
        <div className="switcher-donut-copy">
          <strong ref={ref}>{Math.round(value)}%</strong>
          <span>{homeData.switcher.statLabel}</span>
        </div>
      </div>
    </div>
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
  const next = items[(index + 1) % items.length];
  const afterNext = items[(index + 2) % items.length];

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
        <div className="carousel-stack">
          <div
            className="carousel-stack-ghost carousel-stack-ghost-far"
            style={{ backgroundImage: `url(${afterNext.image})` }}
            aria-hidden="true"
          />
          <div
            className="carousel-stack-ghost carousel-stack-ghost-near"
            style={{ backgroundImage: `url(${next.image})` }}
            aria-hidden="true"
          />

          <AnimatePresence mode="wait">
            <motion.article
              key={current.name}
              className="carousel-frame"
              initial={reduceMotion ? false : { opacity: 0, rotateY: -20, rotateZ: -2, x: 48, scale: 0.96 }}
              animate={reduceMotion ? {} : { opacity: 1, rotateY: 0, rotateZ: 0, x: 0, scale: 1 }}
              exit={reduceMotion ? {} : { opacity: 0, rotateY: 20, rotateZ: 2, x: -48, scale: 0.94 }}
              transition={{ duration: 0.58, ease: easings.smoothOut }}
            >
              <motion.div
                key={`swoosh-${current.name}`}
                className="carousel-swoosh"
                initial={reduceMotion ? false : { x: "-118%", opacity: 0 }}
                animate={reduceMotion ? {} : { x: "130%", opacity: [0, 0.45, 0] }}
                transition={{ duration: 0.82, ease: "easeInOut" }}
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
                    {siteCopy.routes.home.sections.testimonialsPrimary.watchLabel}
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
        </div>

        <button
          type="button"
          className="carousel-nav carousel-nav-prev"
          aria-label="Previous slide"
          onClick={() =>
            setIndex((currentIndex) => (currentIndex - 1 + items.length) % items.length)
          }
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

function FastFiveSection() {
  const reduceMotion = useReducedMotion();
  const shellRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: shellRef,
    offset: ["start start", "end end"],
  });
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setProgress(value);
  });

  const visibleSteps = reduceMotion
    ? homeData.fastFive.length
    : Math.max(1, Math.ceil(progress * homeData.fastFive.length));

  return (
    <section ref={shellRef} className="fast-five-section fast-five-pinned">
      <div className="fast-five-scroll-space">
        <div className="fast-five-shell fast-five-sticky">
          <div className="fast-five-arrow" aria-hidden="true" />
          <div className="section-intro centered">
            <p className="eyebrow">{siteCopy.routes.home.sections.fastFive.eyebrow}</p>
            <h2>{siteCopy.routes.home.sections.fastFive.headline}</h2>
          </div>

          <div className="process-timeline" aria-hidden="true">
            <span style={{ transform: `scaleY(${reduceMotion ? 1 : progress})` }} />
          </div>

          <div className="process-grid process-grid-pinned">
            {homeData.fastFive.map((step, index) => {
              const stepProgress = reduceMotion
                ? 1
                : clamp(progress * homeData.fastFive.length - index + 0.28, 0, 1);

              return (
                <motion.article
                  key={step.number}
                  className="process-stack-card"
                  style={{ top: `${6.5 + index * 0.7}rem`, zIndex: 20 + index } as CSSProperties}
                  initial={false}
                  animate={{
                    opacity: index < visibleSteps ? 1 : 0.16,
                    y: reduceMotion ? 0 : (1 - stepProgress) * 36,
                    scale: index < visibleSteps ? 1 : 0.96,
                  }}
                  transition={{ duration: 0.42, ease: easings.smoothOut }}
                >
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </motion.article>
              );
            })}
          </div>

          <div className="process-cta">
            <JoinTeamButton variant="outline">
              {siteCopy.routes.home.sections.fastFive.ctaLabel}
            </JoinTeamButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedPerformanceKpi({
  label,
  target,
  formatter,
  accent = false,
}: {
  label: string;
  target: number;
  formatter: (value: number) => string;
  accent?: boolean;
}) {
  const { ref, value } = useAnimatedNumber(target, {
    duration: 2200,
    amount: 0.45,
  });

  return (
    <article className={`performance-kpi${accent ? " accent" : ""}`}>
      <span>{label}</span>
      <strong ref={ref}>{formatter(value)}</strong>
    </article>
  );
}

function PerformanceDashboard() {
  const reduceMotion = useReducedMotion();
  const writersPath = useMemo(() => linePath(homeData.performance.writers, 620, 320, 48), []);
  const productionPath = useMemo(
    () => linePath(homeData.performance.production, 620, 320, 48),
    [],
  );
  const pointTimings = [0.55, 0.9, 1.2];

  return (
    <section id="performance" className="performance-section">
      <Reveal className="section-intro">
        <p className="eyebrow">{homeData.performance.eyebrow}</p>
        <h2>{homeData.performance.title}</h2>
        <p>{homeData.performance.body}</p>
      </Reveal>

      <Reveal className="performance-shell" amount={0.35}>
        <div className="performance-kpis">
          <AnimatedPerformanceKpi
            label="2025 TOTAL PRODUCTION"
            target={84022378}
            formatter={formatCurrency}
            accent
          />
          <AnimatedPerformanceKpi
            label="2025 NEW WRITERS"
            target={1987}
            formatter={formatWholeNumber}
          />
          <AnimatedPerformanceKpi
            label="2024 TOTAL PRODUCTION"
            target={22800000}
            formatter={formatCompactCurrency}
          />
          <AnimatedPerformanceKpi
            label="2023 NEW WRITERS"
            target={165}
            formatter={formatWholeNumber}
          />
        </div>

        <svg viewBox="0 0 620 320" className="performance-chart" aria-label="Performance dashboard chart">
          <line x1="48" y1="268" x2="572" y2="268" />
          <line x1="48" y1="42" x2="48" y2="268" />

          <motion.path
            d={productionPath}
            className="performance-line performance-line-production"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0.24 }}
            whileInView={reduceMotion ? {} : { pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
          />
          <motion.path
            d={writersPath}
            className="performance-line performance-line-writers"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0.24 }}
            whileInView={reduceMotion ? {} : { pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 2.05, ease: "easeOut", delay: 0.05 }}
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
                <motion.circle
                  cx={x}
                  cy={yProduction}
                  r="5"
                  className="performance-point performance-point-production"
                  initial={reduceMotion ? false : { scale: 0 }}
                  whileInView={reduceMotion ? {} : { scale: 1 }}
                  viewport={{ once: true, amount: 0.55 }}
                  transition={{ delay: pointTimings[index], duration: 0.3 }}
                />
                <motion.circle
                  cx={x}
                  cy={yWriters}
                  r="5"
                  className="performance-point performance-point-writers"
                  initial={reduceMotion ? false : { scale: 0 }}
                  whileInView={reduceMotion ? {} : { scale: 1 }}
                  viewport={{ once: true, amount: 0.55 }}
                  transition={{ delay: pointTimings[index] + 0.08, duration: 0.3 }}
                />
                <text x={x} y="292" textAnchor="middle">
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
      </Reveal>

      <Reveal className="outline-band">
        <p>{siteCopy.routes.home.sections.performance.outlineLabel}</p>
        <JoinTeamButton variant="outline">
          {siteCopy.routes.home.sections.performance.ctaLabel}
        </JoinTeamButton>
      </Reveal>
    </section>
  );
}

function InstagramRail() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="instagram-section">
      <Reveal className="section-intro">
        <p className="eyebrow">{siteCopy.routes.home.sections.instagram.eyebrow}</p>
        <h2>{siteCopy.routes.home.sections.instagram.headline}</h2>
      </Reveal>

      <div className="instagram-rail">
        <div
          className="instagram-track"
          style={reduceMotion ? { animation: "none" } : undefined}
        >
          {[
            ...homeData.instagram,
            ...(reduceMotion ? [] : homeData.instagram),
          ].map((card, index) => (
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

function PartnershipSection() {
  const reduceMotion = useReducedMotion();
  const [isMobilePanel, setIsMobilePanel] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const sync = () => {
      setIsMobilePanel(mediaQuery.matches);
    };

    sync();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", sync);
      return () => mediaQuery.removeEventListener("change", sync);
    }

    mediaQuery.addListener(sync);
    return () => mediaQuery.removeListener(sync);
  }, []);

  return (
    <section className="partner-section">
      <Reveal className="partner-shell">
        <motion.div
          className={`partner-diamond${isMobilePanel ? " partner-diamond-rect" : ""}`}
          style={isMobilePanel ? { clipPath: "none" } : undefined}
          initial={
            reduceMotion || isMobilePanel
              ? false
              : { clipPath: "polygon(50% 0%, 60% 10%, 60% 100%, 40% 100%, 40% 10%)" }
          }
          whileInView={
            reduceMotion || isMobilePanel
              ? {}
              : { clipPath: "polygon(50% 0%, 100% 22%, 100% 100%, 0% 100%, 0% 22%)" }
          }
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: easings.smoothOut }}
        >
          <PhotoPanel
            className="partner-diamond-photo"
            image={homeData.partnership.background}
            alt="Summit team in a dimly lit office celebrating a strong recruiting week."
          />
          <div className="partner-diamond-content">
            <p className="eyebrow">{siteCopy.routes.home.sections.partnership.eyebrow}</p>
            <h2>{homeData.partnership.headline}</h2>
            <div className="partner-logo-grid">
              {footerData.partners.map((partner, index) => (
                <motion.a
                  key={partner.id}
                  className="partner-logo-link"
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.95 }}
                  whileInView={reduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: 0.12 + index * 0.08, duration: 0.5 }}
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
                </motion.a>
              ))}
            </div>
            <a
              href={homeData.founder.followUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link-cta"
            >
              {siteCopy.routes.home.sections.partnership.ctaLabel}
            </a>
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}

export function HomePage() {
  const reduceMotion = useReducedMotion();

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

      <DirectionMarquee items={homeData.breakMarquee} />

      <section className="cta-band cta-band-dark">
        <p>{siteCopy.routes.home.sections.firstCtaBand.caption}</p>
        <JoinTeamButton className="wide-cta">
          {siteCopy.routes.home.sections.firstCtaBand.ctaLabel}
        </JoinTeamButton>
      </section>

      <QuarterlyChart />

      <MissionEssay />

      <section className="mission-split-section">
        <Reveal className="mission-split" amount={0.3}>
          <motion.div
            className="mission-split-photo-shell"
            initial={{ clipPath: "polygon(18% 14%, 58% 0%, 86% 34%, 68% 100%, 0% 84%, 0% 32%)" }}
            whileInView={{ clipPath: "polygon(7% 0%, 100% 0%, 100% 100%, 26% 100%, 0% 76%, 0% 17%)" }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 1.1, ease: easings.smoothOut }}
          >
            <PhotoPanel
              className="mission-split-photo"
              image={homeData.missionSplit.image}
              alt={homeData.missionSplit.imageAlt}
            />
          </motion.div>

          <div className="mission-split-copy">
            <p className="eyebrow">{siteCopy.routes.home.sections.missionSplit.eyebrow}</p>
            <motion.h2
              initial={reduceMotion ? false : { x: 110, opacity: 0 }}
              whileInView={reduceMotion ? {} : { x: [110, -18, 0], opacity: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.9, times: [0, 0.75, 1], ease: easings.expoOut }}
            >
              {homeData.missionSplit.titlePrefix}{" "}
              <span>{homeData.missionSplit.highlight}</span>{" "}
              {homeData.missionSplit.titleSuffix}
            </motion.h2>
            <p>{homeData.missionSplit.body}</p>
            <JoinTeamButton variant="text">
              {siteCopy.routes.home.sections.missionSplit.ctaLabel}
            </JoinTeamButton>
          </div>
        </Reveal>
      </section>

      <TestimonialCarousel
        items={homeData.testimonials}
        eyebrow={siteCopy.routes.home.sections.testimonialsPrimary.eyebrow}
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
            <motion.h2
              initial={reduceMotion ? false : { x: -42, opacity: 0 }}
              whileInView={reduceMotion ? {} : { x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: easings.expoOut }}
            >
              {homeData.switcher.title}
            </motion.h2>
            <p>{homeData.switcher.body}</p>
            <SwitcherStat />
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
            <motion.h2
              initial={reduceMotion ? false : { x: 36, opacity: 0 }}
              whileInView={reduceMotion ? {} : { x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease: easings.expoOut }}
            >
              {homeData.benefits.title}
            </motion.h2>
            <p>{homeData.benefits.body}</p>
            <div className="benefit-grid">
              {homeData.benefits.items.map((benefit, index) => (
                <motion.article
                  key={benefit}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, x: index % 2 === 0 ? -28 : 28, y: 18 }
                  }
                  whileInView={reduceMotion ? {} : { opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                >
                  <span aria-hidden="true" />
                  <h3>{benefit}</h3>
                </motion.article>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <DirectionMarquee items={homeData.valueMarquee} invert />

      <section className="cta-band">
        <JoinTeamButton className="wide-cta">
          {siteCopy.routes.home.sections.middleCtaBand.ctaLabel}
        </JoinTeamButton>
      </section>

      <FastFiveSection />

      <PerformanceDashboard />

      <section className="founder-section">
        <Reveal className="founder-shell">
          <motion.div
            initial={{ opacity: 0, scale: 1.08 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.1, ease: easings.smoothOut }}
          >
            <PhotoPanel
              className="founder-photo"
              image={homeData.founder.image}
              alt={homeData.founder.imageAlt}
            />
          </motion.div>
          <div className="founder-copy">
            <p className="eyebrow">{homeData.founder.eyebrow}</p>
            <motion.h2
              initial={reduceMotion ? false : { x: 110, opacity: 0 }}
              whileInView={reduceMotion ? {} : { x: [110, -18, 0], opacity: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.9, times: [0, 0.75, 1], ease: easings.expoOut }}
            >
              {homeData.founder.headline}
            </motion.h2>
            <p>{homeData.founder.body}</p>
            <a href={homeData.founder.followUrl} target="_blank" rel="noopener noreferrer">
              {siteCopy.routes.home.sections.founder.ctaLabel}
            </a>
          </div>
        </Reveal>
      </section>

      <section className="success-strip">
        {homeData.successKpis.map((item, index) => (
          <DonutKpi
            key={item.label}
            value={item.value}
            label={item.label}
            ratio={successRatios[index] ?? 0.8}
            accent={index === 1}
          />
        ))}
      </section>

      <TestimonialCarousel
        items={homeData.secondaryTestimonials}
        eyebrow={siteCopy.routes.home.sections.testimonialsSecondary.eyebrow}
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
              <h2>{siteCopy.routes.home.sections.finalCta.headline}</h2>
              <JoinTeamButton>{siteCopy.routes.home.sections.finalCta.ctaLabel}</JoinTeamButton>
              <small>{siteCopy.routes.home.sections.finalCta.helper}</small>
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
            <motion.blockquote
              initial={reduceMotion ? false : { x: -34, opacity: 0 }}
              whileInView={reduceMotion ? {} : { x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.72, ease: easings.expoOut }}
            >
              <span>{homeData.closingQuote.opening}</span>{" "}
              <em>{homeData.closingQuote.middle}</em>{" "}
              <span>{homeData.closingQuote.closing}</span>
            </motion.blockquote>
            <p>{homeData.closingQuote.attribution}</p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
