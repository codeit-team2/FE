import type { Config } from 'tailwindcss';

const px0_50 = Object.fromEntries(Array.from({ length: 51 }, (_, i) => [i, `${i}px`]));
const px0_100 = Object.fromEntries(Array.from({ length: 101 }, (_, i) => [i, `${i}px`]));
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
  screens: {
    md: '768px',
    lg: '1024px',
  },

  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      borderRadius: { sm: '8px', md: '20px', lg: '30px', xl: '50%', full: '9999px' },
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
        average: [
          '30px',
          {
            fontWeight: '700',
            lineHeight: '140%',
            letterSpacing: '-0.6px',
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
        'neutral-10': 'rgb(var(--neutral-10))',
        'neutral-50': 'rgb(var(--neutral-50))',
        'neutral-100': 'rgb(var(--neutral-100))',
        'neutral-200': 'rgb(var(--neutral-200))',
        'neutral-300': 'rgb(var(--neutral-300))',
        'neutral-400': 'rgb(var(--neutral-400))',
        'neutral-500': 'rgb(var(--neutral-500))',
        'neutral-600': 'rgb(var(--neutral-600))',
        'neutral-700': 'rgb(var(--neutral-700))',
        'neutral-800': 'rgb(var(--neutral-800))',
        'neutral-900': 'rgb(var(--neutral-900))',
        'primary-10': 'rgb(var(--primary-10))',
        'primary-50': 'rgb(var(--primary-50))',
        'primary-100': 'rgb(var(--primary-100))',
        'primary-200': 'rgb(var(--primary-200))',
        'primary-300': 'rgb(var(--primary-300))',
        'primary-400': 'rgb(var(--primary-400))',
        'primary-500': 'rgb(var(--primary-500))',
        'primary-600': 'rgb(var(--primary-600))',
        'primary-700': 'rgb(var(--primary-700))',
        'primary-800': 'rgb(var(--primary-800))',
        'primary-900': 'rgb(var(--primary-900))',
        'secondary-10': 'rgb(var(--secondary-10))',
        'secondary-50': 'rgb(var(--secondary-50))',
        'secondary-100': 'rgb(var(--secondary-100))',
        'secondary-200': 'rgb(var(--secondary-200))',
        'secondary-300': 'rgb(var(--secondary-300))',
        'secondary-400': 'rgb(var(--secondary-400))',
        'secondary-500': 'rgb(var(--secondary-500))',
        'secondary-600': 'rgb(var(--secondary-600))',
        'secondary-700': 'rgb(var(--secondary-700))',
        'secondary-800': 'rgb(var(--secondary-800))',
        'secondary-900': 'rgb(var(--secondary-900))',
        'status-success': 'rgb(var(--status-success))',
        'status-warning': 'rgb(var(--status-warning))',
        'status-error': 'rgb(var(--status-error))',
        'custom-yellow-300': 'rgb(var(--custom-yellow-300))',
        'custom-yellow-400': 'rgb(var(--custom-yellow-400))',
        'custom-green-300': 'rgb(var(--custom-green-300))',
        'custom-green-400': 'rgb(var(--custom-green-400))',
        'custom-navy-300': 'rgb(var(--custom-navy-300))',
        'custom-navy-500': 'rgb(var(--custom-navy-500))',
        'custom-navy-700': 'rgb(var(--custom-navy-700))',
        'custom-navy-900': 'rgb(var(--custom-navy-900))',
        'custom-warmgray-500': 'rgb(var(--custom-warmgray-500))',
        'custom-warmgray-700': 'rgb(var(--custom-warmgray-700))',
        'custom-warmgray-900': 'rgb(var(--custom-warmgray-900))',
      },
      backgroundImage: {
        'custom-profile-gradient': `linear-gradient(79deg, rgba(255, 255, 255, 0.00) 64.19%, rgba(255, 255, 255, 0.50) 118.27%), 
                            linear-gradient(280deg, rgba(255, 255, 255, 0.00) 65.05%, rgba(255, 255, 255, 0.50) 122.92%), 
                            linear-gradient(180deg, #4580F7 7.1%, #591BDD 221.02%)`,
      },
      boxShadow: {
        sm: '0px 8px 13px 0px rgba(25, 31, 40, 0.04)',
        md: '3px 6px 28px 0px rgba(25, 31, 40, 0.08)',
        lg: '0px 16px 34px 0px rgba(25, 31, 40, 0.16)',
        banner:
          'inset -10px -10px 14px 0px rgba(21, 17, 77, 0.15), inset 10px 10px 20px 0px rgba(255, 255, 255, 0.10)',
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
        halfTurn: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(180deg)' },
        },
        fillHeart: {
          '0%': { transform: 'scale(0)' },
          '20%': { transform: 'scale(0.2)' },
          '60%': { transform: 'scale(0.6)' },
          '100%': { transform: 'scale(1)' },
        },
        pulseSmall: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.8)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        halfTurn: 'halfTurn 300ms linear forwards',
        fillHeart: 'fillHeart 300ms ease-in-out',
        pulseSmall: 'pulseSmall 300ms ease-in-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
