import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPieces, formatDateShort, type Category } from "@/lib/pieces";
import MainNav from "@/components/MainNav";
import AnimateIn from "@/components/AnimateIn";
import CategoryTooltip from "@/components/CategoryTooltip";
import { categoryToSlug } from "@/lib/categories";

const CATEGORIES: Category[] = [
  "Hardcore",
  "Stroke",
  "Quickie",
  "Fantasy",
  "Uncensored",
  "Raw",
];

const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  Hardcore: "Structured arguments, cultural dissections, and opinions you'll die on. No softening. No apologies.",
  Stroke: "Every line a brushstroke, a caress, a slow burn. Lyrical pieces that live under your skin after you've read them.",
  Quickie: "Fast, sharp, and over before you're ready. Flash fiction that hits harder than its word count has any right to.",
  Fantasy: "Invented worlds, real desires. Imaginative long-form work that goes places reality won't let you.",
  Uncensored: "The thoughts you weren't supposed to say out loud. Personal, unfiltered, and uncomfortably honest.",
  Raw: "True stories, witnessed lives, facts that need no embellishment. Reported and real — no filter, no performance.",
};

const CATEGORY_SUBHEAD: Record<Category, string> = {
  Hardcore: "Arguments. Dissections. Things said anyway.",
  Stroke: "Lyrical. Slow. Stays with you.",
  Quickie: "Short. Sharp. Over before you're ready.",
  Fantasy: "Invented worlds. Real desires.",
  Uncensored: "Unfiltered. Personal. Uncomfortable.",
  Raw: "True stories. No embellishment. No performance.",
};

const CATEGORY_COLORS: Record<Category, string> = {
  Hardcore: "#4A90D9",
  Stroke: "#9B59B6",
  Quickie: "#27AE60",
  Fantasy: "#1ABC9C",
  Uncensored: "#E67E22",
  Raw: "#E74C3C",
};

