module.exports = {
  mode: 'jit',
  content: ['./public/**/*.html', './app/**/*.{html,js,ts,hbs}'],
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography')],
  theme: {
    fontFamily: {
      body: ['Roboto'],
    },
    extend: {
      keyframes: {
        heartbeat: {
          '0%': { transform: 'scale(1)' },
          '5%': {
            transform: 'scale(1.2)',
          },
          '15%': {
            transform: 'scale(1)',
          },
          '20%': {
            transform: 'scale(1.2)',
          },
          '30%': {
            transform: 'scale(1)',
          },
          '70%': {
            transform: 'scale(0.9)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
      },
      animation: {
        heartbeat: 'heartbeat 3s infinite',
      },
    },
  },
};
