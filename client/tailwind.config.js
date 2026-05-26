export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'desktop-bg': '#d6cdb8',
        'tile-bg': '#2c241e',
        'tile-header': '#3a2f28',
        'tile-dark': '#221c17',
        'border-dark': '#4a3b30',
        'text-light': '#ebdfc7',
        'text-muted': '#b7a98b',
        'accent': '#d4a373',
        'separator': '#5a4a3a',
      },
      fontFamily: {
        mono: ['Courier New', 'Courier', 'monospace'],
      }
    },
  },
  plugins: [],
}
