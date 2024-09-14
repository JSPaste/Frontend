import { findFiles } from './utils.ts';

const serverAssets = async () => {
	const rootStaticDirectory = './dist/server/';
	const relativeStaticFilesPath = await findFiles(rootStaticDirectory, '**/*.js');
	const rootStaticFilesPath = relativeStaticFilesPath.map((file) => rootStaticDirectory + file);

	const result = await Bun.build({
		entrypoints: rootStaticFilesPath,
		target: 'bun',
		format: 'esm',
		splitting: false,
		packages: 'external',
		sourcemap: 'none',
		minify: true
	});

	if (!result.success) {
		console.error(result.logs);
		process.exit(1);
	}
};

const clientAssets = async () => {
	const rootStaticDirectory = './dist/client/';
	const relativeStaticFilesPath = await findFiles(rootStaticDirectory, '**/*.js');
	const rootStaticFilesPath = relativeStaticFilesPath.map((file) => rootStaticDirectory + file);

	const result = await Bun.build({
		entrypoints: rootStaticFilesPath,
		target: 'browser',
		format: 'esm',
		splitting: false,
		packages: 'external',
		sourcemap: 'none',
		minify: true
	});

	if (!result.success) {
		console.error(result.logs);
		process.exit(1);
	}
};

console.info('[MINIFY] Running...');
console.info('[MINIFY] Minifying server...');
await serverAssets();
console.info('[MINIFY] Minifying client...');
await clientAssets();
