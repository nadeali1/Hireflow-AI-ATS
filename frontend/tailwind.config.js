/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#8B9A6E",
          dark: "#71805A",
          light: "#A3B08A",
        },
        canvas: "#F7F2EB",
        surface: "#EAE2D6",
        neutral: "#EEEEEE",
        ink: {
          DEFAULT: "#2B2A26",
          soft: "#5C5A52",
        },
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(43, 42, 38, 0.06)",
      },
      borderRadius: {
        md: "8px",
        lg: "12px",
      },
    },
  },
  plugins: [],
};
