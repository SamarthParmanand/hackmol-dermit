import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              "50": "#f1fcf5",
              "100": "#defae9",
              "200": "#bef4d5",
              "300": "#8beab4",
              "400": "#45d483",
              "500": "#2abd6a",
              "600": "#1d9c55",
              "700": "#1a7b45",
              "800": "#1a613a",
              "900": "#175032",
              foreground: "#45D483",
              DEFAULT: "#45D483",
            },
            secondary: {
              "50": "#eefff4",
              "100": "#d7ffe7",
              "200": "#b2ffd0",
              "300": "#76ffad",
              "400": "#33f582",
              "500": "#09de5f",
              "600": "#01b84b",
              "700": "#05903f",
              "800": "#0a7135",
              "900": "#095028",
              foreground: "#095028",
              DEFAULT: "#095028",
            },
          },
        },
        dark: { colors: {} },
      },
      plugins: [require("@tailwindcss/aspect-ratio"), addVariablesForColors],
    }),
  ],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
