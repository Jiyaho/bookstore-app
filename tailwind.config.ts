import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        suit: ["SUIT"],
      },
      colors: {
        black: "#000000",
        "main-red": "#CC3624",
        "main-yellow": "#FFC552",
        "main-green": "#188953",
        "main-gray": "#606060",
        "mid-gray": "#949494",
        "light-gray": "#F2F2F2",
        "light-red": "#F7E4E4",
      },
    },
  },
  plugins: [
    nextui({
      addCommonColors: true,
      defaultTheme: "light",
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#188953",
            },
            secondary: {
              DEFAULT: "#000000",
            },
            danger: {
              DEFAULT: "#CC3624",
            },
            focus: "#FFC552",
          },
        },
      },
    }),
  ],
} satisfies Config;
