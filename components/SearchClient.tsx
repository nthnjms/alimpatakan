"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import type { Piece } from "@/lib/pieces";
import { formatDateShort } from "@/lib/pieces";
import { categoryToSlug } from "@/lib/categories";

type Props = {
  pieces: Piece[];
};

function highlight(text: string, query: string): string {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  return text.replace(
    regex,
    `<mark style="background: var(--accent); color: #0d0d0d; padding: 0 2px; border-radius: 1px;">$1</mark>`
  );
}

function getExcerptWithMatch(content: string, query: string): string {
  if (!query.trim()) return "";
  const lower = content.toLowerCase();
  const index = lower.indexOf(query.toLowerCase());
  if (index === -1) return "";
  const start = Math.max(0, index - 60);
  const end = Math.min(content.length, index + query.length + 60);
  const snippet = content.slice(start, end);
  return (start > 0 ? "…" : "") + snippet + (end < content.length ? "…" : "");
}

export default function SearchClient({ pieces }: Props) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setQuery("");
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return pieces
      .map((piece) => {
        let score = 0;
        if (piece.title.toLowerCase().includes(q)) score += 10;
        if (piece.category.toLowerCase().includes(q)) score += 6;
        if (piece.excerpt.toLowerCase().includes(q)) score += 4;
        if (piece.content.toLowerCase().includes(q)) score += 2;
        return { piece, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.piece);
  }, [query, pieces]);

  const hasQuery = query.trim().length > 0;

  return (
    <div style={{ minHeight: "60vh" }}>
      {/* Search Input */}
      <div
        style={{
          padding: "32px 24px",
          borderBottom: "0.5px solid var(--border)",
          position: "sticky",
          top: 0,
          background: "var(--bg)",
          zIndex: 100,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            maxWidth: "680px",
            borderBottom: focused
              ? "2px solid var(--accent)"
              : "2px solid var(--border-strong)",
            paddingBottom: "12px",
            transition: "border-color 0.2s",
          }}
        >
          {/* Search icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Type anything — a word, a feeling, a category…"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              fontFamily: "var(--font-playfair)",
              fontStyle: query ? "normal" : "italic",
              fontSize: "clamp(18px, 3vw, 24px)",
              color: "var(--text)",
              caretColor: "var(--accent)",
            }}
          />

          {/* Clear button */}
          {hasQuery && (
            <button
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "none",
                color: "var(--text-muted)",
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "9px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                flexShrink: 0,
                padding: "4px 8px",
              }}
            >
              Clear ✕
            </button>
          )}
        </div>

        {/* Result count */}
        {hasQuery && (
          <p
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "9px",
              letterSpacing: "0.15em",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              marginTop: "12px",
            }}
          >
            {results.length === 0
              ? "No results."
              : `${results.length} ${results.length === 1 ? "piece" : "pieces"} found`}
          </p>
        )}
      </div>

      {/* Results */}
      {!hasQuery && (
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
              fontSize: "18px",
              color: "var(--text-faint)",
              marginBottom: "8px",
            }}
          >
            Start typing.
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
            {pieces.length} pieces indexed
          </p>
        </div>
      )}

      {hasQuery && results.length === 0 && (
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
              marginBottom: "12px",
            }}
          >
            Nothing found for &ldquo;{query}&rdquo;
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
            Try a different word. Or write the piece yourself.
          </p>
        </div>
      )}

      {hasQuery && results.length > 0 && (
        <div>
          {results.map((piece, i) => {
            const contentSnippet = getExcerptWithMatch(
              piece.content,
              query
            );
            const highlightedTitle = highlight(piece.title, query);
            const highlightedExcerpt = highlight(piece.excerpt, query);
            const highlightedSnippet = contentSnippet
              ? highlight(contentSnippet, query)
              : "";

            return (
              <Link
                key={piece.slug}
                href={`/${piece.slug}`}
                className="card-hover"
                style={{
                  display: "block",
                  padding: "24px",
                  borderBottom: "0.5px solid var(--border)",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "40px 1fr",
                    gap: "16px",
                    alignItems: "start",
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

                  <div>
                    {/* Category + badges */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "6px",
                        flexWrap: "wrap",
                      }}
                    >
                      <Link
                        href={`/category/${categoryToSlug(piece.category)}`}
                        style={{
                          fontFamily: "var(--font-ibm-plex-mono)",
                          fontSize: "8px",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "var(--accent)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {piece.category}
                      </Link>
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
                      <span
                        style={{
                          fontFamily: "var(--font-ibm-plex-mono)",
                          fontSize: "8px",
                          color: "var(--text-faint)",
                        }}
                      >
                        {formatDateShort(piece.date)} · {piece.readTime}
                      </span>
                    </div>

                    {/* Title with highlight */}
                    <h2
                      style={{
                        fontFamily: "var(--font-playfair)",
                        fontSize: "clamp(16px, 2.5vw, 22px)",
                        fontWeight: 700,
                        lineHeight: 1.2,
                        color: "var(--text)",
                        marginBottom: "8px",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: highlightedTitle,
                      }}
                    />

                    {/* Excerpt with highlight */}
                    <p
                      style={{
                        fontFamily: "var(--font-playfair)",
                        fontStyle: "italic",
                        fontSize: "14px",
                        lineHeight: 1.6,
                        color: "var(--text-muted)",
                        marginBottom: highlightedSnippet ? "8px" : "0",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: highlightedExcerpt,
                      }}
                    />

                    {/* Content snippet with highlight */}
                    {highlightedSnippet && (
                      <p
                        style={{
                          fontFamily: "var(--font-ibm-plex-mono)",
                          fontSize: "11px",
                          lineHeight: 1.7,
                          color: "var(--text-muted)",
                          letterSpacing: "0.02em",
                          borderLeft: "2px solid var(--accent)",
                          paddingLeft: "12px",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: highlightedSnippet,
                        }}
                      />
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Footer padding */}
      <div style={{ padding: "48px 24px" }}>
        <Link href="/archive" className="dateline footer-link">
          ← Full Archive
        </Link>
      </div>
    </div>
  );
}