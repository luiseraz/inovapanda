/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'panda-black': '#000000',
        'panda-white': '#FFFFFF',
        'bamboo-green': '#4CAF50',
        'bamboo-light': '#81C784',
        'bamboo-dark': '#2E7D32',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 