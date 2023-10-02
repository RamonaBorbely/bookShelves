/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/css/**/*.{html,js,css}",
    "./views/**/*.ejs",
    "./src/**/*.{html,js,css}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      // backgroundImage: {
      //   'bookImg': "url('assets/imgs/books_1.jpg')",
      //   'logo': "url('assets/icons/logo.svg')"
      // },
    },
    fontFamily: {
      'cursive': ['Fasthand','cursive'],
      'sans': ['Roboto', 'sans-serif']
    },
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '1': '1px',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    }
  },
  plugins: [require("tw-elements/dist/plugin.cjs")]
}

