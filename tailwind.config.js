/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#E0F2FE", // sky-100
          DEFAULT: "#0F766E", // teal-700
          dark: "#115E59", // teal-800
        },
        secondary: {
          light: "#EEF2F6",
          DEFAULT: "#4F46E5", // indigo-600
          dark: "#3730A3", // indigo-800
        },
        accent: {
          DEFAULT: "#10B981", // emerald-500
          dark: "#047857", // emerald-700
        },
        neutral: {
          slate: "#0F172A", // slate-900 (for backgrounds in dark-mode elements)
          DEFAULT: "#1E293B", // slate-800
          light: "#F8FAFC", // slate-50
        }
      },
      borderRadius: {
        "premium": "16px",
      },
      fontFamily: {
        sans: ["Outfit", "Inter", "sans-serif"],
      }
    },
  },
  plugins: [],
}
