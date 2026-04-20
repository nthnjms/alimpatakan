"use client";

import { useState, useEffect } from "react";

const PRIVATE_PASSWORD = "dagsa-private";

export default function PrivateGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = sessionStorage.getItem("alimpatakan-private");
    if (saved === "unlocked") setUnlocked(true);
  }, []);

  const handleUnlock = () => {
    if (password === PRIVATE_PASSWORD) {
      sessionStorage.setItem("alimpatakan-private", "unlocked");
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!mounted) return null;
  if (unlocked) return <>{children}</>;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "360px",
          padding: "0 24px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "9px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "12px",
            }}
          >
            Restricted Access
          </p>
          <h1
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "28px",
              fontWeight: 900,
              color: "var(--text)",
              marginBottom: "8px",
            }}
          >
            Private Collection
          </h1>
          <p
            style={{
              fontFamily: "var(--font-playfair)",
              fontStyle: "italic",
              fontSize: "14px",
              color: "var(--text-muted)",
              lineHeight: 1.6,
            }}
          >
            These pieces are shared only with certain people.
            If you have the key, enter it below.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <input
            type="password"
            placeholder="Enter access key"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
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
              Incorrect key
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

        <div style={{ marginTop: "32px", textAlign: "center" }}>
        <p  
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "9px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
           >
            ← Back to ALIMPATAKAN
          </p>
        </div>
      </div>
    </main>
  );
}