import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        kalam: ["Kalam", "cursive"],
        caveat: ["Caveat", "cursive"],
        indieFlower: ["Indie Flower", "cursive"],
        quicksand: ["quicksand", "cursive"],
        comicsans: ["Comic Sans MS", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
