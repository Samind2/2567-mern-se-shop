/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        red: "#830139",
        secondary: "#555",
        primaryBG: "#FCFCFC"
      }
    },
  },
  plugins: [daisyui],
}

