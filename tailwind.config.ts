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
      borderRadius: { sm: '8px', md: '20px', lg: '30px', full: '50%' },
      borderWidth: px0_50,
      lineHeight: px0_100,
      fontSize: {
        'heading-1B': [
          '24px',
          {
            fontWeight: '700',
            lineHeight: '140%',
            letterSpacing: '-0.24px',
          },
        ],
        'heading-1Sb': [
          '24px',
          {
            fontWeight: '600',
            lineHeight: '140%',
            letterSpacing: '-0.24px',
          },
        ],
        'heading-1M': [
          '24px',
          {
            fontWeight: '500',
            lineHeight: '140%',
            letterSpacing: '-0.24px',
          },
        ],
        'heading-2Sb': [
          '20px',
          {
            fontWeight: '600',
            lineHeight: '140%',
            letterSpacing: '-0.2px',
          },
        ],
        'heading-2M': [
          '20px',
          {
            fontWeight: '500',
            lineHeight: '140%',
            letterSpacing: '-0.2px',
          },
        ],
        'body-1Sb': [
          '16px',
          {
            fontWeight: '600',
            lineHeight: '140%',
            letterSpacing: '-0.16px',
          },
        ],
        'body-1M': [
          '16px',
          {
            fontWeight: '500',
            lineHeight: '140%',
            letterSpacing: '-0.16px',
          },
        ],
        'body-2Sb': [
          '14px',
          {
            fontWeight: '600',
            lineHeight: '140%',
            letterSpacing: '-0.14px',
          },
        ],
        'body-2M': [
          '14px',
          {
            fontWeight: '500',
            lineHeight: '140%',
            letterSpacing: '-0.14px',
          },
        ],
        'body-3Sb': [
          '12px',
          {
            fontWeight: '600',
            lineHeight: '140%',
            letterSpacing: '-0.12px',
          },
        ],
        'body-3M': [
          '12px',
          {
            fontWeight: '500',
            lineHeight: '140%',
            letterSpacing: '-0.12px',
          },
        ],
      },
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
        'neutral-10': 'var(--neutral-10)',
        'neutral-50': 'var(--neutral-50)',
        'neutral-100': 'var(--neutral-100)',
        'neutral-200': 'var(--neutral-200)',
        'neutral-300': 'var(--neutral-300)',
        'neutral-400': 'var(--neutral-400)',
        'neutral-500': 'var(--neutral-500)',
        'neutral-600': 'var(--neutral-600)',
        'neutral-700': 'var(--neutral-700)',
        'neutral-800': 'var(--neutral-800)',
        'neutral-900': 'var(--neutral-900)',
        'primary-10': 'var(--primary-10)',
        'primary-50': 'var(--primary-50)',
        'primary-100': 'var(--primary-100)',
        'primary-200': 'var(--primary-200)',
        'primary-300': 'var(--primary-300)',
        'primary-400': 'var(--primary-400)',
        'primary-500': 'var(--primary-500)',
        'primary-600': 'var(--primary-600)',
        'primary-700': 'var(--primary-700)',
        'primary-800': 'var(--primary-800)',
        'primary-900': 'var(--primary-900)',
        'secondary-10': 'var(--secondary-10)',
        'secondary-50': 'var(--secondary-50)',
        'secondary-100': 'var(--secondary-100)',
        'secondary-200': 'var(--secondary-200)',
        'secondary-300': 'var(--secondary-300)',
        'secondary-400': 'var(--secondary-400)',
        'secondary-500': 'var(--secondary-500)',
        'secondary-600': 'var(--secondary-600)',
        'secondary-700': 'var(--secondary-700)',
        'secondary-800': 'var(--secondary-800)',
        'secondary-900': 'var(--secondary-900)',
        'status-success': 'var(--status-success)',
        'status-warning': 'var(--status-warning)',
        'status-error': 'var(--status-error)',
        'custom-yellow-300': 'var(--custom-yello-300)',
        'custom-yellow-400': 'var(--custom-yellow-400)',
        'custom-green-300': 'var(--custom-green-300)',
        'custom-green-400': 'var(--custom-green-400)',
        'custom-navy-300': 'var(--custom-navy-300)',
        'custom-navy-500': 'var(--custom-navy-500)',
        'custom-navy-700': 'var(--custom-navy-700)',
        'custom-navy-900': 'var(--custom-navy-900)',
        'custom-warmgray-500': 'var(--custom-warmgray-500)',
        'custom-warmgray-700': 'var(--custom-warmgray-700)',
        'custom-warmgray-900': 'var(--custom-warmgray-900)',
      },
      boxShadow: {
        sm: '0px 8px 13px 0px rgba(25, 31, 40, 0.04)',
        md: '3px 6px 28px 0px rgba(25, 31, 40, 0.08)',
        lg: '0px 16px 34px 0px rgba(25, 31, 40, 0.16)',
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
