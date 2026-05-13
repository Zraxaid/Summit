import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RecruiterPage } from "@/components/recruiter-page";
import { getAllRecruiterSlugs, getRecruiter } from "@/lib/recruiters";

export function generateStaticParams() {
  return getAllRecruiterSlugs().map((recruiter) => ({ recruiter }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ recruiter: string }>;
}): Promise<Metadata> {
  const { recruiter: slug } = await params;
  const recruiter = getRecruiter(slug);

  if (!recruiter) {
    return {};
  }

  const isPublic = recruiter.visibility === "public";

  return {
    title: recruiter.metadata.title,
    description: recruiter.metadata.description,
    alternates: { canonical: `/${recruiter.slug}` },
    robots: isPublic
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      title: recruiter.metadata.title,
      description: recruiter.metadata.description,
      url: `/${recruiter.slug}`,
      images: [{ url: `/${recruiter.slug}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: recruiter.metadata.title,
      description: recruiter.metadata.description,
      images: [`/${recruiter.slug}/opengraph-image`],
    },
  };
}

export default async function RecruiterRoute({
  params,
}: {
  params: Promise<{ recruiter: string }>;
}) {
  const { recruiter: slug } = await params;
  const recruiter = getRecruiter(slug);

  if (!recruiter) {
    notFound();
  }

  return <RecruiterPage recruiter={recruiter} />;
}
