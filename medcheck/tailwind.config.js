/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Albert Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Albert Sans"', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#0208F9',
          dark: '#0106cc',
          light: '#333bff',
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
        },
      },
      borderRadius: {
        xl: '0.75rem',
      },
      boxShadow: {
        card: '0 2px 12px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 20px rgba(0, 0, 0, 0.08)',
        subtle: '0 2px 8px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}