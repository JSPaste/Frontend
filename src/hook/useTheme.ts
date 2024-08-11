import { themeStore } from '@/utils/store.ts';
import { type ThemeId, themes } from '@/utils/themes.ts';
import { useColorMode } from '@chakra-ui/react';

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
