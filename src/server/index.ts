import { logger } from '@x-util/logger.ts';
import { env, serve } from 'bun';
import { renderPage } from 'vike/server';

process.on('SIGTERM', () => frontend.stop());

logger.set(Number.parseInt(env.LOGLEVEL as string, 10));

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
		let localStatic = `./client${reqURL.pathname}`;
		let content = Bun.file(localStatic);

		if (!(await content.exists())) {
			content = Bun.file((localStatic += '/index.html'));
		}

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
				const candidateContent = Bun.file(localStatic + encodings[encoding]);

				if (await candidateContent.exists()) {
					headers['Content-Encoding'] = encoding;
					headers['Content-Type'] = content.type;
					headers.Vary = 'Accept-Encoding';
					content = candidateContent;
					break;
				}
			}

			if (reqURL.pathname.startsWith('/assets/')) {
				headers['Cache-Control'] = 'max-age=31536000, public, immutable';
			} else {
				headers['Cache-Control'] = 'max-age=3600, public, no-transform';
			}

			if (localStatic.endsWith('.html')) {
				headers['Cache-Control'] = 'max-age=0, private, must-revalidate';
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
			logger.debug(req.method, reqURL.pathname, '(DYNAMIC UNKNOWN)');

			return new Response(null, { status: 500 });
		}

		const { readable, writable } = new TransformStream();

		response.pipe(writable);

		logger.debug(req.method, reqURL.pathname, '(DYNAMIC)');

		return new Response(readable, {
			status: response.statusCode,
			headers: response.headers
		});
	},
	port: port
});

logger.info(`Listening on http://${frontend.hostname}:${frontend.port}`);
