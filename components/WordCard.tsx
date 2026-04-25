import { getWord } from "@/lib/word";

export default function WordCard() {
  const word = getWord();

  return (
    <div
      style={{
        padding: "clamp(28px, 4vw, 40px) clamp(16px, 3vw, 32px)",
        borderLeft: "0.5px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ghost watermark */}
      <div
        style={{
          position: "absolute",
          bottom: "-20px",
          right: "-10px",
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(60px, 12vw, 120px)",
          fontWeight: 900,
          color: "var(--accent)",
          opacity: 0.04,
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          letterSpacing: "-2px",
        }}
        aria-hidden="true"
      >
        {word.word}
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "1.5px",
              background: "var(--accent)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "8px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            Word
          </span>
        </div>

        {/* Word */}
        <h2
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-1px",
            color: "var(--text)",
            marginBottom: "4px",
          }}
        >
          {word.word}
        </h2>

        {/* Pronunciation + meta */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "9px",
              color: "var(--text-muted)",
              letterSpacing: "0.05em",
            }}
          >
            /{word.pronunciation}/
          </span>
          <span style={{ color: "var(--border-strong)", fontSize: "9px" }}>·</span>
          <span
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "8px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            {word.part_of_speech}
          </span>
          <span style={{ color: "var(--border-strong)", fontSize: "9px" }}>·</span>
          <span
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "8px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            {word.language}
          </span>
        </div>

        {/* Definition */}
        <p
          style={{
            fontFamily: "var(--font-playfair)",
            fontStyle: "italic",
            fontSize: "clamp(14px, 2vw, 16px)",
            lineHeight: 1.65,
            color: "var(--text)",
            marginBottom: "20px",
          }}
        >
          {word.definition}
        </p>

        {/* Usage example */}
        <div
          style={{
            padding: "12px 14px",
            borderLeft: "2px solid var(--accent)",
            marginBottom: "16px",
            background: "var(--accent-dim)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-playfair)",
              fontStyle: "italic",
              fontSize: "13px",
              lineHeight: 1.6,
              color: "var(--text)",
              marginBottom: "4px",
            }}
          >
            &ldquo;{word.usage}&rdquo;
          </p>
          <p
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "9px",
              color: "var(--text-muted)",
              letterSpacing: "0.05em",
            }}
          >
            {word.usage_translation}
          </p>
        </div>

        {/* Etymology */}
        <p
          style={{
            fontFamily: "var(--font-ibm-plex-mono)",
            fontSize: "9px",
            lineHeight: 1.6,
            color: "var(--text-muted)",
            letterSpacing: "0.05em",
            marginBottom: "16px",
          }}
        >
          {word.etymology}
        </p>

        {/* Note */}
        <p
          style={{
            fontFamily: "var(--font-playfair)",
            fontStyle: "italic",
            fontSize: "12px",
            color: "var(--text-faint)",
            lineHeight: 1.5,
            borderTop: "0.5px solid var(--border)",
            paddingTop: "12px",
          }}
        >
          {word.note}
        </p>
      </div>
    </div>
  );
}