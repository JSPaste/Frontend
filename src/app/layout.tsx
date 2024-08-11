'use client';

import { type ReactNode, useEffect, useState } from 'react';
import './root.css';
import { siteManifest } from '@/manifest';
import { frontendStore, themeStore } from '@/utils/store.ts';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const chakraTheme = extendTheme({
	config: {
		initialColorMode: 'dark',
		useSystemColorMode: false
	}
});

export default function ({ children }: { children: ReactNode }) {
	const [initialLoad, setInitialLoad] = useState(true);

	const { storageHydrated } = frontendStore();
	const { themeId, setTheme } = themeStore();

	// biome-ignore lint/correctness/useExhaustiveDependencies: Only invoke on initialLoad
	useEffect(() => {
		if (initialLoad && storageHydrated) {
			setTheme(themeId);
			setInitialLoad(false);
		}
	}, []);

	return (
		<html lang='en'>
			<head>
				<title>{siteManifest.siteTitle}</title>
				<meta name='title' content={siteManifest.siteShortTitle} />
				<meta name='description' content={siteManifest.description} />

				<meta property='og:type' content={siteManifest.type} />
				<meta property='og:url' content={siteManifest.baseURL} />
				<meta property='og:site_name' content={siteManifest.siteShortTitle} />
				<meta property='og:title' content={siteManifest.siteShortTitle} />
				<meta property='og:description' content={siteManifest.description} />
				<meta property='og:image' content={siteManifest.logotype.url} />

				<meta charSet='UTF-8' />
				<meta name='viewport' content='initial-scale=1, width=device-width' />
				<meta name='theme-color' content='#FFE285' />

				<link rel='icon' type='image/svg+xml' href={siteManifest.logotype.localRoute} />
				<link rel='icon' type='image/x-icon' href='/favicon.ico' />
			</head>
			<body>
				<ChakraProvider key={`im-${initialLoad ? 'loading' : 'done'}`} theme={chakraTheme}>
					{children}
				</ChakraProvider>
			</body>
		</html>
	);
}
