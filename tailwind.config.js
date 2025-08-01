export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // 색상 팔레트 (피그마 시안 기반)
      colors: {
        // Primary Colors
        primary: '#4880ee',
        secondary: '#6d7582',
        red: '#e84118',

        // Neutral Colors
        black: '#222222',
        white: '#ffffff',
        gray: '#dadada', // 피그마 시안에 맞게 수정
        'light-gray': '#f2f4f6',

        // Text Colors
        'text-primary': '#353c49',
        'text-secondary': '#8d94a0',
        'text-subtitle': '#8d94a0',

        // Background Colors
        'bg-primary': '#ffffff',
        'bg-secondary': '#f2f4f6',
        'bg-accent': '#eaf3fe',

        // Border Colors
        border: '#dadada',
        'border-dark': '#000000',
        'border-primary': '#4880ee',
        'border-secondary': '#6d7582',
        'border-red': '#e84118',
      },

      // 폰트 패밀리
      fontFamily: {
        sans: ['Noto Sans KR', 'sans-serif'],
        'noto-sans': ['Noto Sans KR', 'sans-serif'],
      },

      // 폰트 크기 (피그마 시안 기반)
      fontSize: {
        // Title Styles
        title1: ['24px', { lineHeight: '1em', fontWeight: '700' }],
        title2: ['22px', { lineHeight: '1.09em', fontWeight: '700' }],
        title3: ['18px', { lineHeight: '1em', fontWeight: '700' }],

        // Body Styles
        body1: ['20px', { lineHeight: '1em', fontWeight: '500' }],
        body2: ['14px', { lineHeight: '1em', fontWeight: '500' }],
        'body2-bold': ['14px', { lineHeight: '1em', fontWeight: '700' }],
        caption: ['16px', { lineHeight: '1em', fontWeight: '500' }],
        small: ['10px', { lineHeight: '1em', fontWeight: '500' }],

        // 기존 Tailwind 크기들도 유지
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },

      // 스페이싱 (피그마 시안 기반)
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',

        // 컴포넌트별 스페이싱
        section: '48px',
        component: '16px',
        element: '8px',
      },

      // Border Radius
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        full: '9999px',
      },

      // Box Shadow
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },

      // 애니메이션
      animation: {
        spin: 'spin 1s linear infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        bounce: 'bounce 1s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },

      // 키프레임
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },

      // Z-Index
      zIndex: {
        tooltip: '1000',
        modal: '1050',
        dropdown: '1100',
        sticky: '1020',
        fixed: '1030',
      },

      // 최대 너비
      maxWidth: {
        'container-sm': '640px',
        'container-md': '768px',
        'container-lg': '1024px',
        'container-xl': '1280px',
        'container-2xl': '1536px',
      },
    },
  },
  plugins: [],
};
