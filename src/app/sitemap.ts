import type { MetadataRoute } from "next";

import { getPublicRecruiters } from "@/lib/recruiters";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const recruiterEntries: MetadataRoute.Sitemap = getPublicRecruiters().map((recruiter) => ({
    url: `${siteConfig.url}/${recruiter.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: `${siteConfig.url}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...recruiterEntries,
    {
      url: `${siteConfig.url}/terms-of-use`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteConfig.url}/privacy-policy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
