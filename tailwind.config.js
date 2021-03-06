module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './assets/**/*.svg',
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      // animation: {
      //   spin: 'spin 2s linear infinite',
      // },
      // scale: {
      //   101: '1.01',
      // },
      // transitionProperty: {
      //   height: 'height',

      //   spacing: 'margin, padding',
      // },
    },
  },
  variants: {
    extend: {
      textColor: ['visited'],
      // animation: ['hover', 'focus'],
      // zIndex: ['hover', 'active'],
      // ringWidth: ['hover', 'active'],
      // transitionProperty: ['responsive'],
      // transform: ['hover', 'focus'],
      // visibility: ['hover', 'focus'],
      // display: ['hover'],
    },
  },
  plugins: [
    // require('@tailwindcss/typography'),
    // require('tailwindcss-textshadow'),
    // require('tailwind-hamburgers'),
    // require('@tailwindcss/aspect-ratio'),
  ],
}
