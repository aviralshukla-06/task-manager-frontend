/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [
		function ({ addUtilities }) {
			addUtilities({
				'.custom-diagonal-bg': {
					background: 'linear-gradient(135deg, #00292d 50%, #01212e 50%)',
				},
			})
		}
	],
}

