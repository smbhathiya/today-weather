/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mainColor: "#ededed",
        mainColorHover: "#a6e6ff",
        primaryColor: "#1697c9",
        primaryColorHover: "#0c82b0",
        textColor: "#000000",
        darkMainColor: "#2D3748",
        darkMainColorHover: "#4A5568",
        darkPrimaryColor: "#63B3ED",
        darkPrimaryColorHover: "#4299E1",
        darkTextColor: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