export async function generateStaticParams() {
  return CATEGORIES.map((name) => ({
    name: name.toLowerCase().replace(" ", "-"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const category = CATEGORIES.find(
    (c) => c.toLowerCase().replace(" ", "-") === params.name
  );
  if (!category) return {};
  return {
    title: `${category} — ALIMPATAKAN`,
    description: CATEGORY_DESCRIPTIONS[category],
  };
}

export default function CategoryPage({
  params,
}: {
  params: { name: string };
}) {
  const category = CATEGORIES.find(
    (c) => c.toLowerCase().replace(" ", "-") === params.name
  ) as Category | undefined;

  if (!category) notFound();

  const allPieces = getAllPieces();
  const pieces = allPieces.filter((p) => p.category === category);
  const accentColor = CATEGORY_COLORS[category];

  return (
    <main className="page-enter min-h-screen">
      <div className="accent-bar" />

      {/* Top bar */}
      <div
        className="rule-thin"
        style={{
          padding: "6px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "var(--surface)",
        }}
      >
        <Link href="/" className="dateline nav-link">
          ← ALIMPATAKAN
        </Link>
        <Link href="/archive" className="dateline nav-link">
          Archive
        </Link>
        <span className="dateline">{pieces.length} pieces</span>
      </div>

      <MainNav />

      {/* Category Header */}
      <div
        style={{
          padding: "48px 24px 40px",
          borderBottom: "3px solid var(--rule)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Large background category name */}
        <div
          style={{
            position: "absolute",
            right: "-10px",
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(80px, 15vw, 180px)",
            fontWeight: 900,
            color: "var(--text)",
            opacity: 0.03,
            letterSpacing: "-4px",
            userSelect: "none",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          {category}
        </div>

        <AnimateIn>
          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Color accent line */}
            <div
              style={{
                width: "40px",
                height: "3px",
                background: accentColor,
                marginBottom: "20px",
              }}
            />

            <p
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "9px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "12px",
              }}
            >
              Category
            </p>

            <h1
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(48px, 8vw, 96px)",
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: "-2px",
                color: "var(--text)",
                marginBottom: "20px",
              }}
            >
              {category}
            </h1>

            <p
              style={{
                fontFamily: "var(--font-playfair)",
                fontStyle: "italic",
                fontSize: "clamp(15px, 2vw, 20px)",
                lineHeight: 1.5,
                color: "var(--text-muted)",
                maxWidth: "560px",
                marginBottom: "12px",
              }}
            >
              {CATEGORY_DESCRIPTIONS[category]}
            </p>

            <p
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "9px",
                letterSpacing: "0.15em",
                color: "var(--text-faint)",
                textTransform: "uppercase",
              }}
            >
              {pieces.length} {pieces.length === 1 ? "piece" : "pieces"}
            </p>
          </div>
        </AnimateIn>
      </div>

      {/* Other categories */}
      <div
        style={{
          padding: "12px 24px",
          borderBottom: "0.5px solid var(--border)",
          display: "flex",
          gap: "8px",
          alignItems: "center",
          flexWrap: "wrap",
          background: "var(--surface)",
        }}
      >
        <span
          className="dateline"
          style={{ marginRight: "4px", color: "var(--text-faint)" }}
        >
          Also:
        </span>
        {CATEGORIES.filter((c) => c !== category).map((cat) => (
          <CategoryTooltip key={cat} category={cat}>
            <Link
              href={`/category/${categoryToSlug(cat)}`}
              className="cat-pill-link"
            >
              {cat}
            </Link>
          </CategoryTooltip>
        ))}
      </div>

      {/* Pieces list */}
      <div>
        {pieces.length === 0 ? (
          <div
            style={{
              padding: "80px 24px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-playfair)",
                fontStyle: "italic",
                fontSize: "20px",
                color: "var(--text-muted)",
                marginBottom: "16px",
              }}
            >
              Nothing here yet.
            </p>
            <p
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "10px",
                letterSpacing: "0.15em",
                color: "var(--text-faint)",
                textTransform: "uppercase",
              }}
            >
              The writer is thinking about it.
            </p>
          </div>
        ) : (
          pieces.map((piece, i) => (
            <AnimateIn key={piece.slug} delay={i * 60}>
              <Link
                href={`/${piece.slug}`}
                className="card-hover archive-row"
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "48px 1fr auto",
                    gap: "20px",
                    alignItems: "start",
                    padding: "24px 24px",
                    borderBottom: "0.5px solid var(--border)",
                  }}
                >
                  {/* Number */}
                  <span
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "var(--text-faint)",
                      paddingTop: "3px",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Main */}
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "6px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-ibm-plex-mono)",
                          fontSize: "8px",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: accentColor,
                        }}
                      >
                        {piece.category}
                      </span>
                      {piece.restricted && (
                        <span
                          style={{
                            fontFamily: "var(--font-ibm-plex-mono)",
                            fontSize: "7px",
                            color: "var(--text-faint)",
                            border: "0.5px solid var(--border)",
                            padding: "1px 4px",
                            borderRadius: "1px",
                          }}
                        >
                          🔒
                        </span>
                      )}
                      {piece.r18 && (
                        <span
                          style={{
                            fontFamily: "var(--font-ibm-plex-mono)",
                            fontSize: "7px",
                            fontWeight: 700,
                            color: "var(--bg)",
                            background: "var(--text)",
                            padding: "1px 4px",
                            borderRadius: "1px",
                          }}
                        >
                          R18
                        </span>
                      )}
                    </div>
                    <h2
                      style={{
                        fontFamily: "var(--font-playfair)",
                        fontSize: "clamp(16px, 2vw, 22px)",
                        fontWeight: 700,
                        lineHeight: 1.2,
                        color: "var(--text)",
                        marginBottom: "6px",
                      }}
                    >
                      {piece.title}
                    </h2>
                    <p
                      style={{
                        fontSize: "13px",
                        lineHeight: 1.55,
                        color: "var(--text-muted)",
                      }}
                    >
                      {piece.excerpt}
                    </p>
                  </div>

                  {/* Meta */}
                  <div
                    className="archive-meta"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: "4px",
                      minWidth: "80px",
                      paddingTop: "2px",
                    }}
                  >
                    <span className="dateline">
                      {formatDateShort(piece.date)}
                    </span>
                    <span className="dateline">{piece.readTime}</span>
                  </div>
                </div>
              </Link>
            </AnimateIn>
          ))
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "14px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "0.5px solid var(--border)",
        }}
      >
        <Link href="/archive" className="dateline footer-link">
          ← Full Archive
        </Link>
        <Link
          href="https://nthnlstudios.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="dateline footer-link"
        >
          NTHNL Studios ↗
        </Link>
      </div>

      <div className="accent-bar" />
    </main>
  );
}