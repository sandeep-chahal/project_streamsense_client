/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "var(--color-primary)",
				red: "var(--color-red)",
				red2: "var(--color-red2)",
				black1: "var(--color-black-1)",
				black2: "var(--color-black-2)",
				yellow: "var(--color-yellow)",
				green: "var(--color-green)",
			},
		},
	},
	plugins: [],
};
