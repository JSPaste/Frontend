import type { LangsKey } from '@/utils/langs.ts';
import { type Theme, ThemeId, type ThemePaletteKey, themes } from '@/utils/themes';
import type { LanguageSupport, StreamLanguage } from '@codemirror/language';
import { langs } from '@uiw/codemirror-extensions-langs';
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
	getTheme: () => Theme;
	getThemePalette: () => ThemePaletteKey;
};

export const themeStore = create(
	persist<ThemeState>(
		(set, get) => ({
			themeId: ThemeId.Default,
			setTheme: (id) => set({ themeId: id }),
			getTheme: () => {
				return themes.find((theme) => theme.id === get().themeId) as Theme;
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

type LanguageState = {
	language: LangsKey;
	setLanguage: (language: LangsKey) => void;
	getLanguage: () => StreamLanguage<unknown> | LanguageSupport;
};

export const languageStore = create<LanguageState>((set, get) => ({
	language: 'markdown',
	setLanguage: (language) => set({ language: language }),
	getLanguage: () => {
		return langs[get().language]();
	}
}));
