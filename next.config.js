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
	env: {
		API_URL: process.env.API_URL
	},
	async redirects() {
		return [
			{
				source: '/github',
				destination: 'https://github.com/JSPaste/',
				permanent: true
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
	console.log('Loaded production config');
	configExport = million.next(nextConfig);
}

export default configExport;
