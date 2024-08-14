import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,jsx,ts,tsx,vue}'],
	daisyui: {
		themes: {}
	},
	plugins: [daisyui]
} satisfies Config;
