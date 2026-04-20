import { MetadataRoute } from "next";
import { getAllPieces } from "@/lib/pieces";

export default function sitemap(): MetadataRoute.Sitemap {
  const pieces = getAllPieces();
  const baseUrl = "https://alimpatakan.vercel.app";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/archive`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

 const pieceRoutes: MetadataRoute.Sitemap = pieces.map((piece) => ({
    url: `${baseUrl}/${piece.slug}`,
    lastModified: new Date(piece.date),
    changeFrequency: "never" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...pieceRoutes];
}