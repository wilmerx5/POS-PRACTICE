/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
export default {
  content: [
'./index.html',
'./src/**/*.{js,vue,jsx,tsx}',
'./formkit.config.js',
'./node_modules/vue-tailwind-datepicker/**/*.js'

  ],
  theme: {
    extend: {
      colors:{
        "vtd-primary":colors.indigo
    },
      width: {
        '10vw': '10vw',
        '20vw': '20vw',
        '30vw': '30vw',
        '40vw': '40vw',
        '50vw': '50vw',
        '60vw': '60vw',
        '70vw': '70vw',
        '80vw': '80vw',
        '90vw': '90vw',
        '100vw': '100vw',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

