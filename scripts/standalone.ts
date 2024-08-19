// DIRTY PORT FROM vike-node

import * as fs from 'node:fs';
import * as path from 'node:path';
import { nodeFileTrace } from '@vercel/nft';
import esbuild from 'esbuild';
import { type ResolvedConfig, searchForWorkspaceRoot } from 'vite';

const viteConfig = (await import(path.resolve(process.cwd(), 'vite.config.ts'))).default as ResolvedConfig;
const root = process.cwd();
const outDir = './dist/server/';
const outDirAbs = path.posix.join(root, outDir);
const serverEntrypoint = ['./src/server/index.ts'];
const base = searchForWorkspaceRoot(root);
const relativeRoot = path.posix.relative(base, root);
const relativeOutDir = path.posix.join(relativeRoot, outDir);

function generateBanner() {
	return [
		"import { dirname as dirname987 } from 'path';",
		"import { fileURLToPath as fileURLToPath987 } from 'url';",
		"import { createRequire as createRequire987 } from 'module';",
		'var require = createRequire987(import.meta.url);',
		'var __filename = fileURLToPath987(import.meta.url);',
		'var __dirname = dirname987(__filename);'
	].join('\n');
}

function findCommonAncestor(paths: string[]): string {
	if (paths.length <= 1) return '';

	const pathComponents = paths.map((path) => path.split('/'));
	let commonAncestor = '';
	let index = 0;

	while (pathComponents.every((components) => components[index] === pathComponents[0]?.[index])) {
		commonAncestor += `${pathComponents[0]?.[index]}/`;
		index++;
	}

	return commonAncestor ? commonAncestor.slice(0, -1) : '';
}

async function buildWithEsbuild() {
	return esbuild.build({
		platform: 'node',
		target: 'esnext',
		format: 'esm',
		bundle: true,
		external: ['bun'],
		entryPoints: serverEntrypoint,
		sourcemap: viteConfig.build.sourcemap === 'hidden' ? true : viteConfig.build.sourcemap,
		outExtension: { '.js': '.mjs' },
		outdir: outDirAbs,
		splitting: false,
		allowOverwrite: true,
		metafile: true,
		logOverride: { 'ignored-bare-import': 'silent' },
		banner: { js: generateBanner() }
	});
}

async function removeLeftoverFiles(res: Awaited<ReturnType<typeof buildWithEsbuild>>) {
	// Remove bundled files from outDir
	const bundledFilesFromOutDir = Object.keys(res.metafile.inputs).filter(
		(relativeFile) =>
			!serverEntrypoint.some((entryFilePath) => entryFilePath.endsWith(relativeFile)) &&
			relativeFile.startsWith(viteConfig.build.outDir)
	);

	await Promise.all(
		bundledFilesFromOutDir.map(async (relativeFile) => {
			fs.rmSync(path.posix.join(root, relativeFile));
			if (![false, 'inline'].includes(viteConfig.build.sourcemap)) {
				fs.rmSync(path.posix.join(root, `${relativeFile}.map`));
			}
		})
	);

	// Remove empty directories
	const relativeDirs = new Set(bundledFilesFromOutDir.map((file) => path.dirname(file)));
	for (const relativeDir of relativeDirs) {
		const absDir = path.posix.join(root, relativeDir);
		const files = fs.readdirSync(absDir);
		if (!files.length) {
			fs.rmSync(absDir, { recursive: true });
			if (relativeDir.startsWith(outDir)) {
				relativeDirs.add(path.dirname(relativeDir));
			}
		}
	}
}

async function traceAndCopyDependencies(base: string, relativeRoot: string, relativeOutDir: string) {
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
		filesToCopy.map((relativeFile) => {
			const tracedFilePath = path.posix.join(base, relativeFile);
			const isNodeModules = relativeFile.includes('node_modules');

			// biome-ignore lint/style/noParameterAssign: Dirty
			relativeFile = relativeFile.replace(relativeRoot, '').replace(commonAncestor, '');
			const relativeFileHoisted = `node_modules${relativeFile.split('node_modules').pop()}`;
			const fileOutputPath = path.posix.join(outDirAbs, isNodeModules ? relativeFileHoisted : relativeFile);

			if (!fs.statSync(tracedFilePath).isDirectory() && !copiedFiles.has(fileOutputPath)) {
				copiedFiles.add(fileOutputPath);
				fs.cpSync(tracedFilePath, fileOutputPath, { recursive: true, dereference: true });
			}
		})
	);
}

const esbuildResult = await buildWithEsbuild();
await removeLeftoverFiles(esbuildResult);
await traceAndCopyDependencies(base, relativeRoot, relativeOutDir);
