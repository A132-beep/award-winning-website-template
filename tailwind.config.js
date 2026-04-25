/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Plus Jakarta Sans — geometric premium sans (Blauer Nue alternative)
        sans:    ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        jakarta: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        // Legacy aliases — all map to Jakarta now
        zentry:          ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        general:         ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        "circular-web":  ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        "robert-medium": ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        "robert-regular":["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      colors: {
        cream: {
          50:  "#FAF8F3",
          100: "#F5F0E8",
          200: "#EDE4D0",
          300: "#DDD0B8",
        },
        soil: {
          100: "#8B7355",
          200: "#4A3728",
          300: "#2E1B0E",
          400: "#1A0F06",
        },
        leaf: {
          100: "#A8D5BA",
          200: "#52B788",
          300: "#2D6A4F",
          400: "#1B4332",
        },
        bark: {
          100: "#E8CFA0",
          200: "#C8A96E",
          300: "#8B6340",
          400: "#4A3020",
        },
      },
    },
  },
  plugins: [],
}
