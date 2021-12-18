const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
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
