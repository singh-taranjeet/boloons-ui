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
        primary: "#FCCE02",
        secondary: "#bfdbfe", // blue-200
        light: "#eff6ff", // blue-100
        "dark-blue": "#7e22ce",
        "neon-blue": "#00FFFF",
        "neon-green": "#7CFC00",
        "neon-yellow": "#F4FF33",
      },
      padding: {
        "rectangle-small": "0.5rem 1rem",
        "rectangle-normal": "0.75rem 1.25rem",
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
