import { getQuote } from "@/lib/quote";

export default function QuoteCard() {
  const quote = getQuote();

  return (
    <div
      style={{
        padding: "48px 40px",
        borderBottom: "0.5px solid var(--border)",
        position: "relative",
        overflow: "hidden",
        background: "var(--surface)",
      }}
    >
      {/* Large decorative quotation mark */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          left: "1px",
          fontFamily: "var(--font-nautigal)",
          fontSize: "400px",
          fontWeight: 900,
          color: "var(--accent)",
          opacity: 0.06,
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        &ldquo;
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "-460px",
          right: "24px",
          fontFamily: "var(--font-nautigal)",
          fontSize: "800px",
          fontWeight: 900,
          color: "var(--accent)",
          opacity: 0.56,
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

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
          fontSize: "clamp(80px, 3vw, 32px)",
          lineHeight: 1.4,
          color: "var(--text)",
          maxWidth: "1000px",
          margin: "0 0 18px 0",
          position: "relative",
          zIndex: 1,
        }}
      >
        &ldquo;{quote.text}&rdquo;
      </blockquote>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            width: "24px",
            height: "0.5px",
            background: "var(--text-muted)",
          }}
        />
        <div>
          <p
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "20px",
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
                fontSize: "12px",
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
                marginTop: "-4px",
              }}
            >
              {quote.context}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}