module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "at-main-purple": "#6d28d9",
        "at-purple": "#F3F1F9",
        "at-main-button-purple": "#6d28d9",
        "at-darker-button-purple": "#a78bfa",
        "at-green": "#286d5d",
        "light-grey": "#f1f1f1",
      },
    },
    fontFamily: {
      Poppins: ["Poppins, sans-serif"],
    },
    flex: {
      "1": "1 1 0%",
      "2": "2 2 0%",
    },
    container: {
      center: true,
      screens: {
        lg: "1124px",
        xl: "1124px",
        "2xl": "1124px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
