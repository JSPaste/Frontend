import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import vike from 'vike/plugin';
import type { UserConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { pwaManifest } from './src/pages/manifest';

export default {
	build: {
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
