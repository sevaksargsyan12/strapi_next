/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      padding: {
        '18px': '18px',
      },
      paddingRight: {
        '18px': '18px',
        '32px': '32px',
      },
      maxWidth: {
        '1344px': '1344px'
      },
      width: {
        '100-96px': 'calc(100% - 96px)'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      }
    }
  },
  plugins: [],
}

