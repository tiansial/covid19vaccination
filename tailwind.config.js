module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      serif: ["Crimson Pro", "serif"],
      sans: ["Poppins", "ui-sans-serif"]
    },
    container: {
      center: true
    },
    extend: {
      colors: {
        brand: "#05555b",
        beige: "#efdbc8"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
