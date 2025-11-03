import type { MetadataRoute } from "next";

const BASE_ADDRESS = process.env.NEXT_PUBLIC_BASE_ADDRESS;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_ADDRESS}/sitemap.xml`,
  };
}
