import type { LanguageSupport, StreamLanguage } from '@codemirror/language';
import { langs } from '@uiw/codemirror-extensions-langs';
import type { LangsKey } from '@x-util/langs';
import { type Theme, ThemeId, themes } from '@x-util/themes';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type FrontendState = {
	apiURL: string;
	setApiURL: (url: string) => void;
};

export const frontendStore = create(
	persist<FrontendState>(
		(set) => ({
			apiURL: 'https://jspaste.eu/api/v2/documents',
			setApiURL: (url) => set({ apiURL: url })
		}),
		{
			name: 'x-jspaste-frontend',
			storage: createJSONStorage(() => localStorage)
		}
	)
);

type ThemeState = {
	themeId: ThemeId;
	setTheme: (id: ThemeId) => void;
	getTheme: () => Theme;
};

export const themeStore = create(
	persist<ThemeState>(
		(set, get) => ({
			themeId: ThemeId.Default,
			setTheme: (id) => set({ themeId: id }),
			getTheme: () => {
				return themes.find((theme) => theme.id === get().themeId) as Theme;
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
