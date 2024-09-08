import type { ManifestOptions } from 'vite-plugin-pwa';

export const siteManifest = {
	type: 'website',
	baseURL: 'https://jspaste.eu',
	siteShortTitle: 'JSPaste',
	siteTitle: 'JSPaste - The developer website for easy code sharing.',
	description: 'Create and share code with JSPaste! The developer website for easy code sharing.',
	logotype: {
		localRoute: '/media/jspaste.bg.rounded.svg',
		url: 'https://jspaste.eu/media/jspaste.bg.rounded.svg',
		alt: 'JSPaste',
		width: 1024,
		height: 1024
	},
	banner: {
		localRoute: '/media/jspaste.bg.rounded.svg',
		url: 'https://jspaste.eu/media/jspaste.bg.rounded.svg',
		alt: 'JSPaste',
		width: 1024,
		height: 1024
	}
} as const;

export const pwaManifest: Partial<ManifestOptions> = {
	id: '/',
	start_url: '/',
	name: siteManifest.siteShortTitle,
	short_name: siteManifest.siteShortTitle,
	description: siteManifest.description,
	theme_color: '#FFE285',
	background_color: '#2E2E2E',
	display: 'standalone',
	icons: [
		{
			src: '/media/jspaste.bg.rounded.svg',
			sizes: '1024x1024',
			type: 'image/svg+xml'
		},
		{
			src: '/favicon.ico',
			sizes: '96x96',
			type: 'image/x-icon'
		}
	]
} as const;
