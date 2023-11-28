/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lp: '#E9D6DA',
        mp: '#827398',
        dp: '#4D4C7C',
      },
    },
  },
  plugins: [],
};
