// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "spin-gradient": {
          "0%": { "--rotate": "0deg" },
          "100%": { "--rotate": "360deg" },
        },
      },
      animation: {
        "spin-gradient": "spin-gradient 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};
