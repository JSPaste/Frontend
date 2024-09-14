import { join } from 'node:path/posix';
import { $ } from 'bun';

const root = process.cwd();
const serverOutDir = './dist/server/';
const serverOutDirAbs = join(root, serverOutDir);
const serverEntrypoint = ['./src/server/index.ts'];

const buildStandalone = async () => {
	const result = await Bun.build({
		entrypoints: serverEntrypoint,
		outdir: serverOutDirAbs,
		target: 'bun',
		format: 'esm',
		splitting: false,
		packages: 'bundle',
		sourcemap: 'none',
		minify: true
	});

	if (!result.success) {
		console.error(result.logs);
		process.exit(1);
	}

	// Remove bundled files...
	await $`rm -rf ${serverOutDirAbs}/chunks/`;
	await $`rm -rf ${serverOutDirAbs}/entries/`;
	await $`rm -rf ${serverOutDirAbs}/entry.mjs`;
};

console.info('[STANDALONE] Running...');
await buildStandalone();
