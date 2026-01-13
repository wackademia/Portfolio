module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./pages/**/*.{js,jsx,ts,tsx,mdx}"
  ],
  theme: {
    extend: {
      animation: {
        'gradient-move': 'gradient-move 20s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'gradient-move': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      },
      colors: {
        'mono': {
          'black': '#000000',
          'dark': '#1a1a1a',
          'grey-dark': '#333333',
          'grey': '#666666',
          'grey-light': '#999999',
          'light': '#cccccc',
          'white': '#ffffff',
        }
      }
    },
  },
  plugins: [],
};
