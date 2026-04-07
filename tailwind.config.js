module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Open Sans', 'sans-serif'],
        Opensans: ['Open Sans', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 50px rgba(15, 23, 42, 0.10)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};