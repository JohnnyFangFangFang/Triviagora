/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // 新增一個水藍色
      colors: {
        "water-blue": "#57b6d0",
      },
    },
  },
  plugins: [],
};
