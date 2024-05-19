import useThemeValues from '@/utils/useThemeValues';
import { Box, ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';

export function Main() {
	const theme = extendTheme({
		config: {
			initialColorMode: 'dark',
			useSystemColorMode: false
		}
	});

	const { getThemeValue } = useThemeValues();

	return (
		<>
			<ColorModeScript initialColorMode={theme['config'].initialColorMode} />
			<ChakraProvider theme={theme}>
				<Box h='100%' w='100%' bg={getThemeValue('editor')}>
					<slot />
				</Box>
			</ChakraProvider>
		</>
	);
}
