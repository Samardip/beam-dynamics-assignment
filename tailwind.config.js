/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-neutral-dark': "rgba(34, 34, 34, 1)",
        'custom-neutral-light': "rgba(45, 45, 45, 1)",
        'custom-primary-1': "rgba(254, 160, 19, 1)",
        'custom-primary-2': "rgba(186, 74, 12, 1)",
        'custom-primary-3': "rgba(210, 49, 49, 1)",
        'custom-text-1': "rgba(248, 248, 248, 1)",
        'custom-text-2': "rgba(203, 203, 203, 1)",
        'custom-text-3': "rgba(153, 153, 153, 1)",
        'custom-text-4': "rgba(112, 112, 112, 1)",
        'custom-border':"rgba(73, 73, 73, 1)"
      }
    },
  },
  plugins: [],
}