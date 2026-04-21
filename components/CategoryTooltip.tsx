"use client";

import { useState } from "react";

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  Hardcore: "Structured arguments, cultural dissections, and opinions you'll die on. No softening. No apologies.",
  Stroke: "Every line a brushstroke, a caress, a slow burn. Lyrical pieces that live under your skin after you've read them.",
  Quickie: "Fast, sharp, and over before you're ready. Flash fiction that hits harder than its word count has any right to.",
  Fantasy: "Invented worlds, real desires. Imaginative long-form work that goes places reality won't let you.",
  Uncensored: "The thoughts you weren't supposed to say out loud. Personal, unfiltered, and uncomfortably honest.",
  Raw: "True stories, witnessed lives, facts that need no embellishment. Reported and real — no filter, no performance.",
};

export default function CategoryTooltip({
  category,
  children,
}: {
  category: string;
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  const description = CATEGORY_DESCRIPTIONS[category];
  if (!description) return <>{children}</>;

  return (
    <span
      style={{ position: "relative", display: "inline-flex", alignItems: "center" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {visible && (
        <span
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: "220px",
            background: "var(--text)",
            color: "var(--bg)",
            fontFamily: "var(--font-ibm-plex-mono)",
            fontSize: "9px",
            lineHeight: 1.6,
            letterSpacing: "0.05em",
            padding: "10px 12px",
            borderRadius: "2px",
            zIndex: 9999,
            pointerEvents: "none",
            boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
          }}
        >
          {description}
          {/* Arrow */}
          <span
            style={{
              position: "absolute",
              bottom: "-5px",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "5px solid var(--text)",
            }}
          />
        </span>
      )}
    </span>
  );
}