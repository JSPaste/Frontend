import million from 'million/compiler';

/** @type {import('next').NextConfig} */
const config = Object.seal({
	output: undefined,
	reactStrictMode: true,
	poweredByHeader: false,
	experimental: {
		optimizeCss: true,
		reactCompiler: true
	}
});

config.output = process.env.NEXT_STATIC ? 'export' : undefined;

export default million.next(config, {
	rsc: true
});
