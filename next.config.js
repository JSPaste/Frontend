import million from 'million/compiler';

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

let configExport = nextConfig;

if (process.env.NODE_ENV === 'production') {
	console.info('Loaded production config');
	configExport = million.next(nextConfig);
}

export default configExport;
