import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient' : 'linear-gradient(149deg, rgba(0,175,210,1) 0%, rgba(69,94,244,1) 100%)',
      },
     colors: {
      'picton-blue': {
        '50': '#effbff',
        '100': '#def5ff',
        '200': '#b6eeff',
        '300': '#75e4ff',
        '400': '#2cd7ff',
        '500': '#00c7fc',
        '600': '#009dd4',
        '700': '#007dab',
        '800': '#00698d',
        '900': '#065774',
        '950': '#04374d',
    },
      'lightPurple' : '#CDC1FF',
    
     }
      
    },
  },
  plugins: [],
} satisfies Config;
