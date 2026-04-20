"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Logo() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div style={{ height: "clamp(60px, 10vw, 120px)" }} />
  );

  const isDark = theme === "dark";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={isDark ? "/logo-white.png" : "/logo-black.png"}
      alt="ALIMPATAKAN"
      style={{
        height: "clamp(60px, 10vw, 120px)",
        width: "auto",
        display: "block",
        margin: "0 auto",
        maxWidth: "100%",
      }}
    />
  );
}