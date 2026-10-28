/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--br)",
          foreground: "#ffffff",
        },
      },
      animation: {
        marquee: "marquee var(--duration, 30s) linear infinite",
        "marquee-reverse": "marquee-reverse var(--duration, 30s) linear infinite",
      },
      keyframes: {
        marquee: {
          to: { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
