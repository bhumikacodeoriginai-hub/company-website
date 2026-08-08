import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0a1628',
          800: '#0f2140',
          700: '#142c54',
          600: '#1a3768',
          500: '#1e4280',
        },
        brand: {
          blue: '#1e40af',
          electric: '#0ea5e9',
          cyan: '#06b6d4',
        },
        graphite: '#2d2d44',
        charcoal: '#1a1a2e',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(3rem, 6vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'h1': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'h2': ['clamp(2rem, 3.5vw, 3.5rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'h3': ['clamp(1.5rem, 2.5vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h4': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.3' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
      borderRadius: {
        'card': '1.25rem',
        'button': '0.625rem',
        'container': '1.5rem',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
        'card-hover': '0 10px 25px -5px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.04)',
        'nav': '0 1px 3px rgba(0,0,0,0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
