'use client';

import useThemeValues from '@/hooks/useThemeValues';
import { Box, ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import './layout.css';

const theme = extendTheme({
	config: {
		initialColorMode: 'dark',
		useSystemColorMode: false
	}
});

type RootLayoutProps = {
	children: ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
	const { getThemeValue } = useThemeValues();

	return (
		<html lang='en'>
			<head>
				<title>JSPaste - The developer website for easy code sharing</title>
				<meta name='viewport' content='initial-scale=1, width=device-width' />

				<meta name='title' content='JSPaste' />
				<meta
					name='description'
					content='Create and share code with JSPaste! The developer website for easy code sharing.'
				/>
				<meta name='keywords' content='JSPaste,developer,javascript,hastebin,TSPaste,pastebin,tnfAngel' />
				<meta name='theme-color' content='#FFE285' />
				<meta name='author' content='JSPaste' />
				<meta property='og:type' content='website' />
				<meta property='og:url' content='https://jspaste.eu' />
				<meta property='og:site_name' content='JSPaste' />
				<meta property='og:title' content='JSPaste' />
				<meta
					property='og:description'
					content='Create and share code with JSPaste! The developer website for easy code sharing.'
				/>
				<meta property='og:image' content='/media/jspaste.bg.rounded.svg' />
				<meta
					property='og:keywords'
					content='JSPaste,developer,javascript,hastebin,TSPaste,pastebin,tnfAngel'
				/>

				<meta property='twitter:card' content='summary_large_image' />
				<meta property='twitter:url' content='https://jspaste.eu' />
				<meta property='twitter:title' content='JSPaste' />
				<meta
					property='twitter:description'
					content='Create and share code with JSPaste! The developer website for easy code sharing.'
				/>
				<meta property='twitter:image' content='/media/jspaste.bg.rounded.svg' />
				<meta property='twitter:site' content='@tnfAngel' />
				<meta property='twitter:site:id' content='@tnfAngel' />
				<meta property='twitter:creator' content='@tnfAngel' />
				<meta property='twitter:creator:id' content='@tnfAngel' />

				<link rel='icon' type='image/svg+xml' href='/media/jspaste.bg.rounded.svg' />
				<link rel='icon' type='image/png' href='/media/jspaste.png' />
			</head>
			<body>
				<ColorModeScript initialColorMode={theme['config'].initialColorMode} />
				<ChakraProvider theme={theme}>
					<Box h='100%' w='100%' bg={getThemeValue('editor')}>
						{children}
					</Box>
				</ChakraProvider>
			</body>
		</html>
	);
}
