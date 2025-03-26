/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#121212",
        secondary: "#1E1E1E",
        accent: "#4A90E2",
        "chat-bg": "#343541",
        "user-bubble": "#4A90E2",
        "jarvis-bubble": "#444654",
        text: {
          DEFAULT: "#FFFFFF",
          secondary: "#D1D5DB",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["Roboto Mono", "monospace"],
      },
      maxWidth: {
        chat: "850px",
      },
    },
  },
  plugins: [],
};
