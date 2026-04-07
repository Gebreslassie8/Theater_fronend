/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // --- Core Brand & Layout ---
        theater: '#0f172a',      // Dark Mode Background / Sidebar
        dark: '#0f172a',         // Headings / Dark Neutral
        light: '#f8fafc',        // Main Page Background
        lightGray: '#f8f9fa',    // Soft Borders / Subtle Backgrounds
        smokyGray: '#6c757d',    // Subtitles / Secondary Text
        mediumGray: '#6c757d',   // Tertiary elements

        // --- Main Actions (Buttons) ---
        primary: '#007590',      // deepTeal: Best for "Add", "Book", "Submit"
        secondary: '#17304F',    // deepBlue: Best for "View Details", "Filter"

        // --- Prisma-style Status Colors (Badges/Alerts) ---
        success: {
          DEFAULT: '#22c55e',
          bg: '#dcfce7',
        },
        info: {
          DEFAULT: '#06b6d4',
          bg: '#cffafe',
        },
        warning: {
          DEFAULT: '#facc15',
          bg: '#fef9c3',
        },
        error: {
          DEFAULT: '#ef4444',
          bg: '#fee2e2',
        },

        // --- Aliases for consistency ---
        deepTeal: '#007590',
        deepBlue: '#17304F',
      }
    },
  },
  plugins: [],
}