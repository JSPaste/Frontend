import { $ } from 'bun';
import { findFiles } from '../utils.ts';

export default async function () {
	const rootClientDirectory = 'dist/client/';
	const relativeClientFiles = await findFiles(rootClientDirectory, '**/*.js');
	const rootClientFiles = relativeClientFiles.map((file) => rootClientDirectory + file);

	const clientBuildStatus = await Bun.build({
		entrypoints: rootClientFiles,
		outdir: rootClientDirectory,
		target: 'browser',
		external: ['*'],
		root: 'dist/client/',
		minify: true
	});

	if (!clientBuildStatus.success) {
		for (const message of clientBuildStatus.logs) {
			console.error(message);
		}

		process.exit(1);
	}

	$`rm -rf dist/server/`;
}
