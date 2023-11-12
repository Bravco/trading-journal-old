import type { Config } from "tailwindcss";

export default <Partial<Config>>{
theme: {
  extend: {
    colors: {
      "brink-pink": {
          "50": "#fff1f3",
          "100": "#ffe3e8",
          "200": "#ffccd7",
          "300": "#ffa1b6",
          "400": "#ff6388",
          "500": "#f93a6d",
          "600": "#e71758",
          "700": "#c30d4a",
          "800": "#a30e45",
          "900": "#8b1041",
          "950": "#4e031f",
        },
      },
    },
  },
};