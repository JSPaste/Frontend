import { ThemeId } from '@/utils/themes';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const themeStore = create(
	persist<{
		themeId: ThemeId;
		setThemeId: (theme: ThemeId) => void;
	}>(
		(set) => ({
			themeId: ThemeId.Default,
			setThemeId: (theme) => set({ themeId: theme })
		}),
		{
			name: 'x-jspaste-frontend-theme',
			storage: createJSONStorage(() => localStorage)
		}
	)
);

export const languageStore = create(
	persist<{
		language: string | undefined;
		setLanguage: (language?: string) => void;
	}>(
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

export const apiURLStore = create(
	persist<{
		apiURL: string;
		setApiURL: (url: string) => void;
	}>(
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
