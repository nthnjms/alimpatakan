"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DarkModeToggle from "@/components/DarkModeToggle";

const NAV_ITEMS = [
  { label: "Front Page", href: "/" },
  { label: "Archive", href: "/archive" },
  { label: "About", href: "/about" },
];

export default function MainNav() {
  const pathname = usePathname();

  return (
    <div
      className="rule-thin main-nav"
      style={{
        padding: "10px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <nav style={{ display: "flex", gap: "24px", alignItems: "center" }}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${isActive ? "active" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        {/* Search link */}
        <Link
          href="/search"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "var(--font-ibm-plex-mono)",
            fontSize: "10px",
            letterSpacing: "0.1em",
            color: pathname === "/search" ? "var(--accent)" : "var(--text-muted)",
            transition: "color 0.2s",
            padding: "4px 0",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--text)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color =
              pathname === "/search" ? "var(--accent)" : "var(--text-muted)")
          }
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          Search
        </Link>

        <DarkModeToggle />
      </div>
    </div>
  );
}