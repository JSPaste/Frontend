import type { MetadataRoute } from 'next';

export const robots = (): MetadataRoute.Robots => {
	return {
		rules: {
			userAgent: '*',
			disallow: '/'
		}
	};
};

export default robots;
