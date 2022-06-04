module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./pages/login.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        logo: ["Pacifico"],
        header: ["Rum Raisin"],
        body: ["Barlow Condensed"],
      },
    },
    backgroundImage: (theme) => ({
      image: "url('/balloons.jpg')",
    }),
    colors: {
      bg: "#fdba9a",
    },
  },
  plugins: [require("flowbite/plugin")],
};
