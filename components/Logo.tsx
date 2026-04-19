"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Logo() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <img
      src={isDark ? "/logo-white.png" : "/logo-black.png"}
      alt="ALIMPATAKAN"
      style={{
        width: "clamp(600px, 40vw, 600px)",
        height: "auto",
        display: "block",
        margin: "0 auto",
      }}
    />
  );
}