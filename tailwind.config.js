/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["inter"],
      },
      colors: {
        mateoryPurple: "#A72DBC",
        mateoryPurpleLight: "#A54AB5"
      },
    },
  },
  plugins: [],
};
