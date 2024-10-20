import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import solid from 'vike-solid/vite';
import vike from 'vike/plugin';
import type { UserConfig } from 'vite';

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
		tailwindcss(),
		solid(),
		vike({
			// Other static redirects on "server.ts"...
			redirects: {
				// TODO: Expose Backend API route locations
				'/@documentName/r': '/api/document/@documentName/raw',
				'/@documentName/raw': '/api/document/@documentName/raw'
			},
			prerender: {
				partial: true
			}
		})
	]
} satisfies UserConfig;
