import { env, serve } from 'bun';
import { Hono } from 'hono';
import vike from 'vike-node/hono';
import { logger } from './logger.ts';

process.on('SIGTERM', () => frontend.stop());

logger.set(2);

const port = env.PORT || 3000;
const server = new Hono();

server.use(
	vike({
		compress: true,
		static: {
			cache: true
		}
	})
);

const frontend = serve({
	fetch: server.fetch,
	port: port
});

logger.info(`Listening on http://${frontend.hostname}:${frontend.port}`);
