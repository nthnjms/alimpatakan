"use client";

import { useEffect, useState } from "react";

export default function LiveClock() {
  const [time, setTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const update = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-PH", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Manila",
      });
      setTime(timeString);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted || !time) return null;

  return (
    <span
      className="dateline"
      style={{
        color: "var(--accent)",
        fontVariantNumeric: "tabular-nums",
        letterSpacing: "0.15em",
      }}
    >
      {time}
    </span>
  );
}