import MillionLint from '@million/lint';

/** @type {import('next').NextConfig} */
const nextConfig = Object.seal({
	output: undefined,
	reactStrictMode: true,
	poweredByHeader: false,
	experimental: {
		optimizeCss: true
	}
});

nextConfig.output = process.env.NEXT_STANDALONE ? 'standalone' : undefined;

export default MillionLint.next({ rsc: true, telemetry: false })(nextConfig);
