// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        pink: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbc2d6",
          300: "#f992b7",
          400: "#ec4899",
          500: "#db2777",
          600: "#be185d",
          700: "#9d174d",
          800: "#831843",
          900: "#6f213f",
        },
      },
    },
    fontFamily: {
      extraBolddd: ["Poppins", "sans-serif"],
    },
  },
  variants: {},
  plugins: [],
};
