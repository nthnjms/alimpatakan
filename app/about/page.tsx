import Link from "next/link";
import type { Metadata } from "next";
import { getAllPieces, getIssueNumber } from "@/lib/pieces";
import DarkModeToggle from "@/components/DarkModeToggle";

export const metadata: Metadata = {
  title: "About",
  description:
    "About ALIMPATAKAN — a personal literary publication by Nathaniel James Toñacao, founder of NTHNL Studios.",
};

export default function AboutPage() {
  const allPieces = getAllPieces();
  const issueNumber = getIssueNumber();

  return (
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
            background: "var(--text)",
            color: "var(--bg)",
            fontFamily: "var(--font-ibm-plex-mono)",
            fontSize: "9px",
            letterSpacing: "0.15em",
            padding: "3px 10px",
          }}
        >
          {issueNumber}
        </span>
        <DarkModeToggle />
      </div>

      <div
        style={{
          padding: "48px 24px 36px",
          borderBottom: "3px solid var(--rule)",
        }}
      >
        <p className="dateline" style={{ marginBottom: "10px" }}>
          About This Publication
        </p>
        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(40px, 7vw, 88px)",
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: "-2px",
            color: "var(--text)",
          }}
        >
          ALIMPATAKAN
        </h1>
      </div>

      <div
        className="about-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          borderBottom: "0.5px solid var(--border)",
        }}
      >
      
        <div
          className="about-left"
          style={{
            padding: "48px 24px",
            borderRight: "0.5px solid var(--border)",
          }}
        >
          <div className="label-accent" style={{ marginBottom: "20px" }}>
            The Writer
          </div>

          <div
            className="about-photo-row"
            style={{
              display: "flex",
              gap: "28px",
              alignItems: "flex-start",
              marginBottom: "24px",
            }}
          >
            <img
              src="/photo.jpg"
              alt="Nathan"
              style={{
                width: "200px",
                minWidth: "200px",
                height: "240px",
                objectFit: "cover",
                objectPosition: "top",
                flexShrink: 0,
                border: "0.5px solid var(--border)",
              }}
            />

            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "15px",
                  lineHeight: 1.85,
                  color: "var(--text)",
                  textAlign: "justify",
                  marginBottom: "16px",
                }}
              >
                I am Nathaniel James Toñacao, founder of{" "}
                <Link
                  href="https://nthnlstudios.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--accent)",
                    borderBottom: "1px solid var(--accent)",
                    paddingBottom: "1px",
                  }}
                >
                  NTHNL Studios
                </Link>
                , a creative and digital agency based in the Philippines. By
                day I build brands, digital experiences, and campaigns for
                clients. By night — and sometimes at 3am — I write.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "15px",
                  lineHeight: 1.85,
                  color: "var(--text)",
                  textAlign: "justify",
                }}
              >
                I grew up in the Merida, Leyte. That specificity matters to me. The
                way I think, the words I reach for, the things I find worth
                writing about — all of it was formed somewhere specific, by
                specific light and specific water. I carry that with me to
                wherever I go.
              </p>
            </div>
          </div>

          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "15px",
              lineHeight: 1.85,
              color: "var(--text)",
              textAlign: "justify",
              marginBottom: "16px",
            }}
          >
            ALIMPATAKAN is a Cebuano word for a fleeting thought, the kind
            that crosses your mind and disappears before you can catch it. This
            publication is my attempt to catch them. Essays, poetry, short
            stories, reflections, and creative nonfiction. Personal work, made
            for no brief and no client.
          </p>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "15px",
              lineHeight: 1.85,
              color: "var(--text)",
              textAlign: "justify",
            }}
          >
            Everything here is written for the same reason: because it needed
            to be said, and I was the one who needed to say it.
          </p>
        </div>

        <div className="about-right" style={{ padding: "48px 24px" }}>
          <div className="label-accent" style={{ marginBottom: "20px" }}>
            The Publication
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              { label: "Publication", value: "ALIMPATAKAN" },
              { label: "Founded", value: "2016" },
              { label: "Based in", value: "Leyte, Philippines" },
              { label: "Origin", value: "Visayas" },
              { label: "Current Issue", value: issueNumber },
              { label: "Total Pieces", value: String(allPieces.length) },
              { label: "Categories", value: "Essay, Poetry, Short Story, Reflection, Nonfiction" },
              { label: "Frequency", value: "Whenever the words come" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  gap: "12px",
                  padding: "12px 0",
                  borderBottom: "0.5px solid var(--border)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-ibm-plex-mono)",
                    fontSize: "8px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    paddingTop: "2px",
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-ibm-plex-mono)",
                    fontSize: "10px",
                    color: "var(--text)",
                    lineHeight: 1.5,
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "32px" }}>
            <div className="label-accent" style={{ marginBottom: "16px" }}>
              Elsewhere
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Link
                href="https://nthnlstudios.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="about-external-link"
              >
                <span>NTHNL Studios</span>
                <span style={{ color: "var(--text-faint)" }}>↗</span>
              </Link>
              <Link href="/archive" className="about-external-link">
                <span>Full Archive</span>
                <span style={{ color: "var(--text-faint)" }}>→</span>
              </Link>
            </div>
          </div>

          <div
            style={{
              marginTop: "36px",
              padding: "16px",
              border: "0.5px solid var(--border)",
              background: "var(--surface)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "8px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "10px",
              }}
            >
              Editorial Note
            </p>
            <p
              style={{
                fontFamily: "var(--font-playfair)",
                fontStyle: "italic",
                fontSize: "13px",
                lineHeight: 1.7,
                color: "var(--text-muted)",
              }}
            >
              This is not a blog. It is not a portfolio. It is not content. It
              is a publication — personal, independent, and made entirely on
              its own terms.
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          padding: "14px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link href="/" className="dateline footer-link">
          ← Front Page
        </Link>
        <Link
          href="https://nthnlstudios.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="dateline footer-link"
        >
          NTHNL Studios ↗
        </Link>
      </div>

      <div className="accent-bar" />
    </main>
  );
}