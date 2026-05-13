import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.brand} — recruiting that moves.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(circle at 18% 14%, rgba(255, 123, 28, 0.32), transparent 38%), linear-gradient(180deg, #0a0b10 0%, #0f1218 100%)",
          color: "#f5f1e8",
          fontFamily: "Geist, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 16,
              border: "1px solid rgba(255, 255, 255, 0.16)",
              background:
                "linear-gradient(180deg, rgba(255, 123, 28, 0.4), rgba(255, 123, 28, 0.05))",
              fontSize: 36,
              color: "#fff",
              fontWeight: 800,
            }}
          >
            ▲
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <strong style={{ fontSize: 22, letterSpacing: 8 }}>SUMMIT</strong>
            <span
              style={{
                fontSize: 14,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#9ea5b8",
              }}
            >
              Financial Recruiting
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <span
            style={{
              fontSize: 22,
              letterSpacing: 8,
              color: "#ff7b1c",
              textTransform: "uppercase",
            }}
          >
            Recruiting that moves
          </span>
          <strong
            style={{
              fontSize: 76,
              lineHeight: 1,
              letterSpacing: -2,
              textTransform: "uppercase",
              maxWidth: 980,
            }}
          >
            Build an insurance career with real momentum.
          </strong>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 24, color: "#9ea5b8", letterSpacing: 4 }}>
            summitfinancialrecruiting.com
          </span>
          <span
            style={{
              padding: "16px 28px",
              borderRadius: 12,
              background: "#ff7b1c",
              color: "#0f1014",
              fontSize: 22,
              letterSpacing: 4,
              fontWeight: 700,
            }}
          >
            JOIN THE TEAM
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
