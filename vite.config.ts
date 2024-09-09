import { resolve } from 'node:path';
import react from '@vitejs/plugin-react-swc';
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
		react(),
		vike({
			redirects: {
				// FIXME: Vike crashes, maybe Bun issue?
				'/github': 'https://github.com/jspaste',

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
