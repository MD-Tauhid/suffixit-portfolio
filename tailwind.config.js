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
        "marquee-vertical": "marquee-vertical var(--duration, 30s) linear infinite",
        "marquee-vertical-reverse": "marquee-vertical-reverse var(--duration, 30s) linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - 1rem))" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(calc(-100% - 1rem))" },
          to: { transform: "translateX(0)" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - 1rem))" },
        },
        "marquee-vertical-reverse": {
          from: { transform: "translateY(calc(-100% - 1rem))" },
          to: { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
