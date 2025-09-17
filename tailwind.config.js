/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        // 텍스트 사이즈 변수 설정 //
        '2xs': '0.625rem', // 10px
        xs: '0.75rem', // 12px
        sm: '0.875rem', // 14px
        base: '1rem', // 16px
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.375rem', // 22px
        '3xl': '1.5rem', // 24px
        '4xl': '1.75rem', // 28px
        '5xl': '2rem', // 32px
        '6xl': '2.25rem', // 36px
        '7xl': '2.5rem', // 40px
      },
      screens: {
        // break point 설정
        // sm: ~ 767px / md: 768px ~ 1270px / lg: 1280px ~ //
        md: '768px', // 768px ~ 1279px
        lg: '1280px', // 1280px ~
      },
      colors: {
        brown: '#4c353f',
        'dark-red': '#b60108',
        'light-gray': '#bbbbbb',
      },
    },
  },
  plugins: [],
};
