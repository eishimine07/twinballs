/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'reverse-pad': "url('/images/pads/pad_1.gif')",
        'win-pad': "url('/images/pads/pad_2.gif')",
      },
      height: {
        '128': '32rem',
        '160': '40rem',
        '224': '56rem',
      },
      maxHeight: {
        '128': '32rem',
        '160': '40rem',
        '224': '56rem',
      },
      minHeight: {
        '128': '32rem',
        '160': '40rem',
        '224': '56rem',
      },
      maxWidth: {
        '128': '32rem',
        '160': '40rem',
        '224': '56rem',
      },
      minWidth: {
        '128': '32rem',
        '160': '40rem',
        '224': '56rem',
      },
      width: {
        '128': '32rem',
        '160': '40rem',
        '224': '56rem',
      },
    },
  },
  plugins: [],
}

