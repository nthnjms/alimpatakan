"use client";

import { useState, useEffect } from "react";

export default function R18Gate({
  children,
  slug,
}: {
  children: React.ReactNode;
  slug: string;
}) {
  const [confirmed, setConfirmed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const storageKey = `alimpatakan-r18-${slug}`;

  useEffect(() => {
    setMounted(true);
    const saved = sessionStorage.getItem(storageKey);
    if (saved === "confirmed") setConfirmed(true);
  }, [storageKey]);

  const handleConfirm = () => {
    sessionStorage.setItem(storageKey, "confirmed");
    setConfirmed(true);
  };

  if (!mounted) return null;
  if (confirmed) return <>{children}</>;

  return (
    <div style={{ padding: "48px 0" }}>
      {/* Blurred preview */}
      <div
        style={{
          position: "relative",
          height: "100px",
          overflow: "hidden",
          marginBottom: "0",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div
          style={{
            filter: "blur(8px)",
            opacity: 0.3,
            fontFamily: "var(--font-playfair)",
            fontStyle: "italic",
            fontSize: "18px",
            lineHeight: 2,
            color: "var(--text)",
          }}
        >
          <p>
            The content of this piece is intended for mature readers.
            It may contain themes, language, or imagery suited only
            for adults. The writer has marked this deliberately.
          </p>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60px",
            background: "linear-gradient(to bottom, transparent, var(--bg))",
          }}
        />
      </div>

      {/* Gate UI */}
      <div style={{ maxWidth: "400px", paddingTop: "40px" }}>
        {/* R18 Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "48px",
            height: "48px",
            border: "2px solid var(--text)",
            marginBottom: "20px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.05em",
              color: "var(--text)",
            }}
          >
            R18
          </span>
        </div>

        <h3
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "24px",
            fontWeight: 900,
            color: "var(--text)",
            marginBottom: "12px",
            lineHeight: 1.1,
          }}
        >
          Mature Content
        </h3>

        <p
          style={{
            fontFamily: "var(--font-playfair)",
            fontStyle: "italic",
            fontSize: "15px",
            lineHeight: 1.75,
            color: "var(--text-muted)",
            marginBottom: "32px",
          }}
        >
          This piece contains content intended for readers 18 and older.
          It may explore themes of sexuality, violence, trauma, or other
          mature subject matter. The writer has flagged this deliberately
          and with care.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            onClick={handleConfirm}
            style={{
              width: "100%",
              padding: "14px",
              background: "var(--text)",
              color: "var(--bg)",
              border: "none",
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "none",
              borderRadius: "2px",
            }}
          >
            I am 18 or older — Continue Reading
          </button>
          <p
            style={{
              width: "100%",
              padding: "14px",
              background: "transparent",
              color: "var(--text-muted)",
              border: "0.5px solid var(--border)",
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "none",
              borderRadius: "2px",
              textAlign: "center" as const,
              display: "block",
            }}
          >
            ← Take Me Back
          </p>
        </div>

        <p
          style={{
            fontFamily: "var(--font-ibm-plex-mono)",
            fontSize: "9px",
            color: "var(--text-faint)",
            marginTop: "16px",
            letterSpacing: "0.1em",
          }}
        >
          Session-based. This choice resets when you close the tab.
        </p>
      </div>
    </div>
  );
}