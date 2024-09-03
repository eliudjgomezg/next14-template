const config = {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}', './layouts/**/*.{js,ts,jsx,tsx,mdx}', './commons/**/*.{js,ts,jsx,tsx,mdx}', './uikit/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'var(--transparent)',
        white: 'var(--white)',
        black: 'var(--black)',

        'primary-color': 'var(--magenta)',
        'secondary-color': 'var(--orange-500)',
      },
      fontFamily: {
        monserrat: ['var(--font-monserrat)'],
      },
    },
    container: {
      center: true,
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
        '3xl': '1600px',
        '4xl': '1920px'
      }
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1540px',
      '3xl': '1600px',
      '4xl': '1920px'
    }
  },
  darkMode: 'dark',
  plugins: [require('@tailwindcss/forms')],
  important: true
}
export default config



