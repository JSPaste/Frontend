import type { ReactNode } from 'react';
import '@x-page/root.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const chakraTheme = extendTheme({
	config: {
		initialColorMode: 'dark',
		useSystemColorMode: false
	}
});

export default function ({ children }: { children: ReactNode }) {
	return (
		<body>
			<ChakraProvider theme={chakraTheme}>{children}</ChakraProvider>
		</body>
	);
}
