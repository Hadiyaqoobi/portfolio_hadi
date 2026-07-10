import type { Config } from "tailwindcss";

export default {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1536px",
      },
    },
    extend: {
      colors: {
        // Redesign v4 tokens (see DESIGN_SPEC.md). Components use ONLY these.
        paper: {
          DEFAULT: "var(--paper)",
          raised: "var(--paper-raised)",
        },
        line: "var(--line)",
        ink: {
          DEFAULT: "var(--ink)",
          soft: "var(--ink-soft)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          soft: "var(--accent-soft)",
          foreground: "var(--paper)",
        },
        ok: "var(--ok)",
        // shadcn compatibility aliases kept for the few ui/ components still mounted
        border: "var(--line)",
        input: "var(--line)",
        ring: "var(--accent)",
        background: "var(--paper)",
        foreground: "var(--ink)",
        primary: {
          DEFAULT: "var(--ink)",
          foreground: "var(--paper)",
        },
        secondary: {
          DEFAULT: "var(--paper-raised)",
          foreground: "var(--ink)",
        },
        destructive: {
          DEFAULT: "var(--accent)",
          foreground: "var(--paper)",
        },
        popover: {
          DEFAULT: "var(--paper-raised)",
          foreground: "var(--ink)",
        },
        card: {
          DEFAULT: "var(--paper-raised)",
          foreground: "var(--ink)",
        },
      },
      fontFamily: {
        display: ["Fraunces", "Iowan Old Style", "Georgia", "serif"],
        serif: ["Newsreader", "Iowan Old Style", "Georgia", "serif"],
        sans: [
          "Seravek",
          "Gill Sans Nova",
          "Ubuntu",
          "Calibri",
          "DejaVu Sans",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        mono: ["ui-monospace", "SF Mono", "Menlo", "Consolas", "monospace"],
      },
      spacing: {
        section: "4rem",
        "section-lg": "5rem",
        "section-xl": "6rem",
      },
      borderRadius: {
        lg: "8px",
        md: "6px",
        sm: "4px",
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
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
