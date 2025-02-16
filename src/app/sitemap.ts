// Sitemap Requirements
import type { MetadataRoute } from "next";
// Sitemap Main Function
export default function sitemap(): MetadataRoute.Sitemap {
  // Returns Sitemap XML File
  return [
    {
      url: "https://mateory.vercel.app",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://mateory.vercel.app/how-it-works",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: "https://mateory.vercel.app/inventory",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: "https://mateory.vercel.app/queue",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
