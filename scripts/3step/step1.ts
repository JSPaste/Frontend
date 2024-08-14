import { findFiles } from '../utils.ts';

export default async function () {
	const serverBuildStatus = await Bun.build({
		entrypoints: ['src/server.ts'],
		outdir: 'dist/',
		target: 'bun',
		external: ['vike']
	});

	if (!serverBuildStatus.success) {
		for (const message of serverBuildStatus.logs) {
			console.error(message);
		}

		process.exit(1);
	}

	const rootClientDirectory = 'dist/client/';
	const relativeClientFiles = await findFiles(rootClientDirectory, '**/*.js');
	const rootClientFiles = relativeClientFiles.map((file) => rootClientDirectory + file);

	const clientBuildStatus = await Bun.build({
		entrypoints: rootClientFiles,
		outdir: rootClientDirectory,
		target: 'browser',
		external: ['*'],
		root: 'dist/client/'
	});

	if (!clientBuildStatus.success) {
		for (const message of clientBuildStatus.logs) {
			console.error(message);
		}

		process.exit(1);
	}
}
