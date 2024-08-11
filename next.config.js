/** @type {import('next').NextConfig} */
const nextConfig = Object.seal({
	output: undefined,
	reactStrictMode: true,
	poweredByHeader: false,

	// https://github.com/vercel/next.js/issues/19303 (obviously)
	transpilePackages: ['highlight.js'],
	experimental: {
		optimizePackageImports: ['highlight.js', 'lodash'],
		optimizeCss: true
	}
});

nextConfig.output = process.env.NEXT_STANDALONE ? 'standalone' : undefined;

export default nextConfig;
