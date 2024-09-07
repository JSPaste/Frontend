import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,jsx,ts,tsx,vue}'],
	daisyui: {
		themes: [
			{
				default: {
					primary: '#FFE184',
					secondary: '#202020',
					accent: '#303030',
					neutral: '#202020',
					'base-100': '#202020',
					'base-200': '#1A1A1A',
					'base-300': '#151515',
					info: '#04B6FF',
					success: '#84FF8F',
					warning: '#FFCC84',
					error: '#FF848D'
				}
			},
			'light',
			'dark'
		]
	},
	plugins: [daisyui]
} satisfies Config;
