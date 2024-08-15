import { resolve } from 'node:path';
import { Glob, file as bunFile } from 'bun';

export const memory: Record<string, ArrayBuffer> = {};

export const loadMemory = async (directory: string) => {
	const glob = new Glob('**');

	const relativeFiles = await Array.fromAsync(
		glob.scan({
			cwd: directory,
			onlyFiles: true
		})
	);

	for (const relativeFile of relativeFiles) {
		memory[`/${relativeFile}`] = await bunFile(
			resolve(`${directory}/${relativeFile}`).replace(/\/+/g, '/')
		).arrayBuffer();
	}
};
