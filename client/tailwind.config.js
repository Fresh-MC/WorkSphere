/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Updated palette
        primary: "#320E3B",       // Dark base for headings / main branding
        secondary: "#7F96FF",     // Links / interactive elements
        accent: "#FF4C8B",        // CTA buttons / highlights
        light: "#F5F5F5",         // Backgrounds / sections
        info: "#A6CFD5",           // Cards / secondary visuals
        muted: "#667E7F",         // Text or less important info
      },
      fontFamily: {
        heading: ['Righteous', 'cursive'],
        body: ['Exo', 'sans-serif'], // optional secondary font
        cursive: ['Pacifico', 'cursive'], // optional cursive font
      },
      fontSize: {
        '10xl': '10rem',
        '11xl': '11rem',
        '12xl': '12rem', // your custom 12xl
        '13xl': '13rem', // your custom 13xl
        '14xl': '14rem', // your custom 14xl
        '15xl': '15rem', // your custom 15xl
      },
      letterSpacing: {
        widest2: '-0.1em', // custom extra-wide spacing
        widest3: '-0.05em', // even wider
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },

      },
      
    },
  },
  plugins: [],
}
