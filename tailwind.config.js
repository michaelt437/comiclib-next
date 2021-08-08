const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "sky": {
          50: colors.sky[50],
          100: colors.sky[100],
          200: colors.sky[200],
          300: colors.sky[300],
          400: colors.sky[400],
          500: colors.sky[500],
          600: colors.sky[600],
          700: colors.sky[700],
          800: colors.sky[800],
          900: colors.sky[900]
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
        "vertigo": colors.gray[700],
        "image": colors.gray[800],
        "dark-horse": colors.orange[800]
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ["active"]
    }
  },
  plugins: []
};
