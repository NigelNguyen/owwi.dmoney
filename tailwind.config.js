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
      purple: { ...colors.violet, "01": "#e2e6f8" },
      yellow: colors.amber,
      pink: colors.fuchsia,
      slate: colors.slate,
      blue: {
        ...colors.blue,
        "01": "#3A5BCC",
        "02": "#3A5BFF",
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
