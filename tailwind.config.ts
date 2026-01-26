import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--foreground-rgb) / <alpha-value>)',
        foreground: 'rgb(var(--foreground-rgb) / <alpha-value>)',
        secondary: 'rgb(var(--foreground-secondary-rgb) / <alpha-value>)',
        muted: 'rgb(var(--foreground-muted-rgb) / <alpha-value>)',
        background: 'rgb(var(--background-start-rgb) / <alpha-value>)',
        'background-end': 'rgb(var(--background-end-rgb) / <alpha-value>)',
        accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
        'accent-bright': 'var(--accent-bright-color)',
        'element-wood': 'var(--element-wood)',
        'element-fire': 'var(--element-fire)',
        'element-water': 'var(--element-water)',
        'element-earth': 'var(--element-earth)',
        'element-metal': 'var(--element-metal)',
        'element-ethics': 'rgb(var(--element-ethics-rgb) / <alpha-value>)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
