/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kanit: "'Kanit', sans-serif",
        quickSans: "'Quicksand', sans-serif"
      },
      animation: {
        fade: 'fade 500ms ease',
        bounceCustom: 'bounce 1.5s infinite',
        'transition-bottom': 'transition-bottom 1s ease'
      },

      keyframes: theme => ({
        fade: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        'transition-bottom': {
          from: {
            transform: 'translate(0,80px)',
            opacity: 0
          },
          to: {
            transform: 'translate(0)',
            opacity: 1
          },
        },
        bounceCustom: {
          '0%, 100%': {
            transform: 'translateY(-20%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          }
        }
      }),
    },
  },
  plugins: [],
}
