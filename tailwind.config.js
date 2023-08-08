/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0891b2", // Cyan-600
        secondary: "#e2e8f0", // slate-200
        light: "#f1f5f9", // slate-100
        green: "#22c55e", // green-500
        red: "#ef4444", // red- 500
        blue: "#3b82f6", // blue-500
      },
    },
  },
  plugins: [],
};
