import { themeStore } from '@/utils/store';
import { type ThemePaletteKey, themes } from '@/utils/themes';

export default function useThemeValues() {
	const { themeId } = themeStore();

	const theme = themes.find((theme) => theme.id === themeId) ?? themes[0];

	return {
		getThemeValue: (value: keyof ThemePaletteKey) => {
			return theme?.palette[value];
		}
	} as const;
}
