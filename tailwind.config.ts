import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
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
      fontSize: {
        base: "16px",
        h1: "30px",
        h2: "25px",
        h3: "20px",
        h4: "17px",
        p1: "14px",
        p2: "12px",
        p3: "10px",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        card: "0px 0px 2px 0px rgba(145,158,171,0.24), 0px 12px 24px -4px rgba(145,158,171,0.12)",
        dark: "0px 0px 2px 0px rgba(0,0,0,0.2), 0px 12px 24px -4px rgba(0,0,0,0.12)",
        dialog: "-40px 40px 80px rgba(0,0,0,0.24)",
        popoverContent: "-30px 30px 80px rgba(0,0,0,0.15)",
        dropdown:
          "0px 0px 2px 0px rgba(145,158,171,0.24), -20px 20px 40px -4px rgba(145,158,171,0.24)",
      },
      borderRadius: {
        card: "16px",
        dropdownBox: "10px",
        dropdownItem: "10px",
      },
      padding: {
        card: "24px",
      },
      margin: {
        "page-heading": "20px",
      },
      gap: {
        dropdownItem: "16px",
      },
      colors: {
        "primary-1": "var(--primary-1)",
        "primary-2": "var(--primary-2)",
        "primary-3": "var(--primary-3)",
        "primary-4": "var(--primary-4)",
        "primary-5": "var(--primary-5)",
        "primary-6": "var(--primary-6)",
        "theme-teal": "var(--theme-teal)",
        "theme-blue": "var(--theme-blue)",
        "theme-violet": "var(--theme-violet)",
        "theme-sky": "var(--theme-sky)",
        "theme-yellow": "var(--theme-yellow)",
        "theme-rose": "var(--theme-rose)",
        light1: "#f8fafc",
        light2: "#f1f5f9",
        light3: "#e2e8f0",
        dark1: "#141a21",
        dark2: "#182027",
        dark3: "#202831",
        "error-light": "#e11d48",
        "error-dark": "#f43f5e",
        disabled: {
          dark: "#1e293b",
          light: "#cbd5e1",
        },
        completed: {
          light: "#94a3b8",
          dark: "#64748b",
        },
        border: {
          light: "#cbd5e1",
          dark: "#334155",
        },
        icon: {
          light: "#64748b",
          dark: "#94a3b8",
          hover: {
            light: "#0f172a",
            dark: "#e2e8f0",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
