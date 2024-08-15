import type { Serve } from 'bun';
import mime from 'mime';
import { renderPage } from 'vike/server';
import { logger } from './logger.ts';
import { loadMemory, memory } from './memory.ts';

const encodings = {
	br: '.br',
	zstd: '.zst',
	gzip: '.gz'
};

const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000;

logger.set(2);

const staticDirectory = 'client/';

logger.info(`Preloading memory from: "${staticDirectory}"`);
await loadMemory(staticDirectory);

logger.info(`Listening on http://localhost:${port}`);

// TODO: 103 Early Hints -> https://github.com/oven-sh/bun/issues/8690
export default {
	async fetch(req) {
		const url = new URL(req.url);

		// Static files
		if (Object.hasOwn(memory, url.pathname)) {
			const acceptEncoding = req.headers.get('Accept-Encoding');
			let selectedEncoding: keyof typeof encodings | undefined;

			if (acceptEncoding) {
				for (const encoding of acceptEncoding.split(',').map((encoding) => encoding.trim())) {
					for (const [availableEncoding, extension] of Object.entries(encodings)) {
						if (availableEncoding !== encoding) continue;

						if (Object.hasOwn(memory, url.pathname + extension)) {
							selectedEncoding = availableEncoding as keyof typeof encodings;
							break;
						}
					}
				}
			}

			const headers: HeadersInit = {
				'Content-Type': mime.getType(url.pathname) || 'application/octet-stream'
			};

			if (selectedEncoding) {
				headers['Content-Encoding'] = selectedEncoding;
			}

			if (url.pathname.startsWith('/assets/')) {
				headers['Cache-Control'] = 'public, max-age=31536000, immutable';
			} else {
				headers['Cache-Control'] = 'public, max-age=3600, no-transform';
			}

			logger.debug(req.method, url.pathname + (selectedEncoding ? encodings[selectedEncoding] : ''));

			return new Response(memory[url.pathname + (selectedEncoding ? encodings[selectedEncoding] : '')], {
				headers: headers
			});
		}

		// Dynamic pages
		const pageContext = await renderPage({ urlOriginal: url.href });
		const response = pageContext.httpResponse;

		if (!response) {
			return new Response('NOT FOUND', { status: 404 });
		}

		const { readable, writable } = new TransformStream();

		response.pipe(writable);

		logger.debug(req.method, url.pathname);

		return new Response(readable, {
			status: response.statusCode,
			headers: response.headers
		});
	},
	port: port
} satisfies Serve;

// TODO: Support graceful shutdown
process.on('SIGTERM', () => process.exit(0));
