/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%, 100%": { opacity: 0 },
          "10%": { opacity: 1 },
        }
      },
      animation: {
        fadeIn: "fadeIn 10s ease-in-out alternate",
      },
      fontFamily: {
        Montserrat: ["Montserrat"],
      },
      colors: {
        "homegray": "#D5D0C7",
        "gray-med": "#989898",
        "border-gray": "#848484",
        "border-blue": "#100F49",
        "side-gray": "#F4F1EC",
        "card-green": "#BDD9BF",
        "text-gray": "#636363",
        "button-purple": "#2C2B60",
        'blue-button': '#100F49',
        'white-med': '#FFFFFF',
        'gray-input': '#9F9F9F',
        'remove': '#D03939',
        'gray-pront': '#E5E3DB',
        "other-white": "#FCFCFC",
        'gray-button': '#9F9F9F',
        'mui': '#00000099'
      },
      backgroundImage: {
        search: "url('../images/search.png)",
        'prontuario-box': "url(src/images/prontuario.svg)",
        'hover-box': "url(src/images/hover-pront.svg)"
      },
    },
  },
  plugins: [],
};
