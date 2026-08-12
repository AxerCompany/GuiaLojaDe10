
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'fundo-principal': '#FFF8FB',
        'fundo-secundario': '#FFF1F6',
        'card': '#FFFFFF',
        'rosa-principal': '#E91E63',
        'rosa-hover': '#D81B60',
        'rosa-claro': '#FF5C93',
        'texto-principal': '#1E1E1E',
        'texto-secundario': '#666666',
        'texto-claro': '#9B9B9B',
        'borda': '#F2DCE6',
        'divisoria': '#F8E8EF',
        'verde': '#22C55E',
        'verde-claro': '#DCFCE7',
        'amarelo': '#FACC15',
        'vermelho': '#EF4444',

        pink: {
          50: '#FFF1F6',
          100: '#F8E8EF',
          200: '#F2DCE6',
          300: '#F2DCE6',
          400: '#FF5C93',
          500: '#E91E63',
          600: '#E91E63',
          700: '#D81B60',
          800: '#D81B60',
          900: '#1E1E1E',
        },
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [],
}

