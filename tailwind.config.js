/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.{html,js}",   "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      backgroundImage: {
        'sunny-bg': "url('/images/sunny.png')",
        'rainy-bg': "url('/images/rainy.png')",
        'cloudy-bg': "url('/images/cloudy.png')",
        'windy-bg': "url('/images/windy.png')",
        'stormy-bg': "url('/images/stormy.png')",
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

