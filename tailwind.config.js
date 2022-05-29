module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./pages/login.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        logo: ["Pacifico"],
        header: ["Rum Raisin"],
        body: ["Barlow Condensed"],
      },
    },
  },
  plugins: [],
};
