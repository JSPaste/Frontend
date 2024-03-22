import useThemeStore from '@/store/theme';
import { type ThemeValues, themes } from '@/themes/ui/themes';

export default function useThemeValues() {
	const { themeId } = useThemeStore();

	const theme = themes.find((theme) => theme.id === themeId) ?? themes[0];

	return {
		getThemeValue: (value: keyof ThemeValues) => {
			return theme?.values[value];
		}
	} as const;
}
