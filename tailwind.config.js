/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: false,
    theme: {
        /**
         * Going for like a 90s beachy vibe on the colors,
         * making the primary a rubber ducky like yellow and gives us some freedom
         * - Ants
         * */
        colors: {
            primary: {
                100: '#FFCB42',
                200: '#FFB200',
                300: '#FF9A00',
                400: '#FF8200',
                500: '#FF6A00',
                600: '#FF5200',
                700: '#FF3A00',
                800: '#FF2200',
            }, //saffron yellow palette
            secondary: {
                100: '#277BC0',
                200: '#1F6FAF',
                300: '#17649E',
                400: '#0F588D',
                500: '#074C7C',
                600: '#00416B',
                700: '#00365A',
                800: '#002A49',
            }, // deep sky blue pallette
            tertiary: {
                100: '#FFB200',
                200: '#FF9A00',
                300: '#FF8200',
                400: '#FF6A00',
                500: '#FF5200',
                600: '#FF3A00',
                700: '#FF2200',
                800: '#FF0A00',
            }, // sunset orange palette
            quaternary: {
                100: '#FFF4CF',
                200: '#FFE9A0',
                300: '#FFDE71',
                400: '#FFD342',
                500: '#FFC813',
                600: '#FFBD00',
                700: '#FFB200',
                800: '#FFA700',
            }, // pale yellow palette
            white: '#FFFFFF', // white
            
        },
    },
    plugins: [],
}
