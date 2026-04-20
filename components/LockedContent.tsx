"use client";

import { useState, useEffect } from "react";

const PIECE_PASSWORD = "key";

export default function LockedContent({
  children,
  slug,
}: {
  children: React.ReactNode;
  slug: string;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const storageKey = `alimpatakan-locked-${slug}`;

  useEffect(() => {
    setMounted(true);
    const saved = sessionStorage.getItem(storageKey);
    if (saved === "unlocked") setUnlocked(true);
  }, [storageKey]);

  const handleUnlock = () => {
    if (password === PIECE_PASSWORD) {
      sessionStorage.setItem(storageKey, "unlocked");
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setAttempts((a) => a + 1);
      setPassword("");
    }
  };

  if (!mounted) return null;
  if (unlocked) return <>{children}</>;

  return (
    <div>
      {/* Blurred preview of first few lines */}
      <div
        style={{
          position: "relative",
          marginBottom: "0",
          overflow: "hidden",
          height: "120px",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <div
          style={{
            filter: "blur(6px)",
            opacity: 0.4,
            fontFamily: "var(--font-playfair)",
            fontStyle: "italic",
            fontSize: "18px",
            lineHeight: 2,
            color: "var(--text)",
          }}
        >
          <p>
            The words are here, waiting. They exist in full — every
            sentence, every line break, every pause the writer intended.
            But they are not yet yours to read. Not without the key.
            Some things are written for specific eyes. This may be one
            of them. Or perhaps you can deduce your way in.
          </p>
        </div>
        {/* Fade out */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "80px",
            background:
              "linear-gradient(to bottom, transparent, var(--bg))",
          }}
        />
      </div>

      {/* Lock UI */}
      <div
        style={{
          padding: "48px 0 0",
          maxWidth: "400px",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            border: "0.5px solid var(--border-strong)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
            fontSize: "16px",
          }}
        >
          🔒
        </div>

        <h3
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "22px",
            fontWeight: 700,
            color: "var(--text)",
            marginBottom: "8px",
          }}
        >
          This piece is locked.
        </h3>

        <p
          style={{
            fontFamily: "var(--font-playfair)",
            fontStyle: "italic",
            fontSize: "15px",
            lineHeight: 1.7,
            color: "var(--text-muted)",
            marginBottom: "28px",
          }}
        >
          {attempts === 0
            ? "Enter the key to continue reading. If you were meant to read this, you may already know it."
            : attempts < 3
            ? "Not quite. Think about what connects you to this piece."
            : "Keep trying. The right key exists."}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            type="password"
            placeholder="Enter key"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
            autoFocus
            style={{
              width: "100%",
              padding: "12px 16px",
              background: "var(--surface)",
              border: error
                ? "0.5px solid var(--accent)"
                : "0.5px solid var(--border-strong)",
              color: "var(--text)",
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "13px",
              outline: "none",
              borderRadius: "2px",
              letterSpacing: "0.1em",
            }}
          />
          {error && (
            <p
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "9px",
                letterSpacing: "0.15em",
                color: "var(--accent)",
                textTransform: "uppercase",
              }}
            >
              {attempts === 1
                ? "Wrong key."
                : attempts === 2
                ? "Still wrong."
                : "Not that either."}
            </p>
          )}
          <button
            onClick={handleUnlock}
            style={{
              width: "100%",
              padding: "12px",
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
            Unlock →
          </button>
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
          Session-based. Closing the tab resets access.
        </p>
      </div>
    </div>
  );
}