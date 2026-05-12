"use client";

import { motion, useMotionValue, useScroll, useSpring } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { createContext, useContext, useMemo, useState } from "react";

import { LeadModal } from "@/components/lead-modal";
import { footerData } from "@/lib/site-data";

type JoinTeamContextValue = {
  open: () => void;
  close: () => void;
};

const JoinTeamContext = createContext<JoinTeamContextValue | null>(null);

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
  children = "JOIN THE TEAM",
  variant = "solid",
}: {
  className?: string;
  children?: React.ReactNode;
  variant?: "solid" | "outline" | "text";
}) {
  const { open } = useJoinTeamModal();
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
      onClick={open}
      onMouseMove={(event) => {
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
      {children}
    </motion.button>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.2,
  });

  const value = useMemo(
    () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [],
  );

  return (
    <JoinTeamContext.Provider value={value}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="site-frame">
        <header className="site-header">
          <motion.div className="scroll-progress" style={{ scaleX: progressScale }} />
          <Link href="/" className="brand-mark" aria-label="Summit home">
            <span className="brand-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="brand-copy">
              <strong>SUMMIT</strong>
              <span>Financial Recruiting</span>
            </span>
          </Link>
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
              <strong>SUMMIT</strong>
              <span>Financial Recruiting</span>
            </div>
          </div>

          <div className="footer-grid">
            <section>
              <h2>Contact Info</h2>
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
              <h2>Follow Us</h2>
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
              <h2>Our Partners</h2>
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
            <span>© 2026 Summit Financial Recruiting</span>
            <Link href="/terms-of-use">Terms of Use</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </div>
        </footer>
      </div>

      <LeadModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </JoinTeamContext.Provider>
  );
}
