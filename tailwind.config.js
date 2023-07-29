/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        background: '#01101F',
        msgColorOff: '#808080',
        msgColorOn: '#FFFFFF',
        InboxColor: '#0C2135',
        BordeButtomColor: '#2E8CE5',
        ButtomMsgColor: '#808080',
        buttonPlaybgColor: '#01101F',
        nberFriendsColor: '#2E8CE5',
        buttonLoginColor: '#0C5E8B',
        NavBarroundedIcon: '#2A7FCF',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        Stick: ['Stick No Bills', 'sans-serif'],
      }
      
    },
  },
  plugins: [],
}

