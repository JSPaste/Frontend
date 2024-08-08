import { themeStore } from '@/utils/store';
import { themes } from '@/utils/themes';
import { useColorMode } from '@chakra-ui/react';

export default function useTheme() {
	const { themeId, setThemeId } = themeStore();
	const { colorMode, toggleColorMode } = useColorMode();

	return [
		themeId,
		(themeId?: string) => {
			const selectedTheme = themes.find((theme) => theme.id === themeId);

			if (!selectedTheme) return;
			if (colorMode !== selectedTheme.baseTheme) toggleColorMode();

			setThemeId(selectedTheme.id);
		},
		themes
	] as const;
}
