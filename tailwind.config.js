/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
        extend: {
            colors: {
                primary: '#fff7eb',
                secondary: '#ff5757',
                light: '#F5F2F2',
                accent: '#AB8BFF',
                dark: '#171212',
                brown: '#856666'
            },
            fontFamily: {
                telegraf: ['Telegraf'],
                radnika: ['Radnika'],
                ubuntu: ['Ubuntu']
            },
        },
    },
    plugins: [],
}