import { readdir, rm } from 'node:fs/promises';
import { dirname } from 'node:path';
import { join } from 'node:path/posix';
import esbuild from 'esbuild';

const root = process.cwd();
const serverOutDir = './dist/server/';
const serverOutDirAbs = join(root, serverOutDir);
const serverEntrypoint = ['./src/server.ts'];

const buildStandalone = async () => {
	const result = await esbuild.build({
		platform: 'node',
		target: 'esnext',
		format: 'esm',
		bundle: true,
		minify: true,
		treeShaking: true,
		external: ['bun'],
		entryPoints: serverEntrypoint,
		sourcemap: false,
		outfile: `${serverOutDirAbs}index.js`,
		splitting: false,
		allowOverwrite: true,
		metafile: true,
		logOverride: { 'ignored-bare-import': 'silent' }
	});

	const bundledFilesFromOutDir = Object.keys(result.metafile.inputs).filter(
		(relativeFile) => relativeFile.endsWith(relativeFile) && relativeFile.startsWith('dist/')
	);

	await Promise.all(
		bundledFilesFromOutDir.map(async (relativeFile) => {
			await rm(join(root, relativeFile));
		})
	);

	const relativeDirs = new Set(bundledFilesFromOutDir.map((file) => dirname(file)));
	for (const relativeDir of relativeDirs) {
		const absDir = join(root, relativeDir);
		const files = await readdir(absDir);
		if (!files.length) {
			await rm(absDir, { recursive: true });
			if (relativeDir.startsWith(serverOutDir)) {
				relativeDirs.add(dirname(relativeDir));
			}
		}
	}
};

console.info('[STANDALONE] Running...');
await buildStandalone();
