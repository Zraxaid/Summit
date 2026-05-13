import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";

import { getAllRecruiterSlugs, getRecruiter } from "@/lib/recruiters";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllRecruiterSlugs().map((recruiter) => ({ recruiter }));
}

export default async function RecruiterOgImage({
  params,
}: {
  params: Promise<{ recruiter: string }>;
}) {
  const { recruiter: slug } = await params;
  const recruiter = getRecruiter(slug);

  if (!recruiter) {
    notFound();
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "radial-gradient(circle at 18% 14%, rgba(255, 123, 28, 0.32), transparent 38%), linear-gradient(180deg, #0a0b10 0%, #0f1218 100%)",
          color: "#f5f1e8",
          fontFamily: "Geist, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 56,
            left: 72,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 12,
              border: "1px solid rgba(255, 255, 255, 0.16)",
              background:
                "linear-gradient(180deg, rgba(255, 123, 28, 0.4), rgba(255, 123, 28, 0.05))",
              fontSize: 28,
              color: "#fff",
              fontWeight: 800,
            }}
          >
            ▲
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <strong style={{ fontSize: 18, letterSpacing: 6 }}>SUMMIT</strong>
            <span
              style={{
                fontSize: 12,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#9ea5b8",
              }}
            >
              Financial Recruiting
            </span>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 72,
            top: 72,
            bottom: 72,
            width: 360,
            display: "flex",
            borderRadius: 24,
            border: "1px solid rgba(255, 255, 255, 0.16)",
            overflow: "hidden",
            backgroundImage: `url(${recruiter.portrait.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "0 30px 80px rgba(0, 0, 0, 0.35)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 72,
            bottom: 96,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            maxWidth: 660,
          }}
        >
          <span
            style={{
              fontSize: 20,
              letterSpacing: 8,
              color: "#ff7b1c",
              textTransform: "uppercase",
            }}
          >
            Recruiting at Summit
          </span>
          <strong
            style={{
              fontSize: 84,
              lineHeight: 1,
              letterSpacing: -2,
              textTransform: "uppercase",
            }}
          >
            {recruiter.name}
          </strong>
          <span
            style={{
              fontSize: 22,
              letterSpacing: 3,
              color: "#9ea5b8",
              textTransform: "uppercase",
            }}
          >
            {recruiter.role}
            {recruiter.city ? ` · ${recruiter.city}` : ""}
          </span>
        </div>

        <span
          style={{
            position: "absolute",
            left: 72,
            bottom: 48,
            fontSize: 16,
            letterSpacing: 4,
            color: "#9ea5b8",
          }}
        >
          summitfinancialrecruiting.com/{recruiter.slug}
        </span>
      </div>
    ),
    { ...size },
  );
}
