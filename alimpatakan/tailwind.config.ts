import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        mono: ["var(--font-ibm-plex-mono)", "Courier New", "monospace"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          DEFAULT: "#0d0d0d",
          50: "#f5f2eb",
          100: "#e8e4d9",
          200: "#d0c9b8",
          300: "#a89e87",
          400: "#7a6f5a",
          500: "#4a4035",
          600: "#2a221a",
          700: "#1a120c",
          800: "#110b06",
          900: "#0d0d0d",
        },
        paper: {
          DEFAULT: "#f5f2eb",
          dark: "#0a0a0a",
        },
        accent: {
          DEFAULT: "#C8A800",
          dark: "#E8D44D",
          dim: "rgba(200, 168, 0, 0.1)",
          "dim-dark": "rgba(232, 212, 77, 0.12)",
        },
      },
      fontSize: {
        "display-xl": ["clamp(48px, 8vw, 96px)", { lineHeight: "0.9", letterSpacing: "-3px" }],
        "display-lg": ["clamp(36px, 5vw, 64px)", { lineHeight: "0.95", letterSpacing: "-2px" }],
        "display-md": ["clamp(24px, 3vw, 40px)", { lineHeight: "1.05", letterSpacing: "-1px" }],
        "headline": ["clamp(20px, 2.5vw, 28px)", { lineHeight: "1.1", letterSpacing: "-0.5px" }],
        "dateline": ["10px", { lineHeight: "1.4", letterSpacing: "0.2em" }],
        "label": ["9px", { lineHeight: "1.4", letterSpacing: "0.25em" }],
      },
      spacing: {
        "col": "24px",
        "gutter": "48px",
      },
      borderWidth: {
        "3": "3px",
        "0.5": "0.5px",
      },
      maxWidth: {
        "reading": "680px",
        "wide": "1200px",
      },
      animation: {
        "fade-up": "fadeUp 0.4s ease forwards",
        "fade-in": "fadeIn 0.3s ease forwards",
        "cursor-pulse": "cursorPulse 1.5s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        cursorPulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
      },
      transitionTimingFunction: {
        "editorial": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    },
  },
  plugins: [],
};

export default config;