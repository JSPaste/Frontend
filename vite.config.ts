import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import vikeNode from 'vike-node/plugin';
import vike from 'vike/plugin';
import type { UserConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { pwaManifest } from './src/pages/manifest';

export default {
	build: {
		target: 'es2022',
		rollupOptions: {
			external: ['bun']
		},
		reportCompressedSize: false
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
		}),
		VitePWA({
			registerType: 'prompt',
			injectRegister: 'script-defer',
			manifest: pwaManifest,
			workbox: {
				globPatterns: ['**/*.{js,wasm,css,html,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}'],
				navigateFallback: null
			}
		})
	],
	css: {
		postcss: {
			plugins: [tailwindcss()]
		}
	}
} satisfies UserConfig;
