import node from '@astrojs/node';
import solidJs from '@astrojs/solid-js';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: node({
		mode: 'standalone'
	}),
	integrations: [solidJs()],
	build: {
		server: 'dist/astro/server',
		client: 'dist/astro/client'
	},
	server: {
		port: 4000
	}
});
