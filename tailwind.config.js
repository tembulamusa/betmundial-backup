/** @type {import('tailwindcss').Config} */

module.exports = {

  content: [

    "./src/**/*.{js,jsx,ts,tsx}",

  ],

  theme: {

    extend: {
      colors: {
        'custom-red': 'rgba(231, 6, 84, 1)',
      },
    },
    
  },

  plugins: [],

}
