/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{html,js,tsx}", "./components/**/*.{html,js,tsx}"],
  theme: {
    backgroundImage: {
      mainbg: "url('/assets/images/fpo/bg.jpg')",
    },
    extend: {
      minHeight: { screen: "100vh" },
      colors: {
        brands: {
          500: "#FFF",
        },
        mask: {
          300: "rgba(0, 0, 0, 0.3)",
          700: "rgba(0, 0, 0, 0.75)",
        },
      },
    },
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar-hide")],
  daisyui: {
    themes: [
      {
        smoments: {
          primary: "#fff",
          "primary-content": "#111827",
          secondary: "#111827",
          "secondary-content": "#f3f4f6",
          accent: "#f3f4f6",
          "accent-content": "#111827",
          neutral: "#111827",
          "neutral-content": "#f3f4f6",
          "base-100": "#111827",
          "base-200": "#1f2937",
          "base-300": "#374151",
          "base-content": "#fff",
          info: "#a5f3fc",
          "info-content": "#000",
          success: "#84cc16",
          "success-content": "#fff",
          warning: "#f59e0b",
          "warning-content": "#fff",
          error: "#fecaca",
          "error-content": "#ef4444",
        },
      },
      "light",
      "dark",
      "night",
    ],
  },
};
