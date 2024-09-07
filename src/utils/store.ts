import type { LanguageSupport, StreamLanguage } from '@codemirror/language';
import { langs } from '@uiw/codemirror-extensions-langs';
import type { LangKeys } from '@x-util/langs';
import type { ThemeKeys } from '@x-util/themes';
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
	themeId: ThemeKeys;
	setTheme: (id: ThemeKeys) => void;
};

export const themeStore = create(
	persist<ThemeState>(
		(set) => ({
			themeId: 'default',
			setTheme: (id) => set({ themeId: id })
		}),
		{
			name: 'x-jspaste-frontend-theme',
			storage: createJSONStorage(() => localStorage)
		}
	)
);

type LanguageState = {
	language: LangKeys;
	setLanguage: (language: LangKeys) => void;
	getLanguage: () => StreamLanguage<unknown> | LanguageSupport;
};

export const languageStore = create<LanguageState>((set, get) => ({
	language: 'markdown',
	setLanguage: (language) => set({ language: language }),
	getLanguage: () => {
		return langs[get().language]();
	}
}));
