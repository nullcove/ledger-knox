/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mati: {
          bg: "#F9F7F5",
          clay: "#B45309",
          stone: "#E5E7EB",
        },
        primary: "#92400E",
        secondary: "#111827",
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "Outfit", "Inter", "sans-serif"],
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
