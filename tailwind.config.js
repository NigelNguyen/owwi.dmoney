/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},

    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.slate,
      green: colors.emerald,
      purple: { ...colors.violet, "01": "#e2e6f8", "02": "#ede1ff" },
      yellow: colors.amber,
      pink: colors.fuchsia,
      slate: colors.slate,
      red: colors.red,
      blue: {
        ...colors.blue,
        "01": "#3a5bcc",
        "02": "#3a5bff",
        "03": "#4e36f8",
      },
      text: {
        title: "#000",
        cell: "#343A40",
        header: "#868E96",
        normal: "#4D4D4D",
      },
    },
  },
  plugins: [],
};
