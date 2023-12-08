/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./views/**/*.{js,ts,jsx,tsx,mdx}",
    "./templates/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "dm-sans": ["DM Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        "poppins-regular": ["Poppins-regular", "sans-serif"],
      },

      backgroundColor: {
        "custom-bg-input": "#FFFFFF",
        "custom-primary-white": "#FFFFFF",
        "custom-secondary-white": "#F2F2F2",
        "custom-primary-blue": "#044BD9",
        "custom-secondary-blue": "#235FD9",
        "custom-red": "#B0252A",
        "custom-green": "#24A8AF",
        "custom-orange": "rgb(255,151,0)",
        "custom-blue": "#257DB0",
        "custom-black": "#2A2A2D",
        "custom-linear-blue": "rgb(0,172,238)",
        "custom-blue-light": "#F0F3FA",
        "custom-red-light": "#FAF0F6",
      },
      textColor: {
        "custom-orange": "#FFAE10",
        "custom-blue": "#257DB0",
        "custom-red": "#B0252A",
      },
      borderColor: {
        "custom-gray": "#2A2A2D",
        "custom-black": "#CCCCCC",
        "custom-blue": "#257DB0",
        "custom-green": "#24A8AF",
        "custom-red": "#B0252A",
      },
      boxShadow: {
        custom: "0 5.67587px 20.869px -1.66897px rgba(73,141,255,.3)",
      },
      borderRadius: {
        custom: "12px",
      },
    },
  },
  plugins: [],
};
