module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Include the `app` directory if it exists
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Include the `src` directory if it exists
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        none: "0",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ripple': 'ripple 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(4)', opacity: 0 },
        },
    },
  },
  plugins: [],
};
