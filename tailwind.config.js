/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050507',
        secondary: '#0A0D12',
        surface: {
          DEFAULT: '#0D1118',
          card: '#111620',
          hover: '#161D2B',
          active: '#1D2638',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          subtle: 'rgba(255, 255, 255, 0.04)',
          strong: 'rgba(255, 255, 255, 0.16)',
          accent: 'rgba(0, 240, 255, 0.35)',
          violet: 'rgba(139, 92, 246, 0.35)',
          glow: 'rgba(0, 240, 255, 0.3)',
        },
        accent: {
          cyan: '#00F0FF',
          'cyan-hover': '#33F3FF',
          'cyan-muted': 'rgba(0, 240, 255, 0.12)',
          'cyan-glow': 'rgba(0, 240, 255, 0.25)',
          violet: '#8B5CF6',
          'violet-hover': '#A78BFA',
          'violet-muted': 'rgba(139, 92, 246, 0.12)',
          'violet-glow': 'rgba(139, 92, 246, 0.25)',
          magenta: '#EC4899',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#ECEEF2',
          muted: '#7C8394',
          dim: '#4A5162',
        },
        neon: {
          DEFAULT: '#00F0FF',
          hover: '#33F3FF',
          muted: 'rgba(0, 240, 255, 0.12)',
          dim: 'rgba(0, 240, 255, 0.08)',
          glow: 'rgba(0, 240, 255, 0.25)',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', '"Space Grotesk"', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'cyan': '0 0 25px -5px rgba(0, 240, 255, 0.25)',
        'cyan-sm': '0 0 12px -2px rgba(0, 240, 255, 0.3)',
        'cyan-strong': '0 0 35px 2px rgba(0, 240, 255, 0.4)',
        'violet': '0 0 25px -5px rgba(139, 92, 246, 0.25)',
        'violet-sm': '0 0 12px -2px rgba(139, 92, 246, 0.3)',
        'neon': '0 0 25px -5px rgba(0, 240, 255, 0.25)',
        'neon-sm': '0 0 12px -2px rgba(0, 240, 255, 0.3)',
        'neon-strong': '0 0 35px 2px rgba(0, 240, 255, 0.4)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
      },
      backgroundImage: {
        'noise': "radial-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
}
