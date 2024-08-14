import { siteManifest } from '@x-page/manifest.ts';
import type { Config } from 'vike/types';

export default {
	title: siteManifest.siteTitle,
	description: siteManifest.description,
	// FIXME: Enable SSR support
	ssr: false
} satisfies Config;
