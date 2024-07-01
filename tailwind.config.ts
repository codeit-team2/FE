import type { Config } from 'tailwindcss';

const px0_10 = Object.fromEntries(Array.from({ length: 11 }, (_, i) => [i, `${i}px`]));
const px0_50 = Object.fromEntries(Array.from({ length: 51 }, (_, i) => [i, `${i}px`]));
const px0_100 = Object.fromEntries(Array.from({ length: 101 }, (_, i) => [i, `${i}px`]));
const px0_200 = Object.fromEntries(Array.from({ length: 201 }, (_, i) => [i, `${i}px`]));
const px0_400 = Object.fromEntries(Array.from({ length: 401 }, (_, i) => [i, `${i}px`]));
const px0_1000 = Object.fromEntries(Array.from({ length: 1001 }, (_, i) => [i, `${i}px`]));

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      borderRadius: px0_50,
      borderWidth: px0_50,
      lineHeight: px0_100,
      fontSize: px0_100,
      spacing: px0_400,
      minWidth: px0_400,
      minHeight: px0_400,
      width: px0_1000,
      height: px0_1000,
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        'primary-hover': 'var(--primary-hover)',
        'secondary-hover': 'var(--secondary-hover)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
