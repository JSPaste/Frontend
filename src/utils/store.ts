import { type Theme, ThemeId, type ThemePaletteKey, themes } from '@/utils/themes';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type FrontendState = {
	storageHydrated: boolean;
	_setStorageHydrated: (state: boolean) => void;
	apiURL: string;
	setApiURL: (url: string) => void;
};

export const frontendStore = create(
	persist<FrontendState>(
		(set) => ({
			storageHydrated: false,
			apiURL: 'https://jspaste.eu/api/v2/documents',
			_setStorageHydrated: (state) => set({ storageHydrated: state }),
			setApiURL: (url) => set({ apiURL: url })
		}),
		{
			name: 'x-jspaste-frontend',
			storage: createJSONStorage(() => localStorage),
			onRehydrateStorage: (state) => state._setStorageHydrated(true)
		}
	)
);

type ThemeState = {
	themeId: ThemeId;
	setTheme: (id: ThemeId) => void;
	getThemePalette: () => ThemePaletteKey;
};

export const themeStore = create(
	persist<ThemeState>(
		(set, get) => ({
			themeId: ThemeId.Default,
			setTheme: (id) => set({ themeId: id }),
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

type LanguageState = {
	language: string | undefined;
	setLanguage: (language?: string) => void;
};

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
