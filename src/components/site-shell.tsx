"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { LeadModal } from "@/components/lead-modal";
import { siteCopy } from "@/lib/copy";
import { getRecruiter } from "@/lib/recruiters";
import { footerData } from "@/lib/site-data";

function deriveRecruiterFromPath(pathname: string | null): RecruiterContextValue | null {
  if (!pathname) {
    return null;
  }

  const slug = pathname.split("/").filter(Boolean)[0];

  if (!slug) {
    return null;
  }

  const recruiter = getRecruiter(slug);

  if (!recruiter) {
    return null;
  }

  return {
    slug: recruiter.slug,
    name: recruiter.name,
    ctaLabel: "APPLY TO MY TEAM",
  };
}

type JoinTeamContextValue = {
  open: (trigger?: HTMLElement | null, recruiterSlug?: string | null) => void;
  close: () => void;
};

const JoinTeamContext = createContext<JoinTeamContextValue | null>(null);

export type RecruiterContextValue = {
  slug: string;
  name: string;
  ctaLabel: string;
};

const RecruiterContext = createContext<RecruiterContextValue | null>(null);

export function useRecruiterContext(): RecruiterContextValue | null {
  return useContext(RecruiterContext);
}

function InstagramGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width={size} height={size}>
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="4.5"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
    </svg>
  );
}

function LinkedinGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width={size} height={size}>
      <rect x="4" y="8" width="3" height="12" fill="currentColor" />
      <circle cx="5.5" cy="5.5" r="1.5" fill="currentColor" />
      <path
        d="M10 8h3v1.8c.6-1 1.7-2.2 4-2.2 3 0 4 1.8 4 5.2V20h-3v-6.3c0-1.8-.4-3.2-2.3-3.2-1.8 0-2.7 1.2-2.7 3.2V20h-3V8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TiktokGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width={size} height={size}>
      <path
        d="M14 3c.6 2 1.8 3.4 4 4.1V10a7.4 7.4 0 0 1-4-1.2v6.1a5.2 5.2 0 1 1-4.4-5.1v2.8a2.4 2.4 0 1 0 1.6 2.3V3H14Z"
        fill="currentColor"
      />
    </svg>
  );
}

const socialIcons = {
  instagram: InstagramGlyph,
  linkedin: LinkedinGlyph,
  tiktok: TiktokGlyph,
} as const;

export function useJoinTeamModal() {
  const context = useContext(JoinTeamContext);

  if (!context) {
    throw new Error("useJoinTeamModal must be used within SiteShell");
  }

  return context;
}

