import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["HarmonyOS Sans", "Segoe UI", "SF Pro Display", "-apple-system", "BlinkMacSystemFont", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Open Sans", "Helvetica Neue", "sans-serif"],
        code: ["Hack", "ui-monospace", "SFMono-Regular", "SF Mono", "Menlo", "Consolas", "Liberation Mono", "monospace"],
        mono: ["SFMono-Regular", "Consolas", "Liberation Mono", "Menlo", "Courier", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
