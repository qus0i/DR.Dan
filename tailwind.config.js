/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#0f766e', light: '#e6f5f3', dark: '#064e3b' },
        accent: { DEFAULT: '#c8a960', light: '#fdf8ed' },
      },
      fontFamily: {
        tajawal: ['Tajawal', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
