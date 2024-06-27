import type { Config } from 'tailwindcss';

const px0_50 = Object.fromEntries(Array.from({ length: 51 }, (_, i) => [i, `${i}px`]));
const px0_100 = Object.fromEntries(Array.from({ length: 101 }, (_, i) => [i, `${i}px`]));
const px0_200 = Object.fromEntries(Array.from({ length: 201 }, (_, i) => [i, `${i}px`]));
const px0_400 = Object.fromEntries(Array.from({ length: 401 }, (_, i) => [i, `${i}px`]));

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderRadius: px0_50,
      fontSize: px0_100,
      spacing: px0_200,
      width: px0_400,
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
