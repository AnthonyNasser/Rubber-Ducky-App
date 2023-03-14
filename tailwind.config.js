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
            primary: '#FFCB42', // saffron yellow
            secondary: '#277BC0', // deep sky blue
            tertiary: '#FFB200', // sunset orange
            quaternary: '#FFF4CF', // pale yellow
            textColor: '#FFFFFF', // white
        },
    },
    plugins: [],
}
