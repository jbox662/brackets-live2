/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#FFD700',
      },
      backgroundImage: {
        'felt-texture': "url('https://images.unsplash.com/photo-1621275471769-e6aa344546d5?auto=format&fit=crop&q=80')",
      },
    },
  },
  plugins: [],
  important: true,
  corePlugins: {
    preflight: false,
  },
}