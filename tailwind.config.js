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
      container: "#5e87b8",
      friends: "#a393eb",
      events: "#8bd5cb",
      eventsButton: "#54878f",
      login: "#61c0bf",
      eventBg: "#c8e7ed",
      buttonColor: "#7692e4",
      completeButton: "#e67676",
      completedBox: "#bae2be",
      dashboard: "#d5def5",
    },
  },
  plugins: [require("flowbite/plugin")],
};
