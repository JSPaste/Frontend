import { file as bunFile, Glob } from 'bun';
import { resolve } from 'node:path';

export const memory: Record<string, ArrayBuffer> = {};

export const loadMemory = async (directory: string) => {
	const glob = new Glob('**');

	let relativeFiles = await Array.fromAsync(
		glob.scan({
			cwd: directory,
			onlyFiles: true
		})
	);

	for (const relativeFile of relativeFiles) {
		memory['/' + relativeFile] = await bunFile(
			resolve(directory + '/' + relativeFile).replace(/\/+/g, '/')
		).arrayBuffer();
	}
};
