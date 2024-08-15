import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import vikeNode from 'vike-node/plugin';
import vike from 'vike/plugin';
import type { UserConfig } from 'vite';

export default {
	build: {
		target: 'es2022',
		rollupOptions: {
			external: ['bun']
		}
	},
	resolve: {
		alias: {
			'@x-component': resolve('./src/components'),
			'@x-hook': resolve('./src/hooks'),
			'@x-page': resolve('./src/pages'),
			'@x-util': resolve('./src/utils')
		}
	},
	plugins: [
		react(),
		vike(),
		vikeNode({
			entry: './src/server/index.ts',
			standalone: true,
			external: ['bun']
		})
	],
	css: {
		postcss: {
			plugins: [tailwindcss()]
		}
	}
} satisfies UserConfig;
