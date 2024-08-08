import type { MetadataRoute } from 'next';

export default function (): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			disallow: '/'
		}
	};
}
