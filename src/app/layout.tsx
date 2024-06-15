import { seo } from '@/seo.ts';
import { defaultTheme } from '@/themes.ts';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type { PropsWithChildren } from 'react';

const RootLayout = (props: PropsWithChildren) => (
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
		<body>
			<AppRouterCacheProvider>
				<ThemeProvider theme={defaultTheme}>
					<CssBaseline />
					{props.children}
				</ThemeProvider>
			</AppRouterCacheProvider>
		</body>
	</html>
);

export default RootLayout;
