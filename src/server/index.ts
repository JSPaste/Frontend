import { env, serve } from 'bun';
import { Hono } from 'hono';
import vike from 'vike-node/hono';
import { logger } from './logger.ts';

const hostname = env.HOSTNAME || env.HOST || 'localhost';
const port = env.PORT || 3000;

logger.set(2);

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
	hostname: hostname,
	port: port
});

logger.info(`Listening on http://${hostname}:${port}`);

// TODO: Support graceful shutdown
process.on('SIGTERM', () => {
	frontend.stop();
	//process.exit(0)
});
