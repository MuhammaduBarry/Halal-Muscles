/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.{html,js}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
    screens: {
      "md": {"max":'860px'},
      "sm": {"max":'395px'},
      "xsm": {"max":'281px'}
    }
  },
  plugins: [require("flowbite/plugin")],
};
