import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 主色：LINE 綠（品牌核心）
        brand: {
          DEFAULT: '#06C755',
          50: '#E8FBF0',
          100: '#C8F5D9',
          200: '#92EBB4',
          300: '#5BE08E',
          400: '#24D568',
          500: '#06C755',
          600: '#04A847',
          700: '#038638',
          800: '#02652A',
          900: '#01431C'
        },
        // 點綴：薄荷漸層用，hero / accent
        mint: {
          DEFAULT: '#34E89E',
          50: '#EAFCF3',
          100: '#CFF8E0',
          200: '#9DF1C2',
          300: '#6BE9A3',
          400: '#34E89E',
          500: '#0FCB7E',
          600: '#0BA266',
          700: '#08794D'
        },
        // 深字 / 邊框
        ink: {
          DEFAULT: '#0B0F19',
          50: '#F5F7FA',
          100: '#E5E9F0',
          200: '#CBD2DC',
          300: '#9CA5B4',
          400: '#6B7280',
          500: '#4B5563',
          600: '#374151',
          700: '#1F2937',
          800: '#111827',
          900: '#0B0F19'
        },
        // 淺底（科技感淺色）
        mist: {
          DEFAULT: '#F7F9FC',
          50: '#FFFFFF',
          100: '#FAFBFD',
          200: '#F7F9FC',
          300: '#EEF2F7',
          400: '#E2E8F0'
        }
      },
      fontFamily: {
        sans: ['var(--font-noto-sans-tc)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-noto-sans-tc)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 6.5vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 4.5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.875rem, 3.25vw, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(1.5rem, 2.5vw, 2.125rem)', { lineHeight: '1.2' }]
      },
      letterSpacing: {
        'widest-2': '0.2em'
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #06C755 0%, #34E89E 100%)',
        'gradient-brand-soft': 'linear-gradient(135deg, #E8FBF0 0%, #CFF8E0 100%)',
        'gradient-mesh':
          'radial-gradient(at 20% 0%, rgba(52, 232, 158, 0.18) 0px, transparent 50%),' +
          'radial-gradient(at 80% 0%, rgba(6, 199, 85, 0.14) 0px, transparent 50%),' +
          'radial-gradient(at 0% 100%, rgba(6, 199, 85, 0.10) 0px, transparent 50%)',
        'grid-line':
          'linear-gradient(rgba(11, 15, 25, 0.05) 1px, transparent 1px),' +
          'linear-gradient(90deg, rgba(11, 15, 25, 0.05) 1px, transparent 1px)'
      },
      boxShadow: {
        soft: '0 1px 2px rgba(11, 15, 25, 0.04), 0 8px 24px -8px rgba(11, 15, 25, 0.06)',
        card: '0 1px 2px rgba(11, 15, 25, 0.04), 0 12px 32px -12px rgba(11, 15, 25, 0.08)',
        brand: '0 12px 32px -12px rgba(6, 199, 85, 0.45)'
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(32px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        pulseSoft: { '0%, 100%': { opacity: '0.6' }, '50%': { opacity: '1' } }
      }
    }
  },
  plugins: []
};

export default config;
