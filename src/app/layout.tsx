'use client';

import useThemeValues from '@/hooks/useThemeValues';
import { chakraTheme } from '@/utils/constants.ts';
import { CacheProvider } from '@chakra-ui/next-js';
import { Box, ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import type { ReactElement, ReactNode } from 'react';

const theme = extendTheme(chakraTheme);

interface RootLayoutProps {
	children: ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>): ReactElement {
	const { getThemeValue } = useThemeValues();

	return (
		<html
			lang='en'
			style={{
				width: '100%',
				height: '100%',
				overflow: 'hidden',
				scrollBehavior: 'smooth',
				userSelect: 'none'
			}}
		>
			<head>
				<title>JSPaste - The developer website for easy code sharing.</title>
				<meta name='viewport' content='initial-scale=1, width=device-width' />

				<meta name='title' content='JSPaste' />
				<meta
					name='description'
					content='Create and share code with JSPaste! The developer website for easy code sharing.'
				/>
				<meta name='keywords' content='JSPaste,developer,javascript,hastebin,TSPaste,pastebin,tnfAngel' />
				<meta name='theme-color' content='#FFE184' />
				<meta name='author' content='JSPaste' />
				<meta property='og:type' content='website' />
				<meta property='og:url' content='https://jspaste.eu/' />
				<meta property='og:site_name' content='JSPaste' />
				<meta property='og:title' content='JSPaste' />
				<meta
					property='og:description'
					content='Create and share code with JSPaste! The developer website for easy code sharing.'
				/>
				<meta property='og:image' content='/logo.webp' />
				<meta
					property='og:keywords'
					content='JSPaste,developer,javascript,hastebin,TSPaste,pastebin,tnfAngel'
				/>

				<meta property='twitter:card' content='summary_large_image' />
				<meta property='twitter:url' content='https://jspaste.eu/' />
				<meta property='twitter:title' content='JSPaste' />
				<meta
					property='twitter:description'
					content='Create and share code with JSPaste! The developer website for easy code sharing.'
				/>
				<meta property='twitter:image' content='/logo.webp' />
				<meta property='twitter:site' content='@tnfAngel' />
				<meta property='twitter:site:id' content='@tnfAngel' />
				<meta property='twitter:creator' content='@tnfAngel' />
				<meta property='twitter:creator:id' content='@tnfAngel' />

				<link rel='icon' type='image/x-icon' href='./favicon.ico' />

				<style>
					{
						'::-webkit-scrollbar{width:6px;z-index:100000}::-webkit-scrollbar-track{border-radius:10px}::-webkit-scrollbar-track:hover{background-color:#00000020}::-webkit-scrollbar-thumb{border-radius:10px;background-color:#00000050}::-webkit-scrollbar-thumb:hover{background-color:#00000060}'
					}
				</style>
			</head>
			<body
				style={{
					width: '100%',
					height: '100%'
				}}
			>
				<ColorModeScript initialColorMode={theme['config'].initialColorMode} />
				<ChakraProvider theme={theme}>
					<CacheProvider>
						<Box h='100%' w='100%' bg={getThemeValue('editor')}>
							{children}
						</Box>
					</CacheProvider>
				</ChakraProvider>
			</body>
		</html>
	);
}
