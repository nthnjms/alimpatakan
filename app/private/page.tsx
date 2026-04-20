import { getRestrictedPieces } from "@/lib/pieces";
import PrivateGate from "@/components/PrivateGate";
import Link from "next/link";
import { formatDateShort } from "@/lib/pieces";

export default function PrivatePage() {
  const pieces = getRestrictedPieces();

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
          <Link href="/" className="dateline nav-link">
            ← ALIMPATAKAN
          </Link>
          <span
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "9px",
              letterSpacing: "0.15em",
              color: "var(--accent)",
              textTransform: "uppercase",
            }}
          >
            Private Collection
          </span>
          <span className="dateline">{pieces.length} pieces</span>
        </div>

        <div
          style={{
            padding: "48px 24px 36px",
            borderBottom: "3px solid var(--rule)",
          }}
        >
          <p className="dateline" style={{ marginBottom: "10px" }}>
            Restricted
          </p>
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: "-2px",
              color: "var(--text)",
              marginBottom: "12px",
            }}
          >
            Private Collection
          </h1>
          <p
            style={{
              fontFamily: "var(--font-playfair)",
              fontStyle: "italic",
              fontSize: "16px",
              color: "var(--text-muted)",
              maxWidth: "560px",
              lineHeight: 1.6,
            }}
          >
            These are pieces written for specific eyes — too personal,
            too unfinished, or too raw for the general archive. You were
            trusted with the key.
          </p>
        </div>

        <div>
          {pieces.length === 0 ? (
            <div
              style={{
                padding: "64px 24px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontStyle: "italic",
                  fontSize: "20px",
                  color: "var(--text-muted)",
                }}
              >
                Nothing here yet.
              </p>
            </div>
          ) : (
            pieces.map((piece, i) => (
              <Link
                key={piece.slug}
                href={`/private/${piece.slug}`}
                className="card-hover archive-row"
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "48px 1fr auto",
                    gap: "20px",
                    alignItems: "start",
                    padding: "20px 24px",
                    borderBottom: "0.5px solid var(--border)",
                  }}
                >
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

                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "6px",
                      }}
                    >
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
                      <span
                        style={{
                          fontFamily: "var(--font-ibm-plex-mono)",
                          fontSize: "7px",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "var(--bg)",
                          background: "var(--text-muted)",
                          padding: "1px 6px",
                          borderRadius: "1px",
                        }}
                      >
                        Private
                      </span>
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

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: "4px",
                      minWidth: "80px",
                    }}
                  >
                    <span className="dateline">
                      {formatDateShort(piece.date)}
                    </span>
                    <span className="dateline">{piece.readTime}</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        <div className="accent-bar" style={{ marginTop: "48px" }} />
      </main>
    </PrivateGate>
  );
}