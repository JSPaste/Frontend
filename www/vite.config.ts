import { resolve } from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import type { UserConfig } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';
import solid from 'vite-plugin-solid';

export default {
	appType: 'spa',
	cacheDir: './node_modules/.tmp',
	build: {
		target: 'es2023',
		outDir: './dist/',
		reportCompressedSize: false,
		rollupOptions: {
			output: {
				entryFileNames: 'assets/router-[hash].js',
				chunkFileNames: 'assets/chunk-[hash].js',
				assetFileNames: 'assets/chunk-[hash][extname]'
			}
		}
	},
	experimental: {
		enableNativePlugin: true
	},
	css: {
		transformer: 'lightningcss',
		lightningcss: {
			targets: browserslistToTargets(browserslist('Chrome >= 114, Firefox >= 125, Safari >= 17'))
		}
	},
	plugins: [
		solid(),
		tailwindcss(),
		analyzer({
			enabled: process.env.VITE_ANALYZE === 'true',
			analyzerMode: 'server',
			openAnalyzer: true
		})
	],
	resolve: {
		alias: {
			'#component': resolve('./src/components'),
			'#screen': resolve('./src/screens'),
			'#util': resolve('./src/utils')
		}
	}
} satisfies UserConfig;
