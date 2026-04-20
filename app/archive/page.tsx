import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllPieces,
  getIssueNumber,
  formatDateShort,
  type Category,
} from "@/lib/pieces";
import MainNav from "@/components/MainNav";

export const metadata: Metadata = {
  title: "Archive",
  description: "Everything published in ALIMPATAKAN. Hardcore, Stroke, Quickie, Fantasy, Uncensored, Raw. All of it meant it.",
};

const CATEGORIES: Category[] = [
  "Hardcore",
  "Stroke",
  "Quickie",
  "Fantasy",
  "Uncensored",
  "Raw",
];

export default function ArchivePage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const allPieces = getAllPieces();
  const activeCategory = searchParams.category as Category | undefined;
  const filtered = activeCategory
    ? allPieces.filter((p) => p.category === activeCategory)
    : allPieces;
  const issueNumber = getIssueNumber();

  return (
    <main className="page-enter min-h-screen">

      <div className="accent-bar" />

      {/* Top Bar */}
    <MainNav />

      {/* Header */}
      <div
        style={{
          padding: "32px 24px 24px",
          borderBottom: "3px solid var(--rule)",
        }}
      >
        <p className="dateline" style={{ marginBottom: "10px" }}>
          Complete Archive
        </p>
        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: "-2px",
            color: "var(--text)",
            marginBottom: "8px",
          }}
        >
          Everything.<br />Uncut.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-ibm-plex-mono)",
            fontSize: "10px",
            color: "var(--text-muted)",
            letterSpacing: "0.1em",
            marginTop: "12px",
          }}
        >
          {allPieces.length} pieces. All of them meant it.
        </p>
      </div>

      {/* Category Filters */}
      {activeCategory && (
        <div
          style={{
            padding: "14px 24px",
            borderBottom: "0.5px solid var(--border)",
            background: "var(--surface)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-playfair)",
              fontStyle: "italic",
              fontSize: "14px",
              lineHeight: 1.6,
              color: "var(--text-muted)",
            }}
          >
            {
              {
                Hardcore: "Structured arguments, cultural dissections, and opinions you'll die on. No softening. No apologies.",
                Stroke: "Every line a brushstroke, a caress, a slow burn. Lyrical pieces that live under your skin after you've read them.",
                Quickie: "Fast, sharp, and over before you're ready. Flash fiction that hits harder than its word count has any right to.",
                Fantasy: "Invented worlds, real desires. Imaginative long-form work that goes places reality won't let you.",
                Uncensored: "The thoughts you weren't supposed to say out loud. Personal, unfiltered, and uncomfortably honest.",
                Raw: "True stories, witnessed lives, facts that need no embellishment. Reported and real — no filter, no performance.",
              }[activeCategory]
            }
          </p>
        </div>
      )}

      {/* Results count */}
      <div style={{
        padding: "10px 24px",
        borderBottom: "0.5px solid var(--border)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}>
        <span className="dateline">
          {activeCategory ? `${activeCategory} — ` : ""}{filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
        </span>
        <div style={{ flex: 1, height: "0.5px", background: "var(--border)" }} />
      </div>

      {/* Piece List */}
      <div>
        {filtered.length === 0 ? (
          <div style={{ padding: "64px 24px", textAlign: "center" }}>
            <p style={{
              fontFamily: "var(--font-playfair)",
              fontStyle: "italic",
              fontSize: "20px",
              color: "var(--text-muted)",
            }}>
              No pieces in this category yet.
            </p>
            <Link href="/archive" style={{
              display: "inline-block",
              marginTop: "16px",
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "9px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}>
              View All Pieces →
            </Link>
          </div>
        ) : (
          filtered.map((piece, i) => (
            <Link
              key={piece.slug}
              href={`/${piece.slug}`}
              className="card-hover archive-row"
            >
              <div style={{
                display: "grid",
                gridTemplateColumns: "48px 1fr auto",
                gap: "20px",
                alignItems: "start",
                padding: "20px 24px",
                borderBottom: "0.5px solid var(--border)",
              }}>
                {/* Number */}
                <span style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "var(--text-faint)",
                  paddingTop: "3px",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Main content */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
<span
                        style={{
                          fontFamily: "var(--font-ibm-plex-mono)",
                          fontSize: "8px",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "var(--accent)",
                        }}
                      >
                        {piece.category}
                      </span>
                      {piece.restricted && (
                        <span
                          style={{
                            fontFamily: "var(--font-ibm-plex-mono)",
                            fontSize: "8px",
                            letterSpacing: "0.1em",
                            color: "var(--text-faint)",
                            border: "0.5px solid var(--border)",
                            padding: "1px 6px",
                            borderRadius: "1px",
                          }}
                        >
                          🔒
                        </span>
                      )}
                    {piece.featured && (
                      <span style={{
                        fontFamily: "var(--font-ibm-plex-mono)",
                        fontSize: "7px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--bg)",
                        background: "var(--accent)",
                        padding: "1px 6px",
                        borderRadius: "1px",
                      }}>
                        Featured
                      </span>
                    )}
                  </div>
                  <h2 style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(16px, 2vw, 22px)",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    color: "var(--text)",
                    marginBottom: "6px",
                  }}>
                    {piece.title}
                  </h2>
                  <p style={{
                    fontSize: "13px",
                    lineHeight: 1.55,
                    color: "var(--text-muted)",
                  }}>
                    {piece.excerpt}
                  </p>
                </div>

                {/* Meta */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "4px",
                  minWidth: "80px",
                  paddingTop: "2px",
                }}>
                  <span className="dateline">{formatDateShort(piece.date)}</span>
                  <span className="dateline">{piece.readTime}</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" className="dateline footer-link">
          ← Front Page
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