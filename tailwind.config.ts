import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Red Hat Text Variable', ...defaultTheme.fontFamily.sans],
				mono: ['Red Hat Mono Variable', ...defaultTheme.fontFamily.mono]
			}
		}
	},
	plugins: []
} satisfies Config;
