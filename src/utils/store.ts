import { type Theme, ThemeId, type ThemePaletteKey, themes } from '@/utils/themes';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type ThemeState = {
	themeId: ThemeId;
	setTheme: (id: ThemeId) => void;
	getThemePalette: () => ThemePaletteKey;
};

type LanguageState = {
	language: string | undefined;
	setLanguage: (language?: string) => void;
};

type APIState = {
	apiURL: string;
	setApiURL: (url: string) => void;
};

export const themeStore = create(
	persist<ThemeState>(
		(set, get) => ({
			themeId: ThemeId.Default,
			// FIXME: Should have a queue. You are likely calling Hooks conditionally, which is not allowed.
			setTheme: (id) => {
				// const { colorMode, toggleColorMode } = useColorMode();

				const theme = themes.find((theme) => theme.id === id);

				if (!theme) return;
				// if (colorMode !== theme.baseTheme) toggleColorMode();

				set({ themeId: id });
			},
			getThemePalette: () => {
				const theme = themes.find((theme) => theme.id === get().themeId) as Theme;

				return theme.palette;
			}
		}),
		{
			name: 'x-jspaste-frontend-theme',
			storage: createJSONStorage(() => localStorage)
		}
	)
);

export const languageStore = create(
	persist<LanguageState>(
		(set) => ({
			language: undefined,
			setLanguage: (language) => set({ language: language })
		}),
		{
			name: 'x-jspaste-frontend-language',
			storage: createJSONStorage(() => localStorage)
		}
	)
);

export const apiStore = create(
	persist<APIState>(
		(set) => ({
			apiURL: 'https://jspaste.eu/api/v2/documents',
			setApiURL: (url) => set({ apiURL: url })
		}),
		{
			name: 'x-jspaste-frontend-api-url',
			storage: createJSONStorage(() => localStorage)
		}
	)
);
