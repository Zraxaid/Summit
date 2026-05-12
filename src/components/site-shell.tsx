"use client";

import Link from "next/link";
import { createContext, useContext, useMemo, useState } from "react";

import { LeadModal } from "@/components/lead-modal";
import { footerData } from "@/lib/site-data";

type JoinTeamContextValue = {
  open: () => void;
  close: () => void;
};

const JoinTeamContext = createContext<JoinTeamContextValue | null>(null);

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

  const variantClassName =
    variant === "solid"
      ? "button-primary"
      : variant === "outline"
        ? "button-outline"
        : "button-text";

  return (
    <button
      type="button"
      className={`${variantClassName}${className ? ` ${className}` : ""}`}
      onClick={open}
    >
      {children}
    </button>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

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
              <p>{footerData.address}</p>
              <a href={`mailto:${footerData.email}`}>{footerData.email}</a>
              <a href={`tel:${footerData.phoneRaw}`}>{footerData.phone}</a>
            </section>
            <section>
              <h2>Follow Us</h2>
              <div className="social-row">
                {footerData.social.map((item) => (
                  <a
                    key={item.label}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                  >
                    {item.short}
                  </a>
                ))}
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
