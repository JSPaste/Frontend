import { transform } from '@swc/core';
import { $ } from 'bun';
import { findFiles, writeFile } from './utils.ts';

const serverTarget = 'esnext';
const clientTarget = 'es2020';

const serverAssets = async () => {
	const rootStaticDirectory = './dist/server/';
	const relativeStaticFilesPath = await findFiles(rootStaticDirectory, '**/*.js');
	const rootStaticFilesPath = relativeStaticFilesPath.map((file) => rootStaticDirectory + file);

	await Promise.all(
		rootStaticFilesPath.map(async (file) => {
			const min = await transform(await Bun.file(file).text(), {
				isModule: true,
				minify: true,
				jsc: {
					target: serverTarget,
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
					target: clientTarget,
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
await $`rm -f ./dist/server/importBuild*`;

await serverAssets();
await clientAssets();
