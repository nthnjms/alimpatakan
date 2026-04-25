import type { Metadata } from "next";
import { getAllPieces } from "@/lib/pieces";
import SearchClient from "@/components/SearchClient";
import MainNav from "@/components/MainNav";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Search — ALIMPATAKAN",
  description: "Search every piece published in ALIMPATAKAN.",
};

export default function SearchPage() {
  const allPieces = getAllPieces();

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
          background: "var(--surface)",
        }}
      >
        <Link href="/" className="dateline nav-link">
          ← ALIMPATAKAN
        </Link>
        <span className="dateline">Search</span>
        <Link href="/archive" className="dateline nav-link">
          Archive
        </Link>
      </div>

      <MainNav />

      <div
        style={{
          padding: "48px 24px 36px",
          borderBottom: "3px solid var(--rule)",
        }}
      >
        <p className="dateline" style={{ marginBottom: "10px" }}>
          Search
        </p>
        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: "-2px",
            color: "var(--text)",
            marginBottom: "12px",
          }}
        >
          Find the piece<br />you felt once.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-playfair)",
            fontStyle: "italic",
            fontSize: "15px",
            color: "var(--text-muted)",
            lineHeight: 1.6,
          }}
        >
          Search by title, category, or any word from the piece.
        </p>
      </div>

      <SearchClient pieces={allPieces} />

      <div className="accent-bar" />
    </main>
  );
}