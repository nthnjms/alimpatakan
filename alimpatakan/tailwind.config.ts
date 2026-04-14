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
        },
      },
      maxWidth: {
        reading: "680px",
        wide: "1200px",
      },
      animation: {
        "fade-up": "fadeUp 0.4s ease forwards",
        "fade-in": "fadeIn 0.3s ease forwards",
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
      },
    },
  },
  plugins: [],
};

export default config;