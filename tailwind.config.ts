import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0F0F0F',
        surface: '#1A1C23',
        text: '#F2F2F2',
        muted: '#A9A9B3',
        primary: '#00BFFF',
        success: '#00FF9C',
        warning: '#FFA500',
        danger: '#FF4C4C',
        border: '#2C2F36',
      },
      boxShadow: {
        neon: '0 0 10px rgba(0, 191, 255, 0.4)',
        greenGlow: '0 0 10px rgba(0, 255, 156, 0.4)',
      },
      fontFamily: {
        futuristic: ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
