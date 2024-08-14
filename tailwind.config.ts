import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,jsx,ts,tsx,vue}'],
	theme: {
		extend: {}
	},
	plugins: [daisyui]
} satisfies Config;
