import { pwaManifest, siteManifest } from '@x-page/manifest.ts';
import './root.css';

export default function () {
	return (
		<>
			<meta name='theme-color' content={pwaManifest.theme_color} />

			<meta property='og:type' content={siteManifest.type} />
			<meta property='og:url' content={siteManifest.baseURL} />
			<meta property='og:site_name' content={siteManifest.siteShortTitle} />
			<meta property='og:image' content={siteManifest.logotype.url} />

			<link rel='icon' type='image/svg+xml' href={siteManifest.logotype.localRoute} />
			<link rel='icon' type='image/x-icon' href='/favicon.ico' />
			<link rel='manifest' href='/manifest.webmanifest' />

			<script defer src='/registerSW.js' />
		</>
	);
}
