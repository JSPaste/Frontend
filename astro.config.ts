import node from '@astrojs/node';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';
import compress from '@playform/compress';
import inline from '@playform/inline';
import { defineConfig } from 'astro/config';
import { VitePWA } from 'vite-plugin-pwa';
import { pwaManifest } from './src/manifest.ts';

export default defineConfig({
	output: 'server',
	adapter: node({
		mode: 'standalone'
	}),
	integrations: [
		tailwind({ applyBaseStyles: false }),
		preact(),
		inline({
			Path: ['dist/astro/']
		}),
		compress({
			HTML: {
				'html-minifier-terser': {
					removeComments: true,
					ignoreCustomComments: []
				}
			},
			Path: ['dist/astro/']
		})
	],
	build: {
		server: 'dist/astro/',
		client: 'dist/astro/public/'
	},
	server: {
		host: '0.0.0.0',
		port: 3000
	},
	vite: {
		plugins: [
			VitePWA({
				registerType: 'autoUpdate',
				injectRegister: 'script-defer',
				manifest: pwaManifest,
				workbox: {
					globDirectory: 'dist/astro/public/',
					globPatterns: ['**/*.{js,wasm,css,html,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}'],
					navigateFallback: null
				}
			})
		]
	}
});
