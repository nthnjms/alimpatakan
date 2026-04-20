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
      <nav style={{ display: "flex", gap: "24px" }}>
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
      <DarkModeToggle />
    </div>
  );
}