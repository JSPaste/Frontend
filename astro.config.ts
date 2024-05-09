import node from '@astrojs/node';
import react from '@astrojs/react';
import astroCompress from '@playform/compress';
import { defineConfig } from 'astro/config';
import million from 'million/compiler';
import { VitePWA } from 'vite-plugin-pwa';
import { manifest } from './src/utils/manifest';

export default defineConfig({
	output: 'server',
	adapter: node({
		mode: 'standalone'
	}),
	integrations: [
		react(),
		astroCompress({
			Path: ['dist/astro/']
		})
	],
	build: {
		server: 'dist/astro/server/',
		client: 'dist/astro/client/'
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
			}),
			million.vite({ mode: 'react', telemetry: false, server: true, auto: true })
		]
	}
});
