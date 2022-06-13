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
      nav: "#f2f2f2",
      container: "#685454",
      friends: "#a393eb",
      events: "#8bd5cb",
      eventsButton: "#54878f",
      login: "#61c0bf",
    },
  },
  plugins: [require("flowbite/plugin")],
};
