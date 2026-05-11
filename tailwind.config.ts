import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        tusker: ["var(--font-tusker)"],
        cabinet: ["var(--font-cabinet)"],
        "mona-narrow": ["var(--font-mona-narrow)"],
      },
    },
  },
  plugins: [],
};
export default config;
