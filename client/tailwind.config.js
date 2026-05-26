export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#fdfbf9',
        bg2: '#f8f4ef',
        beige: '#e3ddd4',
        beige2: '#d9d0c7',
        blue: '#9a9186',
        brown: '#9a9186',
        grey: '#5c4f48',
        grey2: '#4a3e37',
        dark: '#4a3e37',
      },
      fontFamily: {
        mono: ['Courier New', 'Courier', 'monospace'],
      }
    },
  },
  plugins: [],
}
