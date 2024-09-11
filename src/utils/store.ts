import type { LanguageSupport, StreamLanguage } from '@codemirror/language';
import { type LangKeys, langs } from '@x-util/langs';
import type { ThemeKeys } from '@x-util/themes';
import { createWithSignal } from 'solid-zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type FrontendState = {
	apiURL: string;
	setApiURL: (url: string) => void;
};

export const frontendStore = createWithSignal(
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

export const themeStore = createWithSignal(
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
	getLanguage: () => Promise<StreamLanguage<unknown> | LanguageSupport>;
};

export const languageStore = createWithSignal<LanguageState>((set, get) => ({
	language: 'markdown',
	setLanguage: (language) => set({ language: language }),
	getLanguage: async () => {
		const lang = await langs[get().language]();
		return lang();
	}
}));
