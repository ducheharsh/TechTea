import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D1117',
        secondary: '#21262D',
        accent: '#58A6FF',
        success: '#238636',
        warning: '#F85149',
        text: '#F0F6FC',
        border: '#30363D',
        hover: '#161B22',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'SF Mono', 'monospace'],
      },
      spacing: {
        base: '16px',
      },
    },
  },
  plugins: [],
}
export default config