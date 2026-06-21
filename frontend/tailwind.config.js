/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f0f5f0",
          100: "#dbe8db",
          200: "#b7d1b8",
          300: "#8eb690",
          400: "#5f9663",
          500: "#3f7843",
          600: "#2d5e31",
          700: "#234a26",
          800: "#1a3a1e",
          900: "#0f2412",
          950: "#081509",
        },
        cream: {
          50: "#fffdf8",
          100: "#fdf8ec",
          200: "#faf0d6",
          300: "#f4e4b8",
        },
        gold: {
          400: "#d4af37",
          500: "#c19a2e",
          600: "#a47f24",
        },
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["'Manrope'", "sans-serif"],
      },
      boxShadow: {
        premium: "0 10px 40px -10px rgba(15, 36, 18, 0.15)",
        gold: "0 4px 14px 0 rgba(196, 154, 46, 0.3)",
      },
    },
  },
  plugins: [],
}
