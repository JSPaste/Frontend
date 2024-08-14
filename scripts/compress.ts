import { brotliCompressSync, gzipSync } from 'node:zlib';
import { findFiles, writeFile } from './utils.ts';

const rootClientDirectory = 'dist/client/';
const relativeClientFiles = await findFiles(rootClientDirectory, undefined, /\.(js|mjs|cjs|json|css|html|wasm|svg)$/);
const rootClientFiles = relativeClientFiles.map((file) => rootClientDirectory + file);

console.info('[COMPRESS] Running...');
await Promise.all(
	rootClientFiles.map(async (file) => {
		const fileContent = await Bun.file(file).arrayBuffer();

		console.debug('[COMPRESS] Write:', `${file}`, '(gz, br)');
		await writeFile(`${file}.gz`, gzipSync(fileContent));
		await writeFile(`${file}.br`, brotliCompressSync(fileContent));
	})
);
