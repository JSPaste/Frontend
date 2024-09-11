import { siteManifest } from '@x-page/manifest';
import type { Config } from 'vike/types';

export default {
	title: siteManifest.siteTitle,
	description: siteManifest.description,
	hydrationCanBeAborted: true,
	ssr: false
} satisfies Config;
