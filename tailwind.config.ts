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
      fontFamily: {
        Pretendard: ['Pretendard'],
      },
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
        'neutral-gray-10': 'var(--neutral-gray-10)',
        'neutral-gray-50': 'var(--neutral-gray-50)',
        'neutral-gray-100': 'var(--neutral-gray-100)',
        'neutral-gray-200': 'var(--neutral-gray-200)',
        'neutral-gray-300': 'var(--neutral-gray-300)',
        'neutral-gray-400': 'var(--neutral-gray-400)',
        'neutral-gray-500': 'var(--neutral-gray-500)',
        'neutral-gray-600': 'var(--neutral-gray-600)',
        'neutral-gray-700': 'var(--neutral-gray-700)',
        'neutral-gray-800': 'var(--neutral-gray-800)',
        'neutral-gray-900': 'var(--neutral-gray-900)',
        'secondary-blue-10': 'var(--secondary-blue-10)',
        'secondary-blue-50': 'var(--secondary-blue-50)',
        'secondary-blue-100': 'var(--secondary-blue-100)',
        'secondary-blue-200': 'var(--secondary-blue-200)',
        'secondary-blue-300': 'var(--secondary-blue-300)',
        'secondary-blue-400': 'var(--secondary-blue-400)',
        'secondary-blue-500': 'var(--secondary-blue-500)',
        'secondary-blue-600': 'var(--secondary-blue-600)',
        'secondary-blue-700': 'var(--secondary-blue-700)',
        'secondary-blue-800': 'var(--secondary-blue-800)',
        'secondary-blue-900': 'var(--secondary-blue-900)',
        'secondary-red-10': 'var(--secondary-red-10)',
        'secondary-red-50': 'var(--secondary-red-50)',
        'secondary-red-100': 'var(--secondary-red-100)',
        'secondary-red-200': 'var(--secondary-red-200)',
        'secondary-red-300': 'var(--secondary-red-300)',
        'secondary-red-400': 'var(--secondary-red-400)',
        'secondary-red-500': 'var(--secondary-red-500)',
        'secondary-red-600': 'var(--secondary-red-600)',
        'secondary-red-700': 'var(--secondary-red-700)',
        'secondary-red-800': 'var(--secondary-red-800)',
        'secondary-red-900': 'var(--secondary-red-900)',
        'status-success': 'var(--status-success)',
        'status-warning': 'var(--status-warning)',
        'status-error': 'var(--status-error)',
      },
      boxShadow: {
        gnbShadow: '0px 8px 13px 0px rgba(25, 31, 40, 0.04);',
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
