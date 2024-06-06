import million from 'million/compiler';

/** @type {import('next').NextConfig} */
const nextConfig = Object.seal({
	output: undefined,
	reactStrictMode: true,
	poweredByHeader: false,
	experimental: {
		optimizeCss: true,
		reactCompiler: true
	}
});

nextConfig.output = process.env.NEXT_STATIC ? 'export' : undefined;

export default million.next(nextConfig, {
	rsc: true
});
