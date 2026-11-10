/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#070711',
          card: '#0c0c1d',
          surface: '#12122b',
          border: '#1f1f44',
          violet: '#8B5CF6',
          cyan: '#00E5FF',
          green: '#C6FF00',
          acid: '#C6FF00',
          muted: '#8F9CAE',
        },
      },
      fontFamily: {
        sans: ['Rajdhani', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Orbitron', 'Rajdhani', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -4px rgba(0, 229, 255, 0.55)',
        'glow-violet': '0 0 25px -4px rgba(139, 92, 246, 0.55)',
        'glow-green': '0 0 25px -4px rgba(198, 255, 0, 0.55)',
        'cyber-panel': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08), 0 10px 30px -10px rgba(0, 0, 0, 0.8)',
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(to right, rgba(139, 92, 246, 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 229, 255, 0.07) 1px, transparent 1px)',
        'cyber-dots': 'radial-gradient(circle, rgba(0, 229, 255, 0.15) 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
        'glow-ping': 'glowPing 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        glowPing: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
