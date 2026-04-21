export const CATEGORIES = [
  "Hardcore",
  "Stroke",
  "Quickie",
  "Fantasy",
  "Uncensored",
  "Raw",
] as const;

export type Category =
  | "Hardcore"
  | "Stroke"
  | "Quickie"
  | "Fantasy"
  | "Uncensored"
  | "Raw";

export const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  Hardcore:
    "Structured arguments, cultural dissections, and opinions you'll die on. No softening. No apologies.",
  Stroke:
    "Every line a brushstroke, a caress, a slow burn. Lyrical pieces that live under your skin after you've read them.",
  Quickie:
    "Fast, sharp, and over before you're ready. Flash fiction that hits harder than its word count has any right to.",
  Fantasy:
    "Invented worlds, real desires. Imaginative long-form work that goes places reality won't let you.",
  Uncensored:
    "The thoughts you weren't supposed to say out loud. Personal, unfiltered, and uncomfortably honest.",
  Raw: "True stories, witnessed lives, facts that need no embellishment. Reported and real — no filter, no performance.",
};

export const CATEGORY_COLORS: Record<Category, string> = {
  Hardcore: "#4A90D9",
  Stroke: "#9B59B6",
  Quickie: "#27AE60",
  Fantasy: "#1ABC9C",
  Uncensored: "#E67E22",
  Raw: "#E74C3C",
};

export const CATEGORY_THUMBS: Record<Category, string> = {
  Hardcore: "🖊️",
  Stroke: "🌿",
  Quickie: "⚡",
  Fantasy: "🌑",
  Uncensored: "🪞",
  Raw: "🗂️",
};

export const CATEGORY_THUMB_CLASS: Record<Category, string> = {
  Hardcore: "thumb-essay",
  Stroke: "thumb-poetry",
  Quickie: "thumb-story",
  Fantasy: "thumb-fiction",
  Uncensored: "thumb-reflection",
  Raw: "thumb-nonfiction",
};

/**
 * Converts a category name to a URL slug.
 * "Short Story" → "short-story"
 * "Hardcore" → "hardcore"
 */
export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/**
 * Converts a URL slug back to a category name.
 * "short-story" → "Short Story"
 * "hardcore" → "Hardcore"
 */
export function slugToCategory(slug: string): Category | undefined {
  return CATEGORIES.find(
    (c) => categoryToSlug(c) === slug
  ) as Category | undefined;
}