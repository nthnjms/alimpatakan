import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllPieces,
  getIssueNumber,
  formatDateShort,
  type Category,
} from "@/lib/pieces";
import DarkModeToggle from "@/components/DarkModeToggle";

export const metadata: Metadata = {
  title: "Archive",
  description: "All pieces published in ALIMPATAKAN — essays, poetry, short stories, reflections, and nonfiction.",
};

const CATEGORIES: Category[] = [
  "Essay",
  "Poetry",
  "Short Story",
  "Reflection",
  "Nonfiction",
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
      <div className="rule-thin" style={{ padding: "6px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" className="dateline" style={{ color: "var(--text-muted)" }}>
          ← ALIMPATAKAN
        </Link>
        <span style={{
          background: "var(--text)",
          color: "var(--bg)",
          fontFamily: "var(--font-ibm-plex-mono)",
          fontSize: "9px",
          letterSpacing: "0.15em",
          padding: "3px 10px",
        }}>
          {issueNumber}
        </span>
        <DarkModeToggle />
      </div>

      {/* Header */}
      <div style={{ padding: "32px 24px 24px", borderBottom: "3px solid var(--rule)" }}>
        <p className="dateline" style={{ marginBottom: "10px" }}>
          Complete Archive
        </p>
        <h1 style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(36px, 6vw, 72px)",
          fontWeight: 900,
          lineHeight: 0.9,
          letterSpacing: "-2px",
          color: "var(--text)",
          marginBottom: "8px",
        }}>
          Every Piece,<br />Every Word.
        </h1>
        <p style={{
          fontFamily: "var(--font-ibm-plex-mono)",
          fontSize: "10px",
          color: "var(--text-muted)",
          letterSpacing: "0.1em",
          marginTop: "12px",
        }}>
          {allPieces.length} pieces published
        </p>
      </div>

      {/* Category Filters */}
      <div style={{
        padding: "14px 24px",
        borderBottom: "0.5px solid var(--border)",
        display: "flex",
        gap: "8px",
        alignItems: "center",
        flexWrap: "wrap",
      }}>
        <Link
          href="/archive"
          style={{
            fontFamily: "var(--font-ibm-plex-mono)",
            fontSize: "9px",
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            padding: "5px 12px",
            border: !activeCategory
              ? "0.5px solid var(--text)"
              : "0.5px solid var(--border)",
            color: !activeCategory ? "var(--bg)" : "var(--text-muted)",
            background: !activeCategory ? "var(--text)" : "transparent",
            borderRadius: "2px",
          }}
        >
          All
        </Link>
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <Link
              key={cat}
              href={`/archive?category=${encodeURIComponent(cat)}`}
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "9px",
                letterSpacing: "0.15em",
                textTransform: "uppercase" as const,
                padding: "5px 12px",
                border: isActive
                  ? "0.5px solid var(--text)"
                  : "0.5px solid var(--border)",
                color: isActive ? "var(--bg)" : "var(--text-muted)",
                background: isActive ? "var(--text)" : "transparent",
                borderRadius: "2px",
              }}
            >
              {cat}
            </Link>
          );
        })}
      </div>

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
                    <span style={{
                      fontFamily: "var(--font-ibm-plex-mono)",
                      fontSize: "8px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                    }}>
                      {piece.category}
                    </span>
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