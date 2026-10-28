/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        inet: {
          primary: '#3BE29F',
          secondary: '#E1FE7D',
          navy: '#202A45',
          black: '#0B111B',
          darkSurface: '#131C2B',
          yellow: {
            50: '#FBFFEF',
            100: '#F2FFCE',
            200: '#ECFFB6',
            300: '#E3FF94',
            400: '#DDFF80',
            500: '#D5FF60',
            600: '#C2E857',
            700: '#97B544',
            800: '#758C35',
            900: '#596B28',
          }
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'Sukhumvit Set', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'hero': '0 20px 40px -15px rgba(59, 226, 159, 0.15)',
        'card-hero': '5px 0 4px rgba(0, 0, 0, 0.09)',
        'test': '0 4px 4px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
