import piecesData from "@/data/pieces.json";

// ─── Types ───────────────────────────────────────────────────────────────────

export type Category =
  | "Hardcore"
  | "Stroke"
  | "Quickie"
  | "Fantasy"
  | "Uncensored"
  | "Raw";

export type Piece = {
  slug: string;
  title: string;
  category: Category;
  date: string;
  excerpt: string;
  content: string;
  readTime: string;
  featured: boolean;
  restricted?: boolean;
  r18?: boolean;
};

// ─── Raw data cast to typed array ────────────────────────────────────────────

const allPieces = piecesData as Piece[];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Returns all pieces sorted by date, newest first.
 */
export function getAllPieces(): Piece[] {
  return [...allPieces].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Returns the single featured piece for the hero slot.
 * Falls back to the most recent piece if none is marked featured.
 */
export function getFeaturedPiece(): Piece {
  const featured = allPieces.find((p) => p.featured);
  return featured ?? getAllPieces()[0];
}

/**
 * Returns all pieces except the featured one, sorted newest first.
 * Used for the front page grid below the hero.
 */
export function getRecentPieces(limit?: number): Piece[] {
  const featured = getFeaturedPiece();
  const rest = getAllPieces().filter((p) => p.slug !== featured.slug);
  return limit ? rest.slice(0, limit) : rest;
}

/**
 * Returns a single piece by its slug.
 * Returns undefined if not found.
 */
export function getPieceBySlug(slug: string): Piece | undefined {
  return allPieces.find((p) => p.slug === slug);
}

/**
 * Returns all pieces in a given category, sorted newest first.
 */
export function getPiecesByCategory(category: Category): Piece[] {
  return getAllPieces().filter((p) => p.category === category);
}

/**
 * Returns related pieces — same category, excluding current piece.
 * Used at the bottom of individual piece pages.
 */
export function getRelatedPieces(slug: string, limit = 3): Piece[] {
  const current = getPieceBySlug(slug);
  if (!current) return [];
  return getAllPieces()
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, limit);
}

/**
 * Returns all unique categories that have at least one piece.
 */
export function getActiveCategories(): Category[] {
  const cats = allPieces.map((p) => p.category);
  const seen: Record<string, boolean> = {};
  const result: Category[] = [];
  for (const cat of cats) {
    if (!seen[cat]) {
      seen[cat] = true;
      result.push(cat);
    }
  }
  return result;
}

/**
 * Returns all slugs — used by Next.js generateStaticParams
 * to pre-render every piece page at build time.
 */
export function getAllSlugs(): string[] {
  return allPieces.map((p) => p.slug);
}

// ─── Formatters ──────────────────────────────────────────────────────────────

/**
 * Formats a date string into a readable dateline.
 * "2026-04-13" → "April 13, 2026"
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Manila",
  });
}

/**
 * Formats a date string into a short dateline.
 * "2026-04-13" → "APR 13"
 */
export function formatDateShort(dateString: string): string {
  return new Date(dateString)
    .toLocaleDateString("en-PH", {
      month: "short",
      day: "numeric",
      timeZone: "Asia/Manila",
    })
    .toUpperCase();
}

/**
 * Formats content string for display —
 * converts \n\n into paragraph breaks,
 * handles *italic* markdown,
 * handles poetry line breaks.
 */
export function formatContent(
  content: string,
  category: Category
): string {
  if (category === "Stroke") {
    return content
      .split("\n\n")
      .map((stanza) => {
        const lines = stanza
          .split("\n")
          .map((line) => formatInline(line))
          .join("<br />");
        return `<p>${lines}</p>`;
      })
      .join("");
  }

  return content
    .split("\n\n")
    .map((para) => `<p>${formatInline(para)}</p>`)
    .join("");
}

/**
 * Converts *text* to <em>text</em> for italic rendering.
 */
function formatInline(text: string): string {
  return text.replace(/\*(.*?)\*/g, "<em>$1</em>");
}

/**
 * Calculates estimated read time from content string.
 * Based on 200 words per minute average reading speed.
 */
export function calculateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

/**
 * Returns the issue number based on total piece count.
 * Every 4 pieces = 1 issue. Starts at Vol. I, No. 1.
 */
export function getIssueNumber(): string {
  const total = allPieces.length;
  const issue = Math.ceil(total / 4);
  return `VOL. I — NO. ${issue}`;
}

export function getRestrictedPieces(): Piece[] {
  return [...allPieces]
    .filter((p) => p.restricted)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getRestrictedPieceBySlug(slug: string): Piece | undefined {
  return allPieces.find((p) => p.slug === slug && p.restricted);
}