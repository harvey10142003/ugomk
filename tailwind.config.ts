import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 主色：UGO 青 — 色階取自 logo 實際像素（#04566B 為 logo 主色、#7CB6C6 為漸層淺端）
        brand: {
          DEFAULT: '#04566B',
          50: '#EEF6F9',
          100: '#D6E9F0',
          200: '#AED3DF',
          300: '#7CB6C6',
          400: '#4F98AC',
          500: '#2A7D94',
          600: '#15697F',
          700: '#0A6178',
          800: '#04566B',
          900: '#033D4D',
          950: '#022A36'
        },
        // 點綴：logo 漸層的淺端，hero mesh / accent 用
        mint: {
          DEFAULT: '#7CB6C6',
          50: '#F2FAFC',
          100: '#DDEFF5',
          200: '#BCE0EA',
          300: '#9BCEDD',
          400: '#7CB6C6',
          500: '#4F98AC',
          600: '#2A7D94',
          700: '#15697F'
        },
        // LINE 綠 — 語意色，只用於「與 LINE 有關」的元件（加好友鈕、對話氣泡、LINE 圖示）
        line: {
          DEFAULT: '#06C755',
          50: '#E8FBF0',
          100: '#C8F5D9',
          200: '#92EBB4',
          300: '#5BE08E',
          400: '#24D568',
          500: '#06C755',
          600: '#04A847',
          700: '#038638',
          800: '#026B2D'
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
      // 字級為中文排版收斂過：中文字身寬，同尺寸下佔位遠大於拉丁字，
      // 沿用拉丁比例會讓首屏標題爆行（實測 1366px 下 h1 會擠成三行）。
      fontSize: {
        'display-xl': ['clamp(2rem, 3.9vw, 3.15rem)', { lineHeight: '1.05', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(1.8rem, 3.1vw, 2.7rem)', { lineHeight: '1.1', letterSpacing: '-0.035em' }],
        'display-md': ['clamp(1.55rem, 2.5vw, 2.15rem)', { lineHeight: '1.15', letterSpacing: '-0.03em' }],
        'display-sm': ['clamp(1.25rem, 1.9vw, 1.6rem)', { lineHeight: '1.25', letterSpacing: '-0.025em' }]
      },
      letterSpacing: {
        'widest-2': '0.2em'
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #04566B 0%, #7CB6C6 100%)',
        'gradient-brand-soft': 'linear-gradient(135deg, #EEF6F9 0%, #D6E9F0 100%)',
        'gradient-mesh':
          'radial-gradient(at 20% 0%, rgba(124, 182, 198, 0.32) 0px, transparent 52%),' +
          'radial-gradient(at 80% 0%, rgba(21, 105, 127, 0.18) 0px, transparent 46%),' +
          'radial-gradient(at 0% 100%, rgba(4, 86, 107, 0.10) 0px, transparent 50%)',
        'grid-line':
          'linear-gradient(rgba(11, 15, 25, 0.05) 1px, transparent 1px),' +
          'linear-gradient(90deg, rgba(11, 15, 25, 0.05) 1px, transparent 1px)'
      },
      boxShadow: {
        soft: '0 1px 2px rgba(3, 61, 77, 0.05), 0 8px 24px -8px rgba(3, 61, 77, 0.08)',
        card: '0 1px 2px rgba(3, 61, 77, 0.05), 0 14px 36px -14px rgba(3, 61, 77, 0.14)',
        brand: '0 14px 34px -14px rgba(4, 86, 107, 0.5)'
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
