import type { MetadataRoute } from "next";

const BASE_ADDRESS = process.env.NEXT_PUBLIC_BASE_ADDRESS;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_ADDRESS}/`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${BASE_ADDRESS}/about`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${BASE_ADDRESS}/contact`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${BASE_ADDRESS}/features`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${BASE_ADDRESS}/pricing`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${BASE_ADDRESS}/login`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${BASE_ADDRESS}/register`,
      lastModified: new Date(),
      priority: 0.8,
    },
  ];
}
