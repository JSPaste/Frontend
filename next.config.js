import million from 'million/compiler';

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: process.env.NEXT_OUTPUT,
	reactStrictMode: true,
	poweredByHeader: false,
	compiler: {
		styledComponents: true,
		removeConsole: true,
		styledJsx: true
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*',
				port: ''
			}
		]
	},
	experimental: {
		ppr: true,
		optimizeCss: true,
		reactCompiler: true,
		workerThreads: true,
		webpackBuildWorker: true,
		appDocumentPreloading: true,
		parallelServerCompiles: true
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
};

export default million.next(nextConfig, {
	rsc: true
});
