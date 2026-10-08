import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "80rem",
      },
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: "#42434e",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#e11d48",
          hover: "#be123c",
          foreground: "#ffffff",
        },
        ink: {
          DEFAULT: "#111827",
          muted: "#6b7280",
        },
        canvas: "#f5f5f7",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "#e11d48",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#42434e",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#f5f5f7",
          foreground: "#42434e",
        },
        destructive: {
          DEFAULT: "#dc2626",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f5f5f7",
          foreground: "#6b7280",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#111827",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#111827",
        },
      },
      borderRadius: {
        lg: "12px",
        md: "10px",
        sm: "8px",
        card: "12px",
        pill: "9999px",
      },
      boxShadow: {
        card: "0 8px 24px rgba(17, 24, 39, 0.08)",
        elevated: "0 16px 40px rgba(17, 24, 39, 0.16)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        "7xl": "80rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate],
};

export default config;
