import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const languageStore = create(
	persist<{
		languageId: string | undefined;
		setLanguageId: (languageId: string) => void;
	}>(
		(set) => ({
			languageId: undefined,
			setLanguageId: (languageId) => set({ languageId }),
		}),
		{
			name: 'language-storage',
		},
	),
);

export default languageStore;
