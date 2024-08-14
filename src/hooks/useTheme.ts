import { useColorMode } from '@chakra-ui/react';
import { themeStore } from '@x-util/store';
import { type ThemeId, themes } from '@x-util/themes';

export const useTheme = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	const { setTheme: setThemeFromStore } = themeStore();

	const setTheme = (id: ThemeId) => {
		const theme = themes.find((theme) => theme.id === id);

		if (!theme) return;
		if (colorMode !== theme.baseTheme) toggleColorMode();

		setThemeFromStore(id);
	};

	return { setTheme };
};
