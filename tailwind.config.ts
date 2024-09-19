import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        backgroundStart: "var(--background-start-rgb)",
        foreground: "var(--foreground-rgb)",
        turquise: "#1abc9c",
        emerald: "#2ecc71",
        "peter-river": "#3498db",
        amethyst: "#9b59b6",
        "wet-asphalt": "#34495e",
        "green-sea": "#16a085",
        nephritis: "#16a085",
        "belize-hol": "#2980b9",
        wisteria: "#8e44ad",
        midnight: "#2c3e50",
        "sun-flower": "#f1c40f",
        carrot: "#e67e22",
        alizarin: "#e74c3c",
        clouds: "#ecf0f1",
        concrete: "#95a5a6",
        orange: "#f39c12",
        pumpkin: "#d35400",
        pomegranate: "#c0392b",
        silver: "#bdc3c7",
        asbestos: "#7f8c8d",
      },
    },
  },
  plugins: [],
};
export default config;
