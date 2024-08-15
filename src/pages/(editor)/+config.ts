import { siteManifest } from '@x-page/manifest.ts';
import type { Config } from 'vike/types';

export default {
	title: siteManifest.siteTitle,
	description: siteManifest.description,
	clientRouting: false,
	ssr: false
} satisfies Config;
