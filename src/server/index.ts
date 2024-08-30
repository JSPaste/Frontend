import { type Serve, env } from 'bun';
import mime from 'mime';
import { renderPage } from 'vike/server';
import { logger } from './logger.ts';
import { loadMemory, memory } from './memory.ts';

type Encoding = 'br' | 'zstd' | 'gzip';

const encodings: Record<Encoding, { extension: string; weight: number }> = {
	br: { extension: '.br', weight: 0 },
	zstd: { extension: '.zst', weight: 1 },
	gzip: { extension: '.gz', weight: 2 }
};

const hostname = env.HOSTNAME || env.HOST || 'localhost';
const port = env.PORT || 3000;

logger.set(2);

const staticDirectory = ['client/'];

for (const directory of staticDirectory) {
	logger.info(`Preloading memory from: "${directory}"`);
	await loadMemory(directory);
}

logger.info(`Listening on http://${hostname}:${port}`);

// TODO: 103 Early Hints -> https://github.com/oven-sh/bun/issues/8690
export default {
	async fetch(req) {
		const reqURL = new URL(req.url);

		// Static files
		if (Object.hasOwn(memory, reqURL.pathname)) {
			const headers: HeadersInit = {
				'Content-Type': mime.getType(reqURL.pathname) || 'application/octet-stream'
			};

			const acceptEncodings =
				req.headers
					.get('Accept-Encoding')
					?.split(',')
					.map((encoding) => encoding.trim())
					.filter((encoding): encoding is Encoding => Object.hasOwn(encodings, encoding))
					.sort((a, b) => encodings[a].weight - encodings[b].weight) || [];

			for (const acceptEncoding of acceptEncodings) {
				if (!Object.hasOwn(encodings, acceptEncoding)) continue;

				const extension = encodings[acceptEncoding as keyof typeof encodings].extension;

				if (Object.hasOwn(memory, reqURL.pathname + extension)) {
					headers['Content-Encoding'] = acceptEncoding;
					reqURL.pathname += extension;
					break;
				}
			}

			if (reqURL.pathname.startsWith('/assets/')) {
				headers['Cache-Control'] = 'public, max-age=31536000, immutable';
			} else {
				headers['Cache-Control'] = 'public, max-age=3600, no-transform';
			}

			logger.debug(req.method, reqURL.pathname);

			return new Response(memory[reqURL.pathname], {
				headers: headers
			});
		}

		// Dynamic pages
		const pageContext = await renderPage({ urlOriginal: reqURL.href });
		const response = pageContext.httpResponse;

		if (!response) {
			return new Response('NOT FOUND', { status: 404 });
		}

		const { readable, writable } = new TransformStream();

		response.pipe(writable);

		logger.debug(req.method, reqURL.pathname);

		return new Response(readable, {
			status: response.statusCode,
			headers: response.headers
		});
	},
	hostname: hostname,
	port: port
} satisfies Serve;

// TODO: Support graceful shutdown
process.on('SIGTERM', () => process.exit(0));
