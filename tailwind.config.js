/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0a0a0b',   // Deep near-black background
          soft: '#111113',      // Elevated panels
          line: '#1f1f23',      // Hairline borders
        },
        paper: {
          DEFAULT: '#f5f5f4',   // Off-white primary text
          dim: '#a1a1aa',       // Muted secondary text
          faint: '#6b6b72',     // Tertiary text
        },
        accent: {
          DEFAULT: '#8b7cf6',   // Refined violet
          soft: '#a99cf9',
          dim: '#5b4fc4',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'drift': 'drift 26s ease-in-out infinite',
        'drift-slow': 'drift 34s ease-in-out infinite reverse',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(4%, 5%, 0)' },
        },
      }
    },
  },
  plugins: [],
}
