/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-color": "#12bd57",
        "base-color": "#1f2128",
        "helper-color": "#000000",
        "  secondary-color": "#ffffff",
      },
    },
  },
  plugins: [],
};
