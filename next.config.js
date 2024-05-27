/** @type {import('next').NextConfig} */
const nextConfig = {
	output: process.env.NEXT_OUTPUT,
	reactStrictMode: true,
	poweredByHeader: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*',
				port: ''
			}
		]
	},
	bundlePagesRouterDependencies: true,
	experimental: {
		reactCompiler: true,
		ppr: true
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

export default nextConfig;
