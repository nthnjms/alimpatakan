import Link from "next/link";
import type { Metadata } from "next";
import {
  getFeaturedPiece,
  getRecentPieces,
  getIssueNumber,
  formatDate,
  formatDateShort,
} from "@/lib/pieces";
import LiveClock from "@/components/LiveClock";
import Logo from "@/components/Logo";
import QuoteCard from "@/components/QuoteCard";
import AnimateIn from "@/components/AnimateIn";
import Ticker from "@/components/Ticker";
import MainNav from "@/components/MainNav";
import CategoryTooltip from "@/components/CategoryTooltip";
import WordCard from "@/components/WordCard";

export const metadata: Metadata = {
  title: "ALIMPATAKAN",
  description:
    "A personal literary publication by Nathaniel James Toñacao. Hardcore, Stroke, Quickie, Fantasy, Uncensored, Raw — writing that doesn't apologize.",
};

const CATEGORY_THUMBS: Record<string, string> = {
  Hardcore: "🖊️",
  Stroke: "🌿",
  Quickie: "⚡",
  Fantasy: "🌑",
  Uncensored: "🪞",
  Raw: "🗂️",
};

const CATEGORY_THUMB_CLASS: Record<string, string> = {
  Hardcore: "thumb-essay",
  Stroke: "thumb-poetry",
  Quickie: "thumb-story",
  Fantasy: "thumb-fiction",
  Uncensored: "thumb-reflection",
  Raw: "thumb-nonfiction",
};

const CATEGORY_COLORS: Record<string, string> = {
  Hardcore: "#4A90D9",
  Stroke: "#9B59B6",
  Quickie: "#27AE60",
  Fantasy: "#1ABC9C",
  Uncensored: "#E67E22",
  Raw: "#E74C3C",
};

