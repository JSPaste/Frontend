// THIS FILE IS PART OF THE STANDALONE, DO NOT RUN IT DIRECTLY

import type { Serve } from 'bun';
import { type Context, Hono } from 'hono';
import { env } from 'hono/adapter';
import { serveStatic } from 'hono/bun';
import { renderPage } from 'vike/server';
import '../dist/server/entry.mjs';

const envs = env<{ NODE_ENV: string; PORT: string }>({ env: {} } as unknown as Context<object>);

const server = new Hono();

// TODO: Add Early Hints
// FIXME: Add cache policy
server.use(
	'/*',
	serveStatic({
		root: 'client/',
		precompressed: true
	})
);

server.all('*', async (ctx, next) => {
	const pageContext = await renderPage({ urlOriginal: ctx.req.url });
	const response = pageContext.httpResponse;

	if (!response) return next();

	const { readable, writable } = new TransformStream();

	response.pipe(writable);

	return new Response(readable, {
		status: response.statusCode,
		headers: response.headers
	});
});

envs.NODE_ENV = 'production';
const port = envs.PORT ? Number.parseInt(envs.PORT, 10) : 3000;

console.log(`Server listening on http://localhost:${port}`);

export default {
	fetch: server.fetch,
	port: port
} satisfies Serve;
