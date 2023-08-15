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
      spacing: {
        small: "0.75rem", // => 12px
        normal: "1.25rem", // > 20px
        large: "2.5rem", // => 40px
      },
      colors: {
        primary: "#3E87FF",
        secondary: "#e2e8f0", // slate-200
        light: "#f1f5f9", // slate-100
        green: "#22c55e", // green-500
        red: "#ef4444", // red- 500
        blue: "#3b82f6", // blue-500
        yellow: "#FFBA0A",
      },
      padding: {
        "rectangle-small": "0.374rem 0.5rem",
        "rectangle-normal": "0.75rem 1rem",
      },
      fontSize: {
        small: "1rem", // 16px
        medium: "1.125rem", // => 20px
        large: "1.875rem", // => 30px
        "very-large": "3rem", // => 48px
        "extra-very-large": "4.5rem", // => 72px
      },
      flex: {
        center: {
          display: "flex",
          "flex-direction": "column",
          "justify-content": "center",
        },
      },
    },
  },
  plugins: [],
};
