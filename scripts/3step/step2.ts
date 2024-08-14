import { transform } from '@swc/core';
import { findFiles, writeFile } from '../utils.ts';

export default async function () {
	const rootStaticDirectory = 'dist/';
	const relativeStaticFilesPath = await findFiles(rootStaticDirectory, '**/*.js');
	const rootStaticFilesPath = relativeStaticFilesPath.map((file) => rootStaticDirectory + file);

	await Promise.all(
		rootStaticFilesPath.map(async (file) => {
			const min = await transform(await Bun.file(file).text(), {
				configFile: 'swc.json'
			});

			await writeFile(file, min.code);
		})
	);
}
