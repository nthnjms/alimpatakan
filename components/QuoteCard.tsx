import { getQuote } from "@/lib/quote";

export default function QuoteCard() {
  const quote = getQuote();

  return (
    <div
      style={{
        padding: "clamp(28px, 5vw, 48px) clamp(16px, 4vw, 40px)",
        position: "relative",
        overflow: "hidden",
        background: "var(--surface)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "320px",
      }}
    >
      {/* Top left decorative mark */}
      <div
        style={{
          position: "absolute",
          top: "-20px",
          left: "16px",
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(120px, 18vw, 220px)",
          fontWeight: 900,
          color: "var(--accent)",
          opacity: 0.08,
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* Bottom right decorative mark */}
      <div
        style={{
          position: "absolute",
          bottom: "-60px",
          right: "16px",
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(120px, 18vw, 220px)",
          fontWeight: 900,
          color: "var(--accent)",
          opacity: 0.08,
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          transform: "scaleX(-1)",
        }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Accent line */}
        <div
          style={{
            width: "40px",
            height: "3px",
            background: "var(--accent)",
            marginBottom: "24px",
          }}
        />

        <blockquote
          style={{
            fontFamily: "var(--font-playfair)",
            fontStyle: "italic",
            fontSize: "clamp(62px, 4vw, 48px)",
            lineHeight: 1.3,
            color: "var(--text)",
            maxWidth: "900px",
            margin: "0 0 14px 0",
          }}
        >
          &ldquo;{quote.text}&rdquo;
        </blockquote>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "24px",
              height: "0.5px",
              background: "var(--text-muted)",
              flexShrink: 0,
            }}
          />
          <div>
            <p
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "clamp(30px, 1.2vw, 12px)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--text)",
              }}
            >
              {quote.author}
            </p>
            {quote.context && (
              <p
                style={{
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: "clamp(19px, 1vw, 10px)",
                  letterSpacing: "0.1em",
                  color: "var(--text-muted)",
                  marginTop: "2px",
                  textTransform: "lowercase",
                }}
              >
                {quote.context}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}