"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

type TickerItem = {
  title: string;
  slug: string;
  category: string;
};

export default function Ticker({ items }: { items: TickerItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let position = 0;
    let animationId: number;
    let isPaused = false;
    const speed = 0.5;

    const animate = () => {
      if (!isPaused) {
        position -= speed;
        const halfWidth = track.scrollWidth / 2;
        if (Math.abs(position) >= halfWidth) {
          position = 0;
        }
        track.style.transform = `translateX(${position}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const pause = () => { isPaused = true; };
    const resume = () => { isPaused = false; };

    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);
    track.addEventListener("touchstart", pause, { passive: true });
    track.addEventListener("touchend", resume, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
      track.removeEventListener("touchstart", pause);
      track.removeEventListener("touchend", resume);
    };
  }, []);

  const doubled = [...items, ...items];

  return (
    <div
      style={{
        borderBottom: "0.5px solid var(--border)",
        borderTop: "0.5px solid var(--border)",
        background: "var(--surface)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Left fade */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "60px",
          background:
            "linear-gradient(to right, var(--surface), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Label */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          zIndex: 3,
          paddingLeft: "16px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-ibm-plex-mono)",
            fontSize: "8px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--bg)",
            background: "var(--accent)",
            padding: "3px 8px",
            whiteSpace: "nowrap",
          }}
        >
          Latest
        </span>
      </div>

      {/* Right fade */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "60px",
          background:
            "linear-gradient(to left, var(--surface), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Scrolling track */}
      <div
        style={{
          padding: "10px 0",
          paddingLeft: "100px",
          overflow: "hidden",
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: "0",
            willChange: "transform",
            width: "max-content",
          }}
        >
          {doubled.map((item, i) => (
            <Link
              key={`${item.slug}-${i}`}
              href={`/${item.slug}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                paddingRight: "48px",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: "8px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  whiteSpace: "nowrap",
                }}
              >
                {item.category}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "13px",
                  fontStyle: "italic",
                  color: "var(--text)",
                  whiteSpace: "nowrap",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text)")
                }
              >
                {item.title}
              </span>
              <span
                style={{
                  color: "var(--border-strong)",
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: "10px",
                }}
              >
                ·
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}