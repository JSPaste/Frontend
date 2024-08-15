import { $ } from 'bun';
import { findFiles } from '../utils.ts';

export default async function () {
	const serverBuildStatus = await Bun.build({
		entrypoints: ['./dist/server/index.mjs'],
		outdir: './dist/server/',
		target: 'bun'
	});

	if (!serverBuildStatus.success) {
		for (const message of serverBuildStatus.logs) {
			console.error(message);
		}

		process.exit(1);
	}

	await $`rm -f ./dist/server/importBuild*`;
	await $`rm ./dist/server/index.mjs`;

	const rootClientDirectory = './dist/client/';
	const relativeClientFiles = await findFiles(rootClientDirectory, '**/*.js');
	const rootClientFiles = relativeClientFiles.map((file) => rootClientDirectory + file);

	const clientBuildStatus = await Bun.build({
		entrypoints: rootClientFiles,
		outdir: rootClientDirectory,
		target: 'browser',
		external: ['*'],
		root: './dist/client/'
	});

	if (!clientBuildStatus.success) {
		for (const message of clientBuildStatus.logs) {
			console.error(message);
		}

		process.exit(1);
	}
}
