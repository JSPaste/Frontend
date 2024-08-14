/**
 * @module
 * Serve Static Middleware for Hono.
 */
import type { Context, Env, MiddlewareHandler } from 'hono';
import { getFilePath, getFilePathWithoutDefaultDocument } from 'hono/utils/filepath';
import { getMimeType } from 'hono/utils/mime';

export type ServeStaticOptions<E extends Env = Env> = {
	root?: string;
	path?: string;
	precompressed?: boolean;
	mimes?: Record<string, string>;
	rewriteRequestPath?: (path: string) => string;
	onNotFound?: (path: string, c: Context<E>) => void | Promise<void>;
};

const DEFAULT_DOCUMENT = 'index.html';
const defaultPathResolve = (path: string) => path;

const checkPrecompressedFile = async (
	path: string,
	getContent: (path: string, c: Context) => Promise<string | ArrayBuffer | ReadableStream | Response | null>,
	c: Context
) => {
	const acceptEncoding = c.req.header('Accept-Encoding') || '';
	const content = [
		{ extension: '.br', encoding: 'br' },
		{ extension: '.zst', encoding: 'zstd' },
		{ extension: '.gz', encoding: 'gzip' }
	];

	for (const { extension, encoding } of content) {
		if (!acceptEncoding.includes(encoding)) return;

		const precompressedPath = path + extension;
		const content = await getContent(precompressedPath, c);

		if (content) {
			return { content, extension };
		}
	}
	return null;
};

/**
 * This middleware is not directly used by the user. Create a wrapper specifying `getContent()` by the environment such as Deno or Bun.
 */
export const serveStatic = <E extends Env = Env>(
	options: ServeStaticOptions<E> & {
		getContent: (path: string, c: Context<E>) => Promise<string | ArrayBuffer | ReadableStream | Response | null>;
		pathResolve?: (path: string) => string;
		isDir?: (path: string) => boolean | undefined | Promise<boolean | undefined>;
	}
): MiddlewareHandler => {
	return async (c, next) => {
		// Do nothing if Response is already set
		if (c.finalized) {
			await next();
			return;
		}

		let filename = options.path ?? decodeURI(c.req.path);
		filename = options.rewriteRequestPath ? options.rewriteRequestPath(filename) : filename;
		const root = options.root;

		// If it was Directory, force `/` on the end.
		if (!filename.endsWith('/') && options.isDir) {
			const path = getFilePathWithoutDefaultDocument({
				filename,
				root
			});
			if (path && (await options.isDir(path))) {
				filename = `${filename}/`;
			}
		}

		let path = getFilePath({
			filename,
			root,
			defaultDocument: DEFAULT_DOCUMENT
		});

		if (!path) {
			return await next();
		}

		const getContent = options.getContent;
		const pathResolve = options.pathResolve ?? defaultPathResolve;

		path = pathResolve(path);
		let content = await getContent(path, c);

		if (options.precompressed) {
			const precompressed = await checkPrecompressedFile(path, getContent, c);

			if (precompressed) {
				content = precompressed.content;
				switch (precompressed.extension) {
					case '.br': {
						c.header('Content-Encoding', 'br');
						break;
					}
					case '.zst': {
						c.header('Content-Encoding', 'zstd');
						break;
					}
					case '.gz': {
						c.header('Content-Encoding', 'gzip');
						break;
					}
				}
			}
		}

		if (!content) {
			let pathWithOutDefaultDocument = getFilePathWithoutDefaultDocument({
				filename,
				root
			});
			if (!pathWithOutDefaultDocument) {
				return await next();
			}
			pathWithOutDefaultDocument = pathResolve(pathWithOutDefaultDocument);

			if (pathWithOutDefaultDocument !== path) {
				content = await getContent(pathWithOutDefaultDocument, c);
				if (content) {
					path = pathWithOutDefaultDocument;
				}
			}
		}

		if (content instanceof Response) {
			return c.newResponse(content.body, content);
		}

		if (content) {
			let mimeType: string | undefined;
			if (options.mimes) {
				mimeType = getMimeType(path, options.mimes) ?? getMimeType(path);
			} else {
				mimeType = getMimeType(path);
			}
			if (mimeType) {
				c.header('Content-Type', mimeType);
			}
			return c.body(content);
		}

		await options.onNotFound?.(path, c);
		await next();

		return;
	};
};
