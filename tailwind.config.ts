import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "#050505", 2: "#0a0a12", 3: "#111120" },
        accent: { DEFAULT: "#7b8aff", blue: "#3b6cf5", violet: "#7c3aed" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        cursive: ["var(--font-cursive)", "cursive"],
      },
      borderRadius: {
        pill: "100px",
        card: "22px",
      },
      animation: {
        "marquee": "marquee 22s linear infinite",
        "marquee-rev": "marquee 22s linear infinite reverse",
        "float": "float 9s ease-in-out infinite",
        "glow-1": "glow-drift-1 12s ease-in-out infinite alternate",
        "glow-2": "glow-drift-2 15s ease-in-out infinite alternate",
        "glow-3": "glow-drift-3 10s ease-in-out infinite alternate",
        "glow-4": "glow-drift-4 18s ease-in-out infinite alternate",
        "glow-5": "glow-drift-5 20s ease-in-out infinite alternate",
        "mesh": "mesh-drift 18s ease-in-out infinite alternate",
        "aurora-1": "aurora-drift-1 22s ease-in-out infinite alternate",
        "aurora-2": "aurora-drift-2 28s ease-in-out infinite alternate",
        "aurora-3": "aurora-drift-3 25s ease-in-out infinite alternate",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "30%": { transform: "translateY(-10px)" },
          "60%": { transform: "translateY(5px)" },
        },
        "glow-drift-1": {
          "0%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(40px,-30px) scale(1.1)" },
          "100%": { transform: "translate(-20px,20px) scale(0.95)" },
        },
        "glow-drift-2": {
          "0%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(-50px,25px) scale(1.08)" },
          "100%": { transform: "translate(30px,-15px) scale(1.05)" },
        },
        "glow-drift-3": {
          "0%": { transform: "translate(0,0) scale(1)", opacity: "0.7" },
          "50%": { transform: "translate(15px,-10px) scale(1.15)", opacity: "1" },
          "100%": { transform: "translate(-10px,15px) scale(0.9)", opacity: "0.6" },
        },
        "glow-drift-4": {
          "0%": { transform: "translate(0,0) scale(1)" },
          "100%": { transform: "translate(-60px,40px) scale(1.12)" },
        },
        "glow-drift-5": {
          "0%": { transform: "translate(0,0) scale(1)" },
          "100%": { transform: "translate(50px,-30px) scale(1.08)" },
        },
        "mesh-drift": {
          "0%": { transform: "translate(0,0) rotate(0deg)" },
          "33%": { transform: "translate(3%,2%) rotate(2deg)" },
          "66%": { transform: "translate(-2%,3%) rotate(-1deg)" },
          "100%": { transform: "translate(2%,-2%) rotate(1deg)" },
        },
        "aurora-drift-1": {
          "0%": { transform: "translate(0, 0) scale(1) rotate(0deg)" },
          "33%": { transform: "translate(60px, -40px) scale(1.15) rotate(3deg)" },
          "66%": { transform: "translate(-30px, 30px) scale(0.9) rotate(-2deg)" },
          "100%": { transform: "translate(20px, -20px) scale(1.05) rotate(1deg)" },
        },
        "aurora-drift-2": {
          "0%": { transform: "translate(0, 0) scale(1) rotate(0deg)" },
          "33%": { transform: "translate(-50px, 35px) scale(1.1) rotate(-3deg)" },
          "66%": { transform: "translate(40px, -25px) scale(1.2) rotate(2deg)" },
          "100%": { transform: "translate(-20px, 15px) scale(0.95) rotate(-1deg)" },
        },
        "aurora-drift-3": {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(30px, 20px) scale(1.12)" },
          "100%": { transform: "translate(-40px, -15px) scale(0.92)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
