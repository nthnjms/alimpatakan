export const CATEGORIES = [
  "Essay",
  "Poetry",
  "Quickie",
  "Fantasy",
  "Inner Thoughts",
  "IRL",
] as const;

export type Category =
  | "Essay"
  | "Poetry"
  | "Quickie"
  | "Fantasy"
  | "Inner Thoughts"
  | "IRL";

export const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  Essay:
    "Structured arguments, cultural dissections, and opinions you'll die on. No softening. No apologies.",
  Poetry:
    "Every line a brushstroke, a caress, a slow burn. Lyrical pieces that live under your skin after you've read them.",
  Quickie:
    "Fast, sharp, and over before you're ready. Flash fiction that hits harder than its word count has any right to.",
  Fantasy:
    "Invented worlds, real desires. Imaginative long-form work that goes places reality won't let you.",
  Inner Thoughts:
    "Personal reflections, internal monologues, and unfiltered musings. Stories that live in the space between your ears.",
  IRL:
    "Real-world experiences, genuine encounters, and authentic moments. Pieces that capture life as it happens.",
};

export const CATEGORY_COLORS: Record<Category, string> = {
  Essay: "#4A90D9",
  Poetry: "#9B59B6",
  Quickie: "#27AE60",
  Fantasy: "#1ABC9C",
  Inner Thoughts: "#E67E22",
  IRL: "#E74C3C",
};

export const CATEGORY_THUMBS: Record<Category, string> = {
  Essay: "🖊️",
  Poetry: "🌿",
  Quickie: "⚡",
  Fantasy: "🌑",
  Inner Thoughts: "🪞",
  IRL: "🗂️",
};

export const CATEGORY_THUMB_CLASS: Record<Category, string> = {
  Essay: "thumb-essay",
  Poetry: "thumb-poetry",
  Quickie: "thumb-story",
  Fantasy: "thumb-fiction",
  Inner Thoughts: "thumb-reflection",
  IRL: "thumb-nonfiction",
};

/**
 * Converts a category name to a URL slug.
 * "Quickie" → "quickie"
 * "Essay" → "essay"
 */
export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/**
 * Converts a URL slug back to a category name.
 * "quickie" → "Quickie"
 * "essay" → "Essay"
 */
export function slugToCategory(slug: string): Category | undefined {
  return CATEGORIES.find(
    (c) => categoryToSlug(c) === slug
  ) as Category | undefined;
}