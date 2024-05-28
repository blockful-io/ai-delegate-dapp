/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
 "./app/**/*.{js,ts,jsx,tsx,mdx}",
 "./pages/**/*.{js,ts,jsx,tsx,mdx}",
 "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-avatar":
          "linear-gradient(330deg, #B2FF72 4.54%, #000000 59.2%, #99E24E 148.85%)",
      },
    },
  },
  plugins: [],
}

