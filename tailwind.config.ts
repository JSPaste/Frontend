import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,jsx,ts,tsx,vue}'],
	daisyui: {
		themes: ['light', 'dark', 'cupcake']
	},
	plugins: [daisyui]
} satisfies Config;
