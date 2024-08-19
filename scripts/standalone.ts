import { cp, readdir, rm, stat } from 'node:fs/promises';
import { dirname } from 'node:path';
import { join, relative } from 'node:path/posix';
import { nodeFileTrace } from '@vercel/nft';
import { $ } from 'bun';
import esbuild from 'esbuild';
import { searchForWorkspaceRoot } from 'vite';

const root = process.cwd();
const serverOutDir = './dist/server/';
const serverOutDirAbs = join(root, serverOutDir);
const serverEntrypoint = ['./src/server/index.ts'];
const base = searchForWorkspaceRoot(root);
const relativeRoot = relative(base, root);
const relativeOutDir = join(relativeRoot, serverOutDir);

const findCommonAncestor = (paths: string[]): string => {
	if (paths.length <= 1) return '';

	const pathComponents = paths.map((path) => path.split('/'));
	let commonAncestor = '';
	let index = 0;

	while (pathComponents.every((components) => components[index] === pathComponents[0]?.[index])) {
		commonAncestor += `${pathComponents[0]?.[index]}/`;
		index++;
	}

	return commonAncestor ? commonAncestor.slice(0, -1) : '';
};

const buildWithEsbuild = async () => {
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
		outdir: serverOutDirAbs,
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

	await $`rm -f ./dist/server/importBuild*`;
};

const traceAndCopyDependencies = async (base: string, relativeRoot: string, relativeOutDir: string) => {
	const result = await nodeFileTrace(serverEntrypoint, { base });
	const tracedDeps = new Set(
		[...result.fileList].filter(
			(file) => !result.reasons.get(file)?.type.includes('initial') && !file.startsWith('usr/')
		)
	);

	const filesToCopy = [...tracedDeps].filter((path) => !path.startsWith(relativeOutDir));

	if (!filesToCopy.length) return;

	const commonAncestor = findCommonAncestor(filesToCopy);
	const copiedFiles = new Set<string>();

	await Promise.all(
		filesToCopy.map(async (relativeFile) => {
			const tracedFilePath = join(base, relativeFile);
			const isNodeModules = relativeFile.includes('node_modules');
			const relativeFileClean = relativeFile.replace(relativeRoot, '').replace(commonAncestor, '');
			const relativeFileHoisted = `node_modules${relativeFileClean.split('node_modules').pop()}`;
			const fileOutputPath = join(serverOutDirAbs, isNodeModules ? relativeFileHoisted : relativeFileClean);

			if (!(await stat(tracedFilePath)).isDirectory() && !copiedFiles.has(fileOutputPath)) {
				copiedFiles.add(fileOutputPath);
				await cp(tracedFilePath, fileOutputPath, { recursive: true, dereference: true });
			}
		})
	);
};

console.info('[STANDALONE] Running...');
await buildWithEsbuild();
await traceAndCopyDependencies(base, relativeRoot, relativeOutDir);
