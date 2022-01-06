module.exports = {
  mode: 'jit',
  content: ['./public/**/*.html', './app/**/*.{html,js,ts,hbs}'],
  darkMode: 'media',
  plugins: [require('@tailwindcss/typography')],
  theme: {
    fontFamily: {
      body: ['Roboto'],
    },
  },
};
