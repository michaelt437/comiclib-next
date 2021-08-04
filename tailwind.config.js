const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "sky": {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e"
        },
        "blueGray": {
          50: colors.blueGray[50],
          100: colors.blueGray[100],
          200: colors.blueGray[200],
          300: colors.blueGray[300],
          400: colors.blueGray[400],
          500: colors.blueGray[500],
          600: colors.blueGray[600],
          700: colors.blueGray[700],
          800: colors.blueGray[800],
          900: colors.blueGray[900]
        },
        "marvel": colors.red[500],
        "dc": colors.blue[500],
        "dc-black": colors.blue[800],
        "vertigo": colors.gray[700],
        "image": colors.gray[800],
        "dark-horse": colors.orange[800]
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
