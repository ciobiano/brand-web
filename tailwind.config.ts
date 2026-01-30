import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/soul/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			fontFamily: {
				sans: ["var(--font-inter)", "Helvetica", "Arial", "sans-serif"],
				athletics: [
					"Athletics",
					"Inter",
					"Helvetica",
					"Arial",
					"sans-serif",
				],
			},
			colors: {
				"clou-white": "#ffffff",
				"clou-black": "#101114",
				"clou-gray": "#929296",
				"clou-red": "rgb(var(--clou-red)",
			},
			animation: {
				"scroll-hint": "scroll 2s ease-in-out infinite",
				"fade-in-up": "fade-in-up 0.8s ease-out forwards",
				"scale-in": "scale-in 0.6s ease-out forwards",
				"slide-down": "slide-down 0.75s ease-out forwards",
				"marquee-soft": "marquee-soft 40s linear infinite",
			},
			keyframes: {
				scroll: {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(8px)" },
				},
				"fade-in-up": {
					"0%": {
						opacity: "0",
						transform: "translateY(30px)",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)",
					},
				},
				"scale-in": {
					"0%": {
						opacity: "0",
						transform: "scale(0.8)",
					},
					"100%": {
						opacity: "1",
						transform: "scale(1)",
					},
				},
				"slide-down": {
					"0%": { transform: "translateY(0)" },
					"100%": { transform: "translateY(-100%)" },
				},
				"marquee-soft": {
					"0%": { transform: "translateX(0)" },
					"100%": { transform: "translateX(-50%)" },
				},
			},
			transitionTimingFunction: {
				"clou-ease": "cubic-bezier(0.25, 0.1, 0.25, 1)",
				"clou-bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
			},
			spacing: {
				"1205": "1205px", // Clou hero height
			},
			fontSize: {
				"clou-hero": [
					"353.4px",
					{ lineHeight: "318.06px", letterSpacing: "-8.835px" },
				],
				"3xl": [
					"32px",
					{
						lineHeight: "32px",
						letterSpacing: "-0.64px",
					},
				],
			},
			letterSpacing: {
				"clou-tight": "-0.025em",
			},
		},
	},
	plugins: [],
};

export default config;
