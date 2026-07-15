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
        line: {
          DEFAULT: "var(--line)",
          2: "var(--line-2)",
          3: "var(--line-3)",
        },
        leader: "var(--leader)",
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
          deep: "var(--accent-deep)",
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
        display: ["IBM Plex Serif", "Iowan Old Style", "Georgia", "serif"],
        serif: ["IBM Plex Serif", "Iowan Old Style", "Georgia", "serif"],
        sans: ["IBM Plex Sans", "system-ui", "-apple-system", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "SF Mono", "Menlo", "monospace"],
      },
      spacing: {
        section: "4rem",
        "section-lg": "5rem",
        "section-xl": "6rem",
      },
      // Spec-document system: sharp corners everywhere; only circles are round.
      borderRadius: {
        lg: "0px",
        md: "0px",
        sm: "0px",
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
