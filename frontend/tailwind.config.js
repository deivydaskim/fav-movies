/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        yellow: {
          350: '#FDD835',
        },
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        '.gradient': {
          background: 'linear-gradient(130deg, #FFEE58 0%, #FF8F00 104.33%)',
        },
        '.gradient-gray': {
          background:
            'linear-gradient(90deg, rgba(255, 255, 255, 0.08) 3.84%, rgba(0, 0, 0, 0.00) 46.32%, rgba(255, 255, 255, 0.08) 95.33%)',
        },
        '.banner-mask': {
          'clip-path': 'polygon(5% 0, 100% 0, 100% 100%, 0 100%)',
        },
        '.yellow-shadow': {
          'box-shadow': '0 0 12px #FDD835',
        },
        '.headline-xl': {
          'font-weight': '600',
          'font-size': '40px',
          'letter-spacing': '0.25px',
          'text-transform': 'uppercase',
          'line-height': '40px',
        },
        '.headline-l': {
          'font-weight': '700',
          'font-size': '32px',
          'letter-spacing': '0.5px',
        },
        '.headline-m': {
          'font-weight': '500',
          'font-size': '21px',
          'letter-spacing': '0.5px',
        },
        '.body': {
          'font-size': '17px',
          'letter-spacing': '0.5px',
          'line-height': '27.2px',
        },
        '.body-2': {
          'font-size': '15px',
          'line-height': '21.75px',
          'letter-spacing': '0.25px',
        },
        '.caption': {
          'font-size': '13px',
          'letter-spacing': '0.4px',
          'text-transform': 'uppercase',
        },
        '.caption-2': {
          'font-size': '15px',
          'letter-spacing': '0.25px',
          'font-weight': 'bold',
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none' /* (Chrome, Safari and Opera) */,
        },
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none' /* IE and Edge */,
          'scrollbar-width': 'none' /* Firefox */,
        },
      });
    },
  ],
};
