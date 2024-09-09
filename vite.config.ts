import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { pwaManifest } from '@x-page/manifest.ts';
import vike from 'vike/plugin';
import type { UserConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

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
		vike({
			prerender: {
				partial: true
			}
		}),
		VitePWA({
			registerType: 'prompt',
			injectRegister: 'script-defer',
			selfDestroying: true,
			manifest: pwaManifest,
			workbox: {
				globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,gif,webp,ico}'],
				navigateFallback: null,
				cleanupOutdatedCaches: true
			}
		})
	]
} satisfies UserConfig;
