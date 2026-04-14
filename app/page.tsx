import Link from "next/link";
import type { Metadata } from "next";
import {
  getFeaturedPiece,
  getRecentPieces,
  getIssueNumber,
  formatDate,
  formatDateShort,
} from "@/lib/pieces";
import DarkModeToggle from "@/components/DarkModeToggle";

export const metadata: Metadata = {
  title: "ALIMPATAKAN",
  description:
    "A personal literary publication by Nathaniel. Essays, poetry, short stories, and reflections from a creative director in Leyte.",
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

      {/* Accent Bar Top */}
      <div className="accent-bar" />

      {/* Top Bar */}
      <div className="rule-thin" style={{ padding: "6px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="dateline">Leyte, Philippines</span>
        <nav style={{ display: "flex", gap: "20px" }}>
          {["Essay", "Poetry", "Short Story", "Reflection", "Nonfiction"].map((cat) => (
            <Link
              key={cat}
              href={`/archive?category=${encodeURIComponent(cat)}`}
              className="dateline top-cat-link"
            >
              {cat}
            </Link>
          ))}
        </nav>
        <span className="dateline" style={{ display: "none" }}>{today}</span>
      </div>

      {/* Masthead */}
      <div style={{ padding: "20px 24px 16px", textAlign: "center", borderBottom: "3px solid var(--rule)" }}>
        <p className="dateline" style={{ marginBottom: "8px" }}>
          An independent literary publication
        </p>
        <h1 style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(48px, 10vw, 108px)",
          fontWeight: 900,
          lineHeight: 0.88,
          letterSpacing: "-3px",
          color: "var(--text)",
          margin: 0,
        }}>
          ALIMPATAKAN
        </h1>
        <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="dateline">by NJ Toñacao of NTHNL Studios</span>
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
          <span className="dateline">Est. MMXVI</span>
        </div>
      </div>

      {/* Nav */}
      <div className="rule-thin" style={{ padding: "10px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <nav style={{ display: "flex", gap: "24px" }}>
          {[
            { label: "Front Page", href: "/" },
            { label: "Archive", href: "/archive" },
            { label: "About", href: "/about" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
        <DarkModeToggle />
      </div>

      {/* Hero */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", borderBottom: "0.5px solid var(--border)" }}>

        {/* Hero Main */}
        <div style={{ padding: "32px 32px 28px", borderRight: "0.5px solid var(--border)" }}>
          <div className="label-accent" style={{ marginBottom: "14px" }}>
            {featured.category}
          </div>
          <Link href={`/${featured.slug}`} className="hero-headline-link">
            <h2 style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-1px",
              color: "var(--text)",
              marginBottom: "16px",
            }}>
              {featured.title}
            </h2>
          </Link>
          <p style={{
            fontFamily: "var(--font-playfair)",
            fontStyle: "italic",
            fontSize: "16px",
            lineHeight: 1.65,
            color: "var(--text-muted)",
            marginBottom: "20px",
            maxWidth: "560px",
          }}>
            {featured.excerpt}
          </p>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <span className="dateline">By Nathan</span>
            <span className="dateline">·</span>
            <span className="dateline">{formatDate(featured.date)}</span>
            <span className="dateline">·</span>
            <span className="dateline">{featured.readTime}</span>
          </div>
          <Link href={`/${featured.slug}`} className="read-link">
            Read Piece →
          </Link>
        </div>

        {/* Hero Sidebar */}
        <div style={{ padding: "32px 24px" }}>
          <p className="dateline" style={{ marginBottom: "16px" }}>In This Issue</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {recent.slice(0, 4).map((piece, i) => (
              <Link
                key={piece.slug}
                href={`/${piece.slug}`}
                className="card-hover sidebar-card"
              >
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "var(--border-strong)",
                    lineHeight: 1,
                    minWidth: "28px",
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p style={{
                      fontFamily: "var(--font-ibm-plex-mono)",
                      fontSize: "8px",
                      letterSpacing: "0.2em",
                      color: "var(--accent)",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}>
                      {piece.category}
                    </p>
                    <p style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "14px",
                      fontWeight: 700,
                      lineHeight: 1.2,
                      color: "var(--text)",
                      marginBottom: "4px",
                    }}>
                      {piece.title}
                    </p>
                    <p style={{
                      fontFamily: "var(--font-ibm-plex-mono)",
                      fontSize: "9px",
                      color: "var(--text-muted)",
                    }}>
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
      </div>

      {/* Section Label */}
      <div style={{ padding: "10px 24px", borderBottom: "0.5px solid var(--border)", display: "flex", alignItems: "center", gap: "12px" }}>
        <span className="dateline">Recent Pieces</span>
        <div style={{ flex: 1, height: "0.5px", background: "var(--border)" }} />
      </div>

      {/* Article Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderBottom: "0.5px solid var(--border)" }}>
        {recent.slice(0, 3).map((piece, i) => (
          <Link
            key={piece.slug}
            href={`/${piece.slug}`}
            className="card-hover article-card"
            style={{ borderRight: i < 2 ? "0.5px solid var(--border)" : "none" }}
          >
            <div style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "32px",
              fontWeight: 700,
              color: "var(--border-strong)",
              lineHeight: 1,
              marginBottom: "12px",
            }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <p style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "8px",
              letterSpacing: "0.2em",
              color: "var(--accent)",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}>
              {piece.category}
            </p>
            <h3 style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "18px",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "var(--text)",
              marginBottom: "10px",
            }}>
              {piece.title}
            </h3>
            <p style={{
              fontSize: "13px",
              lineHeight: 1.6,
              color: "var(--text-muted)",
              marginBottom: "14px",
            }}>
              {piece.excerpt}
            </p>
            <p style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "9px",
              color: "var(--text-muted)",
            }}>
              {formatDateShort(piece.date)} · {piece.readTime}
            </p>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="dateline">ALIMPATAKAN — A personal literary publication</span>
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