export default function HomePage() {
  const featured = getFeaturedPiece();
  const recent = getRecentPieces(5);
  const issueNumber = getIssueNumber();
  const today = new Date().toLocaleDateString("en-PH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Manila",
  });

  return (
    <main className="page-enter min-h-screen">

      <div className="accent-bar-animated" />

      {/* Ticker */}
      <Ticker
        items={recent.map((p) => ({
          title: p.title,
          slug: p.slug,
          category: p.category,
        }))}
      />

      {/* Top Bar */}
      <div
        className="rule-thin top-bar"
        style={{
          padding: "5px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "var(--surface)",
        }}
      >
        <div className="left-info">
        <span className="dateline">Leyte, PH </span>
        <div className="hidden md:inline">
          <LiveClock />
        </div>
        </div>
        <nav className="top-bar-nav" style={{ display: "flex", gap: "20px" }}>
          {["Hardcore", "Stroke", "Quickie", "Fantasy", "Uncensored", "Raw"].map(
            (cat) => (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase().replace(" ", "-")}`}
                className="dateline top-cat-link"
              >
                {cat}
              </Link>
            )
          )}
        </nav>
        <span className="dateline">{today}</span>
      </div>

      {/* Masthead */}
      <div
        style={{
          padding: "20px 24px 0px",
          textAlign: "center",
          borderBottom: "3px solid var(--rule)",
        }}
      >
        <AnimateIn>
          <Logo />
        </AnimateIn>

        <div
          className="masthead-sub-row"
          style={{
            marginTop: "10px",
            padding: "8px 0",
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            borderTop: "0.5px solid var(--border)",
          }}
        >
          <span className="dateline" style={{ textAlign: "left" }}>
            By NJ Toñacao
          </span>
          <span
            style={{
              background: "var(--text)",
              color: "var(--bg)",
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "9px",
              letterSpacing: "0.15em",
              padding: "3px 14px",
              whiteSpace: "nowrap",
            }}
          >
            {issueNumber}
          </span>
          <span className="dateline" style={{ textAlign: "right" }}>
            Est. MMXVI
          </span>
        </div>
      </div>

      {/* Nav */}
      <MainNav />

      {/* Hero */}
      <div
        className="hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 280px",
          borderBottom: "0.5px solid var(--border)",
        }}
      >
        {/* Hero Main */}
        <AnimateIn delay={100}>
          <div
            className="hero-main"
            style={{
              padding: "32px 32px 28px",
              borderRight: "0.5px solid var(--border)",
            }}
          >
            {/* Hero Thumbnail */}
            <div
              className={`hero-thumb ${CATEGORY_THUMB_CLASS[featured.category] ?? "thumb-essay"}`}
              style={{
                width: "100%",
                height: "240px",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                borderRadius: "1px",
              }}
            >
              <span className="thumb-glyph">
                {CATEGORY_THUMBS[featured.category] ?? "✍️"}
              </span>
              {/* Grain overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")",
                  opacity: 0.4,
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  background: CATEGORY_COLORS[featured.category] ?? "var(--accent)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: "7px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  border: "0.5px solid rgba(255,255,255,0.15)",
                  padding: "3px 8px",
                }}
              >
                {featured.category}
              </div>
            </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
            <CategoryTooltip category={featured.category}>
              <div className="label-accent" style={{ margin: 0 }}>
                {featured.category}
              </div>
            </CategoryTooltip>
            {featured.restricted && (
              <span style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "8px",
                color: "var(--text-faint)",
                border: "0.5px solid var(--border)",
                padding: "2px 6px",
                borderRadius: "1px",
              }}>
                🔒
              </span>
            )}
            {featured.r18 && (
              <span style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "8px",
                fontWeight: 700,
                letterSpacing: "0.05em",
                color: "var(--bg)",
                background: "var(--text)",
                padding: "2px 6px",
                borderRadius: "1px",
              }}>
                R18
              </span>
            )}
          </div>

            <Link href={`/${featured.slug}`} className="hero-headline-link">
              <h2
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(24px, 4vw, 48px)",
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: "-1px",
                  color: "var(--text)",
                  marginBottom: "16px",
                }}
              >
                {featured.title}
              </h2>
            </Link>

            <p
              style={{
                fontFamily: "var(--font-playfair)",
                fontStyle: "italic",
                fontSize: "16px",
                lineHeight: 1.65,
                color: "var(--text-muted)",
                marginBottom: "20px",
                maxWidth: "560px",
              }}
            >
              {featured.excerpt}
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span className="dateline">By NJ Toñacao</span>
              <span className="dateline">·</span>
              <span className="dateline">{formatDate(featured.date)}</span>
              <span className="dateline">·</span>
              <span className="dateline">{featured.readTime}</span>
            </div>

            <Link href={`/${featured.slug}`} className="read-link">
              Read Piece →
            </Link>
          </div>
        </AnimateIn>

        {/* Hero Sidebar */}
        <AnimateIn delay={200} direction="right">
          <div className="hero-sidebar" style={{ padding: "32px 24px" }}>
            <p
              className="dateline"
              style={{ marginBottom: "16px", color: "var(--text-muted)" }}
            >
              In This Issue
            </p>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {recent.slice(0, 4).map((piece, i) => (
                <Link
                  key={piece.slug}
                  href={`/${piece.slug}`}
                  className="card-hover sidebar-card"
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      className={`sidebar-thumb ${CATEGORY_THUMB_CLASS[piece.category] ?? "thumb-essay"}`}
                      style={{
                        width: "44px",
                        height: "44px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        fontSize: "18px",
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: "1px",
                      }}
                    >
                      <span style={{ opacity: 0.5 }}>
                        {CATEGORY_THUMBS[piece.category] ?? "✍️"}
                      </span>
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: "2px",
                          background:
                            CATEGORY_COLORS[piece.category] ?? "var(--accent)",
                        }}
                      />
                    </div>
                    <div>
                    <div style={{ display: "flex", gap: "6px", alignItems: "center", marginBottom: "4px" }}>
                      <CategoryTooltip category={piece.category}>
                        <p
                          style={{
                            fontFamily: "var(--font-ibm-plex-mono)",
                            fontSize: "8px",
                            letterSpacing: "0.2em",
                            color: "var(--accent)",
                            textTransform: "uppercase",
                          }}
                        >
                          {piece.category}
                        </p>
                      </CategoryTooltip>
                      {piece.restricted && (
                        <span style={{
                          fontFamily: "var(--font-ibm-plex-mono)",
                          fontSize: "7px",
                          color: "var(--text-faint)",
                          border: "0.5px solid var(--border)",
                          padding: "1px 4px",
                          borderRadius: "1px",
                        }}>
                          🔒
                        </span>
                      )}
                      {piece.r18 && (
                        <span style={{
                          fontFamily: "var(--font-ibm-plex-mono)",
                          fontSize: "7px",
                          fontWeight: 700,
                          letterSpacing: "0.05em",
                          color: "var(--bg)",
                          background: "var(--text)",
                          padding: "1px 4px",
                          borderRadius: "1px",
                        }}>
                          R18
                        </span>
                      )}
                    </div>
                      <p
                        style={{
                          fontFamily: "var(--font-playfair)",
                          fontSize: "14px",
                          fontWeight: 700,
                          lineHeight: 1.2,
                          color: "var(--text)",
                          marginBottom: "4px",
                        }}
                      >
                        {piece.title}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-ibm-plex-mono)",
                          fontSize: "9px",
                          color: "var(--text-muted)",
                        }}
                      >
                        {formatDateShort(piece.date)} · {piece.readTime}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <Link href="/archive" className="archive-link">
              View Full Archive →
            </Link>
          </div>
        </AnimateIn>
      </div>

      {/* Quote + Word Row */}
      <AnimateIn delay={100}>
        <div className="quote-word-grid">
          <QuoteCard />
          <WordCard />
        </div>
      </AnimateIn>

      {/* Section Label */}
      <div
        style={{
          padding: "10px 24px",
          borderBottom: "0.5px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span className="dateline">Recent Pieces</span>
        <div
          style={{ flex: 1, height: "0.5px", background: "var(--border)" }}
        />
      </div>

      {/* Article Grid */}
      <div
        className="article-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          borderBottom: "0.5px solid var(--border)",
        }}
      >
        {recent.slice(0, 3).map((piece, i) => (
          <AnimateIn key={piece.slug} delay={i * 100} direction="up">
            <Link
              href={`/${piece.slug}`}
              className="card-hover card-lift article-card"
              style={{
                borderRight: i < 2 ? "0.5px solid var(--border)" : "none",
                display: "block",
              }}
            >
              {/* Card Thumbnail */}
              <div
                className={CATEGORY_THUMB_CLASS[piece.category] ?? "thumb-essay"}
                style={{
                  width: "100%",
                  height: "160px",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "1px",
                }}
              >
                <span
                  style={{
                    fontSize: "48px",
                    opacity: 0.15,
                    filter: "blur(1px)",
                  }}
                >
                  {CATEGORY_THUMBS[piece.category] ?? "✍️"}
                </span>
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    display: "flex",
                    gap: "4px",
                    alignItems: "center",
                  }}
                >
                  <CategoryTooltip category={piece.category}>
                    <span style={{
                      fontFamily: "var(--font-ibm-plex-mono)",
                      fontSize: "7px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.6)",
                      border: "0.5px solid rgba(255,255,255,0.15)",
                      padding: "2px 6px",
                    }}>
                      {piece.category}
                    </span>
                  </CategoryTooltip>
                {piece.restricted && (
                  <span style={{
                    fontFamily: "var(--font-ibm-plex-mono)",
                    fontSize: "7px",
                    color: "rgba(255,255,255,0.6)",
                    border: "0.5px solid rgba(255,255,255,0.15)",
                    padding: "2px 5px",
                  }}>
                    🔒
                  </span>
                )}
                {piece.r18 && (
                  <span style={{
                    fontFamily: "var(--font-ibm-plex-mono)",
                    fontSize: "7px",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    color: "rgba(0,0,0,0.8)",
                    background: "rgba(255,255,255,0.85)",
                    padding: "2px 5px",
                  }}>
                    R18
                  </span>
                )}
              </div>
              </div>

              <div
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "28px",
                  fontWeight: 700,
                  color: "var(--border-strong)",
                  lineHeight: 1,
                  marginBottom: "10px",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "18px",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: "var(--text)",
                  marginBottom: "10px",
                }}
              >
                {piece.title}
              </h3>

              <p
                style={{
                  fontSize: "13px",
                  lineHeight: 1.6,
                  color: "var(--text-muted)",
                  marginBottom: "14px",
                }}
              >
                {piece.excerpt}
              </p>

              <p
                style={{
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: "9px",
                  color: "var(--text-muted)",
                }}
              >
                {formatDateShort(piece.date)} · {piece.readTime}
              </p>
            </Link>
          </AnimateIn>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "14px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <span className="dateline">
          ALIMPATAKAN — A personal literary publication
        </span>
        <Link
          href="https://nthnlstudios.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="dateline footer-link"
        >
          NTHNL Studios ↗
        </Link>
      </div>

      <div className="accent-bar-animated" />
    </main>
  );
}