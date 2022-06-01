module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        'violet':'0px 0px 5px #4A5DFF',
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
      },
      
    },
  },
  plugins: [],
}
