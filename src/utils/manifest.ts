import type { ManifestOptions } from 'vite-plugin-pwa';
import { seo } from './seo';

export const manifest: Partial<ManifestOptions> = {
	start_url: '/',
	name: seo.siteShortName,
	short_name: seo.siteShortName,
	description: seo.description,
	theme_color: '#FFE184',
	background_color: '#2E2E2E',
	display: 'minimal-ui',
	icons: [
		{
			src: '/media/logo.svg',
			sizes: '1024x1024',
			type: 'image/svg+xml'
		},
		{
			src: '/media/logo.webp',
			sizes: '512x512',
			type: 'image/webp'
		}
	]
};
