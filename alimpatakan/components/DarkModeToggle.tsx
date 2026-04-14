"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      style={{
        background: "none",
        border: "0.5px solid var(--border-strong)",
        color: "var(--text-muted)",
        fontFamily: "var(--font-ibm-plex-mono)",
        fontSize: "10px",
        letterSpacing: "0.1em",
        padding: "5px 12px",
        cursor: "none",
        transition: "color 0.2s, border-color 0.2s",
        borderRadius: "2px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--text)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--text-muted)";
      }}
      aria-label="Toggle dark mode"
    >
      {isDark ? "☀ Light" : "☽ Dark"}
    </button>
  );
}