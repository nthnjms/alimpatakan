import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getRestrictedPieceBySlug,
  getRestrictedPieces,
  formatDate,
  formatContent,
} from "@/lib/pieces";
import PrivateGate from "@/components/PrivateGate";
import DarkModeToggle from "@/components/DarkModeToggle";

export async function generateStaticParams() {
  const pieces = getRestrictedPieces();
  return pieces.map((p) => ({ slug: p.slug }));
}

export default function PrivatePiecePage({
  params,
}: {
  params: { slug: string };
}) {
  const piece = getRestrictedPieceBySlug(params.slug);
  if (!piece) notFound();

  const formattedContent = formatContent(piece.content, piece.category);
  const isPoetry = piece.category === "Stroke";

  return (
    <PrivateGate>
      <main className="page-enter min-h-screen">
        <div className="accent-bar" />

        <div
          className="rule-thin"
          style={{
            padding: "6px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link href="/private" className="dateline nav-link">
            ← Private Collection
          </Link>
          <span
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "9px",
              letterSpacing: "0.15em",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              border: "0.5px solid var(--border)",
              padding: "2px 8px",
              borderRadius: "1px",
            }}
          >
            Private
          </span>
          <DarkModeToggle />
        </div>

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
          <div className="label-accent" style={{ marginBottom: "20px" }}>
            {piece.category}
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
          </div>
        </div>

        <div
          className="piece-body"
          style={{
            padding: "48px 24px 64px",
            maxWidth: "860px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <div
            className={isPoetry ? "poetry-body" : "article-body"}
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          />
        </div>

        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            padding: "0 24px 48px",
            width: "100%",
            borderTop: "3px solid var(--rule)",
            paddingTop: "32px",
          }}
        >
          <Link href="/private" className="read-link">
            ← Back to Private Collection
          </Link>
        </div>

        <div className="accent-bar" />
      </main>
    </PrivateGate>
  );
}