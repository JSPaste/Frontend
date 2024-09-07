import { transform } from '@swc/core';
import { findFiles, writeFile } from './utils.ts';

const serverAssets = async () => {
	const rootStaticDirectory = './dist/server/';
	const relativeStaticFilesPath = await findFiles(rootStaticDirectory, '**/*.js');
	const relativeModuleStaticFilesPath = await findFiles(rootStaticDirectory, '**/*.mjs');
	const rootStaticFilesPath = [...relativeStaticFilesPath, ...relativeModuleStaticFilesPath].map(
		(file) => rootStaticDirectory + file
	);

	await Promise.all(
		rootStaticFilesPath.map(async (file) => {
			const min = await transform(await Bun.file(file).text(), {
				isModule: true,
				minify: true,
				jsc: {
					target: 'esnext',
					minify: {
						compress: {
							arguments: true,
							hoist_funs: true,
							hoist_vars: true,
							unsafe: true
						},
						format: {
							comments: false
						},
						mangle: true
					}
				}
			});

			await writeFile(file, min.code);
		})
	);
};

const clientAssets = async () => {
	const rootStaticDirectory = './dist/client/';
	const relativeStaticFilesPath = await findFiles(rootStaticDirectory, '**/*.js');
	const rootStaticFilesPath = relativeStaticFilesPath.map((file) => rootStaticDirectory + file);

	await Promise.all(
		rootStaticFilesPath.map(async (file) => {
			const min = await transform(await Bun.file(file).text(), {
				isModule: true,
				minify: true,
				jsc: {
					target: 'es2020',
					minify: {
						compress: {
							arguments: true,
							hoist_funs: true,
							hoist_vars: true,
							unsafe: true
						},
						format: {
							comments: false
						},
						mangle: true
					}
				}
			});

			await writeFile(file, min.code);
		})
	);
};

console.info('[MINIFY] Running...');
console.info('[MINIFY] Minifying server...');
await serverAssets();
console.info('[MINIFY] Minifying client...');
await clientAssets();
