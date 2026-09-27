import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#26372B",
          50: "#F1F4F2",
          100: "#DEE5E0",
          200: "#B9C7BC",
          300: "#92A796",
          400: "#5D7B64",
          500: "#26372B",
          600: "#1F2D23",
          700: "#18221B",
          800: "#101712",
          900: "#090D0A",
        },
        sage: {
          DEFAULT: "#55634A",
          50: "#F5F6F3",
          100: "#E6E9E1",
          200: "#CAD1C2",
          300: "#ADB9A2",
          400: "#8B9A7E",
          500: "#55634A",
          600: "#444F3B",
          700: "#343C2C",
        },
        cream: {
          DEFAULT: "#F6F1E7",
          50: "#FFFEFC",
          100: "#FAF7F2",
          200: "#F6F1E7",
          300: "#E9DFCE",
          400: "#DC Dunbar",
          500: "#CBBBA1",
        },
        warmWhite: "#FFFDF8",
        terracotta: {
          DEFAULT: "#C97955",
          50: "#FAF1ED",
          100: "#F4DFD5",
          200: "#EABDAA",
          300: "#E09B7F",
          400: "#D58A6A",
          500: "#C97955",
          600: "#B45F38",
          700: "#8D4727",
        },
        gold: {
          DEFAULT: "#B9955A",
          50: "#FAF6EF",
          100: "#F2E8D7",
          200: "#E3CEAB",
          300: "#D4B47F",
          400: "#C7A56C",
          500: "#B9955A",
          600: "#9A7A44",
          700: "#7A6034",
        },
        dark: {
          DEFAULT: "#263026",
          muted: "#5B6A5C",
          subtle: "#8A968B",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-be-vietnam)", "Inter", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 4px 20px -2px rgba(38, 55, 43, 0.05)",
        card: "0 10px 30px -4px rgba(38, 55, 43, 0.08)",
        floating: "0 20px 40px -10px rgba(38, 55, 43, 0.12)",
        gold: "0 0 25px rgba(185, 149, 90, 0.25)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(1.5deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
