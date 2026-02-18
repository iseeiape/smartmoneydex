module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'solana': '#9945FF',
        'solana-green': '#14F195',
        'crypto-dark': '#0a0a0f',
        'crypto-card': '#12121a',
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)', 'monospace'],
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
