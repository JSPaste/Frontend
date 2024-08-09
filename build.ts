import { transform } from '@swc/core';
import { $, Glob } from 'bun';

const findFiles = async (directory: string, globPattern: string) => {
	const glob = new Glob(globPattern);

	return Array.fromAsync(
		glob.scan({
			cwd: directory,
			onlyFiles: true
		})
	);
};

const writeFile = async (directory: string, file: string, data: string) => {
	await Bun.write(`${directory}/${file}`, data);
};

const step1 = async () => {
	const rootStaticDirectory = '.next/static/';
	const relativeStaticFilesPath = await findFiles(rootStaticDirectory, '**/*.js');
	const rootStaticFilesPath = relativeStaticFilesPath.map((file) => rootStaticDirectory + file);

	const status = await Bun.build({
		entrypoints: rootStaticFilesPath,
		outdir: 'dist/step1/',
		target: 'browser',
		root: '.'
	});

	if (!status.success) {
		for (const message of status.logs) {
			console.error(message);
		}

		process.exit(1);
	}
};

const step2 = async () => {
	// Add "standalone" folder
	await $`cp -a .next/standalone/. dist/step1/`;

	const rootServerDirectory = 'dist/step1/.next/server/';
	const rootStaticDirectory = 'dist/step1/.next/static/';

	const relativeServerFilesPath = await findFiles(rootServerDirectory, '**/*.js');
	const relativeStaticFilesPath = await findFiles(rootStaticDirectory, '**/*.js');

	const rootServerFilesPath = relativeServerFilesPath.map((file) => rootServerDirectory + file);
	const rootStaticFilesPath = relativeStaticFilesPath.map((file) => rootStaticDirectory + file);

	await Promise.all(
		[...rootStaticFilesPath, ...rootServerFilesPath, `${rootServerDirectory}../../server.js`].map(async (file) => {
			const min = await transform(await Bun.file(file).text(), {
				configFile: 'swc.json'
			});

			await writeFile('dist/step2/', file.replace('dist/step1/', ''), min.code);
		})
	);
};

const standalone = async () => {
	const rootStaticDirectory = 'dist/step2/.next/static/';
	const relativeStaticFilesPath = await findFiles(rootStaticDirectory, '**/*.js');
	const rootStaticFilesPath = relativeStaticFilesPath.map((file) => rootStaticDirectory + file);

	const status = await Bun.build({
		entrypoints: rootStaticFilesPath,
		outdir: 'dist/standalone/.next/',
		target: 'browser',
		root: 'dist/step2/.next/',
		minify: true
	});

	if (!status.success) {
		for (const message of status.logs) {
			console.error(message);
		}

		process.exit(1);
	}

	// Passthrough "standalone" files...
	await $`cp -a --update=none dist/step2/. dist/standalone/`;
	await $`cp -a --update=none .next/standalone/. dist/standalone/`;

	await $`cp -a public/ dist/standalone/`;
};

await $`rm -rf dist/`;

console.info('[BUILD - step1] Running...');
await step1();

console.info('[BUILD - step2] Running...');
await step2();

console.info('[BUILD - standalone] Running...');
await standalone();
