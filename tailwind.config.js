/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ecotrophy: {
          blue: "#0066FF", // Punchy, energetic blue
          blueDark: "#004BCC",
          lime: "#CCFF00", // Neon energetic lime
          navy: "#0A1128", // Deep, crisp navy for extreme contrast
          light: "#F4F7FB", // Slightly cooler, energetic light bg
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'apple': '16px', // Slightly rounder for modern feel
        'apple-lg': '24px',
      },
      boxShadow: {
        'premium': '0 10px 40px -10px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0,0,0,0.03)',
        'punchy': '0 8px 30px rgba(0, 102, 255, 0.25)', // Colored shadow for energetic blue
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '10%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
