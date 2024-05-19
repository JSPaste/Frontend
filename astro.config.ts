import node from '@astrojs/node';
import react from '@astrojs/react';
import astroCompress from '@playform/compress';
import astroInline from '@playform/inline';
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
			HTML: {
				'html-minifier-terser': {
					removeComments: true,
					ignoreCustomComments: [],
					ignoreCustomFragments: [],
					removeAttributeQuotes: true,
					removeRedundantAttributes: true,
					removeEmptyElements: true,
					removeEmptyAttributes: true,
					minifyJS: true,
					minifyCSS: true,
					minifyURLs: true,
					collapseWhitespace: true,
					collapseInlineTagWhitespace: true,
					collapseBooleanAttributes: true
				}
			},
			Path: ['./dist/astro/']
		}),
		astroInline({
			Path: ['./dist/astro/']
		})
	],
	build: {
		server: './dist/astro/',
		client: './dist/astro/public/'
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
					globDirectory: './dist/astro/public/',
					globPatterns: ['**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}'],
					navigateFallback: null
				}
			}),
			million.vite({
				mode: 'react',
				telemetry: false,
				server: true,
				auto: true
			})
		]
	}
});
