import { logger } from '@x-util/logger.ts';
import { env, serve } from 'bun';
import { renderPage } from 'vike/server';

process.on('SIGTERM', () => frontend.stop());

logger.set(2);

const encodings = {
	br: '.br',
	// zstd: '.zst',
	gzip: '.gz'
} as const;

const port = env.PORT || 3000;

// TODO: 103 Early Hints -> https://github.com/oven-sh/bun/issues/8690
const frontend = serve({
	async fetch(req) {
		const reqURL = new URL(req.url);

		// Static files
		let content = Bun.file(`./client${reqURL.pathname}`);
		if (await content.exists()) {
			const headers: HeadersInit = {};

			const acceptEncodings =
				req.headers
					.get('Accept-Encoding')
					?.split(',')
					.map((encoding) => encoding.trim())
					.filter((encoding): encoding is keyof typeof encodings => Object.hasOwn(encodings, encoding))
					.sort((a, b) => Object.keys(encodings).indexOf(a) - Object.keys(encodings).indexOf(b)) ?? [];

			for (const encoding of acceptEncodings) {
				const candidateContent = Bun.file(`./client${reqURL.pathname + encodings[encoding]}`);

				if (await candidateContent.exists()) {
					headers['Content-Encoding'] = encoding;
					headers['Content-Type'] = content.type;
					headers.Vary = 'Accept-Encoding';
					content = candidateContent;
					break;
				}
			}

			if (reqURL.pathname.startsWith('/assets/')) {
				headers['Cache-Control'] = 'public, max-age=31536000, immutable';
			} else {
				headers['Cache-Control'] = 'public, max-age=3600, no-transform';
			}

			logger.debug(req.method, reqURL.pathname);

			return new Response(content, {
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
	port: port
});

logger.info(`Listening on http://${frontend.hostname}:${frontend.port}`);
