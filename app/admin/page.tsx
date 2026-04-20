"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Piece, Category } from "@/lib/pieces";

const CATEGORIES: Category[] = [
  "Hardcore",
  "Stroke",
  "Quickie",
  "Fantasy",
  "Uncensored",
  "Raw",
];

const ADMIN_PASSWORD = "dayandayan";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function calculateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [view, setView] = useState<"list" | "add">("list");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

const [form, setForm] = useState({
    title: "",
    category: "Essay" as Category,
    date: new Date().toISOString().split("T")[0],
    excerpt: "",
    content: "",
    featured: false,
    restricted: false,
    r18: false,
  });

  useEffect(() => {
    if (authenticated) {
      fetchPieces();
    }
  }, [authenticated]);

  const fetchPieces = async () => {
    const res = await fetch("/api/pieces");
    const data = await res.json();
    setPieces(data);
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleAdd = async () => {
    if (!form.title || !form.content || !form.excerpt) return;

const newPiece: Piece = {
      slug: slugify(form.title),
      title: form.title,
      category: form.category,
      date: form.date,
      excerpt: form.excerpt,
      content: form.content,
      readTime: calculateReadTime(form.content),
      featured: form.featured,
      restricted: form.restricted,
      r18: form.r18,
    };

    const res = await fetch("/api/pieces", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPiece),
    });

    if (res.ok) {
      await fetchPieces();
      setView("list");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      setForm({
        title: "",
        category: "Hardcore",
        date: new Date().toISOString().split("T")[0],
        excerpt: "",
        content: "",
        featured: false,
        restricted: false,
        r18: false,
      });
    }
  };

  const handleDelete = async (slug: string) => {
    const res = await fetch(`/api/pieces?slug=${slug}`, {
      method: "DELETE",
    });
    if (res.ok) {
      await fetchPieces();
      setDeleteConfirm(null);
    }
  };

  const handleSetFeatured = async (slug: string) => {
    const res = await fetch("/api/pieces/feature", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    if (res.ok) await fetchPieces();
  };

  // ─── Login Screen ───
  if (!authenticated) {
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
            <h1
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "32px",
                fontWeight: 900,
                color: "var(--text)",
                marginBottom: "8px",
              }}
            >
              ALIMPATAKAN
            </h1>
            <p className="dateline">Admin Access</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "var(--surface)",
                border: passwordError
                  ? "0.5px solid var(--accent)"
                  : "0.5px solid var(--border-strong)",
                color: "var(--text)",
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "13px",
                outline: "none",
                borderRadius: "2px",
              }}
            />
            {passwordError && (
              <p
                style={{
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.15em",
                  color: "var(--accent)",
                  textTransform: "uppercase",
                }}
              >
                Incorrect password
              </p>
            )}
            <button
              onClick={handleLogin}
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
              Enter
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ─── Add Piece Form ───
  if (view === "add") {
    return (
      <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
        <div className="accent-bar" />

        <div
          style={{
            padding: "16px 24px",
            borderBottom: "0.5px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => setView("list")}
            className="dateline"
            style={{
              background: "none",
              border: "none",
              cursor: "none",
              color: "var(--text-muted)",
            }}
          >
            ← Back
          </button>
          <h1
            style={{
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--text)",
            }}
          >
            New Piece
          </h1>
          <button
            onClick={handleAdd}
            style={{
              background: "var(--accent)",
              color: "#0d0d0d",
              border: "none",
              fontFamily: "var(--font-ibm-plex-mono)",
              fontSize: "9px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "6px 16px",
              cursor: "none",
              borderRadius: "2px",
            }}
          >
            Publish →
          </button>
        </div>

        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "40px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* Title */}
          <div>
            <label className="dateline" style={{ display: "block", marginBottom: "8px" }}>
              Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="The title of your piece"
              style={{
                width: "100%",
                padding: "12px 0",
                background: "transparent",
                border: "none",
                borderBottom: "0.5px solid var(--border-strong)",
                color: "var(--text)",
                fontFamily: "var(--font-playfair)",
                fontSize: "28px",
                fontWeight: 700,
                outline: "none",
              }}
            />
            {form.title && (
              <p
                style={{
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: "9px",
                  color: "var(--text-faint)",
                  marginTop: "6px",
                  letterSpacing: "0.1em",
                }}
              >
                slug: /{slugify(form.title)}
              </p>
            )}
          </div>

          {/* Category + Date row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: "16px" }}>
            <div>
              <label className="dateline" style={{ display: "block", marginBottom: "8px" }}>
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value as Category })
                }
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  background: "var(--surface)",
                  border: "0.5px solid var(--border-strong)",
                  color: "var(--text)",
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: "10px",
                  outline: "none",
                  borderRadius: "2px",
                  cursor: "none",
                }}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="dateline" style={{ display: "block", marginBottom: "8px" }}>
                Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  background: "var(--surface)",
                  border: "0.5px solid var(--border-strong)",
                  color: "var(--text)",
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: "10px",
                  outline: "none",
                  borderRadius: "2px",
                }}
              />
            </div>

            <div>
              <label className="dateline" style={{ display: "block", marginBottom: "8px" }}>
                Featured
              </label>
              <button
                onClick={() => setForm({ ...form, featured: !form.featured })}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  background: form.featured ? "var(--accent)" : "var(--surface)",
                  border: "0.5px solid var(--border-strong)",
                  color: form.featured ? "#0d0d0d" : "var(--text-muted)",
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  cursor: "none",
                  borderRadius: "2px",
                  textAlign: "left",
                }}
              >
                {form.featured ? "✓ Featured" : "Set as Featured"}
              </button>
            </div>

          <div>
              <label className="dateline" style={{ display: "block", marginBottom: "8px" }}>
                Visibility
              </label>
              <button
                onClick={() => setForm({ ...form, restricted: !form.restricted })}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  background: form.restricted ? "var(--text)" : "var(--surface)",
                  border: "0.5px solid var(--border-strong)",
                  color: form.restricted ? "var(--bg)" : "var(--text-muted)",
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  cursor: "none",
                  borderRadius: "2px",
                  textAlign: "left" as const,
                }}
              >
                {form.restricted ? "🔒 Private" : "🌐 Public"}
              </button>
            </div>
          </div>
            
            <div>
              <label className="dateline" style={{ display: "block", marginBottom: "8px" }}>
                Rating
              </label>
              <button
                onClick={() => setForm({ ...form, r18: !form.r18 })}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  background: form.r18 ? "var(--text)" : "var(--surface)",
                  border: "0.5px solid var(--border-strong)",
                  color: form.r18 ? "var(--bg)" : "var(--text-muted)",
                  fontFamily: "var(--font-ibm-plex-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  cursor: "none",
                  borderRadius: "2px",
                  textAlign: "left" as const,
                }}
              >
                {form.r18 ? "R18 — Mature" : "All Ages"}
              </button>
            </div>

          {/* Excerpt */}
          <div>
            <label className="dateline" style={{ display: "block", marginBottom: "8px" }}>
              Excerpt / Deck
            </label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              placeholder="A one or two sentence description shown on cards and in the archive."
              rows={3}
              style={{
                width: "100%",
                padding: "12px",
                background: "var(--surface)",
                border: "0.5px solid var(--border-strong)",
                color: "var(--text)",
                fontFamily: "var(--font-playfair)",
                fontStyle: "italic",
                fontSize: "15px",
                lineHeight: 1.6,
                outline: "none",
                resize: "vertical",
                borderRadius: "2px",
              }}
            />
          </div>

          {/* Content */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <label className="dateline">Content</label>
              {form.content && (
                <span className="dateline">
                  {calculateReadTime(form.content)}
                </span>
              )}
            </div>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder={
                form.category === "Stroke"
                  ? "Write each line on its own line.\nLeave a blank line between stanzas.\nUse *word* for italics."
                  : "Write your piece here.\n\nLeave a blank line between paragraphs.\nUse *word* for italics."
              }
              rows={24}
              style={{
                width: "100%",
                padding: "16px",
                background: "var(--surface)",
                border: "0.5px solid var(--border-strong)",
                color: "var(--text)",
                fontFamily:
                  form.category === "Stroke"
                    ? "var(--font-playfair)"
                    : "var(--font-inter)",
                fontStyle: form.category === "Stroke" ? "italic" : "normal",
                fontSize: "15px",
                lineHeight: 1.8,
                outline: "none",
                resize: "vertical",
                borderRadius: "2px",
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "9px",
                color: "var(--text-faint)",
                marginTop: "6px",
                letterSpacing: "0.1em",
              }}
            >
              Use *word* for italics. Blank line = new paragraph. For poetry,
              each line break is preserved.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // ─── Piece List ───
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
          <div className="accent-bar" />

          {/* Header */}
          <div
              style={{
                  padding: "16px 24px",
                  borderBottom: "0.5px solid var(--border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
              }}
          >
              <div>
                  <h1
                      style={{
                          fontFamily: "var(--font-playfair)",
                          fontSize: "22px",
                          fontWeight: 900,
                          color: "var(--text)",
                      }}
                  >
                      ALIMPATAKAN
                  </h1>
                  <p className="dateline" style={{ marginTop: "2px" }}>
                      {pieces.length} pieces · Admin
                  </p>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <a
                      href="/"
                      className="dateline"
                      style={{ color: "var(--text-muted)" }}
                  >
                      View Site ↗
                  </a>
                  <button
                      onClick={() => setView("add")}
                      style={{
                          background: "var(--text)",
                          color: "var(--bg)",
                          border: "none",
                          fontFamily: "var(--font-ibm-plex-mono)",
                          fontSize: "9px",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          padding: "8px 16px",
                          cursor: "none",
                          borderRadius: "2px",
                      }}
                  >
                      + New Piece
                  </button>
              </div>
          </div>

          {/* Saved confirmation */}
          {saved && (
              <div
                  style={{
                      padding: "10px 24px",
                      background: "var(--accent-dim)",
                      borderBottom: "0.5px solid var(--border)",
                  }}
              >
                  <p
                      style={{
                          fontFamily: "var(--font-ibm-plex-mono)",
                          fontSize: "9px",
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "var(--accent)",
                      }}
                  >
                      ✓ Piece published successfully
                  </p>
              </div>
          )}

          {/* Pieces list */}
          <div>
              {pieces.map((piece) => (
                  <div
                      key={piece.slug}
                      style={{
                          display: "grid",
                          gridTemplateColumns: "1fr auto",
                          gap: "16px",
                          alignItems: "center",
                          padding: "16px 24px",
                          borderBottom: "0.5px solid var(--border)",
                          background: "transparent",
                          transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                      <div>
                          <div
                              style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                  marginBottom: "4px",
                              }}
                          >
                              <span
                                  style={{
                                      fontFamily: "var(--font-ibm-plex-mono)",
                                      fontSize: "8px",
                                      letterSpacing: "0.2em",
                                      textTransform: "uppercase",
                                      color: "var(--accent)",
                                  }}
                              >
                                  {piece.category}
                              </span>
                              {piece.featured && (
                                  <span
                                      style={{
                                          fontFamily: "var(--font-ibm-plex-mono)",
                                          fontSize: "7px",
                                          letterSpacing: "0.15em",
                                          textTransform: "uppercase",
                                          color: "#0d0d0d",
                                          background: "var(--accent)",
                                          padding: "1px 6px",
                                          borderRadius: "1px",
                                      }}
                                  >
                                      Featured
                                  </span>
                              )}
                          </div>
                          <p
                              style={{
                                  fontFamily: "var(--font-playfair)",
                                  fontSize: "16px",
                                  fontWeight: 700,
                                  color: "var(--text)",
                                  marginBottom: "2px",
                              }}
                          >
                              {piece.title}
                          </p>
                          <p className="dateline">
                              {piece.date} · {piece.readTime} · /{piece.slug}
                          </p>
                      </div>

                      {/* Actions */}
                      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                          <a
                              href={`/${piece.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                  fontFamily: "var(--font-ibm-plex-mono)",
                                  fontSize: "9px",
                                  letterSpacing: "0.1em",
                                  textTransform: "uppercase",
                                  color: "var(--text-muted)",
                                  padding: "5px 10px",
                                  border: "0.5px solid var(--border)",
                                  borderRadius: "2px",
                              }}
                          >
                              View
                          </a>
                      {!piece.featured && (
                          <button
                              onClick={() => handleSetFeatured(piece.slug)}
                              style={{
                                  fontFamily: "var(--font-ibm-plex-mono)",
                                  fontSize: "9px",
                                  letterSpacing: "0.1em",
                                  textTransform: "uppercase",
                                  color: "var(--text-muted)",
                                  padding: "5px 10px",
                                  border: "0.5px solid var(--border)",
                                  background: "none",
                                  cursor: "none",
                                  borderRadius: "2px",
                              }}
                          >
                              Feature
                          </button>
                      )}
                      {deleteConfirm === piece.slug ? (
                          <div style={{ display: "flex", gap: "6px" }}>
                              <button
                                  onClick={() => handleDelete(piece.slug)}
                                  style={{
                                      fontFamily: "var(--font-ibm-plex-mono)",
                                      fontSize: "9px",
                                      letterSpacing: "0.1em",
                                      textTransform: "uppercase",
                                      color: "var(--bg)",
                                      background: "var(--text)",
                                      padding: "5px 10px",
                                      border: "none",
                                      cursor: "none",
                                      borderRadius: "2px",
                                  }}
                              >
                                  Confirm
                              </button>
                              <button
                                  onClick={() => setDeleteConfirm(null)}
                                  style={{
                                      fontFamily: "var(--font-ibm-plex-mono)",
                                      fontSize: "9px",
                                      letterSpacing: "0.1em",
                                      textTransform: "uppercase",
                                      color: "var(--text-muted)",
                                      background: "none",
                                      padding: "5px 10px",
                                      border: "0.5px solid var(--border)",
                                      cursor: "none",
                                      borderRadius: "2px",
                                  }}
                              >
                                  Cancel
                              </button>
                          </div>
                      ) : (
                          <button
                              onClick={() => setDeleteConfirm(piece.slug)}
                              style={{
                                  fontFamily: "var(--font-ibm-plex-mono)",
                                  fontSize: "9px",
                                  letterSpacing: "0.1em",
                                  textTransform: "uppercase",
                                  color: "var(--text-muted)",
                                  background: "none",
                                  padding: "5px 10px",
                                  border: "0.5px solid var(--border)",
                                  cursor: "none",
                                  borderRadius: "2px",
                              }}
                          >
                              Delete
                          </button>
                      )}
                  </div>)){"}"}
          </div>
          ))}
      </div>
      <div className="accent-bar" style={{ marginTop: "auto" }} />
    </main>
  );
}