/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],  
    theme: {
      extend: {
        fontFamily: {
          share: ['ShareTechMono', 'monospace'],     
          roboto: ['Roboto', 'serif'],
          robotoBold: ['RobotoBold', 'serif'],
          robotoLight: ['RobotoLight', 'serif'],
          playfair: ['Playfair', 'sans'],
          playfairMedium: ['PlayfairMedium', 'sans'],
          playfairBold: ['PlayfairBold', 'sans'] 
        }
      },
  },
  plugins: [],
}

