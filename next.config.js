import million from 'million/compiler';

/** @type {import('next').NextConfig} */
const nextConfig = Object.seal({
	output: undefined,
	reactStrictMode: true,
	poweredByHeader: false,
	experimental: {
		optimizeCss: true,
		reactCompiler: true
	},
	async redirects() {
		return [
			{
				source: '/github',
				destination: 'https://github.com/jspaste',
				permanent: true
			},
			{
				source: '/favicon.ico',
				destination: '/media/jspaste.bg.rounded.svg',
				permanent: false
			},
			{
				source: '/:key/raw',
				destination: '/documents/:key/raw',
				permanent: true
			},
			{
				source: '/:key/r',
				destination: '/documents/:key/raw',
				permanent: true
			}
		];
	}
});

nextConfig.output = process.env.NEXT_STATIC ? 'export' : undefined;

export default million.next(nextConfig, {
	rsc: true
});
