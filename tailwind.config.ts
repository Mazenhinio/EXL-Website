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
        "b2b-dark-red": "var(--b2b-dark-red)",
        "b2b-vivid-red": "var(--b2b-vivid-red)",
        "b2b-vivid-orange": "var(--b2b-vivid-orange)",
        "b2b-gray-brown": "var(--b2b-gray-brown)",
        "b2b-gray": "var(--b2b-gray)",
        "b2b-crimson": "var(--b2b-crimson)",
        "b2b-burnt": "var(--b2b-burnt-orange)",
        "b2b-bright": "var(--b2b-bright-orange)",
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
