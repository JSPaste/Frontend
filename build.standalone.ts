import { $ } from 'bun';

await Bun.build({
	target: 'bun',
	splitting: true,
	minify: {
		whitespace: true,
		syntax: true,
		identifiers: false
	},
	naming: {
		entry: 'index.[ext]',
		chunk: 'chunks/[hash].[ext]',
		asset: 'chunks/[name].[ext]'
	},
	outdir: 'dist/prod/',
	entrypoints: ['dist/astro/entry.mjs']
});

await $`cp -a dist/astro/public/ dist/prod/`;
