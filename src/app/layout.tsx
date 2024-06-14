import type { PropsWithChildren } from 'react';
import './layout.css';
import { seo } from '@/seo.ts';

const RootLayout = ({ children }: PropsWithChildren) => (
	<html lang='en'>
		<head>
			<title>{seo.siteTitle}</title>
			<meta name='title' content={seo.siteShortTitle} />
			<meta name='description' content={seo.description} />

			<meta property='og:type' content={seo.type} />
			<meta property='og:url' content={seo.baseURL} />
			<meta property='og:site_name' content={seo.siteShortTitle} />
			<meta property='og:title' content={seo.siteShortTitle} />
			<meta property='og:description' content={seo.description} />
			<meta property='og:image' content={seo.image.url} />

			<meta property='twitter:card' content={seo.twitter.card} />
			<meta property='twitter:url' content={seo.baseURL} />
			<meta property='twitter:title' content={seo.siteShortTitle} />
			<meta property='twitter:description' content={seo.description} />
			<meta property='twitter:image' content={seo.image.url} />

			<meta charSet='utf-8' />
			<meta name='viewport' content='initial-scale=1, width=device-width' />
			<meta name='theme-color' content='#FFE285' />

			<link rel='icon' type='image/svg+xml' href={seo.image.localURL} />
			<link rel='icon' type='image/x-icon' href='/favicon.ico' />
		</head>
		<body>{children}</body>
	</html>
);

export default RootLayout;
