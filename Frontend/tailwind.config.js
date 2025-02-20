/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",                
    "./src/**/*.{js,ts,jsx,tsx}",  
  ],
  theme: {
    extend: {
      outfit: ['Outfit', 'sans-serif'],
    },
  },
  plugins: [require('daisyui')],  
};