export function JoinTeamButton({
  className,
  children,
  variant = "solid",
}: {
  className?: string;
  children?: React.ReactNode;
  variant?: "solid" | "outline" | "text";
}) {
  const { open } = useJoinTeamModal();
  const recruiter = useRecruiterContext();
  const resolvedLabel = children ?? recruiter?.ctaLabel ?? "JOIN THE TEAM";
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const x = useSpring(magneticX, { stiffness: 260, damping: 18 });
  const y = useSpring(magneticY, { stiffness: 260, damping: 18 });

  const variantClassName =
    variant === "solid"
      ? "button-primary"
      : variant === "outline"
        ? "button-outline"
        : "button-text";

  return (
    <motion.button
      type="button"
      className={`${variantClassName}${className ? ` ${className}` : ""}`}
      onClick={(event) => open(event.currentTarget, recruiter?.slug ?? null)}
      onMouseMove={(event) => {
        event.currentTarget.style.setProperty("--pointer-x", `${event.nativeEvent.offsetX}px`);
        event.currentTarget.style.setProperty("--pointer-y", `${event.nativeEvent.offsetY}px`);

        if (variant !== "solid") {
          return;
        }

        const bounds = event.currentTarget.getBoundingClientRect();
        const relativeX = event.clientX - bounds.left - bounds.width / 2;
        const relativeY = event.clientY - bounds.top - bounds.height / 2;
        magneticX.set(relativeX * 0.08);
        magneticY.set(relativeY * 0.08);
      }}
      onMouseLeave={() => {
        magneticX.set(0);
        magneticY.set(0);
      }}
      style={variant === "solid" ? { x, y } : undefined}
      whileTap={variant === "solid" ? { scale: 0.98 } : undefined}
    >
      {resolvedLabel}
    </motion.button>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentRecruiter = useMemo(() => deriveRecruiterFromPath(pathname), [pathname]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCondensed, setIsCondensed] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [lastTrigger, setLastTrigger] = useState<HTMLElement | null>(null);
  const [activeRecruiter, setActiveRecruiter] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.2,
  });
  const markerLeft = useTransform(scrollYProgress, (value) => `${value * 100}%`);

  const value = useMemo(
    () => ({
      open: (trigger?: HTMLElement | null, recruiterSlug?: string | null) => {
        setLastTrigger(trigger ?? null);
        setActiveRecruiter(recruiterSlug ?? null);
        setIsOpen(true);
      },
      close: () => setIsOpen(false),
    }),
    [],
  );

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setIsComplete(value > 0.985);
  });

  useEffect(() => {
    const updateCondensed = () => {
      setIsCondensed(window.scrollY > 80);
    };

    updateCondensed();
    window.addEventListener("scroll", updateCondensed, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateCondensed);
    };
  }, []);

  return (
    <RecruiterContext.Provider value={currentRecruiter}>
      <JoinTeamContext.Provider value={value}>
        <a className="skip-link" href="#main-content">
          {siteCopy.global.header.skipLinkLabel}
        </a>
        <div className="site-frame">
          <header
            className={`site-header${isCondensed ? " is-condensed" : ""}${isComplete ? " is-complete" : ""}${currentRecruiter ? " has-recruiter" : ""}`}
          >
            <motion.div className="scroll-progress" style={{ scaleX: progressScale }} />
            <motion.div className="scroll-progress-marker" style={{ left: markerLeft }} />
            <Link href="/" className="brand-mark" aria-label={siteCopy.global.header.homeAriaLabel}>
              <span className="brand-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span className="brand-copy">
                <strong>{siteCopy.global.header.brandLine1}</strong>
                <span>{siteCopy.global.header.brandLine2}</span>
              </span>
            </Link>
            {currentRecruiter ? (
              <span className="recruiter-chip" aria-label={`Recruiting with ${currentRecruiter.name}`}>
                <span className="recruiter-chip-eyebrow">RECRUITING WITH</span>
                <strong>{currentRecruiter.name}</strong>
              </span>
            ) : null}
            <JoinTeamButton className="header-cta" />
          </header>

        <main id="main-content" className="site-main">
          {children}
        </main>

        <footer className="site-footer">
          <div className="footer-logo">
            <span className="brand-icon footer-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <div className="footer-logo-copy">
              <strong>{siteCopy.global.header.brandLine1}</strong>
              <span>{siteCopy.global.header.brandLine2}</span>
            </div>
          </div>

          <div className="footer-grid">
            <section>
              <h2>{siteCopy.global.footer.contactHeading}</h2>
              <a className="footer-detail" href={`tel:${footerData.phoneRaw}`}>
                <Phone size={18} />
                <span>{footerData.phone}</span>
              </a>
              <a className="footer-detail" href={`mailto:${footerData.email}`}>
                <Mail size={18} />
                <span>{footerData.email}</span>
              </a>
              <div className="footer-detail">
                <MapPin size={18} />
                <span>{footerData.address}</span>
              </div>
            </section>

            <section>
              <h2>{siteCopy.global.footer.followHeading}</h2>
              <div className="social-row">
                {footerData.social.map((item) => {
                  const Icon = socialIcons[item.id as keyof typeof socialIcons];

                  return (
                    <a
                      key={item.label}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </section>

            <section>
              <h2>{siteCopy.global.footer.partnersHeading}</h2>
              <div className="partner-list">
                {footerData.partners.map((partner) => (
                  <a
                    key={partner.name}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {partner.name}
                  </a>
                ))}
              </div>
            </section>
          </div>

          <div className="footer-legal">
            <span>{siteCopy.global.footer.copyrightLine}</span>
            <Link href="/terms-of-use">{siteCopy.global.footer.legalLinks[0]}</Link>
            <Link href="/privacy-policy">{siteCopy.global.footer.legalLinks[1]}</Link>
          </div>
        </footer>
      </div>

        <LeadModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          returnFocusTarget={lastTrigger}
          recruiterSlug={activeRecruiter}
        />
      </JoinTeamContext.Provider>
    </RecruiterContext.Provider>
  );
}
