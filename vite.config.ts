import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import vike from 'vike/plugin';
import type { UserConfig } from 'vite';

export default {
	resolve: {
		alias: {
			'@x-component': resolve('./src/components'),
			'@x-hook': resolve('./src/hooks'),
			'@x-page': resolve('./src/pages'),
			'@x-util': resolve('./src/utils')
		}
	},
	plugins: [react(), vike()],
	css: {
		postcss: {
			plugins: [tailwindcss()]
		}
	}
} satisfies UserConfig;
