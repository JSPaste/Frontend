import node from '@astrojs/node';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import { VitePWA } from 'vite-plugin-pwa';
import { manifest } from './src/utils/manifest';

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: node({
		mode: 'standalone'
	}),
	integrations: [react()],
	build: {
		server: 'dist/astro/server',
		client: 'dist/astro/client'
	},
	server: {
		port: 3000
	},
	vite: {
		plugins: [
			VitePWA({
				registerType: 'autoUpdate',
				injectRegister: 'script-defer',
				manifest,
				workbox: {
					globDirectory: 'dist/astro/client/',
					globPatterns: ['**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}'],
					navigateFallback: null
				}
			})
		]
	}
});
