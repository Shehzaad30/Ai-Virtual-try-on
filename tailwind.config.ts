import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Luminaire AI design system
        "surface": "#131313",
        "surface-dim": "#131313",
        "surface-bright": "#393939",
        "surface-container-lowest": "#0e0e0e",
        "surface-container-low": "#1c1b1b",
        "surface-container": "#201f1f",
        "surface-container-high": "#2a2a2a",
        "surface-container-highest": "#353534",
        "on-surface": "#e5e2e1",
        "on-surface-variant": "#ccc3d8",
        "outline": "#958da1",
        "outline-variant": "#4a4455",
        "primary": "#d2bbff",
        "on-primary": "#3f008e",
        "primary-container": "#7c3aed",
        "on-primary-container": "#ede0ff",
        "secondary": "#89ceff",
        "on-secondary": "#00344d",
        "secondary-container": "#00a2e6",
        "background": "#131313",
        "on-background": "#e5e2e1",
        "surface-variant": "#353534",
        "surface-tint": "#d2bbff",
        "error": "#ffb4ab",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      spacing: {
        "margin-desktop": "64px",
        "margin-mobile": "20px",
        "gutter": "24px",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.18) 0%, transparent 70%)",
        "violet-blue": "linear-gradient(120deg, #7c3aed, #00a2e6)",
      },
    },
  },
  plugins: [],
};
export default config;
