"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const getScrollParent = (): Element | Window => {
      const elements = [document.documentElement, document.body];
      for (const el of elements) {
        if (el.scrollHeight > el.clientHeight) {
          const overflow = getComputedStyle(el).overflow +
            getComputedStyle(el).overflowY;
          if (/auto|scroll/.test(overflow)) return el;
        }
      }
      return window;
    };

    const updateProgress = () => {
      const scrollTop = window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        (window.innerHeight || document.documentElement.clientHeight);
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(percent, 100));
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    document.addEventListener("scroll", updateProgress, { passive: true });
    document.documentElement.addEventListener("scroll", updateProgress, { passive: true });
    document.body.addEventListener("scroll", updateProgress, { passive: true });

    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
      document.removeEventListener("scroll", updateProgress);
      document.documentElement.removeEventListener("scroll", updateProgress);
      document.body.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: "6px",
        background: "red",
        zIndex: 99999,
        pointerEvents: "none",
      }}
    />
  );
}