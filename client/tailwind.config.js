/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textShadow: {
        inner: '0 1px 0px rgba(0, 0, 0, 0.2)', // Adjust values as needed
      },
    },
  },
  plugins: [],
};