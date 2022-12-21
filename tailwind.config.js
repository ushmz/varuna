module.exports = {
  content: ["./src/components/**/*.tsx", "./src/pages/**/*.tsx"],
  darkMode: "class",
  important: true,
  plugins: [require("@tailwindcss/line-clamp"), require("daisyui")],
  theme: {
    extend: {
      colors: {
        "accent-1": "#FAFAFA",
        "accent-2": "#EAEAEA",
        "accent-7": "#333",
        success: "#0070f3",
        cyan: "#79FFE1",
        green: {
          light: "#51a023",
          dark: "#a0fa5a",
        },
        blue: {
          light: "#1D4ED8",
          dark: "#3B82F6",
        },
      },
      spacing: {
        28: "7rem",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
      boxShadow: {
        small: "0 5px 10px rgba(0, 0, 0, 0.12)",
        medium: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  daisyui: {
    themes: ["corporate"],
  },
};
