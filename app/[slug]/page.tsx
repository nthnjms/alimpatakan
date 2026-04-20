import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPieceBySlug,
  getRelatedPieces,
  getAllSlugs,
  getAllPieces,
  formatDate,
  formatContent,
} from "@/lib/pieces";
import MainNav from "@/components/MainNav";
import ReadingProgress from "@/components/ReadingProgress";
import LockedContent from "@/components/LockedContent";
import R18Gate from "@/components/R18Gate";

export async function generateStaticParams() {
  return getAllPieces().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const piece = getPieceBySlug(params.slug);
  if (!piece) return {};
  return {
    title: piece.title,
    description: piece.excerpt,
    openGraph: {
      title: piece.title,
      description: piece.excerpt,
      type: "article",
      publishedTime: piece.date,
    },
  };
}

export default function PiecePage({
  params,
}: {
  params: { slug: string };
}) {
  const piece = getPieceBySlug(params.slug);
  if (!piece) notFound();

  const related = getRelatedPieces(params.slug, 3);
  const formattedContent = formatContent(piece.content, piece.category);
  const isPoetry = piece.category === "Stroke";

  return (
    <main className="page-enter min-h-screen">
      <ReadingProgress />
      <div className="accent-bar" />

      {/* Top Bar */}
    <MainNav />

      {/* Article Header — always visible */}
      <div
        className="piece-header"
        style={{
          padding: "48px 24px 36px",
          borderBottom: "3px solid var(--rule)",
          maxWidth: "860px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Category + lock badge */}
<div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <div className="label-accent">{piece.category}</div>
          {piece.restricted && (
            <span
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "8px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--accent)",
                border: "0.5px solid var(--accent)",
                padding: "2px 8px",
                borderRadius: "1px",
              }}
            >
              🔒 Restricted
            </span>
          )}
          {piece.r18 && (
            <span
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "8px",
                letterSpacing: "0.05em",
                fontWeight: 700,
                color: "var(--bg)",
                background: "var(--text)",
                padding: "2px 8px",
                borderRadius: "1px",
              }}
            >
              R18
            </span>
          )}
        </div>

        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(32px, 5vw, 64px)",
            fontWeight: 900,
            lineHeight: 1.02,
            letterSpacing: "-1.5px",
            color: "var(--text)",
            marginBottom: "20px",
          }}
        >
          {piece.title}
        </h1>

        <p
          style={{
            fontFamily: "var(--font-playfair)",
            fontStyle: "italic",
            fontSize: "18px",
            lineHeight: 1.6,
            color: "var(--text-muted)",
            marginBottom: "24px",
            maxWidth: "640px",
          }}
        >
          {piece.excerpt}
        </p>

        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <span className="dateline">By Nathan</span>
          <span className="dateline">·</span>
          <span className="dateline">{formatDate(piece.date)}</span>
          <span className="dateline">·</span>
          <span className="dateline">{piece.readTime}</span>
          <span className="dateline">·</span>
          <span className="dateline">{piece.category}</span>
        </div>
      </div>

      {/* Article Body — gated if restricted */}
      {/* Article Body */}
      <div
        className="piece-body"
        style={{
          padding: "48px 24px 64px",
          maxWidth: "860px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {piece.restricted ? (
          <LockedContent slug={piece.slug}>
            <div
              className={isPoetry ? "poetry-body" : "article-body"}
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
          </LockedContent>
        ) : piece.r18 ? (
          <R18Gate slug={piece.slug}>
            <div
              className={isPoetry ? "poetry-body" : "article-body"}
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
          </R18Gate>
        ) : (
          <div
            className={isPoetry ? "poetry-body" : "article-body"}
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          />
        )}
      </div>

      {/* Footer nav + related — always visible */}
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "0 24px",
          width: "100%",
        }}
      >
        <div
          style={{
            borderTop: "3px solid var(--rule)",
            paddingTop: "32px",
          }}
        >
          <div
            className="piece-footer-nav"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "48px",
            }}
          >
            <Link href="/archive" className="read-link">
              ← Back to Archive
            </Link>
            <Link href="/" className="read-link">
              Front Page →
            </Link>
          </div>

          {related.length > 0 && (
            <div style={{ marginBottom: "48px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "24px",
                }}
              >
                <span className="dateline">More {piece.category}</span>
                <div
                  style={{
                    flex: 1,
                    height: "0.5px",
                    background: "var(--border)",
                  }}
                />
              </div>
              <div
                className="related-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                }}
              >
                {related.map((rel, i) => (
                  <Link
                    key={rel.slug}
                    href={`/${rel.slug}`}
                    className="card-hover"
                    style={{
                      display: "block",
                      padding: "20px",
                      borderRight:
                        i < related.length - 1
                          ? "0.5px solid var(--border)"
                          : "none",
                      borderTop: "0.5px solid var(--border)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "8px",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-ibm-plex-mono)",
                          fontSize: "8px",
                          letterSpacing: "0.2em",
                          color: "var(--accent)",
                          textTransform: "uppercase",
                        }}
                      >
                        {rel.category}
                      </p>
                      {rel.restricted && (
                        <span style={{ fontSize: "10px" }}>🔒</span>
                      )}
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-playfair)",
                        fontSize: "16px",
                        fontWeight: 700,
                        lineHeight: 1.2,
                        color: "var(--text)",
                        marginBottom: "8px",
                      }}
                    >
                      {rel.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-ibm-plex-mono)",
                        fontSize: "9px",
                        color: "var(--text-muted)",
                      }}
                    >
                      {rel.readTime}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          padding: "14px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "0.5px solid var(--border)",
        }}
      >
        <span className="dateline">ALIMPATAKAN</span>
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