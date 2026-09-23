/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#08090D',
        secondary: '#101218',
        surface: {
          DEFAULT: '#151821',
          card: '#181B26',
          hover: '#1F2432',
          active: '#272E3F',
        },
        border: {
          DEFAULT: '#232736',
          subtle: 'rgba(255, 255, 255, 0.08)',
          glow: 'rgba(204, 255, 0, 0.3)',
        },
        text: {
          primary: '#F5F5F5',
          muted: '#8D929D',
          dim: '#555A68',
        },
        neon: {
          DEFAULT: '#CCFF00',
          hover: '#B8E600',
          muted: '#88AA00',
          dim: 'rgba(204, 255, 0, 0.12)',
          glow: 'rgba(204, 255, 0, 0.25)',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', '"Space Grotesk"', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'neon': '0 0 25px -5px rgba(204, 255, 0, 0.25)',
        'neon-sm': '0 0 12px -2px rgba(204, 255, 0, 0.3)',
        'neon-strong': '0 0 35px 2px rgba(204, 255, 0, 0.4)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'noise': "radial-gradient(rgba(204, 255, 0, 0.03) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
}
