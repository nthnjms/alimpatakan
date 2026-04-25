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
      className="rule-thin"
      style={{
        padding: "10px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "12px",
      }}
    >
      {/* Left — page links */}
      <nav
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
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

      {/* Right — search + dark mode */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <Link
          href="/search"
          className={`nav-search-link ${pathname === "/search" ? "active" : ""}`}
          aria-label="Search"
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
          <span className="nav-search-label">Search</span>
        </Link>

        <DarkModeToggle />
      </div>
    </div>
  );
}